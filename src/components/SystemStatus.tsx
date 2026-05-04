/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Zap, 
  Server, 
  Globe, 
  Lock,
  ArrowUpRight,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const SYSTEM_HEALTH_DATA = [
  { name: 'INFRA', health: 98, load: 42, color: '#ff4d00' },
  { name: 'AUTH', health: 100, load: 15, color: '#00f2ff' },
  { name: 'DATABASE', health: 94, load: 68, color: '#00ff9d' },
  { name: 'NEURAL', health: 99, load: 31, color: '#ff00f2' },
  { name: 'GATEWAY', health: 88, load: 85, color: '#ffcc00' },
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

export const SystemStatus: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="space-y-10"
    >
      {/* Header Strategy */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-surface-high pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="label-micro text-accent tracking-[0.3em]">System_Matrix // Global_Pulse</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter uppercase italic leading-none">
            Operational<br/>Integrity
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-4 border border-surface-high bg-white/[0.02] flex flex-col gap-1 min-w-[140px]">
             <span className="label-micro opacity-40 uppercase">Global_Uptime</span>
             <span className="font-mono text-2xl text-white font-light">99.998%</span>
          </div>
          <div className="px-6 py-4 border border-surface-high bg-white/[0.02] flex flex-col gap-1 min-w-[140px]">
             <span className="label-micro opacity-40 uppercase">Active_Nodes</span>
             <span className="font-mono text-2xl text-accent font-light">1,402</span>
          </div>
        </div>
      </section>

      {/* Primary KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-surface-high border border-surface-high">
        {/* Metric 1: Infrastructure */}
        <motion.div variants={itemVariants} className="bg-[#0A0A0A] p-8 space-y-6 group hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Cpu className="h-32 w-32 text-accent" />
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <Cpu className="h-4 w-4 text-accent" />
            <span className="label-micro uppercase tracking-widest">Infrastructure_Fleet</span>
          </div>
          <div className="space-y-2 relative z-10">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-5xl font-light text-white tracking-tighter">92</span>
              <span className="font-mono text-sm text-gray-600">%</span>
            </div>
            <p className="label-micro text-gray-500 uppercase">Resource_Utilization // Optimal</p>
          </div>
          <div className="h-[2px] w-full bg-surface-high relative z-10">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '92%' }}
               className="h-full bg-accent" 
             />
          </div>
        </motion.div>

        {/* Metric 2: Security */}
        <motion.div variants={itemVariants} className="bg-[#0A0A0A] p-8 space-y-6 group hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Lock className="h-32 w-32 text-neon-blue" />
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="label-micro uppercase tracking-widest">Neural_Wall_Integrity</span>
          </div>
          <div className="space-y-2 relative z-10">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-5xl font-light text-white tracking-tighter">100</span>
              <span className="font-mono text-sm text-gray-600">SEV_0</span>
            </div>
            <p className="label-micro text-success uppercase">Zero_Critical_Leaks // Secure</p>
          </div>
          <div className="flex gap-1 relative z-10">
            {[1,1,1,1,1,1,1,1,1,0].map((b, i) => (
              <div key={i} className={`h-1 flex-1 ${b ? 'bg-success/40' : 'bg-surface-high'}`} />
            ))}
          </div>
        </motion.div>

        {/* Metric 3: Command System */}
        <motion.div variants={itemVariants} className="bg-[#0A0A0A] p-8 space-y-6 group hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Terminal className="h-32 w-32 text-tertiary" />
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <Terminal className="h-4 w-4 text-tertiary" />
            <span className="label-micro uppercase tracking-widest">Active_Neural_Agents</span>
          </div>
          <div className="space-y-2 relative z-10">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-5xl font-light text-white tracking-tighter">05</span>
              <span className="font-mono text-sm text-gray-600">LIVE</span>
            </div>
            <p className="label-micro text-gray-500 uppercase">Synchronized_Streams // Active</p>
          </div>
          <div className="flex gap-3 relative z-10">
            <div className="flex items-center gap-1">
               <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
               <span className="label-micro opacity-40">Nominal</span>
            </div>
            <div className="flex items-center gap-1">
               <div className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
               <span className="label-micro opacity-40">Analyzing</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Aggregate Health Visualizer */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-end justify-between border-b border-surface-high pb-4">
            <h2 className="label-micro">Regional_Cluster_Health</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-accent" />
                <span className="label-micro opacity-40">Load</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-success" />
                <span className="label-micro opacity-40">Health</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full bg-[#0A0A0A] border border-surface-high p-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SYSTEM_HEALTH_DATA}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontFamily: 'monospace' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0 }}
                  itemStyle={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase' }}
                />
                <Bar dataKey="health" fill="#00ff9d" radius={[2, 2, 0, 0]} barSize={30}>
                  {SYSTEM_HEALTH_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.health > 95 ? '#00ff9d' : entry.health > 90 ? '#ffcc00' : '#ff4d00'} fillOpacity={0.6} />
                  ))}
                </Bar>
                <Bar dataKey="load" fill="#ff4d00" radius={[2, 2, 0, 0]} barSize={10} fillOpacity={0.4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="label-micro">Active_System_Protocols</h2>
          <div className="space-y-1">
             {[
               { icon: Globe, label: 'Geo_CDN_Redundancy', status: 'ACTIVE', color: 'text-success' },
               { icon: Zap, label: 'L3_Cache_Purge', status: 'PENDING', color: 'text-accent' },
               { icon: Server, label: 'DB_Cluster_Rebalance', status: 'ACTIVE', color: 'text-success' },
               { icon: Lock, label: 'Credential_Rotation', status: 'IDLE', color: 'text-gray-500' }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 variants={itemVariants}
                 className="flex items-center justify-between p-5 border border-surface-high bg-[#0A0A0A] hover:bg-white/[0.02] transition-all group"
               >
                 <div className="flex items-center gap-4">
                   <item.icon className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all" />
                   <span className="label-micro opacity-60 group-hover:opacity-100 transition-opacity">{item.label}</span>
                 </div>
                 <span className={`label-micro ${item.color} group-hover:translate-x-1 transition-transform`}>
                   {item.status}
                 </span>
               </motion.div>
             ))}
          </div>
          
          <button className="w-full py-4 bg-accent text-black font-bold label-micro hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
             <Activity className="h-3.5 w-3.5" />
             INIT_DEEP_DIAGNOSTIC
          </button>
        </div>
      </section>

      {/* Real-time Event Stream Simulation */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-surface-high pb-4">
          <h2 className="label-micro">Neural_Diagnostic_Stream</h2>
          <div className="flex items-center gap-2">
             <Loader2 className="h-3 w-3 text-accent animate-spin" />
             <span className="label-micro opacity-40 italic">Listening for system events...</span>
          </div>
        </div>
        
        <div className="p-8 border border-surface-high bg-surface-lowest relative">
          <div className="font-mono text-[10px] space-y-3 leading-relaxed opacity-60 overflow-hidden h-32">
            {[
              { time: '12:05:41', msg: 'HEARTBEAT: cluster_us_east_01 responding nominal (24ms)', type: 'INFO' },
              { time: '12:05:38', msg: 'METRIC_SYNC: batch_722 pushed to analytics_buffer', type: 'INFO' },
              { time: '12:05:32', msg: 'THREAT_SCAN: complete. 12,401 vectors analyzed. 0 hits.', type: 'SUCCESS' },
              { time: '12:05:25', msg: 'AUTOSCALE: provisioning additional node in us_west_02', type: 'WARNING' },
              { time: '12:05:18', msg: 'CACHE_VALIDATION: integrity_check passed for v1.0.4', type: 'INFO' },
            ].map((log, i) => (
              <div key={i} className="flex gap-6 animate-in slide-in-from-bottom-2 duration-500">
                <span className="text-accent/60 shrink-0">[{log.time}]</span>
                <span className={`${log.type === 'SUCCESS' ? 'text-success' : log.type === 'WARNING' ? 'text-accent' : ''}`}>
                  {log.msg}
                </span>
                <span className="ml-auto opacity-20 uppercase">{log.type}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-lowest to-transparent" />
        </div>
      </section>

      {/* Editorial Footer Decoration */}
      <footer className="pt-10 flex flex-col items-center">
         <div className="w-1 h-12 bg-surface-high" />
         <p className="mt-4 label-micro opacity-20 tracking-[0.5em] uppercase">End_Of_Telemetry_Report</p>
      </footer>
    </motion.div>
  );
};
