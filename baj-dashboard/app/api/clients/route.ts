import { NextResponse } from 'next/server';
import { CLIENTS_DATA, TYPE_LABEL, TYPE_BADGE, PAYMENT_LABEL, PAYMENT_BADGE, STATUS_BADGE, PAYMENT_SORT, CLIENT_TYPES, ZONE_OPTIONS } from '@/lib/constants/clients';

export async function GET() {
  try {
    return NextResponse.json({
      clients: CLIENTS_DATA,
      typeLabel: TYPE_LABEL,
      typeBadge: TYPE_BADGE,
      paymentLabel: PAYMENT_LABEL,
      paymentBadge: PAYMENT_BADGE,
      statusBadge: STATUS_BADGE,
      paymentSort: PAYMENT_SORT,
      clientTypes: CLIENT_TYPES,
      zoneOptions: ZONE_OPTIONS,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}
