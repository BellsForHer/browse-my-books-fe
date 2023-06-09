import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor (private authService:AuthService, private userService:UserService, private route:Router, private bookService:BookService) {}

  ngOnInit(): void {

  }

  onSubmit() {
    const loginUser = this.loginForm.value;

    this.authService.login(loginUser).subscribe((res:any)=>{
      if(res.success) {
        this.userService.setCurrentUser(res.payload.user)
        this.bookService.onSetBooks(res.payload.user.books)
        this.route.navigate(['/browse'])
        this.authService.setToken(res.payload.token)
        console.log(res)
      }
    })
  }
}
