import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserCog, Shield, Activity } from "lucide-react";

export const Route = createFileRoute("/staff-dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const [members, setMembers] = useState([]);
  const headers = ["NAME", "EMAIL", "STATUS", "ROLE"];

  // Fetch all members from the database
  async function fetchMembers() {
    try {
      const response = await fetch("http://localhost:3000/api/getAllUsers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(data.users);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-zinc-800 pb-6">
          <h2 className="text-2xl font-bold tracking-tighter text-blue-400">
            STAFF_TERMINAL
          </h2>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
            Total Records: {members.length}
          </div>
        </div>

        {/* Table Container */}
        <div className="border border-zinc-800 rounded overflow-hidden bg-zinc-900/20">
          {/* Header Row */}
          <div className="grid grid-cols-4 bg-zinc-900 border-b border-zinc-800">
            {headers.map((header) => (
              <div
                key={header}
                className="p-4 text-[10px] font-black text-zinc-500 tracking-widest"
              >
                {header}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          <div className="divide-y divide-zinc-900">
            {/* {alert(members.length)} */}
            {members.length > 0 ? (
              members.map((member) => (
                <div
                  key={member.user_id}
                  className="grid grid-cols-4 group hover:bg-blue-500/[0.03] transition-colors"
                >
                  <div className="p-4 text-sm font-medium border-r border-zinc-900/50 flex items-center gap-2">
                    <UserCog size={14} className="text-zinc-600" />
                    {member.name}
                  </div>
                  <div className="p-4 text-sm text-zinc-400 border-r border-zinc-900/50">
                    {member.email}
                  </div>
                  <div className="p-4 text-sm border-r border-zinc-900/50 flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${member.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <span
                      className={
                        member.status === "active"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {member.status?.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-4 text-sm flex items-center gap-2">
                    <Shield size={14} className="text-zinc-600" />
                    <span className="text-zinc-300">{member.role}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-zinc-600 text-xs italic tracking-widest">
                NO_RECORDS_FOUND_IN_SYSTEM
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
