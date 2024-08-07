import { SupabaseClient, Session } from '@supabase/supabase-js'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient
      getSession(): Promise<{ session: null; user: null; } | { session: Session; user: User | null; }>
    }
    interface PageData {
      session: Session | null
    }
    // interface Error {}
    // interface Platform {}
  }
}

export {};
