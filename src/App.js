// Hybrid Work Scheduler - Starter React App Template

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, User } from "lucide-react";

const users = [
  { id: 1, name: "Angelo Jordaan" },
  { id: 2, name: "Astrin Pasquallie" },
  { id: 3, name: "Clement Frans" },
  { id: 4, name: "Dale Mac Arthur" },
  { id: 5, name: "Lee Keys" },
  { id: 6, name: "Previn Moodley" },
  { id: 7, name: "Shaakirah Hoffmeester" },
  { id: 8, name: "Ezra Hendricks" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function HybridScheduleApp() {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("hybrid-schedule");
    if (saved) {
      setSchedule(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hybrid-schedule", JSON.stringify(schedule));
  }, [schedule]);

  const toggleDay = (userId, day) => {
    setSchedule((prev) => {
      const key = `${userId}-${day}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const resetSchedule = () => {
    setSchedule({});
    localStorage.removeItem("hybrid-schedule");
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Hybrid Work Scheduler</h1>
        <Button variant="outline" onClick={resetSchedule}>
          Reset Schedule
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-left bg-gray-100">Name</th>
              {days.map((day) => (
                <th key={day} className="p-2 border text-left bg-gray-100">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2 border font-medium">{user.name}</td>
                {days.map((day) => {
                  const key = `${user.id}-${day}`;
                  const inOffice = schedule[key];
                  return (
                    <td
                      key={day}
                      className="p-2 text-center cursor-pointer hover:bg-gray-100 border"
                      onClick={() => toggleDay(user.id, day)}
                    >
                      {inOffice ? "🏢" : "🏠"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
