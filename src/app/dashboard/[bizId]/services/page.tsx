"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Plus, Trash2, Clock, DollarSign, Package, Loader2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
}

export default function ServicesPage() {
  const { bizId } = useParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "", durationMinutes: "" });

  useEffect(() => {
    fetchServices();
  }, [bizId]);

  const fetchServices = async () => {
    try {
      const res = await fetch(`/api/businesses/${bizId}/services`);
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name || !newService.price || !newService.durationMinutes) return;
    setAdding(true);

    try {
      const res = await fetch(`/api/businesses/${bizId}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newService.name,
          price: parseFloat(newService.price),
          durationMinutes: parseInt(newService.durationMinutes),
        }),
      });

      if (res.ok) {
        const service = await res.json();
        setServices([...services, service]);
        setNewService({ name: "", price: "", durationMinutes: "" });
      }
    } catch (error) {
      console.error("Failed to add service:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/businesses/${bizId}/services/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-500 mt-1">Manage the services your smart receptionist offers</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-gray-400" />
          Add New Service
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            placeholder="Service name"
            required
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
          />
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              placeholder="Price"
              required
              min="0"
              step="0.01"
              className="w-full sm:w-28 pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={newService.durationMinutes}
              onChange={(e) => setNewService({ ...newService, durationMinutes: e.target.value })}
              placeholder="Min"
              required
              min="1"
              className="w-full sm:w-24 pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {services.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p>No services yet. Add your first service above.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {services.map((service) => (
              <div key={service.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{service.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {Number(service.price).toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.durationMinutes} min
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
