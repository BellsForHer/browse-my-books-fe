import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit{

  suggestedBooks: any = []
  categories: any = []

  constructor (private bookService:BookService) {}

  ngOnInit(): void {
    this.bookService.fetchBooks().subscribe((res:any)=>{
      console.log(res);
      if(res.success) {
        this.suggestedBooks = res.payload.suggest;
        this.categories = res.payload.categories;
      }
    })



  }

}
