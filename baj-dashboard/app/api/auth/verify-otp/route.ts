import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    // Simulate OTP verification (replace with real logic)
    if (otp === '123456') {
      return NextResponse.json({ message: 'OTP verified' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during OTP verification' }, { status: 500 });
  }
}
