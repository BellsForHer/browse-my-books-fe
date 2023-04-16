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

  book: any = null;
  books = []
  currentUser = null;

  constructor (private bookService:BookService, private userService:UserService) {}


  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe((currentUser: any)=>{
      this.currentUser = currentUser
    })
    this.bookService.fetchLibrary().subscribe((res:any)=>{
      console.log(res);
      if(res.success) {
        this.books = res.payload;
      }
      this.bookService.bookSubject
    })
  }

  onDeletedBook() {
    this.bookService.deleteBook(this.book.id)
  }


}


