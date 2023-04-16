import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AuthorService } from '../../services/author.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit{
@ViewChild('closeBtn') closeBtn: ElementRef
categories: any = []
authors: any = []
errors:any = []

bookFormGroup = new FormGroup({
  title: new FormControl(''),
  summary: new FormControl(''),
  image_path: new FormControl(''),
  category_ids: new FormControl(''),
  author_ids: new FormControl('')
})

  constructor(private categoryService:CategoryService, private authorService:AuthorService, private bookService: BookService) {}

  ngOnInit(): void {
    this.categoryService.fetchCategories().subscribe({
      next: (res:any)=>{
        console.log("CategoriesResponse", res)
        this.categories = res.payload.categories
      }
    })
    this.authorService.fetchAuthors().subscribe({
      next: (res:any)=>{
        console.log("Authors Response", res)
        this.authors = res.payload.authors
      }
    })

  }

  onSubmit() {
    const newBook = this.bookFormGroup.value;

    this.bookService.createBook(newBook).subscribe({
      next: (res:any)=>{
        this.closeBtn.nativeElement.click();
        this.bookService.onAddBook(res.payload.book)
        console.log(res)
      },
      error: (errorRes)=>{
        this.errors= errorRes.error.errors;
        console.log(errorRes)
      }
    })

  }
}
