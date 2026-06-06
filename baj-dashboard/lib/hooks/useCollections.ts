'use client';

import { useEffect, useState } from 'react';

interface CollectionsData {
  collections: Record<string, unknown>[];
  statusBadge: Record<string, string>;
  statusLabel: Record<string, string>;
}

export function useCollections() {
  const [data, setData] = useState<CollectionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch('/api/collections');
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return { data, loading, error };
}
