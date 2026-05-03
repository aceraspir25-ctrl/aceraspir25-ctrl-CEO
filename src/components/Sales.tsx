/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Target, TrendingUp, BarChart3, Globe, Zap, Users } from 'lucide-react';

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
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const Sales: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 pb-20">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">
              Growth<br/>Engine
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">Sales & Marketing // Series 04</div>
        </div>
      </section>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[350px]">
           <div>
              <p className="label-micro mb-0.5">Annual_Recurring_Revenue</p>
              <h3 className="font-serif italic text-7xl text-white mt-4">$1.4M</h3>
              <p className="label-micro text-accent mt-4">+18.4% WoW Momentum</p>
           </div>
           <div className="mt-12 h-20 flex items-end gap-1">
              {[20, 35, 25, 45, 60, 50, 75, 80, 95].map((h, i) => (
                <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className={`flex-1 ${i === 8 ? 'bg-accent' : 'bg-surface-high'}`}
                />
              ))}
           </div>
        </div>

        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
            <p className="label-micro mb-8">Active_Funnel</p>
            <div className="space-y-8">
                {[
                    { label: 'Leads', val: '4,204', sub: 'New_Inbound', color: 'bg-accent' },
                    { label: 'Marketing_SQLs', val: '1,120', sub: 'Converted', color: 'bg-white' },
                    { label: 'Opportunties', val: '240', sub: 'In_Negotiation', color: 'bg-accent/40' },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-surface-high pb-4">
                        <div>
                            <p className="label-micro opacity-40 mb-1">{item.label}</p>
                            <p className="font-mono text-2xl text-white">{item.val}</p>
                        </div>
                        <p className="label-micro text-accent">{item.sub}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Research & Attribution */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-1 border border-surface-high bg-surface-high">
          <div className="bg-[#0A0A0A] p-8 space-y-4">
              <Globe className="h-5 w-5 text-accent" />
              <p className="label-micro">Market_Penetration</p>
              <p className="font-mono text-xl text-white uppercase">Global_Active</p>
          </div>
          <div className="bg-[#0A0A0A] p-8 space-y-4">
              <Zap className="h-5 w-5 text-accent" />
              <p className="label-micro">Campaign_Efficacy</p>
              <p className="font-mono text-xl text-white uppercase">92% ROI</p>
          </div>
          <div className="bg-[#0A0A0A] p-8 space-y-4">
              <Users className="h-5 w-5 text-accent" />
              <p className="label-micro">Viral_Coefficient</p>
              <p className="font-mono text-xl text-white uppercase">1.42 K-Factor</p>
          </div>
      </section>

      {/* Marketing Campaigns */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Campaign_Archive</h3>
        <div className="border border-surface-high divide-y divide-surface-high">
          {[
              { id: 'C_01', name: 'Neural Launch 2024', budget: '$120K', status: 'Active', reach: '1.2M' },
              { id: 'C_02', name: 'Dev-First Inbound', budget: '$45K', status: 'Scaling', reach: '340K' },
              { id: 'C_03', name: 'Enterprise Retention', budget: '$80K', status: 'Optimal', reach: '50K' },
          ].map((camp) => (
            <div key={camp.id} className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all">
              <div className="md:w-1/4">
                 <p className="label-micro mb-1 opacity-40">{camp.id}</p>
                 <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">{camp.name}</h4>
              </div>
              <div className="flex-1">
                 <p className="label-micro uppercase tracking-widest text-gray-500">Reach: {camp.reach} // Budget: {camp.budget}</p>
              </div>
              <div className="md:w-1/4 flex items-center justify-end">
                 <span className={`label-micro px-3 py-1 border border-accent text-accent font-bold`}>
                    {camp.status}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
