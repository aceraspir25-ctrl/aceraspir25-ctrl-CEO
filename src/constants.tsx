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
  CEO: ['COMMAND_SYSTEM', 'EXECUTIVE', 'DASHBOARD', 'MARKET', 'HR', 'PRODUCT'],
  ENGINEER: ['COMMAND_SYSTEM', 'ENGINEERING', 'INFRA', 'QA', 'SECURITY', 'DASHBOARD'],
  HR: ['HR', 'DASHBOARD', 'EXECUTIVE'],
  PRODUCT: ['COMMAND_SYSTEM', 'PRODUCT', 'MARKET', 'DASHBOARD', 'DESIGN'],
  SALES: ['SALES', 'MARKET', 'DASHBOARD'],
  DESIGN: ['DESIGN', 'PRODUCT', 'DASHBOARD'],
  BOD: ['EXECUTIVE', 'MARKET', 'DASHBOARD'],
  QA: ['QA', 'ENGINEERING', 'DASHBOARD'],
  DEVOPS: ['COMMAND_SYSTEM', 'INFRA', 'ENGINEERING', 'SECURITY'],
  GUIDE: ['GUIDE', 'DASHBOARD'],
  STAFF: ['DASHBOARD', 'HR'],
};

export const getInitialScreen = (persona: UserPersona): ScreenStatus => {
  if (persona === 'CEO') return 'EXECUTIVE';
  if (persona === 'ENGINEER') return 'ENGINEERING';
  if (persona === 'HR') return 'HR';
  if (persona === 'PRODUCT') return 'PRODUCT';
  if (persona === 'DESIGN') return 'DESIGN';
  return 'DASHBOARD';
};
