"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Save, Phone, MapPin, Bell, MessageSquare, Loader2, CheckCircle, XCircle, Sparkles } from "lucide-react";

export default function ShopPage() {
  const { bizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [provisioning, setProvisioning] = useState(false);
  const [provisioningWhatsApp, setProvisioningWhatsApp] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState<"none" | "connected" | "error">("none");
  const [shop, setShop] = useState({
    name: "",
    aiPhoneNumber: "",
    description: "",
    liveUpdate: "",
    telegramBotToken: "",
    vapiPhoneNumberId: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    fetch(`/api/businesses/${bizId}`)
      .then((res) => res.json())
      .then((data) => {
        setShop({
          name: data.name || "",
          aiPhoneNumber: data.aiPhoneNumber || "",
          description: data.description || "",
          liveUpdate: data.liveUpdate || "",
          telegramBotToken: data.telegramBotToken || "",
          vapiPhoneNumberId: data.vapiPhoneNumberId || "",
          whatsappNumber: data.whatsappNumber || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [bizId]);

  const handleProvisionPhone = async () => {
    setProvisioning(true);
    try {
      const res = await fetch(`/api/businesses/${bizId}/provision-phone`, {
        method: "POST",
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        return;
      }
      if (res.ok && data.phoneNumber) {
        setShop({ ...shop, aiPhoneNumber: data.phoneNumber, vapiPhoneNumberId: "provisioned" });
      } else {
        console.error("Provision error:", data);
      }
    } catch (error) {
      console.error("Failed to provision phone:", error);
    } finally {
      setProvisioning(false);
    }
  };

  const handleProvisionWhatsApp = async () => {
    setProvisioningWhatsApp(true);
    try {
      const res = await fetch(`/api/businesses/${bizId}/provision-whatsapp`, {
        method: "POST",
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        return;
      }
      if (res.ok && data.whatsappNumber) {
        setShop({ ...shop, whatsappNumber: data.whatsappNumber });
      } else {
        console.error("WhatsApp provision error:", data);
      }
    } catch (error) {
      console.error("Failed to provision WhatsApp:", error);
    } finally {
      setProvisioningWhatsApp(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/businesses/${bizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shop),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Shop Configuration</h1>
        <p className="text-gray-500 mt-1">Set up your business profile for the smart receptionist</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            Business Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name</label>
              <input
                type="text"
                value={shop.name}
                onChange={(e) => setShop({ ...shop, name: e.target.value })}
                placeholder="e.g. Studio Cutz"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">AI Phone Number</label>
              {shop.aiPhoneNumber ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                    <input
                      type="tel"
                      value={shop.aiPhoneNumber}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 font-mono text-sm cursor-not-allowed"
                    />
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Active
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value=""
                      readOnly
                      placeholder="No phone number yet"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleProvisionPhone}
                    disabled={provisioning}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {provisioning ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    {provisioning ? "Provisioning..." : "Get Number"}
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {shop.aiPhoneNumber
                  ? "Customers call this number to reach your smart receptionist."
                  : "Click to get a unique phone number for your business (powered by Vapi)."}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Description & Hours</label>
              <textarea
                value={shop.description}
                onChange={(e) => setShop({ ...shop, description: e.target.value })}
                placeholder="e.g. Hair salon. Open Mon-Fri 9am-7pm, Sat 10am-5pm."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-400" />
            Live Notice
          </h2>
          <textarea
            value={shop.liveUpdate}
            onChange={(e) => setShop({ ...shop, liveUpdate: e.target.value })}
            placeholder="e.g. Closed today for renovation. Back tomorrow at 9am."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">Temporary notice that callers will hear. Leave empty for none.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            Telegram Integration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bot Token</label>
              <input
                type="text"
                value={shop.telegramBotToken}
                onChange={(e) => setShop({ ...shop, telegramBotToken: e.target.value })}
                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all font-mono text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                Create a bot via{" "}
                <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">@BotFather</a>{" "}
                and paste the token here.
              </p>
            </div>
            {shop.telegramBotToken && (
              <button
                type="button"
                onClick={async () => {
                  setConnecting(true);
                  try {
                    const res = await fetch("/api/telegram/register-bot", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ shopId: bizId, botToken: shop.telegramBotToken }),
                    });
                    if (res.ok) {
                      setTelegramStatus("connected");
                    } else {
                      setTelegramStatus("error");
                    }
                  } catch {
                    setTelegramStatus("error");
                  } finally {
                    setConnecting(false);
                  }
                }}
                disabled={connecting}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50"
              >
                {connecting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : telegramStatus === "connected" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : telegramStatus === "error" ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  <MessageSquare className="w-4 h-4" />
                )}
                {connecting
                  ? "Connecting..."
                  : telegramStatus === "connected"
                  ? "Connected!"
                  : telegramStatus === "error"
                  ? "Failed — Check Token"
                  : "Connect Telegram Bot"}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-500" />
            WhatsApp Integration
          </h2>
          <div className="space-y-4">
            {shop.whatsappNumber ? (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                    <input
                      type="text"
                      value={shop.whatsappNumber}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 font-mono text-sm cursor-not-allowed"
                    />
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Customers can message this number to chat with your AI receptionist.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-3">
                  Get a unique WhatsApp number for your business. Customers message this number to chat with your AI.
                </p>
                <button
                  type="button"
                  onClick={handleProvisionWhatsApp}
                  disabled={provisioningWhatsApp}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {provisioningWhatsApp ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MessageSquare className="w-4 h-4" />
                  )}
                  {provisioningWhatsApp ? "Provisioning..." : "Get WhatsApp Number"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 font-medium">Changes saved</span>
          )}
        </div>
      </form>
    </div>
  );
}
