/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BarChart2, Bolt, Scale, Clock, AlertCircle } from 'lucide-react';
import { Operator } from '../types';

const OPERATORS: Operator[] = [
  {
    id: '1',
    name: 'OPERATOR_01 (LEAD)',
    role: 'Lead Engineer',
    load: 72,
    task: 'RE_ARCH_ENGINE_v2',
    prediction: 'COMPLETION: 14:00 GMT',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDJyxpd_YAyw80_zMl8a3jaRKUwUJTrJIA1b_qc39fvA7cRfMO7EGoSItd3T-nSEDAWAZZF80wNoq3nNA94ZaFbgTdd-eXyykCfLHc5OGC_uDxgcjKHpfnxSTBhMdZjcgJL-ZLXTwXpQXZdAMBbGhJEiwP0rAiyzQBVC815xvKOOPK-y10tzpNOzBS02MvLPqiSzi316wTNAkoUmmtXTO5DL2mY2aK0eSA5x3hO09mfyTDXQgnK5a0e7M_4iAsm1kwyUaD9kgStCo',
  },
  {
    id: '2',
    name: 'OPERATOR_02 (SRE)',
    role: 'SRE Specialist',
    load: 98,
    task: 'UI_FLUID_GRID_FIX',
    prediction: 'DELAYED: +2.5H',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChBwVVQw6xt4E1AEoi3_9WEkQSeI0aJR55GgE2sSyavDBijwknOksZgDV_1mkMfp3QwazQ4TwuQ7oT5BehVQsh6wlqdY_a0h8gQgC7jDZcqAGt4occETC0jUXHOLWQD9QPpVEm2JHtXdyN6t31wbtukooF6ldOJBjZrfWEU3Keu7IcXcf-bIG8ZO18jYF7iQhS3VdtL1s5y5g_yqy18qfjyORMZJfXNSVCuJYIxUMFBrAkzVTzrtap5ldf6cchPT2Me5PhHhMsBFQ',
  },
  {
    id: '3',
    name: 'OPERATOR_03 (QA)',
    role: 'QA Automation',
    load: 45,
    task: 'REGRESSION_STRESS_T',
    prediction: 'COMPLETION: 11:30 GMT',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL4zgj1_ueVcy1EUXtMMt_JhVDqZyl93xLA0gBE2ggPXqervpJQlLs-uRRiJNI_wXCIQFat1wwLsW2X7n0fEJgwVlUngvEBA0_7v1ALUp34tXl9kZk2Tkcd8baBGci8nIA7wlt4AUUghXkpYtr45j6K1_mYcgAj5_c4NhO6TlxFDk_ESTqPpX-xI4rzwtQDh0PXtqiMzPFKycW7lBVcOOlTnkylFa0153QcK1KbIh0q2-ZegigSKjQB2wh9JJ9XM_AhbzfkDfr3ag',
  },
];

const VELOCITY_DATA = [40, 55, 45, 70, 60, 85, 95, 75];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const Workload: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col gap-4 border-l border-accent pl-8 py-2">
        <h2 className="text-[80px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">Cycles</h2>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 bg-accent" />
          <span className="label-micro opacity-40">Series // Sprint_Archive // Active</span>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        {/* Momentum Chart */}
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[400px]">
          <div>
            <p className="label-micro mb-2">Sprint_Velocity</p>
            <p className="font-mono text-4xl text-white">84.2 <span className="text-xs text-gray-600">PTS</span></p>
          </div>
          <div className="flex h-48 items-end gap-1 overflow-hidden">
            {VELOCITY_DATA.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className={`flex-1 transition-all duration-500 ${
                  i === 6 ? 'bg-accent' : 'bg-surface-high hover:bg-accent/40'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between pt-6 label-micro opacity-20">
            <span>01.OCT</span>
            <span>15.OCT</span>
          </div>
        </div>

        {/* Balancing Control */}
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
           <div>
              <p className="label-micro mb-0.5">Manifest_04</p>
              <h3 className="font-serif italic text-4xl text-white mt-4">Resourcing</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mt-6 uppercase tracking-widest opacity-40">
                Autonomous balancing protocols active across all regional compute clusters. Optimal efficiency maintained via local resourcing.
              </p>
           </div>
           <div className="mt-12 flex items-center justify-between border-t border-surface-high pt-8">
              <span className="label-micro text-accent">Auto_Sync_Locked</span>
              <div className="h-6 w-12 border border-accent bg-accent/10 relative p-1 cursor-pointer">
                 <div className="absolute right-1 top-1 bottom-1 w-4 bg-accent" />
              </div>
           </div>
        </div>
      </div>

      {/* Operator List */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Active_Operators</h3>
        <div className="divide-y divide-surface-high border border-surface-high">
          {OPERATORS.map((op) => (
            <motion.div 
              key={op.id}
              variants={itemVariants}
              className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all group"
            >
              <div className="md:w-1/4 flex gap-6 items-center">
                <div className="h-16 w-12 border border-surface-high p-1 shrink-0 grayscale hover:grayscale-0 transition-all">
                  <img src={op.image} alt={op.name} className="h-full w-full object-cover" />
                </div>
                <div>
                   <p className="label-micro text-white mb-1">{op.name.split(' ')[0]}</p>
                   <p className="font-mono text-[9px] uppercase text-gray-600 font-bold">{op.role}</p>
                </div>
              </div>

              <div className="flex-1">
                <p className="label-micro opacity-20 mb-2">Current_Assignment</p>
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">{op.task}</h4>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-[2px] flex-1 bg-surface-high relative">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${op.load}%` }}
                        className={`h-full ${op.load > 90 ? 'bg-error' : op.load > 70 ? 'bg-accent' : 'bg-success'}`}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-gray-500">{op.load}% Load</span>
                </div>
              </div>

              <div className="md:w-1/4 flex flex-col justify-between items-end">
                 <p className={`font-mono text-[10px] font-bold ${op.load > 90 ? 'text-error' : 'text-success'}`}>
                    {op.prediction}
                 </p>
                 <button className="label-micro border-b border-white/10 hover:border-accent transition-colors pb-1">Manifest</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
