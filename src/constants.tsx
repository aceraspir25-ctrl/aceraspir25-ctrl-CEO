/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trophy, Code, Users, Target, Palette, Shield } from 'lucide-react';
import { UserPersona, ScreenStatus } from './types';

export const PERSONAS: { id: UserPersona; label: string; icon: any; description: string }[] = [
  { id: 'CEO', label: 'CEO / Executive', icon: Trophy, description: 'Strategic roadmap and KPI overview' },
  { id: 'ENGINEER', label: 'Engineer', icon: Code, description: 'Neural infra and technical debugging' },
  { id: 'HR', label: 'HR / Staff', icon: Users, description: 'Personnel matrix and team morale' },
  { id: 'PRODUCT', label: 'Product Manager', icon: Target, description: 'Roadmap, features, and product-market fit' },
  { id: 'DESIGN', label: 'Designer', icon: Palette, description: 'Visual systems and interaction analytics' },
  { id: 'SECURITY', label: 'Security Lead', icon: Shield, description: 'Threat monitoring and neural wall integrity' } as any,
];

export const PERSONA_RECOMMENDED_SCREENS: Record<UserPersona, ScreenStatus[]> = {
  CEO: ['COMMAND_SYSTEM', 'SYSTEM_STATUS', 'EXECUTIVE', 'DASHBOARD', 'MARKET', 'HR', 'PRODUCT', 'SECURITY'],
  ENGINEER: ['COMMAND_SYSTEM', 'SYSTEM_STATUS', 'ENGINEERING', 'INFRA', 'QA', 'SECURITY', 'DASHBOARD', 'WORKLOAD'],
  HR: ['HR', 'DASHBOARD', 'EXECUTIVE', 'WORKLOAD', 'SYSTEM_STATUS'],
  PRODUCT: ['COMMAND_SYSTEM', 'SYSTEM_STATUS', 'PRODUCT', 'MARKET', 'DASHBOARD', 'DESIGN', 'ENGINEERING'],
  SALES: ['SALES', 'MARKET', 'DASHBOARD', 'PRODUCT', 'SYSTEM_STATUS'],
  DESIGN: ['DESIGN', 'PRODUCT', 'DASHBOARD', 'MARKET', 'SYSTEM_STATUS'],
  BOD: ['EXECUTIVE', 'MARKET', 'DASHBOARD', 'SECURITY', 'SYSTEM_STATUS'],
  QA: ['QA', 'ENGINEERING', 'DASHBOARD', 'WORKLOAD', 'SYSTEM_STATUS'],
  DEVOPS: ['COMMAND_SYSTEM', 'SYSTEM_STATUS', 'INFRA', 'ENGINEERING', 'SECURITY', 'WORKLOAD'],
  GUIDE: ['GUIDE', 'DASHBOARD', 'MARKET', 'SYSTEM_STATUS'],
  STAFF: ['DASHBOARD', 'HR', 'WORKLOAD', 'GUIDE', 'SYSTEM_STATUS'],
};

export const getInitialScreen = (persona: UserPersona): ScreenStatus => {
  if (persona === 'CEO') return 'EXECUTIVE';
  if (persona === 'ENGINEER') return 'ENGINEERING';
  if (persona === 'HR') return 'HR';
  if (persona === 'PRODUCT') return 'PRODUCT';
  if (persona === 'DESIGN') return 'DESIGN';
  return 'DASHBOARD';
};
