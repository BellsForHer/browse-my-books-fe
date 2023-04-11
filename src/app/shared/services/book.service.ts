import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  fetchBooks() {
    return this.http.get('http://localhost:3000/api/v1/books/browse')
  }

  fetchLibrary() {
    return this.http.get('http://localhost:3000/api/v1/books/library')
  }
}
