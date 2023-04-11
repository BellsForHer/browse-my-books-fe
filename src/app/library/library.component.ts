import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';
import { User } from '../shared/models/user.model';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  Books = []

  constructor (private bookService:BookService) {}


  ngOnInit(): void {
    this.bookService.fetchLibrary().subscribe((res:any)=>{
      console.log(res);
      if(res.success) {
        this.bookService = res.payload;
      }
    })
  }

  // onSubmit() {
  //   const loginUser = this.loginForm.value;

  //   this.authService.login(loginUser).subscribe((res:any)=>{
  //     if(res.success) {
  //       this.userService.setCurrentUser(res.payload.user)
  //       this.route.navigate(['/home'])
  //       this.authService.setToken(res.payload.token)
  //       console.log(res)
  //     }
  //   })
  // }
}


