import React, { useState } from 'react';
import { Search, Bell, MessageSquare, ArrowUpRight, Minus, AlertCircle, Activity, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const sentimentData = [
  { name: 'Positive', value: 58, color: '#10B981' },
  { name: 'Neutral', value: 27, color: '#EAB308' },
  { name: 'Negative', value: 15, color: '#EF4444' },
];

export default function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-background text-gray-100 font-sans p-6">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">SocialRadar <span className="text-gray-400">AI</span></h1>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-xl mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Enter brand or term to monitor..."
              className="w-full bg-surface border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="bg-primary hover:bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Analyze
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-900 border border-primary flex items-center justify-center text-sm font-bold text-primary">
            SR
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER TITLE */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold mb-1">Sentiment Overview</h2>
            <p className="text-gray-500 text-sm">Real-time analysis · Last updated just now</p>
          </div>
          <div className="flex items-center gap-2 text-success text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            Live
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-surface p-5 rounded-xl border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-medium">Total Mentions Analyzed</span>
              <div className="p-1.5 bg-indigo-500/10 rounded-md"><MessageSquare size={16} className="text-indigo-400"/></div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">48,291</span>
              <span className="text-xs text-gray-500">+1,204 today</span>
            </div>
          </div>

          <div className="bg-surface p-5 rounded-xl border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-medium">Positive Sentiment</span>
              <div className="p-1.5 bg-success/10 rounded-md"><ArrowUpRight size={16} className="text-success"/></div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">27,989</span>
              <span className="text-xs text-gray-500">58.0%</span>
            </div>
          </div>

          <div className="bg-surface p-5 rounded-xl border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-medium">Neutral Sentiment</span>
              <div className="p-1.5 bg-warning/10 rounded-md"><Minus size={16} className="text-warning"/></div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">13,039</span>
              <span className="text-xs text-gray-500">27.0%</span>
            </div>
          </div>

          <div className="bg-surface p-5 rounded-xl border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-sm font-medium">Negative Sentiment</span>
              <div className="p-1.5 bg-danger/10 rounded-md"><AlertCircle size={16} className="text-danger"/></div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">7,243</span>
              <span className="text-xs text-gray-500">15.0%</span>
            </div>
          </div>
        </div>

        {/* MIDDLE CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* DONUT CHART */}
          <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold">Sentiment Distribution</h3>
                <p className="text-xs text-gray-500">Breakdown across 48,291 mentions</p>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-md">Last 24h</span>
            </div>
            
            <div className="flex items-center h-48">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#151921', borderColor: '#1F2937', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-4">
                {sentimentData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Confidence Score</span>
                <span className="text-primary font-medium">94.2%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div className="bg-surface p-6 rounded-xl border border-gray-800 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">System Status</h3>
              <button className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition">Toggle</button>
            </div>
            
            <div className="flex-1 bg-success/5 border border-success/20 rounded-lg p-6 flex flex-col items-center justify-center text-center mb-6">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                <Bell className="text-success" size={24} />
              </div>
              <h4 className="text-success font-semibold mb-1">Active Monitoring</h4>
              <p className="text-xs text-success/70">All systems nominal · No threshold breaches</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Data Ingestion</span>
                <span className="text-success flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-success"></span>Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ML Inference Engine</span>
                <span className="text-success flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-success"></span>Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Alert Thresholds</span>
                <span className="text-success flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-success"></span>Normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT MENTIONS */}
        <div className="bg-surface p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-semibold">Recent Mentions</h3>
              <p className="text-xs text-gray-500">Live feed · Showing latest results</p>
            </div>
            <div className="flex gap-2 text-xs">
              <button className="px-3 py-1 bg-primary text-white rounded-md">All</button>
              <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded-md hover:bg-gray-700">Positive</button>
              <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded-md hover:bg-gray-700">Neutral</button>
              <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded-md hover:bg-gray-700">Negative</button>
            </div>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="pb-3 font-medium">Content</th>
                <th className="pb-3 font-medium text-center">Sentiment</th>
                <th className="pb-3 font-medium text-right">Source</th>
                <th className="pb-3 font-medium text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr className="hover:bg-gray-800/20 transition-colors">
                <td className="py-4 pr-4">
                  <div className="border-l-2 border-danger pl-3 text-gray-200">
                    "The new update completely broke my workflow. This is unacceptable!"
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger"></span> Negative
                  </span>
                </td>
                <td className="py-4 text-right text-gray-500 text-xs">Twitter/X <br/>2m ago</td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-primary font-medium">97%</span>
                    <ChevronRight size={16} className="text-gray-600"/>
                  </div>
                </td>
              </tr>
              {/* Você pode adicionar mais linhas <tr> aqui repetindo a estrutura */}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}