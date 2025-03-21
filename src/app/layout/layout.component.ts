import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive
  ]
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  rootRoutes = [
    {
      name: "Home",
      icon: "home",
      path: "/dashboard",
    },
    {
      name: "Users",
      icon: "people_outline",
      path: "/dashboard/users",
    },
    {
      name: "Villages",
      icon: "villages",
      path: "/dashboard/villages",
    },
    {
      name: "Announcements",
      icon: "announcements",
      path: "/dashboard/announcements",
    }, {
    name: "campaigns",
      icon: "campaigns",
      path: "/dashboard/campaigns",
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
