import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerClient,
  serialize,
  type CookieOptions,
} from '@supabase/ssr';

export default function supabaseServerClientPages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.appendHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.appendHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    }
  );

  return supabase;
}
