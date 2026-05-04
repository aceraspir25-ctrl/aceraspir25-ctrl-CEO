/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Search, 
  Target, 
  BarChart3, 
  Globe, 
  MessageSquare,
  Users,
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const containerVariants = {
// ... existing variants ...
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const INSIGHTS = [
// ... existing insights ...
  {
    category: 'Logistics Research',
    title: 'BharatPath Route Optimization',
    detail: 'Market demand for real-time tier-2 city route intelligence up 280%. Deployment of neural nodes in rural clusters recommended.',
    impact: 'Critical',
    color: 'text-accent'
  },
  {
    category: 'Sales Strategy',
    title: 'JMA_Grease_Hub Distribution',
    detail: 'Automated warehouse sync reducing local inventory latency by 12%. Planning expansion to Northern hubs.',
    impact: 'Medium',
    color: 'text-white'
  },
  {
    category: 'Market Trend',
    title: 'Neural-First Supply Chain',
    detail: 'BharatPath market reach surpassed 1.2M nodes. Organic interest from logistics giants identified.',
    impact: 'High',
    color: 'text-success'
  }
];

export const Market: React.FC = () => {
  const [summaries, setSummaries] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleSummarize = async (index: number, content: string) => {
    if (summaries[index]) {
      setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
      return;
    }

    setLoading(prev => ({ ...prev, [index]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a concise, bulleted summary of the key takeaways from the following market insight: "${content}"`,
      });
      
      const text = response.text || "No summary available.";
      setSummaries(prev => ({ ...prev, [index]: text }));
      setExpanded(prev => ({ ...prev, [index]: true }));
    } catch (error) {
      console.error("Summarization failed:", error);
      setSummaries(prev => ({ ...prev, [index]: "AI integration required for real-time synthesis. Please ensure GEMINI_API_KEY is configured." }));
      setExpanded(prev => ({ ...prev, [index]: true }));
    } finally {
      setLoading(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Editorial Header */}
      <section className="relative overflow-hidden">
        <div className="relative border-l border-accent pl-8 py-2">
            <h1 className="text-[80px] md:text-[120px] font-serif italic leading-[0.8] tracking-tighter text-white uppercase">
              Market<br/>Pulse
            </h1>
            <div className="mt-8 w-24 h-[1px] bg-accent"></div>
            <div className="mt-4 label-micro uppercase tracking-[0.2em] opacity-40">Intelligence Vector // Series 04</div>
        </div>
      </section>

      {/* Global Reach Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-1 border-y border-surface-high bg-surface-high">
        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start">
             <p className="label-micro">Global_Sentiment</p>
             <Globe className="h-4 w-4 text-accent" />
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="font-mono text-6xl font-light text-white tracking-tighter">84.2</span>
            <span className="label-micro text-accent">Score</span>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-gray-600">Aggregate neural sentiment analysis across all channels.</p>
        </div>

        <div className="bg-[#0A0A0A] p-10 flex flex-col justify-between">
           <p className="label-micro">Lead_Generation</p>
           <div className="flex items-end gap-1 h-32 mt-4 overflow-hidden">
              {[40, 60, 45, 80, 70, 90, 85, 100].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className={`flex-1 ${i === 7 ? 'bg-accent' : 'bg-surface-high'}`}
                />
              ))}
           </div>
           <div className="flex justify-between mt-4 label-micro opacity-40">
             <span>W01</span>
             <span className="text-accent">W08_Active</span>
           </div>
        </div>
      </section>

      {/* Insights Stream */}
      <section className="space-y-8">
        <h3 className="label-micro px-2 opacity-40">Researcher_Synthesis</h3>
        <div className="border border-surface-high divide-y divide-surface-high">
          {INSIGHTS.map((insight, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="p-10 flex flex-col md:flex-row gap-10 bg-[#0A0A0A] hover:bg-white/[0.02] transition-all group"
            >
              <div className="md:w-1/4">
                 <p className="label-micro mb-1 opacity-40">{insight.category}</p>
                 <h4 className={`font-mono text-xs font-bold uppercase tracking-tight ${insight.color}`}>{insight.title}</h4>
              </div>
              <div className="flex-1 space-y-6">
                 <p className="text-sm font-serif italic text-gray-500 leading-relaxed">{insight.detail}</p>
                 
                 {/* AI Summarization Feature */}
                 <div className="pt-4 border-t border-white/5">
                    <button 
                      onClick={() => handleSummarize(i, insight.detail)}
                      disabled={loading[i]}
                      className="flex items-center gap-2 label-micro text-accent hover:text-white transition-colors disabled:opacity-50"
                    >
                      {loading[i] ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      {summaries[i] ? (expanded[i] ? 'COLLAPSE_SUMMARY' : 'SHOW_SUMMARY') : 'SUMMARIZE_WITH_GEMINI'}
                      {summaries[i] && (
                        expanded[i] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expanded[i] && summaries[i] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 p-4 bg-white/[0.03] border-l-2 border-accent/20">
                            <p className="label-micro text-[8px] text-accent/40 mb-2 uppercase tracking-tighter">Neural_Synthesis_Result:</p>
                            <div className="text-[11px] font-mono text-gray-400 prose prose-invert max-w-none">
                               {summaries[i].split('\n').map((line, idx) => (
                                 <p key={idx} className="my-1">{line}</p>
                               ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>
              <div className="md:w-1/4 flex items-end justify-end">
                <div className="label-micro px-3 py-1 border border-surface-high">
                  Impact: {insight.impact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social & Community Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border border-surface-high bg-surface-high">
          <div className="bg-[#0A0A0A] p-8 space-y-4">
             <p className="label-micro">Community_Growth</p>
             <div className="flex items-center gap-4">
                <Users className="h-5 w-5 text-accent" />
                <span className="font-mono text-2xl text-white">+12.4K</span>
             </div>
          </div>
          <div className="bg-[#0A0A0A] p-8 space-y-4 border-x border-surface-high">
             <p className="label-micro">Active_Campaigns</p>
             <div className="flex items-center gap-4">
                <Target className="h-5 w-5 text-accent" />
                <span className="font-mono text-2xl text-white">04</span>
             </div>
          </div>
          <div className="bg-[#0A0A0A] p-8 space-y-4">
             <p className="label-micro">Support_Tickets</p>
             <div className="flex items-center gap-4">
                <MessageSquare className="h-5 w-5 text-error" />
                <span className="font-mono text-2xl text-white">12</span>
             </div>
          </div>
      </div>
    </motion.div>
  );
};

