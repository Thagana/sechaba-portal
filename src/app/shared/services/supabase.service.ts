import { Injectable } from '@angular/core'
import {
  AuthSession,
  createClient,
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
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    // Initialize the currentUser with the session user on service creation
    this.initializeUser();

    // Set up auth changes listener
    this.setupAuthChangesListener();
  }

  // Initialize user from current session
  private async initializeUser() {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        this.currentUser.next(false);
        return;
      }

      this._session = data.session;

      if (data.session?.user) {
        console.log('Initial user found:', data.session.user);
        this.currentUser.next(data.session.user);
      } else {
        console.log('No initial user found');
        this.currentUser.next(false);
      }
    } catch (error) {
      console.error('Failed to initialize user:', error);
      this.currentUser.next(false);
    }
  }

  // Set up auth state change listener
  private setupAuthChangesListener() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('SUPABASE AUTH CHANGED:', event);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('SET USER:', session?.user);
        this._session = session;
        this.currentUser.next(session?.user);
      } else if (event === 'SIGNED_OUT') {
        console.log('USER SIGNED OUT');
        this._session = null;
        this.currentUser.next(false);
      }
    });
  }

  get session() {
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }


  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getCurrentUser(): Observable<SupabaseUser> {
    return this.currentUser.asObservable();
  }

  async setSession(access_token: string, refresh_token: string) {
    try {
      const { data, error } = await this.supabase.auth.setSession({
        access_token,
        refresh_token
      });

      if (error) {
        console.error('Error setting session:', error);
        return { data, error };
      }

      if (data.session?.user) {
        console.log('Session set with user:', data.session.user);
        this._session = data.session;
        this.currentUser.next(data.session.user);
      }

      return { data, error };
    } catch (error) {
      console.error('Failed to set session:', error);
      return { data: null, error };
    }
  }
  async getAndUpdateSession(): Promise<any> {
    try {
      console.log('SupabaseService.getAndUpdateSession called');
      const { data, error } = await this.supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        this.currentUser.next(false);
        return { success: false, error };
      }

      this._session = data.session;

      if (data.session?.user) {
        console.log('Session contains user:', data.session.user);
        // Dump important user properties for debugging
        const { id, email, app_metadata, user_metadata } = data.session.user;
        console.log('User details:', { id, email, app_metadata, user_metadata });

        this.currentUser.next(data.session.user);
        return { success: true, user: data.session.user };
      } else {
        console.log('No user in session');
        this.currentUser.next(false);
        return { success: false, reason: 'no-user-in-session' };
      }
    } catch (error) {
      console.error('Failed to get and update session:', error);
      this.currentUser.next(false);
      return { success: false, error };
    }
  }

// Also add this method to check if the user is really logged in
  isLoggedIn(): boolean {
    const user = this.currentUser.value;
    console.log('isLoggedIn check, currentUser is:', user);

    if (!user) return false;
    if (!user) return false;
    return typeof user === 'object' && 'id' in user;
  }
}
