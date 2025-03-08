import { Component, OnInit } from '@angular/core';
import {LayoutComponent} from '../../layout/layout.component';
import {RouterOutlet} from '@angular/router';
import {SupabaseService} from '../../shared/services/supabase.service';

@Component({
  selector: 'app-dashboard',
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
