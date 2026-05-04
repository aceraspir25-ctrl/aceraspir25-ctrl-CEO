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
  const [userInput, setUserInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    const userLog: Log = {
      agent: 'Guide', // Using 'Guide' as placeholder for operator role in logs
      message: `[OPERATOR]: ${userInput}`,
      timestamp
    };

    setLogs(prev => [...prev, userLog]);
    setUserInput('');

    // Simulate Agent response after a short delay
    setTimeout(() => {
      const agents: Array<Log['agent']> = ['CEO', 'Engineering', 'QA', 'Marketing'];
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      setLogs(prev => [...prev, {
        agent: randomAgent,
        message: `Query acknowledged. Vector analysis for "${userInput.substring(0, 20)}..." initializing. Status: Nominal.`,
        timestamp: new Date().toLocaleTimeString([], { hour12: false })
      }]);
    }, 1000);
  };

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

      {/* AI Prompt Input Area */}
      <div className="mt-6 border-t border-surface-high pt-6 flex flex-col gap-4 z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-accent" />
          <span className="label-micro text-accent uppercase tracking-[0.2em]">Craft_Neural_Prompt</span>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 relative group">
            <textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Inject command or query for strategic agents..."
              className="w-full bg-[#0A0A0A] border border-surface-high p-4 font-mono text-[11px] text-white placeholder:text-gray-700 focus:outline-none focus:border-accent/40 min-h-[80px] resize-none transition-all group-hover:bg-white/[0.01]"
            />
            <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none font-mono text-[8px] uppercase tracking-widest text-accent">
              Input_Buffer // Ready
            </div>
          </div>
          
          <button 
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className="px-8 bg-accent text-black font-bold label-micro hover:brightness-110 active:scale-95 transition-all flex flex-col items-center justify-center gap-2 disabled:opacity-30 disabled:grayscale"
          >
            <Terminal className="h-4 w-4" />
            <span>SEND_QUERY</span>
          </button>
        </div>
        
        <div className="flex justify-between items-center opacity-30">
          <div className="flex gap-4 text-[9px] uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1"><div className="w-1 h-3 bg-accent/40" /> 0x4F2A</span>
            <span className="flex items-center gap-1"><div className="w-1 h-3 bg-accent/40" /> SYSCALL_ACTIVE</span>
            <span className="flex items-center gap-1"><div className="w-1 h-3 bg-accent/40" /> ENCRYPTION: AES_256</span>
          </div>
          <p className="label-micro italic text-[8px]">Awaiting operator instruction sequence...</p>
        </div>
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};
