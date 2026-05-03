/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Database, Zap, Activity, AlertTriangle, CheckCircle2, ChevronRight, Search, ZapOff, Sparkles, Globe } from 'lucide-react';
import { Metric, Alert, UserPersona } from '../types';

const METRICS: Metric[] = [
  { label: 'CPU_USAGE', value: '42.8', unit: '%', trend: [10, 20, 15, 30, 25, 40, 35, 45, 42], status: 'NORMAL' },
  { label: 'MEM_OCCUPANCY', value: '89.1', unit: '%', trend: [60, 65, 75, 80, 85, 90, 88, 92, 89], status: 'CRITICAL' },
  { label: 'NETWORK_LATENCY', value: '14', unit: 'ms', trend: [14, 15, 13, 14, 16, 14, 14, 13, 14], status: 'NORMAL' },
];

const ALERTS: Alert[] = [
  {
    id: '1',
    priority: 'HIGH',
    title: 'Memory Leak in Auth Module',
    description: 'Detected recursive allocation in session handler. Thread ID: 0x4F2A.',
    timestamp: '04:12s ago',
  },
  {
    id: '2',
    priority: 'MEDIUM',
    title: 'Build Failure on Main',
    description: "Pipeline 'CI-CD-PIPELINE-01' failed at stage 'Integration Tests'.",
    timestamp: '12:45s ago',
  },
];

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

const MetricCard: React.FC<{ metric: Metric }> = ({ metric }) => {
  const isCritical = metric.status === 'CRITICAL';
  return (
    <motion.div variants={itemVariants} className={`art-panel flex items-center justify-between p-6 ${isCritical ? 'border-accent' : ''}`}>
      <div className="flex items-center gap-6">
        <div className={`p-3 border border-surface-high bg-surface-lowest`}>
          {metric.label === 'CPU_USAGE' && <Cpu className="h-4 w-4 text-accent" />}
          {metric.label === 'MEM_OCCUPANCY' && <Database className={`h-4 w-4 ${isCritical ? 'text-accent' : 'text-accent/40'}`} />}
          {metric.label === 'NETWORK_LATENCY' && <Zap className="h-4 w-4 text-accent" />}
        </div>
        <div>
          <p className="label-micro mb-0.5">{metric.label}</p>
          <div className="flex items-baseline gap-1">
            <span className={`font-mono text-xl font-bold tracking-tighter ${isCritical ? 'text-white' : 'text-white'}`}>
              {metric.value}
            </span>
            <span className="font-mono text-[10px] text-gray-500">{metric.unit}</span>
          </div>
        </div>
      </div>
      <div className="h-6 w-24">
        <svg viewBox="0 0 100 30" className="h-full w-full overflow-visible">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            d={`M ${metric.trend.map((v, i) => `${(i / (metric.trend.length - 1)) * 100},${30 - v / (metric.status === 'CRITICAL' ? 3.3 : 2)}`).join(' L ')}`}
            fill="none"
            stroke="#FF4D00"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </motion.div>
  );
};

const MatrixBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] will-change-transform">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,77,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <motion.div 
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent h-1/2 w-full will-change-transform"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,#0A0A0A_100%)]" />
    </div>
  );
};

const GlitchText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <motion.span 
        animate={{ x: [-1, 1, 0], opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 10 }}
        className="absolute inset-0 -z-10 text-accent/30 blur-[1px] translate-x-[1px] select-none pointer-events-none will-change-transform"
      >
        {text}
      </motion.span>
    </div>
  );
};


