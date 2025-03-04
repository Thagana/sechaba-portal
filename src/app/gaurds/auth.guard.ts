import { SupabaseService } from '../shared/services/supabase.service'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { filter, map, take } from 'rxjs/operators'
import {MatSnackBar} from '@angular/material/snack-bar';

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
    return this.auth.getCurrentUser().pipe(
      filter((val) => val !== null), // Filter out initial Behavior subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true
        } else {
          this.snackbar.open("You are not allowed to access this!")
          return this.router.createUrlTree(['/groups'])
        }
      })
    )
  }
}
