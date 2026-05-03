/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { PenTool, Layers, Layout, Palette, MousePointer2, Smartphone, Eye, BarChart3, Zap, Filter, ArrowUpDown, Calendar, Search, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COMPONENT_USAGE = [
  { name: 'Button', usage: 4200, category: 'Action' },
  { name: 'Input', usage: 2800, category: 'Input' },
  { name: 'Card', usage: 3500, category: 'Layout' },
  { name: 'Modal', usage: 1200, category: 'Overlay' },
  { name: 'Dropdown', usage: 1800, category: 'Input' },
  { name: 'Tabs', usage: 2200, category: 'Navigation' },
];

const AB_TEST_HISTORY = [
  {
    id: 'EXP_001',
    name: 'CTA_Color_V1',
    winner: 'Variant B',
    status: 'Archived',
    date: '2024-03-15',
    description: 'Testing high-contrast orange vs muted slate for primary conversion nodes.',
    data: [
      { name: 'Variant A', value: 42, convRate: 3.2, ctr: 12.4 },
      { name: 'Variant B', value: 58, convRate: 4.8, ctr: 15.1 },
    ]
  },
  {
    id: 'EXP_002',
    name: 'Hero_Copy_V2',
    winner: 'Variant A',
    status: 'Archived',
    date: '2024-03-28',
    description: 'Neural-driven copy vs standard technical descriptions.',
    data: [
      { name: 'Variant A', value: 65, convRate: 5.1, ctr: 18.2 },
      { name: 'Variant B', value: 35, convRate: 2.9, ctr: 10.5 },
    ]
  },
  {
    id: 'EXP_003',
    name: 'Nav_Density_V3',
    winner: 'Variant B',
    status: 'Active',
    date: '2024-04-10',
    description: 'Consolidated navigation nodes vs expanded sidebar matrix.',
    data: [
      { name: 'Variant A', value: 48, convRate: 4.2, ctr: 14.8 },
      { name: 'Variant B', value: 52, convRate: 4.5, ctr: 15.2 },
    ]
  },
  {
    id: 'EXP_004',
    name: 'Font_Weight_V1',
    winner: 'Variant A',
    status: 'Scheduled',
    date: '2024-05-01',
    description: 'Testing medium vs bold weights for dashboard headers.',
    data: [
      { name: 'Variant A', value: 50, convRate: 0.0, ctr: 0.0 },
      { name: 'Variant B', value: 50, convRate: 0.0, ctr: 0.0 },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const Design: React.FC = () => {
  const [usageSort, setUsageSort] = useState<'name' | 'usage'>('usage');
  const [testStatusFilter, setTestStatusFilter] = useState<string>('All');
  const [componentCategoryFilter, setComponentCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedUsage = useMemo(() => {
    return [...COMPONENT_USAGE]
      .filter(item => {
        const matchesCategory = componentCategoryFilter === 'All' || item.category === componentCategoryFilter;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (usageSort === 'name') return a.name.localeCompare(b.name);
        return b.usage - a.usage;
      });
  }, [usageSort, componentCategoryFilter, searchQuery]);

  const filteredTests = useMemo(() => {
    return AB_TEST_HISTORY.filter(test => {
      const matchesStatus = testStatusFilter === 'All' || test.status === testStatusFilter;
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           test.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [testStatusFilter, searchQuery]);

  const handleExportData = () => {
    const usageHeaders = ['Type', 'Component', 'Category', 'Usage'];
    const usageRows = sortedUsage.map(item => ['USAGE', item.name, item.category, item.usage]);
    
    const testHeaders = ['Type', 'ID', 'Name', 'Date', 'Status', 'Winner', 'Variant_A_Dist', 'Variant_B_Dist'];
    const testRows = filteredTests.map(test => [
      'EXPERIMENT',
      test.id,
      test.name,
      test.date,
      test.status,
      test.winner || 'TBD',
      `${test.data[0].value}%`,
      `${test.data[1].value}%`
    ]);

    const csvContent = [
      usageHeaders.join(','),
      ...usageRows.map(row => row.join(',')),
      '',
      testHeaders.join(','),
      ...testRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `omni_design_intel_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = ['All', ...new Set(COMPONENT_USAGE.map(c => c.category))];
  const statuses = ['All', 'Active', 'Archived', 'Scheduled'];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 pb-24">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">
              Visual<br/>Logic
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">Creative Systems // Series 04</div>
        </div>
      </section>

      {/* Design System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[350px]">
          <div>
            <p className="label-micro mb-0.5">Design_System_Health</p>
            <h3 className="font-serif italic text-4xl text-white mt-4 uppercase underline decoration-accent decoration-offset-4 decoration-2">Coherent</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mt-6 uppercase tracking-widest opacity-40">
              92% component coverage. Accessibility audit: PASSED. Neutral palette synchronized across all regional endpoints.
            </p>
          </div>
          <div className="flex gap-4 mt-12">
             {['Inter', 'JetBrains_Mono', 'Playfair_Display'].map((font) => (
                <span key={font} className="label-micro border border-surface-high p-2 uppercase text-[8px]">{font}</span>
             ))}
          </div>
        </div>

        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-around">
            {[
                { label: 'Typography', val: '98%', icon: Layers },
                { label: 'Color Theory', val: '100%', icon: Palette },
                { label: 'Spacing Index', val: '84%', icon: Layout },
            ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer border-b border-surface-high/20 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-6">
                        <item.icon className="h-4 w-4 text-accent/40 group-hover:text-accent transition-all" />
                        <span className="label-micro opacity-40 group-hover:opacity-100 transition-all">{item.label}</span>
                    </div>
                    <span className="font-mono text-xl text-white">{item.val}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Gallery Mockups */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Active_Canvases</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: 'Mobile_Node_v2', type: 'UI/UX', img: 'bg-white/5' },
                { title: 'Brand_Neural_Iconography', type: 'Graphic', img: 'bg-accent/10 shadow-[0_0_20px_rgba(255,77,0,0.1)]' },
                { title: 'Marketing_Landing_Hero', type: 'Design', img: 'bg-white/5' },
            ].map((art, i) => (
                <motion.div key={i} variants={itemVariants} className="group cursor-pointer">
                    <div className={`aspect-square w-full ${art.img} border border-surface-high mb-4 relative overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-sm">
                            <Eye className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute top-10 left-10 w-24 h-24 border border-accent/20 rounded-full animate-pulse" />
                        <div className="absolute bottom-10 right-10 w-12 h-[1px] bg-accent/40" />
                    </div>
                    <p className="label-micro text-accent mb-1">{art.type}</p>
                    <h4 className="font-mono text-[10px] text-white uppercase font-bold tracking-widest">{art.title}</h4>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Global Intel Search */}
      <section className="bg-[#0A0A0A] border border-surface-high p-8">
        <div className="flex items-center gap-6">
          <div className="flex h-10 w-10 items-center justify-center border border-accent/20 bg-accent/5">
            <Search className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH_DESIGN_INTELLIGENCE (COMPONENTS / EXPERIMENTS / IDs)..."
              className="w-full bg-transparent border-b border-surface-high py-4 font-mono text-xs text-white uppercase tracking-widest focus:outline-none focus:border-accent transition-all placeholder:opacity-20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 label-micro text-accent hover:text-white transition-colors"
              >
                CLEAR_INPUT
              </button>
            )}
          </div>
          <button 
            onClick={handleExportData}
            className="flex items-center gap-3 px-6 py-3 bg-accent text-black font-bold label-micro hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-accent/20 h-10"
          >
            <Download className="h-3.5 w-3.5" />
            EXPORT_INTEL_CSV
          </button>
        </div>
      </section>

      {/* Design Analytics */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-surface-high pb-4 gap-4">
          <h3 className="label-micro flex items-center gap-2">
            <BarChart3 className="h-3 w-3 text-accent" />
            Design_Analytics_Intelligence
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Filter className="h-3 w-3 text-white/20" />
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setComponentCategoryFilter(cat)}
                    className={`label-micro px-2 py-1 border transition-all ${componentCategoryFilter === cat ? 'bg-accent border-accent text-black' : 'border-surface-high text-white/40 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 border-l border-surface-high pl-6">
              <ArrowUpDown className="h-3 w-3 text-white/20" />
              <button 
                onClick={() => setUsageSort(usageSort === 'name' ? 'usage' : 'name')}
                className="label-micro text-accent border border-accent/20 px-2 py-1 hover:bg-accent/5"
              >
                SORT_{usageSort.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 border border-surface-high bg-surface-high">
          {/* Component Usage */}
          <div className="bg-[#0A0A0A] p-10 space-y-8 lg:col-span-2">
            <p className="label-micro opacity-40">Component_Frequency_Usage</p>
            <div className="h-[300px] w-full">
              {sortedUsage.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedUsage}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#4a5268" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      tick={{ fill: '#4a5268', fontFamily: 'JetBrains Mono' }}
                    />
                    <YAxis hide />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#141720] border border-white/10 p-3 shadow-2xl backdrop-blur-md">
                              <p className="label-micro text-accent mb-1 underline underline-offset-2">{data.category}</p>
                              <p className="font-mono text-xs text-white font-bold mb-2">{data.name}</p>
                              <div className="flex justify-between items-baseline gap-4 mt-2 pt-2 border-t border-white/5">
                                <span className="label-micro opacity-40 uppercase">Total_Usage</span>
                                <span className="font-mono text-xs text-accent">{data.usage.toLocaleString()}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                    />
                    <Bar dataKey="usage" fill="#ff4d00" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center border border-dashed border-surface-high/40">
                  <p className="label-micro opacity-40 uppercase tracking-[0.3em]">No_Component_Found</p>
                </div>
              )}
            </div>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-center">
              Interaction metrics aggregated across 12,402 sessions. Button components represent primary conversion vectors.
            </p>
          </div>

          {/* A/B Test Results Summary */}
          <div className="bg-[#0A0A0A] p-10 space-y-8">
            <p className="label-micro opacity-40">Active_A/B_Tests_Intelligence</p>
            {AB_TEST_HISTORY.filter(t => t.status === 'Active').map((test, i) => (
              <div key={i} className="space-y-6">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-mono text-[10px] text-white uppercase font-bold tracking-tight">{test.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="label-micro text-accent uppercase">Live_Node</span>
                  </div>
                </div>
                
                <div className="h-40 w-full border border-white/5 bg-white/[0.01] p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={test.data}>
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-[#141720] border border-white/10 p-3 shadow-2xl backdrop-blur-md">
                                <p className="label-micro text-white mb-2 underline underline-offset-2">{data.name}</p>
                                <div className="space-y-1.5">
                                  <div className="flex justify-between gap-4">
                                    <span className="label-micro opacity-40 uppercase">Conversion</span>
                                    <span className="font-mono text-[10px] text-accent">{data.convRate}%</span>
                                  </div>
                                  <div className="flex justify-between gap-4">
                                    <span className="label-micro opacity-40 uppercase">CTR</span>
                                    <span className="font-mono text-[10px] text-white">{data.ctr}%</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="convRate" name="Conversion" fill="#ff4d00" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="ctr" name="CTR" fill="#4a5268" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-between items-center px-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 bg-[#ff4d00]" />
                      <span className="label-micro text-[8px] opacity-40">CONV</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 bg-[#4a5268]" />
                      <span className="label-micro text-[8px] opacity-40">CTR</span>
                    </div>
                  </div>
                  <span className="label-micro text-[8px] opacity-20">VAR_A || VAR_B</span>
                </div>

                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="label-micro opacity-40 uppercase text-[8px]">Primary_Metric_Vector</p>
                      <p className="font-mono text-xs text-white">Conversion_Performance</p>
                   </div>
                   <div className="text-right">
                      <p className="label-micro opacity-40 uppercase text-[8px]">Trend_Delta</p>
                      <p className="font-mono text-xs text-success">STABLE</p>
                   </div>
                </div>
              </div>
            ))}
            {AB_TEST_HISTORY.filter(t => t.status === 'Active').length === 0 && (
              <div className="py-12 border border-dashed border-surface-high/40 flex items-center justify-center">
                <p className="label-micro opacity-20 uppercase tracking-[0.2em]">No_Active_Experiments</p>
              </div>
            )}
          </div>
        </div>

        {/* Interaction Heatmap */}
        <div className="bg-[#0A0A0A] border border-surface-high p-10">
          <div className="flex justify-between items-start mb-8">
            <p className="label-micro opacity-40">User_Interaction_Heatmap</p>
            <div className="flex gap-2">
              <div className="h-2 w-2 bg-accent" />
              <div className="h-2 w-2 bg-accent/60" />
              <div className="h-2 w-2 bg-accent/20" />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-1 h-32">
            {Array.from({ length: 48 }).map((_, i) => {
              const intensity = Math.random();
              return (
                <div 
                  key={i} 
                  className="w-full h-full" 
                  style={{ 
                    backgroundColor: intensity > 0.8 ? '#ff4d00' : intensity > 0.4 ? '#ff4d0066' : '#ffffff0c' 
                  }} 
                />
              );
            })}
          </div>
          <p className="mt-6 font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
            Concentrated interaction detected on primary navigation nodes. Peripheral areas showing sub-optimal engagement.
          </p>
        </div>
      </section>

      {/* A/B Experiment Archive */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-surface-high pb-4 gap-4">
          <h3 className="label-micro flex items-center gap-2">
            <Zap className="h-3 w-3 text-accent" />
            Experimental_Result_Archive
          </h3>
          <div className="flex items-center gap-4">
            <p className="label-micro opacity-20 uppercase tracking-widest mr-2">Filter_Status:</p>
            <div className="flex gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setTestStatusFilter(status)}
                  className={`label-micro px-3 py-1 border transition-all ${testStatusFilter === status ? 'bg-accent border-accent text-black' : 'border-surface-high text-white/40 hover:text-white'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-surface-high border border-surface-high">
          {filteredTests.map((test) => (
            <div key={test.id} className="bg-[#0A0A0A] p-8 flex flex-col justify-between space-y-8 group transition-all hover:bg-white/[0.02]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="label-micro text-accent font-bold">{test.id}</span>
                    <div className="flex items-center gap-1.5 opacity-40">
                      <Calendar className="h-2.5 w-2.5" />
                      <span className="label-micro lowercase">{test.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`h-1.5 w-1.5 rounded-full ${test.status === 'Archived' ? 'bg-success' : test.status === 'Active' ? 'bg-accent animate-pulse' : 'bg-gray-600'}`} />
                    <span className="label-micro opacity-40 uppercase">{test.status}</span>
                  </div>
                </div>
                <h4 className="font-serif italic text-2xl text-white mb-2">{test.name}</h4>
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">
                  {test.description}
                </p>
              </div>

              <div className="h-32 w-full border-y border-surface-high/20 py-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={test.data}>
                    <XAxis type="number" hide />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      hide 
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255, 77, 0, 0.05)' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const isWinner = data.name === test.winner;
                          return (
                            <div className="bg-[#141720] border border-white/10 p-3 shadow-2xl backdrop-blur-md">
                              <p className={`font-mono text-[10px] font-bold mb-2 uppercase ${isWinner ? 'text-accent' : 'text-white/60'}`}>
                                {data.name} {isWinner && ' (Winner)'}
                              </p>
                              <div className="space-y-1.5 pt-2 border-t border-white/5">
                                <div className="flex justify-between gap-6 whitespace-nowrap">
                                  <span className="label-micro opacity-40 uppercase">Distribution</span>
                                  <span className="font-mono text-[10px] text-white">{data.value}%</span>
                                </div>
                                <div className="flex justify-between gap-6 whitespace-nowrap">
                                  <span className="label-micro opacity-40 uppercase">Conv_Rate</span>
                                  <span className="font-mono text-[10px] text-white">{data.convRate}%</span>
                                </div>
                                <div className="flex justify-between gap-6 whitespace-nowrap">
                                  <span className="label-micro opacity-40 uppercase">CTR</span>
                                  <span className="font-mono text-[10px] text-white">{data.ctr}%</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[0, 2, 2, 0]}
                    >
                      {test.data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.name === test.winner ? '#ff4d00' : '#4a5268'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between label-micro opacity-40">
                  <span>Performance_Metrics</span>
                  <span>CONV / CTR</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {test.data.map((entry, idx) => (
                    <div key={idx} className={`p-3 border ${entry.name === test.winner ? 'border-accent/40 bg-accent/5' : 'border-surface-high/60 bg-white/[0.01]'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-mono text-[9px] uppercase font-bold ${entry.name === test.winner ? 'text-accent' : 'text-gray-400'}`}>
                          {entry.name}
                        </span>
                        {entry.name === test.winner && (
                          <span className="label-micro text-accent bg-accent/10 px-1">WINNER</span>
                        )}
                      </div>
                      <div className="flex justify-between font-mono text-[10px] text-white">
                        <div className="flex flex-col">
                          <span className="opacity-40 text-[8px] uppercase tracking-tighter mb-0.5">Conv_Rate</span>
                          <span>{entry.convRate}%</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="opacity-40 text-[8px] uppercase tracking-tighter mb-0.5">CTR_Vector</span>
                          <span>{entry.ctr}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end pt-4 border-t border-surface-high/20">
                <div>
                  <p className="label-micro opacity-40 mb-1">Winning_Variant</p>
                  <p className="font-mono text-xs text-white font-bold">{test.winner || 'TBD'}</p>
                </div>
                <div className="text-right">
                  <p className="label-micro opacity-40 mb-1">Performance_Lift</p>
                  <p className="font-mono text-xs text-accent">
                    {test.status === 'Archived' ? `+${Math.abs(test.data[0].value - test.data[1].value)}%` : 'PENDING'}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {filteredTests.length === 0 && (
            <div className="col-span-full bg-[#0A0A0A] p-20 flex items-center justify-center border border-dashed border-surface-high">
              <p className="label-micro opacity-40 uppercase tracking-[0.5em]">No_Matching_Experiments_Found</p>
            </div>
          )}
        </div>
      </section>

      {/* Prototyping Review */}
      <section className="bg-surface-lowest border border-surface-high p-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6 md:w-2/3">
                <p className="label-micro opacity-40 uppercase tracking-[0.3em]">AI_Design_Advisor_Output</p>
                <h4 className="font-serif italic text-3xl text-white leading-tight">
                    Current navigation density exceeds optimal cognitive load for mobile nodes. 
                </h4>
                <p className="font-mono text-[11px] leading-relaxed text-gray-500 uppercase tracking-widest">
                    Recommendation: Consolidate secondary triggers into an bottom-sheet interaction model. Target 0.8s exit velocity.
                </p>
            </div>
            <button className="btn-accent px-10 py-5 font-bold uppercase tracking-widest shrink-0">
                Refactor_Flow
            </button>
        </div>
      </section>
    </motion.div>
  );
};

