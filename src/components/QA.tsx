/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Bug, ShieldCheck, Timer, AlertOctagon, Terminal, Play, Wrench, CheckCircle2, XCircle } from 'lucide-react';

const REGRESSION_DATA = [
  { module: 'CORE_ENGINE_v4', status: 'PASS', time: '12:04:01', color: 'text-neon-green' },
  { module: 'API_GATEWAY', status: 'FAIL', time: '11:58:22', color: 'text-error' },
  { module: 'DATA_SHARD_01', status: 'PASS', time: '11:45:09', color: 'text-neon-green' },
];

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

export const QA: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col gap-4 border-l border-accent pl-8 py-2">
        <h2 className="text-[80px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">Integrity</h2>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 bg-accent" />
          <span className="label-micro opacity-40">Series_Manifesto // QA_01</span>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-center items-center h-full min-h-[300px]">
          <p className="label-micro mb-8 self-start">Test_Coverage</p>
          <div className="relative h-48 w-48 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90 overflow-visible">
              <circle className="text-surface-high" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="1" />
              <motion.circle 
                initial={{ strokeDashoffset: 502.6 }}
                animate={{ strokeDashoffset: 502.6 * (1 - 0.88) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="text-accent" 
                cx="96" cy="96" fill="transparent" r="80" 
                stroke="currentColor" strokeWidth="2" strokeDasharray="502.6" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-5xl font-light text-white tracking-tighter">88</span>
              <span className="label-micro opacity-40">%</span>
            </div>
          </div>
          <p className="mt-8 label-micro text-accent tracking-[0.4em]">+2.4% Momentum</p>
        </div>

        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
          <div>
            <p className="label-micro mb-6">Critical_Blockers</p>
            <div className="space-y-2">
              <span className="font-serif italic text-8xl text-white">03</span>
              <div className="h-1 w-24 bg-accent mt-4"></div>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase font-bold text-gray-400 tracking-wider">Active system constraints identified in Cluster_04</p>
          </div>
          <div className="mt-12 h-[1px] w-full bg-surface-high relative">
            <div className="h-full bg-accent" style={{ width: '75%' }} />
          </div>
        </div>
      </div>

      {/* Critical Log */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">System_Vulnerabilities</h3>
        <div className="divide-y divide-surface-high border border-surface-high">
          <motion.div variants={itemVariants} className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all">
            <div className="md:w-1/3">
              <span className="label-micro text-error mb-4 block">Blocker_01</span>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">NULL_POINTER: AUTH_PROVIDER</h4>
              <p className="font-mono text-[9px] text-gray-600 mt-2">ID: EX-7221 // 12:44:09</p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-serif italic text-gray-500 leading-relaxed">
                Unhandled race condition in JWT signature verification during high-concurrency login bursts. Memory address 0x4F2A fails to initialize properly in the primary stack.
              </p>
            </div>
            <div className="md:w-1/4 flex items-end">
              <button className="btn-accent w-full text-center">Patch</button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all opacity-60">
            <div className="md:w-1/3">
              <span className="label-micro mb-4 block">Warning_02</span>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">LATENCY_SPIKE: DATABASE</h4>
              <p className="font-mono text-[9px] text-gray-600 mt-2">ID: EX-4411 // 11:32:00</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed uppercase tracking-tighter">
                Sequence scan occurring on 'user_sessions' table. Performance degradation measured at &gt; 400ms across all regional endpoints.
              </p>
            </div>
            <div className="md:w-1/4 flex items-end">
              <button className="py-2 border border-surface-high label-micro w-full hover:bg-surface-high transition-all">Debug</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="space-y-6 pb-12">
        <h3 className="label-micro opacity-40">Regression_Archive</h3>
        <div className="border border-surface-high">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-high">
                <th className="px-8 py-4 label-micro opacity-20">Module</th>
                <th className="px-8 py-4 label-micro opacity-20 text-center">State</th>
                <th className="px-8 py-4 label-micro opacity-20 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-high font-mono text-[10px]">
              {REGRESSION_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-all">
                  <td className="px-8 py-6 text-white uppercase tracking-tight">{row.module}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-2 py-1 border ${row.status === 'PASS' ? 'border-success/30 text-success' : 'border-error/30 text-error'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right text-gray-600">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
};
