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


  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      const bookId = params.id;
      this.bookService.fetchBook(bookId).subscribe({
        next: (res:any) => {
          console.log(res);
          this.book = res.payload.book;
        }
      })
    })
  }

}
