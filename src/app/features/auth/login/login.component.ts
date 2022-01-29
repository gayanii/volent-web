import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/auth.service';
import { UserAuth } from 'src/app/core/models/user-auth.model';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = false;

  constructor(private router : Router,
    private fb: FormBuilder,
    private authService:AuthService,
    private storageService:StorageService) {
    this.initializeForm();
   }

  ngOnInit(): void {
    
  }

  initializeForm()
  {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      let user:UserAuth = { Username: this.loginForm.value.username, Password: this.loginForm.value.password }
      this.authService.authenticateUser(user).subscribe(
        data=>{
          if(data){
            this.storageService.store("IsAuthenticated",true);
            this.storageService.store("loggedUser",data);
            this.router.navigate(['dashboard']);
          }
        }
      )
      
    }
  }

  checkErrors() {
    this.error = true;
  }
}
