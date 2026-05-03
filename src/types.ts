export type ScreenStatus = 'DASHBOARD' | 'INFRA' | 'QA' | 'WORKLOAD' | 'SECURITY' | 'EXECUTIVE' | 'MARKET' | 'GUIDE' | 'ENGINEERING' | 'HR' | 'SALES' | 'DESIGN' | 'PRODUCT' | 'COMMAND_SYSTEM';

export type UserPersona = 'CEO' | 'ENGINEER' | 'HR' | 'PRODUCT' | 'SALES' | 'DESIGN' | 'BOD' | 'STAFF' | 'QA' | 'DEVOPS' | 'GUIDE';

export interface Metric {
  label: string;
  value: string;
  trend: number[];
  unit?: string;
  status?: 'NORMAL' | 'WARNING' | 'CRITICAL';
}

export interface Alert {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  timestamp: string;
}

export interface Pipeline {
  id: string;
  name: string;
  source: string;
  status: 'BUILDING' | 'SUCCESS' | 'FAILED';
  time: string;
}

export interface Operator {
  id: string;
  name: string;
  role: string;
  load: number;
  task: string;
  prediction: string;
  image: string;
}
