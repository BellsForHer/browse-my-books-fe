import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

const URL = 'http://localhost:3000/api/v1/'

@Injectable({
  providedIn: 'root'

})

export class BookService {


  constructor(private http:HttpClient, private authService: AuthService) { }

  fetchBooks() {
    return this.http.get(`${URL}/books/browse`)
  }

  fetchLibrary() {

    const token = this.authService.getToken();

   return this.http.get("http://localhost:3000/api/v1/books/library", {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }


  fetchBook(id:number) {
    return this.http.get(`${URL}/books/${id}`)
  }
}
