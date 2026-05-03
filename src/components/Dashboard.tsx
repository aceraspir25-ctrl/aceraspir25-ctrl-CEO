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

export const Dashboard: React.FC<{ persona: UserPersona }> = ({ persona }) => {
  const GREETINGS: Record<UserPersona, { title: string; subtitle: string; hint: string }> = {
    CEO: { title: 'Strategic\nVectors', subtitle: 'Portfolio Command Series 01', hint: 'BharatPath and JMA Grease Hub are the primary focus today.' },
    BOD: { title: 'Board\nProtocol', subtitle: 'Governance Monograph 04', hint: 'Review quarterly throughput and risk assessments for BharatPath.' },
    ENGINEER: { title: 'Neural\nLogic', subtitle: 'Architecture Stream 02', hint: 'JMA Grease Hub latency spikes detected in APAC nodes.' },
    DEVOPS: { title: 'Velocity\nCore', subtitle: 'Deployment Archive 01', hint: 'Vercel sync for JMA Grease Hub is currently DEGRADED.' },
    HR: { title: 'Staff\nMatrix', subtitle: 'Personnel Analysis 03', hint: 'Personnel morale nodes reporting high engagement.' },
    STAFF: { title: 'Worker\nStream', subtitle: 'Operational Flow 01', hint: 'Your individual productivity vector is above baseline.' },
    PRODUCT: { title: 'Roadmap\nArc', subtitle: 'Lifecycle Series 02', hint: 'BharatPath Sprint Delta is nearing finalization. Check specs.' },
    QA: { title: 'Testing\nWall', subtitle: 'Integrity Report 01', hint: 'Zero critical leaks detected in current BharatPath build.' },
    SALES: { title: 'Growth\nEngine', subtitle: 'Momentum Archive 04', hint: 'BharatPath market reach surpassed 1.2M nodes.' },
    DESIGN: { title: 'Visual\nLogic', subtitle: 'Creative Systems 03', hint: 'Consistency index reached 92% across all nodes.' },
    GUIDE: { title: 'Study\nArc', subtitle: 'CMA Studies Manifesto 01', hint: 'CMA certification progress reaching 62%. Optimal dev balance.' },
  };

  const greeting = GREETINGS[persona] || GREETINGS.CEO;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white whitespace-pre-line">
              {greeting.title}
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="label-micro uppercase tracking-[0.2em] opacity-40">
                {greeting.subtitle}
              </div>
              <div className="label-micro text-accent animate-pulse tracking-widest flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                AI_INSIGHT: {greeting.hint}
              </div>
            </div>
        </div>
      </section>

      {/* Neural Status Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-1 border-t border-b border-surface-high bg-surface-high">
          <div className="bg-[#0A0A0A] p-10">
            <p className="label-micro mb-4">Neural_Analysis_01</p>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-5xl font-light text-white">64.2</span>
              <span className="font-mono text-sm text-gray-600">%</span>
            </div>
            <div className="mt-8 h-[1px] w-full bg-surface-high relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '64.2%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-accent"
              />
            </div>
            <p className="mt-4 label-micro opacity-20">Optimizing core logic pathways...</p>
          </div>

          <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
            <div>
              <p className="label-micro mb-4">Active_Nodes</p>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-5xl font-light text-white">12</span>
                <span className="label-micro text-gray-600">Clusters</span>
              </div>
            </div>
            <div className="flex gap-2 mt-8">
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
          <span className="label-micro opacity-40">24/7 Analysis Active</span>
        </div>
        
        <div className="art-panel bg-[#0A0A0A] p-12 border-l-4 border-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
             <Sparkles className="h-64 w-64 text-accent" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-6">
              <p className="label-micro opacity-40 uppercase tracking-[0.3em]">Neural_Processing_Stream</p>
              <h4 className="font-serif italic text-4xl text-white leading-tight">
                Detected potential race condition in "Cluster_04" state management.
              </h4>
              <p className="font-mono text-[11px] leading-relaxed text-gray-500 uppercase tracking-widest">
                Analysis: High concurrency bursts during peak hours may trigger a mutex lock timeout. 
                System impact: 14% latency increase for regional users.
              </p>
            </div>
            
            <div className="flex flex-col justify-end gap-10">
               <div className="p-6 border border-surface-high bg-white/[0.02]">
                  <p className="label-micro text-accent mb-4">Proposed_Fix</p>
                  <p className="text-sm font-serif italic text-white/80">
                     Implement opportunistic lock acquisition with backoff strategy in the shared controller.
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="flex-1 btn-accent py-4 font-bold">Apply Patch</button>
                  <button className="flex-1 py-4 label-micro border border-surface-high hover:bg-white/5 transition-all">Detailed Analysis</button>
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
