import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef
  @Input() book: any = null;
  errors = []
  categories = []
  authors = []
  bookFormGroup;



  constructor(private bookService: BookService, private categoryService:CategoryService, private activatedRoute: ActivatedRoute, private authorService:AuthorService) {}

 ngOnInit(): void {

  this.bookFormGroup = new FormGroup({
    title: new FormControl(this.book.title),
    summary: new FormControl(this.book.summary),
    image_path: new FormControl(this.book.image_path),
    category_ids: new FormControl(this.book.category_ids),
    author_ids: new FormControl(this.book.author_ids)
  })





  this.categoryService.fetchCategories().subscribe({
    next: (res:any)=>{
      this.categories = res.payload.categories

    }

  })

  this.authorService.fetchAuthors().subscribe({
    next: (res:any)=>{
      this.authors = res.payload.authors
    }
  })



 }
 onSubmit() {
  const editedBook = this.bookFormGroup.value;

  this.bookService.onUpdateBook(editedBook, this.book.id).subscribe({
    next: (res)=>{
      this.closeBtn.nativeElement.click();
      this.bookService.updateBook(res)
    }
  })
 }


}
