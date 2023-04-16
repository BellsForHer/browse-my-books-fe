import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{
  
  book: any = null;
  categories: any = null;
  creator: any = null;


  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {

    this.bookService.detailBookSubject.subscribe((updatedBook:any)=>{
      this.book = updatedBook;
    })

    this.activatedRoute.params.subscribe((params)=>{
      const bookIds = params.id;
      this.bookService.fetchBook(bookIds).subscribe({
        next: (res:any) => {
          console.log(res);
          this.book = res.payload.book;
          this.categories = res.payload.book.categories;
          this.creator = res.payload.blog.user;
        }
      })
    })
  }

}
