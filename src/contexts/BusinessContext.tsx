"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Business {
  id: string;
  name: string;
  credits: number;
  description?: string;
  liveUpdate?: string;
  telegramBotToken?: string;
  aiPhoneNumber?: string;
}

interface BusinessContextType {
  businesses: Business[];
  getBusiness: (id: string) => Business | undefined;
  createBusiness: (name: string) => Business;
  updateBusiness: (id: string, updates: Partial<Business>) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("servio-businesses");
    if (saved) {
      try {
        setBusinesses(JSON.parse(saved));
      } catch {}
    }
    setMounted(true);
  }, []);

  const save = (updated: Business[]) => {
    setBusinesses(updated);
    localStorage.setItem("servio-businesses", JSON.stringify(updated));
  };

  const createBusiness = (name: string): Business => {
    const business: Business = {
      id: Date.now().toString(),
      name: name.trim(),
      credits: 0,
    };
    save([...businesses, business]);
    return business;
  };

  const updateBusiness = (id: string, updates: Partial<Business>) => {
    const updated = businesses.map((b) =>
      b.id === id ? { ...b, ...updates } : b
    );
    save(updated);
  };

  const getBusiness = (id: string) => businesses.find((b) => b.id === id);

  if (!mounted) {
    return (
      <BusinessContext.Provider value={{ businesses: [], getBusiness, createBusiness, updateBusiness }}>
        {children}
      </BusinessContext.Provider>
    );
  }

  return (
    <BusinessContext.Provider value={{ businesses, getBusiness, createBusiness, updateBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) throw new Error("useBusiness must be used within BusinessProvider");
  return context;
}
