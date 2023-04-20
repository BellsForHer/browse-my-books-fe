import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit{

  suggestedBooks: any = []
  categories: any = []
  usernames: any = []

  constructor (private bookService:BookService, private activatedRoute: ActivatedRoute, private http:HttpClient) {}

  ngOnInit(): void {
    this.bookService.fetchBooks().subscribe((res:any)=>{
      console.log(res);
      if(res.success) {
        this.suggestedBooks = res.payload.suggest;
        this.categories = res.payload.categories;
        this.usernames = res.payload.users;
      }
    })

   
  }

}
