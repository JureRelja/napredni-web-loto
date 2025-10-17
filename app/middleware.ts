import { auth0 } from '@/lib/auth';
import { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  await auth0.middleware(request);
}
