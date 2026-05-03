/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Archive, Target, ClipboardList, Clock, BarChart, Search, CheckCircle, GitBranch, ArrowRight } from 'lucide-react';

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

const SPRINTS = [
  { id: 'S_24', name: 'Sprint_Delta', progress: 64, status: 'Active', dependencies: [] },
  { id: 'S_25', name: 'Sprint_Epsilon', progress: 12, status: 'Planned', dependencies: ['S_24'] },
  { id: 'S_26', name: 'Sprint_Zeta', progress: 0, status: 'Backlog', dependencies: ['S_25'] },
];

export const Product: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 pb-20">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">
              Product<br/>Vision
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">Roadmap & Specifications // Series 04</div>
        </div>
      </section>

      {/* Feature Backlog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[300px]">
           <p className="label-micro text-accent mb-8">Current_Snapshot</p>
           <div className="flex items-center gap-10">
              <div className="relative h-32 w-32 flex items-center justify-center">
                 <svg className="h-full w-full -rotate-90">
                    <circle className="text-surface-high" cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="1" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 364.4 }}
                      animate={{ strokeDashoffset: 364.4 * (1 - 0.72) }}
                      className="text-accent" cx="64" cy="64" r="58" 
                      fill="transparent" stroke="currentColor" strokeWidth="2" strokeDasharray="364.4" 
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono text-3xl font-light text-white">72</span>
                    <span className="label-micro opacity-40">% Velocity</span>
                 </div>
              </div>
              <div className="space-y-4">
                 <div>
                    <h4 className="font-serif italic text-xl text-white">Product Market Fit</h4>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-accent mt-1">High Accuracy Index</p>
                 </div>
                 <button className="label-micro border-b border-accent pb-1 hover:brightness-110 transition-all uppercase">Analyze Engagement</button>
              </div>
           </div>
        </div>

        <div className="bg-[#0A0A0A] p-10 space-y-8">
            <p className="label-micro opacity-40">Project_Deliverables</p>
            <div className="space-y-6">
                {[
                    { label: 'Feature Spec Alpha', status: 'Approved' },
                    { label: 'Market Research Hub', status: 'In Review' },
                    { label: 'Q3 Roadmap Blueprint', status: 'Pending' },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-surface-high pb-4">
                        <span className="font-mono text-[11px] text-white uppercase tracking-widest">{item.label}</span>
                        <span className="label-micro text-accent">{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Dependency Matrix */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
            <h3 className="label-micro opacity-40">Dependency_Architecture</h3>
            <span className="label-micro text-accent">Order_of_Operations: SECURED</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-surface-high border border-surface-high">
            {SPRINTS.map((sprint, i) => (
                <div key={sprint.id} className="bg-[#0A0A0A] p-8 space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="h-8 w-8 rounded-full border border-surface-high flex items-center justify-center font-mono text-[10px] text-gray-500">
                            0{i+1}
                        </div>
                        {i < SPRINTS.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-accent animate-pulse" />
                        )}
                    </div>
                    <div>
                        <p className="label-micro text-accent mb-1">{sprint.id}</p>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">{sprint.name}</h4>
                    </div>
                    <div className="space-y-2">
                        <p className="label-micro opacity-30 text-[8px]">Requirement_Logic</p>
                        <div className="flex flex-wrap gap-2">
                            {sprint.dependencies.length > 0 ? (
                                sprint.dependencies.map(dep => (
                                    <span key={dep} className="px-2 py-0.5 border border-accent/30 text-accent font-mono text-[9px] uppercase">
                                        PREREQ: {dep}
                                    </span>
                                ))
                            ) : (
                                <span className="px-2 py-0.5 border border-success/30 text-success font-mono text-[9px] uppercase">
                                    ROOT_TASK
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Sprints & Tracking */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Active_Milestones</h3>
        <div className="border border-surface-high divide-y divide-surface-high">
          {SPRINTS.map((sprint) => (
            <div key={sprint.id} className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all group">
              <div className="md:w-1/4">
                 <div className="flex items-center gap-3 mb-1">
                    <p className="label-micro opacity-40">{sprint.id}</p>
                    {sprint.dependencies.length > 0 && <GitBranch className="h-3 w-3 text-accent" />}
                 </div>
                 <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">{sprint.name}</h4>
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-center mb-2 label-micro">
                    <span className="opacity-40">Completion</span>
                    <span className="text-accent">{sprint.progress}%</span>
                 </div>
                 <div className="h-[2px] w-full bg-surface-high relative">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${sprint.progress}%` }}
                        className="h-full bg-accent"
                    />
                 </div>
                 {sprint.dependencies.length > 0 && (
                    <div className="mt-4 flex gap-4">
                        <p className="label-micro opacity-40 text-[9px]">Blocked_By:</p>
                        <div className="flex gap-2">
                            {sprint.dependencies.map(dep => (
                                <span key={dep} className="font-mono text-[9px] text-accent uppercase tracking-tighter">
                                    [{dep}]
                                </span>
                            ))}
                        </div>
                    </div>
                 )}
              </div>
              <div className="md:w-1/4 flex items-center justify-end">
                 <button className="label-micro border border-surface-high py-2 px-6 uppercase opacity-40 group-hover:opacity-100 group-hover:border-accent transition-all">Track</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
