import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClassesCategory } from 'src/app/core/models/classes-category-payload';
import { AddEdidClassCategoryComponent } from 'src/app/shared/add-edit-components/add-edid-class-category/add-edid-class-category.component';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-classes-category-list',
  templateUrl: './classes-category-list.component.html',
  styleUrls: ['./classes-category-list.component.css'],
})
export class ClassesCategoryListComponent implements OnInit {
  constructor(private http: SharedService, private dialog: MatDialog) {
    this.selectedClassCategory = { id: -1, name: '', description: '' };
  }

  classCategoryList: any = [];
  selectedClassCategory!: ClassesCategory;
  displayedColumns: string[] = ['id', 'name', 'description', 'options'];

  ngOnInit(): void {
    this.refreshClassCategoryList();
  }

  refreshClassCategoryList() {
    this.http.getClassCategoryList().subscribe((data) => {
      this.classCategoryList = data;
    });
  }

  onClassCategoryClick(category: ClassesCategory) {
    this.selectedClassCategory.id = category.id;
    this.selectedClassCategory.name = category.name;
    this.selectedClassCategory.description = category.description;
  }

  editClassCategory() {
    this.http
      .updateClassCategory(this.selectedClassCategory)
      .subscribe((data) => {
        this.refreshClassCategoryList();
      });
  }

  deleteClassCategory(item: number) {
    if (confirm('Are you sure you want to delete it?')) {
      this.http.deleteClassCategory(item).subscribe((data) => {
        this.refreshClassCategoryList();
        alert('Deleted successful!');
      });
    }
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    this.dialog.open(AddEdidClassCategoryComponent);
  }
}
