import { NextResponse } from 'next/server';
import { CLIENT, INITIAL_PAYMENTS, COLLECTIONS, FEE_STATUS_LABEL, FEE_BADGE } from '@/lib/constants/dashboard';

export async function GET() {
  try {
    return NextResponse.json({
      client: CLIENT,
      payments: INITIAL_PAYMENTS,
      collections: COLLECTIONS,
      feeStatusLabel: FEE_STATUS_LABEL,
      feeBadge: FEE_BADGE,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
