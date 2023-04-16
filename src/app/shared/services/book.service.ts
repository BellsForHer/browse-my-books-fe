import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Subject } from 'rxjs';

const URL = 'http://localhost:3000/api/v1/'

@Injectable({
  providedIn: 'root'

})

export class BookService {
  currentUserBooks = []
  bookSubject: Subject<any> = new Subject
  detailBookSubject: Subject<any> = new Subject

  constructor(private http:HttpClient) { }

  fetchBooks() {
    return this.http.get(`${URL}/books/browse`)
  }

  fetchLibrary() {

    const token = JSON.parse(localStorage.getItem('token'));

   return this.http.get("http://localhost:3000/api/v1/books/library", {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }


  fetchBook(id:number) {
    return this.http.get(`${URL}/books/${id}`)
  }

  createBook(book) {
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.post("http://localhost:3000/api/v1/books/", book, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

  }

  onAddBook(book) {
    this.onSetBooks([...this.currentUserBooks, book])
  }

  onSetBooks(books) {
    this.currentUserBooks = books;
    this.bookSubject.next(books);
  }

  onUpdateBook(updatedBook, id) {
    const token = JSON.parse(localStorage.getItem('token'))

    return this.http.put(`http://localhost:3000/api/v1/books/${id}`,
    updatedBook, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  }
  updateBook(editBook){

    this.detailBookSubject.next(editBook)
    const index = this.currentUserBooks.findIndex(book => book.id === editBook.id)
    this.currentUserBooks[index] = editBook
    this.onSetBooks(this.currentUserBooks)
   }

   deleteBook(id) {
    const token = JSON.parse(localStorage.getItem('token'))

    return this.http.delete(`http://localhost:3000/api/v1/books/${id}`,{
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
   }
}
