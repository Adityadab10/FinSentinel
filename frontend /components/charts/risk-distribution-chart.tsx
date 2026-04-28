'use client';

import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { RiskDistribution } from '@/lib/types';

interface RiskDistributionChartProps {
  data: RiskDistribution;
}

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  const chartData = [
    { name: 'Safe', value: data.safe, color: 'oklch(0.65 0.2 145)' },
    { name: 'Suspicious', value: data.suspicious, color: 'oklch(0.75 0.18 85)' },
    { name: 'Fraud', value: data.fraud, color: 'oklch(0.6 0.22 25)' },
  ];

  const total = data.safe + data.suspicious + data.fraud;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(0.16 0.01 260)',
              border: '1px solid oklch(0.28 0.01 260)',
              borderRadius: '8px',
              color: 'oklch(0.95 0 0)',
            }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`,
              name,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span style={{ color: 'oklch(0.65 0 0)' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
