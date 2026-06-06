import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (email === 'admin@bar.rw' && password === 'password') {
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
