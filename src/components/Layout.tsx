/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  LayoutDashboard, 
  Activity, 
  Bug, 
  ShieldAlert, 
  TrendingUp, 
  Cpu, 
  Bell,
  Settings,
  CircleUser,
  PieChart,
  BookOpen,
  Code,
  Users,
  DollarSign,
  PenTool,
  Archive,
  Sparkles,
  ChevronDown,
  ArrowLeft,
  Sun,
  Moon,
  Languages
} from 'lucide-react';
import { ScreenStatus, UserPersona } from '../types';
import { PERSONAS, PERSONA_RECOMMENDED_SCREENS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: ScreenStatus;
  onScreenChange: (screen: ScreenStatus) => void;
  isApiKeyValid?: boolean;
  userPersona: UserPersona;
  onPersonaChange: (persona: UserPersona | null) => void;
}

const NAV_ITEMS: { id: ScreenStatus; label: string; icon: React.ElementType }[] = [
  { id: 'COMMAND_SYSTEM', label: 'Terminal', icon: Terminal },
  { id: 'DASHBOARD', label: 'Command', icon: LayoutDashboard },
  { id: 'EXECUTIVE', label: 'CEO / BOD', icon: TrendingUp },
  { id: 'HR', label: 'HR / Staff', icon: Users },
  { id: 'PRODUCT', label: 'PM / Product', icon: Archive },
  { id: 'ENGINEERING', label: 'Eng / DevOps', icon: Code },
  { id: 'QA', label: 'QA / Testing', icon: Bug },
  { id: 'SALES', label: 'Sales / Mkt', icon: DollarSign },
  { id: 'DESIGN', label: 'Design / UX', icon: PenTool },
  { id: 'MARKET', label: 'Market / Res', icon: PieChart },
  { id: 'SECURITY', label: 'Security', icon: ShieldAlert },
  { id: 'GUIDE', label: 'Academy', icon: BookOpen },
];

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeScreen, 
  onScreenChange, 
  isApiKeyValid = true,
  userPersona,
  onPersonaChange
}) => {
  const [agentStatus, setAgentStatus] = React.useState<'MONITORING' | 'ANALYZING' | 'IDLE' | 'PATCHING'>('MONITORING');
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  const [lang, setLang] = React.useState<'EN' | 'HI'>('EN');

  const recommendedScreens = PERSONA_RECOMMENDED_SCREENS[userPersona] || [];

  React.useEffect(() => {
    if (!isApiKeyValid) return;

    const statuses: ('MONITORING' | 'ANALYZING' | 'IDLE' | 'PATCHING')[] = ['MONITORING', 'ANALYZING', 'MONITORING', 'IDLE'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % statuses.length;
      setAgentStatus(statuses[i]);
    }, 5000);
    return () => clearInterval(interval);
  }, [isApiKeyValid]);

  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-surface-high bg-surface-lowest pt-20 md:flex z-40">
        <div className="px-8 py-8 relative">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
          >
            <div className="flex h-12 w-12 items-center justify-center border border-accent bg-accent/5 group-hover:bg-accent/10 transition-all">
              <CircleUser className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="label-micro text-white uppercase">{userPersona}</p>
                <ChevronDown className={`h-2 w-2 text-accent transition-transform ${isPersonaMenuOpen ? 'rotate-180' : ''}`} />
              </div>
              <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest mt-1">Identity_Confirmed</p>
            </div>
          </div>

          <AnimatePresence>
            {isPersonaMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-8 right-8 top-full z-50 mt-2 bg-[#0A0A0A] border border-surface-high p-4 space-y-2 shadow-2xl"
              >
                <p className="label-micro opacity-40 mb-4">Switch_Operational_Persona</p>
                <div className="grid grid-cols-1 gap-1">
                  {PERSONAS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onPersonaChange(p.id);
                        setIsPersonaMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 p-2 text-left transition-all border ${userPersona === p.id ? 'bg-accent/10 border-accent' : 'border-transparent hover:bg-white/5'}`}
                    >
                      <p className="label-micro text-white uppercase">{p.id}</p>
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-surface-high">
                  <button 
                    onClick={() => {
                      onPersonaChange(null);
                      setIsPersonaMenuOpen(false);
                    }}
                    className="label-micro text-accent hover:brightness-125 transition-all w-full text-left uppercase"
                  >
                    Full_Identity_Reset
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 space-y-0 px-0 pt-4 overflow-y-auto custom-scrollbar">
          <p className="mb-6 px-8 label-micro opacity-20">Systems // 04</p>
          {NAV_ITEMS.map((item) => {
            const isRecommended = recommendedScreens.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={`flex w-full items-center gap-4 border-b border-surface-high px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative ${
                  activeScreen === item.id 
                    ? 'bg-accent text-black'
                    : 'text-gray-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                {isRecommended && activeScreen !== item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-accent/40" />
                )}
                <item.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {isRecommended && activeScreen !== item.id && (
                  <Sparkles className="h-2 w-2 text-accent" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-surface-high p-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="label-micro opacity-40">Sync_Stability</span>
            <span className="font-mono text-[9px] text-accent">99.98%</span>
          </div>
          <div className="h-[1px] w-full bg-surface-high">
            <div className="h-full bg-accent" style={{ width: '99.98%' }}></div>
          </div>
        </div>
      </aside>

      {/* Top Bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-12 border-b transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0A0A0A] border-surface-high' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            {activeScreen !== 'DASHBOARD' && (
              <button 
                onClick={() => onScreenChange('DASHBOARD')}
                className={`p-2 transition-all hover:bg-white/10 group ${theme === 'dark' ? 'text-white/60' : 'text-gray-900'}`}
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </button>
            )}
            <div className={`text-xs tracking-[0.4em] font-bold uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Kinetic // 04
            </div>
          </div>
          <div className="hidden h-10 w-[1px] bg-surface-high md:block" />
          <div className="flex items-center gap-4">
             <div className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px_#ff4d00] transition-all duration-500 ${
               !isApiKeyValid ? 'bg-error shadow-error animate-pulse' :
               agentStatus === 'ANALYZING' ? 'bg-success animate-ping shadow-success' : 
               agentStatus === 'PATCHING' ? 'bg-accent animate-spin' : 
               agentStatus === 'MONITORING' ? 'bg-accent animate-pulse' : 'bg-gray-700'
             }`} />
             <span className={`label-micro ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`}>AI_Agent: {!isApiKeyValid ? 'ERROR' : agentStatus}</span>
          </div>
          <div className="hidden h-10 w-[1px] bg-surface-high lg:block" />
          <span className={`hidden font-serif italic text-lg lg:block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Neural Command</span>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden gap-8 text-[10px] tracking-widest uppercase font-medium md:flex text-white/40">
            <span>Archive</span>
            <span>Series</span>
            <span>Manifesto</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-surface-high pr-6">
              <button 
                onClick={() => setLang(l => l === 'EN' ? 'HI' : 'EN')}
                className={`flex items-center gap-2 label-micro transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                <Languages className="h-3.5 w-3.5" />
                <span>{lang}</span>
              </button>
              <button 
                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                className={`p-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
            <div className="relative h-10 w-24 bg-accent flex items-center justify-center text-[10px] font-bold tracking-widest uppercase text-black cursor-pointer hover:brightness-110 transition-all">
              Systems
            </div>
            <Settings className={`h-4 w-4 cursor-pointer transition-colors ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all md:ml-64 relative min-h-screen pt-20 pb-20 md:pb-0 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-gray-50'}`}>
        {!isApiKeyValid && (
          <div className="bg-error/20 border-b border-error p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShieldAlert className="h-5 w-5 text-error" />
              <p className="font-mono text-xs text-error uppercase tracking-widest font-bold">
                API_KEY_ERROR: Neural Command module offline. Please provide a valid GEMINI_API_KEY.
              </p>
            </div>
            <div className="h-2 w-2 rounded-full bg-error animate-ping" />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 md:p-12"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer (New addition mapping to the design) */}
      <footer className="fixed bottom-0 left-64 right-0 h-16 border-t border-surface-high hidden md:flex items-center justify-between px-12 text-[9px] uppercase tracking-widest opacity-40 bg-[#0A0A0A] z-40">
        <div>Built with Intent // Creative Lab</div>
        <div>System Online: 18:35:10</div>
      </footer>

      {/* Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-surface-high bg-[#0A0A0A] px-4 md:hidden">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeScreen === item.id ? 'text-accent' : 'text-gray-500'
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span className="label-micro" style={{ opacity: 1, fontSize: '8px' }}>{item.id.slice(0, 4)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
