import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';
import { User } from '../shared/models/user.model';
import { BookService } from '../shared/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  books = [];
  currentUser = null;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe((currentUser: any) => {
      this.currentUser = currentUser;
    });
    this.bookService.fetchLibrary().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.books = res.payload;
      }
      this.bookService.bookSubject;
    });
  }

  onDeleteBook(id) {
    this.bookService.deleteBook(id).subscribe({
      next: (res: any) => {
        this.route.navigate(['/library']);
      },
    });
  }
}
