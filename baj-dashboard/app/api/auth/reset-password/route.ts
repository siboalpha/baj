import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: 'Email, OTP, and new password are required' }, { status: 400 });
    }

    // Simulate password reset (replace with real logic)
    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
