/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const middleware = async (
  req: any
): Promise<NextResponse | undefined> => {
  if (req.nextUrl.pathname === '/') {
    const secret: string = process.env.JWT_SECRET as string;

    const session = await getToken({
      req,
      secret,
      secureCookie: process.env.NODE_ENV === 'production'
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect('/home');
    // If user is authenticated, continue.
  }
};
