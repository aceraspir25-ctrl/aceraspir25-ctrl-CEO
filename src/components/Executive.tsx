/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, CheckCircle2, Info, BrainCircuit, Rocket, FileText, ChevronRight, AlertTriangle } from 'lucide-react';
import { PROJECTS } from '../projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

export const Executive: React.FC = () => {
  const averageProgress = Math.round(PROJECTS.reduce((acc, p) => acc + p.progress, 0) / PROJECTS.length);
  const criticalIssue = PROJECTS.find(p => p.status === 'CRITICAL') || PROJECTS.find(p => p.status === 'WARNING');

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 pb-24">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white">
              Strategic<br/>Vectors
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">System Analysis // {new Date().toLocaleDateString()}</div>
        </div>
      </section>

      {/* Critical Alert Banner if any */}
      {criticalIssue && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 border border-accent p-6 flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center bg-accent/20">
              <AlertTriangle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="label-micro text-accent font-bold uppercase tracking-widest">[ALERT] {criticalIssue.name} Required_Action</p>
              <p className="font-mono text-xs text-white mt-1 uppercase">Potential latency issues detected in deployment layer. Manual override recommended.</p>
            </div>
          </div>
          <button className="btn-accent px-8 py-3 text-[10px]">Execute_Solution</button>
        </motion.div>
      )}

      {/* Project Health large stat */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-center items-center gap-8 min-h-[400px]">
          <p className="label-micro self-start">Corporate_Project_Health</p>
          <div className="relative h-64 w-64 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90 overflow-visible">
              <circle className="text-surface-high" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="1" />
              <motion.circle 
                initial={{ strokeDashoffset: 691.1 }}
                animate={{ strokeDashoffset: 691.1 * (1 - averageProgress/100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="text-accent" 
                cx="128" cy="128" fill="transparent" r="110" 
                stroke="currentColor" strokeWidth="3" strokeDasharray="691.1" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif italic text-8xl text-white">{averageProgress}</span>
              <span className="label-micro opacity-40">% AGGREGATE</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
          <div className="space-y-12">
             <div className="flex items-center gap-6">
                <TrendingUp className="h-6 w-6 text-accent" />
                <div>
                   <p className="label-micro">Priorities_24h</p>
                   <p className="font-mono text-xl text-white uppercase font-bold">BharatPath Market Sync</p>
                </div>
             </div>
             <div className="space-y-4">
                <p className="label-micro opacity-40">Next_Critical_Milestone</p>
                <div className="p-8 border border-white/10 bg-white/5 transition-all hover:bg-white/[0.08] group cursor-pointer">
                   <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-2">JMA_Grease_Hub // Infrastructure Remediation</h4>
                   <p className="label-micro opacity-40 uppercase mt-4">Required by: devops_lead</p>
                   <div className="mt-6 flex gap-1">
                      <button className="flex-1 btn-accent py-4">Sync_Deployment</button>
                      <button className="flex-1 py-4 label-micro border border-surface-high hover:bg-white/5 transition-all">Audit_Logs</button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Roadmap section */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Portfolio_Monograph</h3>
        <div className="border border-surface-high divide-y divide-surface-high">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all">
              <div className="md:w-1/4">
                 <p className="label-micro mb-1">{project.priority}_PRIORITY</p>
                 <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">{project.name}</h4>
              </div>
              <div className="flex-1">
                 <div className="flex flex-wrap gap-2 mb-4">
                    {project.roadmap.map((step, si) => (
                      <span key={si} className="text-[9px] font-mono border border-white/10 px-2 py-1 text-gray-500 uppercase">{step}</span>
                    ))}
                 </div>
                 <div className="grid grid-cols-3 gap-6">
                    {project.metrics.map((m, mi) => (
                      <div key={mi}>
                        <p className="label-micro opacity-20 text-[8px]">{m.label}</p>
                        <p className={`font-mono text-[10px] ${m.value.includes('FAILED') ? 'text-accent' : 'text-white'}`}>{m.value}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="md:w-1/4 flex flex-col items-end justify-between">
                <span className={`label-micro px-3 py-1 border ${project.status === 'STABLE' ? 'border-success/30 text-success' : 'border-accent/30 text-accent animate-pulse'}`}>
                  {project.status}
                </span>
                <div className="mt-4 w-full bg-white/5 h-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    className={`h-full ${project.status === 'STABLE' ? 'bg-success' : 'bg-accent'}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Bottom Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-t border-surface-high bg-surface-high pb-20">
         <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
            <div>
              <p className="label-micro mb-0.5">ROI_Vectors</p>
              <h3 className="font-serif italic text-6xl text-white mt-4">$1.2M</h3>
              <p className="label-micro text-accent mt-4">Monthly Efficiency Savings</p>
            </div>
         </div>
         <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
            <div>
               <p className="label-micro mb-4">AI_Strategic_Insights</p>
               <p className="text-[11px] text-gray-500 uppercase leading-loose max-w-sm">
                  Autonomous pod rescheduling reduced wasted compute cycles by <span className="text-white">18%</span>. Predictive scaling prevented <span className="text-white">99.9%</span> of potential latency spikes.
               </p>
            </div>
            <button className="btn-accent self-start mt-10">Confirm Strategy</button>
         </div>
      </div>
    </motion.div>
  );
};
