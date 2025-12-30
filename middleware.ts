import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          response.cookies.set({ name, value: '', ...options });
        }
      }
    }
  );

  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
    if (!profile || !['admin', 'editor'].includes(profile.role)) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*']
};
