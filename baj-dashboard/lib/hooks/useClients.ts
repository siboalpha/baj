'use client';

import { useEffect, useState } from 'react';

interface ClientsData {
  clients: Record<string, unknown>[];
  typeLabel: Record<string, string>;
  typeBadge: Record<string, string>;
  paymentLabel: Record<string, string>;
  paymentBadge: Record<string, string>;
  statusBadge: Record<string, string>;
  paymentSort: Record<string, number>;
  clientTypes: string[];
  zoneOptions: string[];
}

export function useClients() {
  const [data, setData] = useState<ClientsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  return { data, loading, error };
}
