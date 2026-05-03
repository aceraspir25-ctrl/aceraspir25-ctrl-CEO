/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Infra } from './components/Infra';
import { QA } from './components/QA';
import { Workload } from './components/Workload';
import { Security } from './components/Security';
import { Executive } from './components/Executive';
import { Market } from './components/Market';
import { Guide } from './components/Guide';
import { Engineering } from './components/Engineering';
import { HR } from './components/HR';
import { Sales } from './components/Sales';
import { Design } from './components/Design';
import { Product } from './components/Product';
import { CommandSystem } from './components/CommandSystem';
import { ScreenStatus, UserPersona } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAS, PERSONA_RECOMMENDED_SCREENS, getInitialScreen } from './constants';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenStatus>('DASHBOARD');
  const [userPersona, setUserPersona] = useState<UserPersona | null>(() => {
    const saved = localStorage.getItem('omni_persona');
    return (saved as UserPersona) || null;
  });
  
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(true);

  React.useEffect(() => {
    const checkApiKey = async () => {
      try {
        const response = await fetch('/api/ai/check-status', { method: 'POST' });
        const data = await response.json();
        setIsApiKeyValid(data.valid);
      } catch (error) {
        console.error('Failed to verify API key:', error);
        setIsApiKeyValid(false);
      }
    };
    checkApiKey();
  }, []);

  const handleScreenChange = (screen: ScreenStatus) => {
    if (!userPersona) return;
    
    const allowedScreens = PERSONA_RECOMMENDED_SCREENS[userPersona] || ['DASHBOARD'];
    if (allowedScreens.includes(screen) || screen === 'DASHBOARD') {
      setActiveScreen(screen);
    } else {
      console.warn(`Access denied to screen: ${screen} for persona: ${userPersona}`);
      // Optionally show an alert or notification here
    }
  };

  const handlePersonaChange = (persona: UserPersona | null) => {
    setUserPersona(persona);
    if (persona) {
      localStorage.setItem('omni_persona', persona);
      setActiveScreen(getInitialScreen(persona));
    } else {
      localStorage.removeItem('omni_persona');
    }
  };

  const handlePersonaSelect = (persona: UserPersona) => {
    handlePersonaChange(persona);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'DASHBOARD':
        return <Dashboard persona={userPersona || 'BOD'} />;
      case 'INFRA':
        return <Infra />;
      case 'QA':
        return <QA />;
      case 'WORKLOAD':
        return <Workload />;
      case 'SECURITY':
        return <Security />;
      case 'EXECUTIVE':
        return <Executive />;
      case 'MARKET':
        return <Market />;
      case 'GUIDE':
        return <Guide />;
      case 'ENGINEERING':
        return <Engineering />;
      case 'HR':
        return <HR />;
      case 'SALES':
        return <Sales />;
      case 'DESIGN':
        return <Design />;
      case 'PRODUCT':
        return <Product />;
      case 'COMMAND_SYSTEM':
        return <CommandSystem />;
      default:
        return <Dashboard persona={userPersona || 'BOD'} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {!userPersona && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] p-6"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff4d00_1px,transparent_1px)] [background-size:20px_20px]" />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-4xl bg-black border border-surface-high p-8 md:p-12"
            >
              <div className="space-y-2 mb-12">
                <p className="label-micro text-accent tracking-[0.3em] uppercase">System_Initialization // Identity_Protocol</p>
                <h1 className="text-4xl md:text-6xl font-serif italic text-white leading-tight uppercase tracking-tighter">
                  Select Your<br/>Operational Role
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PERSONAS.map((persona) => (
                  <button
                    key={persona.id}
                    onClick={() => handlePersonaSelect(persona.id)}
                    className="p-6 border border-surface-high bg-white/[0.02] hover:bg-accent/5 hover:border-accent transition-all text-left group"
                  >
                    <persona.icon className="h-6 w-6 text-accent mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-2">
                      {persona.label}
                    </h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter leading-relaxed">
                      {persona.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Layout 
        activeScreen={activeScreen} 
        onScreenChange={handleScreenChange} 
        isApiKeyValid={isApiKeyValid}
        userPersona={userPersona || 'BOD'}
        onPersonaChange={handlePersonaChange}
      >
        {renderScreen()}
      </Layout>
    </>
  );
}

