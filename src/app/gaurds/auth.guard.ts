import { SupabaseService } from '../shared/services/supabase.service'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, take, catchError, tap, switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: SupabaseService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {

    // First, force a session check before proceeding
    return this.checkAndRefreshSession().pipe(
      switchMap(() => this.auth.getCurrentUser()),
      tap(user => {
        // Log the type and details of the user for debugging
        if (user && typeof user === 'object') {
          console.log('User is object with keys:', Object.keys(user));
        }
      }),
      take(1),
      map((user) => {
        // Detailed check to understand what's happening
        if (!user) {
          this.showLoginMessage();
          return this.router.createUrlTree(['/auth/login']);
        }

        if (!Boolean(user)) {
          this.showLoginMessage();
          return this.router.createUrlTree(['/auth/login']);
        }

        if (typeof user === 'object') {
          // Examine the user object
          const isUserObject = 'id' in user;

          if (isUserObject) {
            console.log('User is authenticated, allowing access');
            return true;
          }
        }

        this.showLoginMessage();
        return this.router.createUrlTree(['/auth/login']);
      }),
      catchError((error) => {
        this.snackbar.open('Authentication error occurred', 'Close', {
          duration: 3000
        });
        return of(this.router.createUrlTree(['/auth/login']));
      })
    );
  }

  private showLoginMessage() {
    this.snackbar.open('Please login to access this page', 'Close', {
      duration: 3000
    });
  }

  // Force a session check/refresh
  private checkAndRefreshSession(): Observable<any> {
    // This is a workaround to ensure we have the most current session
    return new Observable(observer => {
      console.log('Checking/refreshing session...');
      this.auth.getAndUpdateSession().then(result => {
        console.log('Session check result:', result);
        observer.next(result);
        observer.complete();
      }).catch(error => {
        console.error('Session check failed:', error);
        observer.next(null);
        observer.complete();
      });
    });
  }
}
