'use client';

import { useEffect, useState } from 'react';

interface FinancialsData {
  payments: Record<string, unknown>[];
  statusBadge: Record<string, string>;
  statusLabel: Record<string, string>;
  methodLabel: Record<string, string>;
  statusSort: Record<string, number>;
  periods: string[];
  clientOptions: string[];
}

export function useFinancials() {
  const [data, setData] = useState<FinancialsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFinancials() {
      try {
        const response = await fetch('/api/financials');
        if (!response.ok) {
          throw new Error('Failed to fetch financials');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchFinancials();
  }, []);

  return { data, loading, error };
}
