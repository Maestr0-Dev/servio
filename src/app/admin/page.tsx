import { prisma } from "@/lib/prisma";
import { Users, CheckCircle, Clock, Bot } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const entries = await prisma.waitlist.findMany({
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.waitlist.count();
  const verified = await prisma.waitlist.count({ where: { verified: true } });
  const pending = total - verified;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Waitlist Admin</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-13">
          Manage your waitlist entries
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium">
                Total Signups
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{total}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium">
                Verified
              </span>
            </div>
            <div className="text-3xl font-bold text-emerald-600">{verified}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium">Pending</span>
            </div>
            <div className="text-3xl font-bold text-amber-600">{pending}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3.5 text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="text-left px-5 py-3.5 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="text-left px-5 py-3.5 text-sm font-medium text-gray-500">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-12 text-center text-gray-400"
                  >
                    No waitlist entries yet.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm text-gray-900 font-medium">
                      {entry.email}
                    </td>
                    <td className="px-5 py-4">
                      {entry.verified ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {entry.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
