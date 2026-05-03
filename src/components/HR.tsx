/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Heart, MessageSquare, ShieldAlert, CheckCircle2, MoreVertical } from 'lucide-react';

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

export const HR: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">
              Staff<br/>Matrix
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">Personnel Management // Series 04</div>
        </div>
      </section>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <p className="label-micro">Total_Headcount</p>
                <Users className="h-4 w-4 text-accent" />
            </div>
            <div className="mt-12">
                <span className="font-mono text-7xl font-light text-white tracking-tighter">42</span>
                <p className="label-micro text-accent mt-4">Growth: +12% since Q1</p>
            </div>
        </div>
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
            <p className="label-micro mb-8">Role_Distribution</p>
            <div className="space-y-6">
                {[
                    { label: 'Engineering', count: 18, color: 'bg-accent' },
                    { label: 'Product/PM', count: 8, color: 'bg-accent/60' },
                    { label: 'Growth/Sales', count: 10, color: 'bg-accent/40' },
                    { label: 'Design', count: 6, color: 'bg-accent/20' },
                ].map((item, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between label-micro opacity-40">
                            <span>{item.label}</span>
                            <span>{item.count}</span>
                        </div>
                        <div className="h-[1px] w-full bg-surface-high">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.count / 42) * 100}%` }}
                                className={`h-full ${item.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Staff Activity */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Daily_Operations_Log</h3>
        <div className="border border-surface-high divide-y divide-surface-high">
          {[
              { id: '01', name: 'Shashank M', role: 'CEO', status: 'Optimal', task: 'Priority Sync' },
              { id: '02', name: 'Alex K', role: 'Lead Architect', status: 'High Load', task: 'Cluster Expansion' },
              { id: '03', name: 'Sarah L', role: 'PM Lead', status: 'Optimal', task: 'UX Blueprint Review' },
          ].map((staff) => (
            <div key={staff.id} className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all group">
              <div className="md:w-1/4">
                 <p className="label-micro mb-1 opacity-40">ID_{staff.id}</p>
                 <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">{staff.name}</h4>
              </div>
              <div className="flex-1">
                 <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{staff.role} // {staff.task}</p>
              </div>
              <div className="md:w-1/4 flex items-center justify-between">
                 <span className={`label-micro px-2 py-1 border ${staff.status === 'High Load' ? 'border-accent text-accent' : 'border-success/30 text-success'}`}>
                    {staff.status}
                 </span>
                 <MoreVertical className="h-4 w-4 text-gray-700 opacity-0 group-hover:opacity-100 transition-all cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring & Discipline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border border-surface-high bg-surface-high">
          <div className="bg-[#0A0A0A] p-10 space-y-6">
              <div className="flex items-center gap-4">
                  <UserPlus className="h-5 w-5 text-accent" />
                  <h3 className="label-micro">Active_Recruitment</h3>
              </div>
              <div className="space-y-4">
                  <div className="p-6 border border-surface-high hover:bg-white/5 cursor-pointer transition-all">
                      <p className="label-micro mb-2">Eng_Lead_Computer_Scientist</p>
                      <p className="font-serif italic text-xl text-white">Neural Pathway Engineer</p>
                  </div>
                  <div className="p-6 border border-surface-high hover:bg-white/5 cursor-pointer transition-all">
                      <p className="label-micro mb-2">Growth</p>
                      <p className="font-serif italic text-xl text-white">App Marketing Specialist</p>
                  </div>
              </div>
          </div>
          <div className="bg-[#0A0A0A] p-10 space-y-6 border-l border-surface-high">
              <div className="flex items-center gap-4">
                  <ShieldAlert className="h-5 w-5 text-accent" />
                  <h3 className="label-micro">Compliance_&_Discipline</h3>
              </div>
              <div className="p-8 bg-error/5 border border-error/20 flex flex-col justify-center items-center gap-4">
                  <p className="label-micro text-error uppercase font-bold">Anomalies_Detected</p>
                  <p className="font-serif italic text-2xl text-white">0 Issues</p>
                  <p className="text-sm text-gray-600 text-center uppercase tracking-tighter">System behavior within nominal parameters for all regional staff nodes.</p>
              </div>
          </div>
      </div>
    </motion.div>
  );
};
