import { NextResponse } from 'next/server';
import { STATS, ALERTS, RECENT_COLLECTIONS, OVERDUE } from '@/lib/constants/overview';

export async function GET() {
  try {
    // Strip non-serializable icon components from alerts before sending JSON
    const alerts = ALERTS.map(({ icon: _icon, ...rest }) => rest);

    return NextResponse.json({
      stats: STATS,
      alerts,
      recentCollections: RECENT_COLLECTIONS,
      overdue: OVERDUE,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard statistics' }, { status: 500 });
  }
}
