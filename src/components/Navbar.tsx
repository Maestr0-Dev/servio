import { Bot } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-900 rounded-lg flex items-center justify-center">
            {/* <Bot className="w-5 h-5 text-white" /> */}
          </div>
          <span className="text-xl font-bold text-gray-900">Servio</span>
        </div>
        <div className="text-sm text-gray-400 font-medium">
          Smart Voice Receptionist
        </div>
      </div>
    </nav>
  );
}
