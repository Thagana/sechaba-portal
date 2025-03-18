import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement-create',
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './announcement-create.component.html',
  styleUrl: './announcement-create.component.scss',
})
export class AnnouncementCreateComponent {
  form!: FormGroup;
  public loading = false;
  constructor(
    private readonly service: DashboardService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl('', []),
      body: new FormControl('', []),
      type: new FormControl('', []),
    });
  }
  async submit() {
    this.loading = true;
    try {
      const { title, body, type } = this.form.value;
      await this.service.createAnnouncement(title, body, type)
      this.loading = false;
    } catch (error) {
      let message = 'Something went wrong';
      if (error instanceof Error) {
        message = error.message;
      }
      this.snackbar.open(message);
      this.loading = false;
      this.router.navigate(['dashboard', 'announcements'])
    } finally {
      this.form.reset();
      this.loading = false;
    }
  }
}
