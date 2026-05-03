export interface ProjectStatus {
  id: string;
  name: string;
  status: 'STABLE' | 'WARNING' | 'CRITICAL';
  progress: number;
  priority: string;
  roadmap: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export const PROJECTS: ProjectStatus[] = [
  {
    id: 'BHARATPATH',
    name: 'BharatPath',
    status: 'STABLE',
    progress: 78,
    priority: 'HIGH',
    roadmap: ['Route Optimization Engine', 'Logistics API Integration', 'Market Analysis Module'],
    metrics: [
      { label: 'Market Reach', value: '1.2M nodes' },
      { label: 'Latency', value: '42ms' },
      { label: 'Active Users', value: '12k' }
    ]
  },
  {
    id: 'JMA_GREASE_HUB',
    name: 'JMA Grease Hub',
    status: 'WARNING',
    progress: 45,
    priority: 'MEDIUM',
    roadmap: ['Inventory Sync', 'Neural Supply Chain V2', 'Regional Distribution Hubs'],
    metrics: [
      { label: 'Inventory Sync', value: 'FAILED (Vercel)' },
      { label: 'Stock Level', value: '89%' },
      { label: 'Efficiency', value: '12% uplift' }
    ]
  },
  {
    id: 'CMA_STUDIES',
    name: 'CMA Studies',
    status: 'STABLE',
    progress: 62,
    priority: 'HIGH',
    roadmap: ['Module 4 Certification', 'Software Dev Balance Layer', 'Mock Test Simulator'],
    metrics: [
      { label: 'Cert Progress', value: '62%' },
      { label: 'Study Hours', value: '4.5h/day' },
      { label: 'Dev Sync', value: 'OPTIMAL' }
    ]
  }
];
