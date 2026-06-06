'use client';

import { useEffect, useState } from 'react';

interface ZonesData {
  zones: Record<string, unknown>[];
  statusBadge: Record<string, string>;
  statusLabel: Record<string, string>;
  districts: string[];
  drivers: string[];
  scheduleDays: string[];
}

export function useZones() {
  const [data, setData] = useState<ZonesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchZones() {
      try {
        const response = await fetch('/api/zones');
        if (!response.ok) {
          throw new Error('Failed to fetch zones');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchZones();
  }, []);

  return { data, loading, error };
}
