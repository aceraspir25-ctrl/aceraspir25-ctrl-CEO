/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Radar, AlertTriangle, AlertCircle, Info, Lock, AlertOctagon } from 'lucide-react';

const THREATS = [
  {
    id: 'CVE-2024-001',
    level: 'CRITICAL',
    title: 'CRITICAL_THREAT_Detected',
    description: 'Unauthorized SQL Injection attempt detected on Auth_Service v2. Primary IP: 192.168.1.104 blocked.',
    time: '14:22:01',
    sev: 'SEV:0',
    color: 'text-error',
    bg: 'bg-error/10',
    border: 'border-error/30'
  },
  {
    id: 'ANOM-772',
    level: 'HIGH',
    title: 'HIGH_Anomaly_Found',
    description: 'Spike in egress traffic detected from Node_07. Potential data exfiltration pattern identified.',
    time: '14:18:45',
    sev: 'SEV:1',
    color: 'text-tertiary',
    bg: 'bg-tertiary/10',
    border: 'border-tertiary/30'
  },
  {
    id: 'POL-012',
    level: 'MEDIUM',
    title: 'MED_Policy_Violation',
    description: 'Standard encryption protocols bypassed by Dev_Sandbox access token. Investigation required.',
    time: '13:55:12',
    sev: 'SEV:2',
    color: 'text-neon-blue',
    bg: 'bg-neon-blue/10',
    border: 'border-neon-blue/30'
  }
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

export const Security: React.FC = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white">
              Infra<br/>Shield
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">Security Lab // Series 04</div>
        </div>
      </section>

      {/* Vulnerability Scan */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-surface-high pb-4 px-2">
          <h2 className="label-micro">Vulnerability_Scan</h2>
          <span className="font-mono text-[10px] font-bold text-accent">84% COMPLETE</span>
        </div>
        <div className="h-1 w-full bg-surface-high overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '84%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="h-full bg-accent"
          />
        </div>
        <div className="flex justify-between px-2 label-micro opacity-20">
          <span>ETA: 00:04:12</span>
          <span>Scanned: 1,204 / 1,433 PKGS</span>
        </div>
      </section>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
          <p className="label-micro mb-8">API_Gateway</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-6xl font-light text-success tracking-tighter uppercase">Pass</span>
            <span className="label-micro text-gray-600">Latency: 12ms</span>
          </div>
        </div>

        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
          <p className="label-micro mb-8">Deps_Health</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-6xl font-light text-error tracking-tighter">07</span>
            <span className="label-micro text-gray-600">Outdated NPM</span>
          </div>
        </div>
      </div>

      {/* Threat Log */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Active_Threats_Log</h3>
        <div className="divide-y divide-surface-high border border-surface-high">
          {THREATS.map((threat) => (
            <motion.div
              key={threat.id}
              variants={itemVariants}
              className={`p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all ${
                threat.level === 'CRITICAL' ? 'border-l-4 border-accent pl-9' : ''
              }`}
            >
              <div className="md:w-1/3">
                <span className={`label-micro mb-4 block ${threat.level === 'CRITICAL' ? 'text-accent' : threat.color}`}>{threat.level}</span>
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-tight">{threat.title}</h4>
                <p className="font-mono text-[9px] text-gray-600 mt-2">{threat.id} // {threat.time}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-serif italic text-gray-500 leading-relaxed">
                  {threat.description}
                </p>
              </div>
              <div className="md:w-1/4 flex items-end">
                <button className="py-2 px-6 border border-surface-high label-micro w-full hover:bg-white/5">Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* API Configuration & Security */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <Lock className="h-4 w-4 text-accent" />
          <h3 className="label-micro opacity-40 uppercase tracking-widest">Secret_Management_System</h3>
        </div>
        
        <div className="p-10 bg-[#0A0A0A] border border-surface-high space-y-8">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1 space-y-4">
              <label className="label-micro text-white/60 block">Neural_Access_Key (GEMINI_API_KEY)</label>
              <div className="relative w-full max-w-md group">
                <input 
                  type="password" 
                  placeholder="AIzaSy..."
                  className="w-full bg-white/[0.02] border border-surface-high p-4 font-mono text-xs text-white focus:border-accent outline-none transition-all pr-12"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 group-hover:block hidden">
                  <div className="relative group/tooltip">
                    <Info className="h-4 w-4 text-accent cursor-help" />
                    <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-error text-white text-[10px] font-mono leading-relaxed opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 border border-white/20 shadow-2xl">
                       <p className="font-bold mb-1 uppercase tracking-tighter">SECURITY_PROTOCOL_WARNING:</p>
                       NEVER commit API keys directly to version control. Use environment variables (.env) or a secure secrets management solution for production environments. Secure your 'Neural Command' instance.
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 font-mono italic">
                * Note: In this environment, variables should be set via the 'Settings' menu of the platform.
              </p>
            </div>

            <div className="w-full md:w-1/3 bg-white/[0.02] border border-white/5 p-6 space-y-4">
               <div className="flex items-center gap-2 text-error">
                  <AlertOctagon className="h-4 w-4" />
                  <span className="label-micro font-bold">Hardening_Tip</span>
               </div>
               <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">
                  Always use environment variables for sensitive credentials. Leaking API keys can lead to unauthorized billing and data exposure.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Raw Logs */}
      <section className="space-y-6 pb-12">
        <h3 className="label-micro px-2 opacity-40">Raw_System_Logs</h3>
        <div className="p-8 border border-surface-high bg-surface-lowest">
          <div className="font-mono text-[10px] space-y-2 opacity-40">
            <p className="text-success">[OK] Firewall rules synchronized across 12 zones</p>
            <p>[LOG] User_Admin initiated deep-packet inspection</p>
            <p className="text-error">[ERR] SSL handshake failed for redundant-node-04</p>
            <p className="text-accent">[SYS] Kernel security module re-patched successfully</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
