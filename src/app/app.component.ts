import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SupabaseService} from './shared/services/supabase.service';
import {Session} from '@supabase/supabase-js'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'sechaba-admin';
}
