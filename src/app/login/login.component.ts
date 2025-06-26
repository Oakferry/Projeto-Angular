import { Component } from '@angular/core'; // This is the Angular component decorator
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule for icons


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;
  hide: boolean = true; // For password visibility toggle

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Form control for username
      password: ['', Validators.required] // Form control for password
    });
  }

  // Metodo OnSubmit
  // This method is called when the login form is submitted
  onSubmit() {
    const { username, password } = this.loginForm.value; // Destructure username and password from the form value
    if (this.authService.login(username, password)) {
      // Login successful
      this.loginError = false;
      /* this.router.navigate(['/filmes']); */ //esta no AuthService
    } else {
      this.loginError = true; // Show login error
    }
  }
}

