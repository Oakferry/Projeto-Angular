import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERNAME = 'admin';
  private readonly PASSWORD = '1234';

  isAuthenticated = false;
  
  constructor( private router: Router) { }

  login (username: string, password:string): boolean{
    if(username === this.USERNAME && password === this.PASSWORD){
      this.isAuthenticated = true;// Set authentication status
      this.router.navigate(['/filmes']); // Redirect to filmes page
      return true;// Valid credentials
    }
    this.isAuthenticated = false;
    this.router.navigate(['/login']);// Redirect to login page
    return false;// Invalid credentials
  }

  logout(){
    this.isAuthenticated = false;// Clear authentication status
    this.router.navigate(['/login']);// Redirect to login page
  }
}
