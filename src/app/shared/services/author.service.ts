import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }

  fetchAuthors() {
    return this.http.get("http://localhost:3000/api/v1/authors")
  }
}
