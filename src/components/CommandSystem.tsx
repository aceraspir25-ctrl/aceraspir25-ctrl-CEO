/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

interface Log {
  agent: 'CEO' | 'Engineering' | 'QA' | 'Marketing' | 'Guide';
  message: string;
  timestamp: string;
}

const agentColors = {
  CEO: 'text-accent',
  Engineering: 'text-neon-blue',
  QA: 'text-success',
  Marketing: 'text-tertiary',
  Guide: 'text-neon-blue'
};

const INITIAL_LOGS: Log[] = [
  { agent: 'CEO', message: 'System Activated. Initializing Multi-Agent Strategic Analysis.', timestamp: '19:24:01' },
  { agent: 'Engineering', message: 'Core pipelines online. Vercel & Firebase nodes synchronized.', timestamp: '19:24:05' },
  { agent: 'Guide', message: 'CMA Studies roadmap updated to version 4.2.', timestamp: '19:24:10' },
  { agent: 'CEO', message: 'BharatPath Market reach reached 1.2M nodes. Scaling recommended.', timestamp: '19:24:15' },
  { agent: 'Engineering', message: '[ALERT] JMA_Grease_Hub latency spikes detected in APAC nodes.', timestamp: '19:24:22' },
];

export const CommandSystem: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>(INITIAL_LOGS);
  const [hasAlert, setHasAlert] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Alert tracking logic requested by user
  useEffect(() => {
    const lastLog = logs[logs.length - 1];
    if (lastLog?.message.includes('[ALERT]')) {
      setHasAlert(true);
      // 5 second baad alert effect hata dein
      const timer = setTimeout(() => setHasAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [logs]);

  // Simulate incoming logs
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        { agent: 'Engineering' as const, message: 'Neural wall integrity at 99.98%.' },
        { agent: 'QA' as const, message: 'Zero critical leaks detected in current BharatPath build.' },
        { agent: 'Marketing' as const, message: 'BharatPath market reach surpassed 1.2M nodes.' },
        { agent: 'CEO' as const, message: 'Strategic vector aligned with Q3 growth targets.' },
        { agent: 'QA' as const, message: '[ALERT] Non-deterministic behavior identified in Cluster_04.' },
      ];
      
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setLogs(prev => [...prev, {
        ...randomMsg,
        timestamp: new Date().toLocaleTimeString([], { hour12: false })
      }]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col h-[calc(100vh-160px)] transition-colors duration-500 ${hasAlert ? 'bg-error/10' : 'bg-black'} p-6 font-mono border border-surface-high relative overflow-hidden`}>
      
      {/* Background Matrix/Grid effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ff4d00_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Alert Banner - Sirf tab dikhega jab critical issue ho */}
      {hasAlert && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="animate-pulse bg-error text-white text-center py-2 mb-4 rounded font-bold text-[10px] uppercase tracking-[0.3em] z-10"
        >
          CRITICAL SYSTEM ALERT: ACTION REQUIRED BY AI AGENT
        </motion.div>
      )}

      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-surface-high pb-4 mb-4 z-10">
        <div className="flex items-center gap-3">
          <Terminal className="h-4 w-4 text-accent" />
          <span className="label-micro text-white">Neural_Command_Stream // v4.0.1</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${hasAlert ? 'bg-error animate-ping' : 'bg-success'}`} />
            <span className="label-micro opacity-40">{hasAlert ? 'ANOMALY_DETECTED' : 'SYSTEM_NOMINAL'}</span>
          </div>
          <span className="label-micro text-gray-600">Active_Agents: 05</span>
        </div>
      </div>

      {/* Logs Container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-4 z-10"
      >
        {logs.map((log, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex gap-4 group p-2 transition-all rounded ${log.message.includes('[ALERT]') ? 'bg-error/10 border-l-2 border-error animate-pulse' : 'hover:bg-white/[0.02] border-l-2 border-transparent'}`}
          >
            <span className="font-mono text-[10px] text-gray-700 mt-0.5 shrink-0">[{log.timestamp}]</span>
            <div className="flex-1 flex flex-col md:flex-row gap-x-4">
              <span className={`font-bold min-w-[100px] text-[10px] uppercase tracking-wider shrink-0 break-all ${agentColors[log.agent] || 'text-white'}`}>
                {log.agent === 'CEO' && '👑 '}
                {log.agent === 'Engineering' && '🛠️ '}
                {log.agent === 'QA' && '🔍 '}
                {log.agent === 'Marketing' && '📈 '}
                {log.agent === 'Guide' && '🎓 '}
                [{log.agent}]:
              </span>
              <span className={`text-[11px] leading-relaxed transition-colors ${log.message.includes('[ALERT]') ? 'text-error font-bold' : 'text-gray-300 group-hover:text-white'}`}>
                {log.message}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Terminal Input Simulation */}
      <div className="mt-4 border-t border-surface-high pt-4 flex items-center gap-3 z-10">
        <ChevronRight className="h-4 w-4 text-accent" />
        <div className="flex-1 h-6 bg-white/[0.02] border border-white/5 flex items-center px-3">
          <span className="text-[10px] text-gray-500 italic">Awaiting operator input...</span>
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-accent ml-2"
          />
        </div>
        <div className="flex gap-2 text-[9px] uppercase tracking-widest font-bold opacity-30">
          <span>0x4F2A</span>
          <span>SYSCALL</span>
        </div>
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};
