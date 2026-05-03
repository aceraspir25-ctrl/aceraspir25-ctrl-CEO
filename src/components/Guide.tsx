/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  CheckSquare, 
  Clock,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MODULES = [
  {
    id: 'M1',
    title: 'CMA PART 1: Financial Planning',
    progress: 75,
    status: 'In Progress',
    deadline: 'May 12'
  },
  {
    id: 'M2',
    title: 'BharatPath Infra Arch',
    progress: 100,
    status: 'Completed',
    deadline: 'April 20'
  },
  {
    id: 'M3',
    title: 'JMA Supply Chain logic',
    progress: 32,
    status: 'Started',
    deadline: 'June 05'
  }
];

const SCHEDULE = [
  { time: '07:00', task: 'CMA Prep: Cost Management', duration: '2h' },
  { time: '09:30', task: 'Dev: JMA Inventory Sync Logic', duration: '3h' },
  { time: '14:00', task: 'BharatPath Node Maintenance', duration: '1.5h' },
  { time: '16:00', task: 'CMA Mock Test: Section B', duration: '2h' }
];

export const Guide: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 pb-20">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">
              Study<br/>Arc
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">Academy Protocol // Series 04</div>
        </div>
      </section>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[300px]">
          <p className="label-micro text-accent mb-8">Certification_Status</p>
          <div className="flex items-center gap-10">
             <div className="relative h-32 w-32 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90">
                  <circle className="text-surface-high" cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="1" />
                  <motion.circle 
                    initial={{ strokeDashoffset: 364.4 }}
                    animate={{ strokeDashoffset: 364.4 * (1 - 0.62) }}
                    className="text-accent" cx="64" cy="64" r="58" 
                    fill="transparent" stroke="currentColor" strokeWidth="2" strokeDasharray="364.4" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-3xl font-light text-white">62</span>
                  <span className="label-micro opacity-40">%</span>
                </div>
             </div>
             <div>
                <h4 className="font-serif italic text-xl text-white mb-2">CMA Certification</h4>
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Tier: Financial Specialist</p>
                <button className="mt-6 label-micro border-b border-accent pb-1 hover:brightness-110 transition-all">Review Balance Analysis</button>
             </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-around">
           <div className="flex justify-between items-center border-b border-surface-high/20 pb-6">
              <div className="flex gap-4 items-center">
                 <Award className="h-5 w-5 text-accent" />
                 <span className="label-micro">Total_Badges</span>
              </div>
              <span className="font-mono text-4xl text-white">14</span>
           </div>
           <div className="flex justify-between items-center pt-6">
              <div className="flex gap-4 items-center">
                 <GraduationCap className="h-5 w-5 text-accent" />
                 <span className="label-micro">Mentorship_Hours</span>
              </div>
              <span className="font-mono text-4xl text-white">320</span>
           </div>
        </div>
      </div>

      {/* Modules List */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Active_Curriculum</h3>
        <div className="border border-surface-high divide-y divide-surface-high">
          {MODULES.map((module) => (
            <div key={module.id} className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all group cursor-pointer">
              <div className="md:w-1/4">
                 <p className="label-micro mb-1 opacity-40">{module.id}</p>
                 <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">{module.title}</h4>
              </div>
              <div className="flex-1">
                 <div className="flex items-center justify-between mb-2">
                    <span className="label-micro">Progress</span>
                    <span className="font-mono text-[10px] text-gray-600">{module.progress}%</span>
                 </div>
                 <div className="h-[1px] w-full bg-surface-high">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${module.progress}%` }}
                      className="h-full bg-accent"
                    />
                 </div>
              </div>
              <div className="md:w-1/4 flex items-end justify-between">
                 <div>
                    <p className="label-micro opacity-40 mb-1">Due</p>
                    <p className="font-mono text-[10px] text-white uppercase">{module.deadline}</p>
                 </div>
                 <ChevronRight className="h-4 w-4 text-gray-700 group-hover:text-accent transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Study Schedule */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Daily_Manifesto</h3>
        <div className="bg-surface-lowest border border-surface-high p-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {SCHEDULE.map((item, i) => (
                <div key={i} className="flex gap-8 items-start border-b border-surface-high/20 pb-6 last:border-0 last:pb-0">
                  <span className="font-mono text-xs text-accent shrink-0">{item.time}</span>
                  <div>
                    <h5 className="font-mono text-[11px] font-bold text-white uppercase tracking-[0.1em]">{item.task}</h5>
                    <div className="flex items-center gap-4 mt-2 opacity-40">
                      <Clock className="h-3 w-3" />
                      <span className="label-micro">{item.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </motion.div>
  );
};
