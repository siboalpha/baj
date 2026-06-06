'use client';

import { useEffect, useState } from 'react';

interface DashboardData {
  client: Record<string, unknown>;
  payments: Record<string, unknown>[];
  collections: Record<string, unknown>[];
  feeStatusLabel: Record<string, string>;
  feeBadge: Record<string, string>;
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return { data, loading, error };
}
