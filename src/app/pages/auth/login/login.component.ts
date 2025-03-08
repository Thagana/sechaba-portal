import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {SupabaseService} from '../../../shared/services/supabase.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;
  public loading = false;
  constructor(
    private readonly supabase: SupabaseService,
    private readonly snackbar: MatSnackBar
  ) {
    this.form = new FormGroup({
      email: new FormControl('', []),
    })
  }
  async submit() {
    this.loading = true;
    try {
      const { email } = this.form.value;
      const response = await this.supabase.signIn(email);
      this.loading = false;
    } catch (error) {
      let message = 'Something went wrong';
      if (error instanceof Error) {
        message = error.message;
      }
      this.snackbar.open(message)
      this.loading = false;
    } finally {
      this.form.reset()
      this.loading = false
    }
  }
}
