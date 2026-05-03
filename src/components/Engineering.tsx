/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Server, Cpu, Database, Cloud, ShieldCheck, Wifi, Activity } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const STATS = [
  { label: 'Uptime', value: '99.98%' },
  { label: 'Latency (FB)', value: '42ms' },
  { label: 'Vercel_Sync', value: 'DEGRADED' },
  { label: 'Build_Nodes', value: '12' },
];

const DEPLOYMENTS = [
  { name: 'BharatPath', provider: 'Firebase', status: 'SYNCHRONIZED', latency: '38ms', load: '12%' },
  { name: 'JMA_Grease_Hub', provider: 'Vercel', status: 'LATENCY_WARNING', latency: '420ms', load: '84%' },
  { name: 'CMA_Studies_Platform', provider: 'Vercel', status: 'STABLE', latency: '52ms', load: '5%' },
];

export const Engineering: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 pb-24">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">
              Synapse<br/>Core
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">Infra Audit // {new Date().toLocaleTimeString()}</div>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[400px]">
          <div>
            <p className="label-micro mb-0.5">Deployment_Status</p>
            <h3 className="font-serif italic text-4xl text-white mt-4 uppercase">Operational_Anomalies</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mt-6 uppercase tracking-widest opacity-40">
              Firebase nodes are STABLE. Vercel deployment for [JMA_GREASE_HUB] experiencing intermittent latency spikes in APAC region.
            </p>
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-surface-high pt-8">
             <span className="label-micro text-accent">Deployment_Errors: 02 (NON-CRITICAL)</span>
             <div className="flex gap-1">
                {[1,1,1,1,1,0].map((v, i) => (
                    <div key={i} className={`h-1 w-4 ${v ? 'bg-accent' : 'bg-surface-high animate-pulse'}`} />
                ))}
             </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                      <Cloud className="h-6 w-6 text-accent" />
                      <div>
                          <p className="label-micro">Vercel_Edge_Sync</p>
                          <p className="font-mono text-xl text-white uppercase">Status: DELAYED</p>
                      </div>
                  </div>
                  <span className="label-micro text-accent animate-pulse">FIX_IN_PROGRESS</span>
                </div>
                <div className="flex items-center gap-6">
                    <Database className="h-6 w-6 text-accent" />
                    <div>
                        <p className="label-micro">Firebase_Realtime_DB</p>
                        <p className="font-mono text-xl text-white uppercase">Latency: 38ms</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <ShieldCheck className="h-6 w-6 text-accent" />
                    <div>
                        <p className="label-micro">Neural_Wall_Security</p>
                        <p className="font-mono text-xl text-white uppercase">Threat_Level: ZERO</p>
                    </div>
                </div>
            </div>
            <button className="mt-10 btn-accent self-start uppercase font-bold tracking-widest">
                Force_Redeploy_All
            </button>
        </div>
      </div>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1 border border-surface-high bg-surface-high">
          {STATS.map((stat, i) => (
             <div key={i} className="bg-[#0A0A0A] p-8 flex flex-col items-center justify-center gap-2">
                <span className="label-micro opacity-40">{stat.label}</span>
                <span className={`font-mono text-2xl uppercase ${stat.value === 'DEGRADED' ? 'text-accent' : 'text-white'}`}>{stat.value}</span>
             </div>
          ))}
      </section>

      {/* Active Projects / Boards */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Deployment_Matrix</h3>
        <div className="border border-surface-high divide-y divide-surface-high">
          {DEPLOYMENTS.map((deploy, i) => (
            <div key={i} className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all">
              <div className="md:w-1/4">
                 <p className="label-micro mb-1">{deploy.provider}</p>
                 <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">{deploy.name}</h4>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-8">
                 <div>
                    <p className="label-micro opacity-40 mb-2">Network_Health</p>
                    <div className="flex items-center gap-3">
                       <Wifi className={`h-4 w-4 ${deploy.status.includes('WARNING') ? 'text-accent' : 'text-success'}`} />
                       <span className={`font-mono text-[10px] ${deploy.status.includes('WARNING') ? 'text-accent' : 'text-white'}`}>
                          {deploy.status}
                       </span>
                    </div>
                 </div>
                 <div>
                    <p className="label-micro opacity-40 mb-2">Edge_Latency</p>
                    <div className="flex items-center gap-3">
                       <Activity className="h-4 w-4 text-white/20" />
                       <span className="font-mono text-[10px] text-white">
                          {deploy.latency}
                       </span>
                    </div>
                 </div>
              </div>
              <div className="md:w-1/4 flex flex-col items-end justify-center">
                  <div className="w-full bg-white/5 h-1 mb-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: deploy.load }} className="h-full bg-accent" />
                  </div>
                  <span className="label-micro opacity-40">Load: {deploy.load}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
