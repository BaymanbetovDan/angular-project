import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faRemove, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryForm: FormGroup

  removeIcon = faRemove
  editIcon = faEdit

  categoryId: number = 0
  title: string = ''
  method: 'create' | 'update' = 'create'


  constructor(public categoryService: CategoryService) {
    this.categoryForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.categoryService.findAll()
  }

  onSubmit() {
    if (this.categoryForm.valid && this.method === 'create') {
      this.categoryService.create(this.categoryForm.value.title)
      this.categoryForm.reset()
    } else {
      this.update()
      this.categoryForm.reset()
      this.method = 'create'
    }
  }

  delete(id: number) {
    this.categoryService.delete(id)
  }

  update() {
    this.categoryService.update(this.categoryId, this.categoryForm.value.title)
  }

  edit(id: number, title: string) {
    this.categoryId = id
    this.categoryForm.setValue({ title })
    this.method = 'update'
  }
}
