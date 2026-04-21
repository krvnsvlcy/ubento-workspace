"use client";
import React, { useEffect, useState } from 'react';
import { LayoutGrid, Plus, externalLink } from 'lucide-react';

const BACKEND_URL = "http://localhost:4050";

export default function Dashboard() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/apps`)
      .then(res => res.json())
      .then(setApps)
      .catch(console.error);
  }, []);

  const launchApp = (appId: string) => {
    // Simulate domain redirection: project_ref.ubento.app
    // In local dev we'll use localhost:4000?project=id
    window.location.href = `http://${appId}.localhost:4000`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-12">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter">Ubento Platform</h1>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition-colors">
          <Plus size={18} /> Create Project
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apps.map(app => (
          <div 
            key={app.id}
            onClick={() => launchApp(app.id)}
            className="group bg-neutral-900 border border-neutral-800 p-6 rounded-2xl cursor-pointer hover:border-neutral-600 transition-all"
          >
            <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
              <LayoutGrid size={20} />
            </div>
            <h3 className="text-lg font-bold">{app.name}</h3>
            <p className="text-neutral-500 text-sm">{app.id}.ubento.app</p>
          </div>
        ))}
      </div>
    </div>
  );
}
