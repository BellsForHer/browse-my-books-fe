import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  books = []
  profileBooks: any = null
  profileUser: any = null

  constructor(private activatedRoute: ActivatedRoute, private http:HttpClient, private bookService: BookService) {}



  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params)=>{
        const username = params.username;
        this.http.get(`http://localhost:3000/api/v1/users/${username}`).subscribe({
          next: (res:any)=>{
            console.log(params);
            console.log(res);
            this.profileUser = res.payload.user;
            this.profileBooks = res.payload.user.books
          }
        })
      })

      this.bookService.fetchLibrary().subscribe((res:any)=>{
        console.log(res);
        if(res.success) {
          this.books = res.payload;
        }
      })

}
}
