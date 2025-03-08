import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SupabaseService} from './shared/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'sechaba-admin';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    await this.handleAuthRedirect();
  }

  private async handleAuthRedirect() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const expiresAt = params.get('expires_at');

    if (accessToken && refreshToken) {
      // Store tokens in local storage or your authentication service
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('expires_at', expiresAt || '');

      // Optional: Set the session in Supabase
      await this.supabase.setSession(
        accessToken,
        refreshToken
      );

      // Remove the hash from the URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      // Redirect to a default route (e.g., dashboard)
      await this.router.navigate(['/dashboard']);
    }
  }

}
