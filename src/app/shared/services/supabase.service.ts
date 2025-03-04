import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

export type SupabaseUser = User | boolean | null | undefined;

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  private currentUser = new BehaviorSubject<SupabaseUser>(null);
  _session: AuthSession | null = null

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange((event, sess) => {
      console.log('SUPABAS AUTH CHANGED: ', event);
      console.log('SUPABAS AUTH CHANGED sess: ', sess);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('SET USER');

        this.currentUser.next(sess?.user);
      } else {
        this.currentUser.next(false);
      }
    })
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  getCurrentUser(): Observable<SupabaseUser> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): string | null {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id;
    } else {
      return null;
    }
  }

  async setSession(access_token: any, refresh_token: any) {
    return this.supabase.auth.setSession({ access_token, refresh_token });
  }

}
