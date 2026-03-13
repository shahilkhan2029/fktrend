import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.USER_JWT_SECRET || 'fktrend_user_secret_123');

export async function signUserToken(payload: { id: string; email: string; name: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

export async function verifyUserToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { id: string; email: string; name: string };
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const token = (await cookies()).get('user_token')?.value;
  if (!token) return null;
  return await verifyUserToken(token);
}
