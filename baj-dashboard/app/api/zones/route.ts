import { NextResponse } from 'next/server';
import { ZONES_DATA, STATUS_BADGE, STATUS_LABEL, DISTRICTS, DRIVERS, SCHEDULE_DAYS } from '@/lib/constants/zones';

export async function GET() {
  try {
    return NextResponse.json({
      zones: ZONES_DATA,
      statusBadge: STATUS_BADGE,
      statusLabel: STATUS_LABEL,
      districts: DISTRICTS,
      drivers: DRIVERS,
      scheduleDays: SCHEDULE_DAYS,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch zones' }, { status: 500 });
  }
}
