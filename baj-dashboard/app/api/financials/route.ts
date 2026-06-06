import { NextResponse } from 'next/server';
import { PAYMENTS_DATA, STATUS_BADGE, STATUS_LABEL, METHOD_LABEL, STATUS_SORT, PERIODS, CLIENT_OPTIONS } from '@/lib/constants/financials';

export async function GET() {
  try {
    return NextResponse.json({
      payments: PAYMENTS_DATA,
      statusBadge: STATUS_BADGE,
      statusLabel: STATUS_LABEL,
      methodLabel: METHOD_LABEL,
      statusSort: STATUS_SORT,
      periods: PERIODS,
      clientOptions: CLIENT_OPTIONS,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch financials' }, { status: 500 });
  }
}
