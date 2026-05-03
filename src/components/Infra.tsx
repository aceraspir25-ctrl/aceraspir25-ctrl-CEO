/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, CheckCircle2, XCircle, ShieldAlert, Plus, BarChart3, Database, History } from 'lucide-react';
import { Pipeline } from '../types';

const PIPELINES: Pipeline[] = [
  { id: '1', name: 'PROD_CORE_API', source: 'GITHUB_ACTION #4922', status: 'BUILDING', time: 'LIVE' },
  { id: '2', name: 'AUTH_GATEWAY', source: 'VERCEL_DEPLOY 2m ago', status: 'SUCCESS', time: '14:20' },
  { id: '3', name: 'DATA_SCRAPER_V3', source: 'CRITICAL_EXCEPTION', status: 'FAILED', time: '14:15' },
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

export const Infra: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Live Pipelines */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-surface-high pb-4 px-2">
          <h2 className="label-micro">Live Pipelines</h2>
          <span className="font-mono text-[10px] font-bold text-accent animate-pulse px-2">SYNC_ACTIVE</span>
        </div>
        <div className="divide-y divide-surface-high border border-surface-high">
          {PIPELINES.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              className={`flex items-center justify-between p-6 transition-all hover:bg-white/5 ${
                p.status === 'FAILED' ? 'bg-error/5' : ''
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="relative">
                  {p.status === 'BUILDING' && <RefreshCw className="h-4 w-4 animate-spin text-accent" />}
                  {p.status === 'SUCCESS' && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {p.status === 'FAILED' && <XCircle className="h-4 w-4 text-error" />}
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-white uppercase tracking-tight">{p.name}</p>
                  <p className="label-micro mt-1 opacity-40">{p.source} // {p.time}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`label-micro px-2 py-1 border ${
                  p.status === 'BUILDING' ? 'border-accent text-accent bg-accent/5' : 
                  p.status === 'SUCCESS' ? 'border-success/40 text-success bg-success/5' : 
                  'border-error/40 text-error bg-error/5'
                }`}>
                  {p.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Server Fleet grid */}
      <section className="space-y-6">
        <h2 className="label-micro px-2">Server Fleet Status</h2>
        <motion.div variants={itemVariants} className="p-8 border border-surface-high bg-surface-low/30 relative">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
            {Array.from({ length: 24 }).map((_, i) => {
              const status = i === 2 ? 'DOWN' : i === 15 ? 'WARM' : 'UP';
              return (
                <div 
                  key={i} 
                  className={`aspect-square border transition-all duration-500 ${
                    status === 'UP' ? 'border-success/10 bg-success/[0.02] hover:bg-success/10' :
                    status === 'DOWN' ? 'border-error bg-error/20 flex items-center justify-center' :
                    'border-accent/10 bg-accent/[0.02]'
                  }`}
                >
                  {status === 'DOWN' && <div className="w-1.5 h-1.5 bg-error" />}
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-surface-high pt-6 font-mono text-[9px] uppercase tracking-[0.2em] opacity-40">
            <div className="flex gap-6">
              <span className="flex items-center gap-2"><div className="h-1 w-1 bg-success" /> 22 UP</span>
              <span className="flex items-center gap-2"><div className="h-1 w-1 bg-error" /> 1 DOWN</span>
              <span className="flex items-center gap-2"><div className="h-1 w-1 bg-surface-highest" /> 1 STBY</span>
            </div>
            <span>Region: US-EAST-1 // Cluster: GAMMA-9</span>
          </div>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 gap-1 bg-surface-high border border-surface-high lg:grid-cols-2">
        {/* Latency Monitor */}
        <section className="bg-[#0A0A0A] p-8 space-y-6">
          <h2 className="label-micro">Database Latency (P95)</h2>
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-5xl font-light text-white tracking-tighter">24.8</span>
              <span className="font-mono text-sm text-gray-600">ms</span>
            </div>
            <div className="flex h-12 items-end gap-1">
              {[4, 6, 5, 8, 9, 6, 7, 5, 10].map((h, i) => (
                <div key={i} className={`w-1 ${i === 8 ? 'bg-accent' : 'bg-surface-high'}`} style={{ height: `${h * 10}%` }} />
              ))}
            </div>
          </div>
          <div className="h-[2px] w-full bg-surface-high">
            <motion.div 
              animate={{ x: ['-10%', '110%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="h-full w-20 bg-accent shadow-[0_0_10px_#FF4D00]" 
            />
          </div>
        </section>

        {/* Override Control */}
        <section className="bg-[#0A0A0A] p-8 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 border border-accent/20 bg-accent/5">
              <ShieldAlert className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-mono text-[10px] font-bold text-white uppercase tracking-widest px-2">Manual_Override</h3>
              <p className="label-micro opacity-40 px-2 mt-1">Bypass_Autoscale_Logic</p>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="relative h-6 w-12 cursor-pointer border border-surface-high bg-surface-low transition-colors hover:bg-surface-high">
              <div className="absolute left-1 top-1 h-3.5 w-3.5 bg-gray-600 transition-all" />
            </div>
          </div>
        </section>
      </div>

      {/* Rollback history */}
      <section className="space-y-6">
        <h2 className="label-micro px-2">History // Series_Archive</h2>
        <motion.div variants={itemVariants} className="bg-surface-lowest border border-surface-high p-8">
          <div className="font-mono text-[10px] space-y-3 leading-relaxed opacity-60">
            <div className="flex gap-6 border-b border-surface-high/20 pb-2">
              <span className="text-accent/60 shrink-0">14:02:11</span>
              <span>INIT_ROLLBACK: commit_72a1s</span>
              <span className="ml-auto opacity-20">AUTH_GATEWAY</span>
            </div>
            <div className="flex gap-6 border-b border-surface-high/20 pb-2">
              <span className="text-accent/60 shrink-0">14:02:15</span>
              <span>RESTORE_DB_STATE: stable_v1.4.2</span>
              <span className="ml-auto opacity-20">DB_CLUSTER_01</span>
            </div>
            <div className="flex gap-6 border-b border-surface-high/20 pb-2">
              <span className="text-error/60 shrink-0">13:45:00</span>
              <span className="text-error/80 uppercase">ALERT: Memory Leak detected (pod_01)</span>
              <span className="ml-auto opacity-20">CRITICAL</span>
            </div>
            <div className="flex gap-6">
              <span className="text-gray-700 shrink-0">13:40:22</span>
              <span className="italic opacity-30">SYSTEM_CHECK: All systems nominal</span>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};