export const Dashboard: React.FC<{ persona: UserPersona }> = ({ persona }) => {
  const GREETINGS: Record<UserPersona, { title: string; subtitle: string; hint: string; code: string }> = {
    CEO: { title: 'TRIDEV_OVERLORD', subtitle: 'SYSTEM_ROOT_ACCESS', hint: 'Strategic vectors synchronized. All nodes nominal.', code: '0xCEO_ROOT' },
    BOD: { title: 'GOVERNANCE_CORE', subtitle: 'EXECUTIVE_PROTOCOL', hint: 'Quarterly throughput analyzed. Risk vectors mitigated.', code: '0xBOD_SYNC' },
    ENGINEER: { title: 'NEURAL_LOGIC', subtitle: 'CORE_HYPERVISOR', hint: 'Kernel integrity verified. Neural wall status: OK.', code: '0xENG_KERNEL' },
    DEVOPS: { title: 'INFRA_MATRIX', subtitle: 'CLUSTER_MANAGER', hint: 'Global nodes reporting 99.99% uptime. Vercel sync optimal.', code: '0xOPS_FLOW' },
    HR: { title: 'PERSONNEL_HUB', subtitle: 'HUMAN_MATRIX', hint: 'Biometric nodes synchronized. Morale baseline maintained.', code: '0xHR_GRID' },
    STAFF: { title: 'OPERATIONAL_FLOW', subtitle: 'NODE_WORKER_04', hint: 'Productivity vector above baseline. Maintain stream.', code: '0xSTAFF_NET' },
    PRODUCT: { title: 'ROADMAP_ARC', subtitle: 'LIFECYCLE_ARCHIVE', hint: 'Sprint Delta near finalization. Product specs lock-in.', code: '0xPROD_SPEC' },
    QA: { title: 'INTEGRITY_WALL', subtitle: 'VALIDATION_STREAM', hint: 'Zero critical leaks. Logic consistency index: 1.0', code: '0xQA_CHECK' },
    SALES: { title: 'REVENUE_ENGINE', subtitle: 'MOMENTUM_ORBIT', hint: 'Market reach expansion detected. Revenue velocity: +12%', code: '0xSALES_MAX' },
    DESIGN: { title: 'VISUAL_VECTOR', subtitle: 'AESTHETIC_LOGIC', hint: 'Style consistency verified across all neural endpoints.', code: '0xDSGN_UI' },
    GUIDE: { title: 'KNOWLEDGE_BASE', subtitle: 'CMA_MANIFESTO', hint: 'Learning nodes optimized. Certification path secured.', code: '0xGUIDE_REF' },
  };

  const greeting = GREETINGS[persona] || GREETINGS.CEO;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative space-y-12">
      <MatrixBackground />

      {/* Hacker Terminal Header */}
      <section className="relative z-10 pt-4">
        <div className="border border-surface-high bg-black/40 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden group">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-accent animate-pulse" />
                <span className="label-micro text-accent tracking-[0.2em] sm:tracking-[0.3em]">{greeting.subtitle}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-mono font-bold tracking-tighter text-white uppercase italic leading-none break-all sm:break-normal">
                <GlitchText text={greeting.title} />
              </h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 py-1">
                <span className="font-mono text-[8px] sm:text-[10px] text-gray-500">[STATUS: ONLINE]</span>
                <span className="font-mono text-[8px] sm:text-[10px] text-gray-500">[LOG_ID: {greeting.code}]</span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 text-left md:text-right w-full md:w-auto">
              <div className="label-micro text-accent animate-pulse tracking-[0.1em] sm:tracking-widest flex items-center md:justify-end gap-2 text-[8px] sm:text-[9px]">
                <Sparkles className="h-3 w-3 shrink-0" />
                <span className="truncate">NEURAL_OUTPUT: {greeting.hint}</span>
              </div>
              <div className="flex gap-1.5 md:justify-end">
                {[1, 1, 1, 0, 1].map((b, i) => (
                  <div key={i} className={`w-6 sm:w-8 h-1 ${b ? 'bg-accent/40' : 'bg-surface-high'}`} />
                ))}
              </div>
            </div>
          </div>


          {/* Scanning Line Effect */}
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-[1px] bg-accent/20 blur-[2px] pointer-events-none"
          />
        </div>
      </section>

      {/* Neural Status Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-1 border-t border-b border-surface-high bg-surface-high">
          <div className="bg-[#0A0A0A] p-6 sm:p-10">
            <p className="label-micro mb-4">Neural_Analysis_01</p>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-3xl sm:text-5xl font-light text-white">64.2</span>
              <span className="font-mono text-sm text-gray-600">%</span>
            </div>
            <div className="mt-6 sm:mt-8 h-[1px] w-full bg-surface-high relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '64.2%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-accent"
              />
            </div>
            <p className="mt-4 label-micro opacity-20 text-[8px] sm:text-[9px]">Optimizing core logic pathways...</p>
          </div>

          <div className="bg-[#0A0A0A] p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <p className="label-micro mb-4">Active_Nodes</p>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl sm:text-5xl font-light text-white">12</span>
                <span className="label-micro text-gray-600">Clusters</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6 sm:mt-8">
              {[1, 1, 1, 0, 1, 0].map((active, i) => (
                <div 
                  key={i} 
                  className={`h-1 w-full transition-all ${active ? 'bg-accent' : 'bg-surface-high'}`} 
                />
              ))}
            </div>
          </div>
      </section>


      {/* System Health Section */}
      <section className="space-y-6">
        <h3 className="label-micro">Diagnostic_Stream</h3>
        <div className="grid grid-cols-1 gap-1 border border-surface-high bg-surface-high lg:grid-cols-3">
          {METRICS.map((metric, i) => (
            <div key={i} className="bg-[#0A0A0A]">
              <MetricCard metric={metric} />
            </div>
          ))}
        </div>
      </section>

      {/* Autonomous Agent Control */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-surface-high pb-4">
          <h3 className="label-micro flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-accent" />
            AI_Agent_Proactive_Output
          </h3>
          <span className="label-micro opacity-40 hidden xs:inline">24/7 Analysis Active</span>
        </div>
        
        <div className="art-panel bg-[#0A0A0A] p-6 sm:p-12 border-l-4 border-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
             <Sparkles className="h-48 w-48 sm:h-64 sm:w-64 text-accent" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            <div className="space-y-4 sm:space-y-6">
              <p className="label-micro opacity-40 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Neural_Processing_Stream</p>
              <h4 className="font-serif italic text-2xl sm:text-4xl text-white leading-tight">
                Detected potential race condition in "Cluster_04" state management.
              </h4>
              <p className="font-mono text-[9px] sm:text-[11px] leading-relaxed text-gray-500 uppercase tracking-widest">
                Analysis: High concurrency bursts during peak hours may trigger a mutex lock timeout. 
                System impact: 14% latency increase for regional users.
              </p>
            </div>
            
            <div className="flex flex-col justify-end gap-6 sm:gap-10">
               <div className="p-4 sm:p-6 border border-surface-high bg-white/[0.02]">
                  <p className="label-micro text-accent mb-3 sm:mb-4">Proposed_Fix</p>
                  <p className="text-xs sm:text-sm font-serif italic text-white/80">
                     Implement opportunistic lock acquisition with backoff strategy in the shared controller.
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="flex-1 btn-accent py-3 sm:py-4 font-bold text-[9px] sm:text-[10px]">Apply Patch</button>
                  <button className="flex-1 py-3 sm:py-4 label-micro border border-surface-high hover:bg-white/5 transition-all text-[8px] sm:text-[9px]">Detailed Analysis</button>
               </div>
            </div>
          </div>
        </div>
      </section>


      {/* Alerts Section (Editorial Style) */}
      <section className="space-y-6">
        <h3 className="label-micro">Manifest_Alerts</h3>
        <div className="grid grid-cols-1 gap-1 border-t border-surface-high bg-surface-high lg:grid-cols-2">
          {/* Card 1: High Priority */}
          <motion.div variants={itemVariants} className="bg-[#0A0A0A] p-10 flex flex-col justify-between group">
             <div>
                <p className="label-micro text-accent mb-4">Priority_01</p>
                <h4 className="font-serif italic text-2xl text-white mb-2">{ALERTS[0].title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{ALERTS[0].description}</p>
             </div>
             <button className="mt-10 self-start btn-accent">
                Analyze
             </button>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
             <div>
                <p className="label-micro mb-4">Status_Archive</p>
                <h4 className="font-serif italic text-2xl text-white mb-2">{ALERTS[1].title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{ALERTS[1].description}</p>
             </div>
             <div className="mt-10 flex border-t border-surface-high">
                <button className="flex-1 py-4 label-micro hover:bg-white/5 border-r border-surface-high">Logs</button>
                <button className="flex-1 py-4 label-micro hover:bg-white/5">Re-Run</button>
             </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};
