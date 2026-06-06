import { NextResponse } from 'next/server';
import { COLLECTIONS_DATA, STATUS_BADGE, STATUS_LABEL } from '@/lib/constants/collections';

export async function GET() {
  try {
    return NextResponse.json({
      collections: COLLECTIONS_DATA,
      statusBadge: STATUS_BADGE,
      statusLabel: STATUS_LABEL,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
