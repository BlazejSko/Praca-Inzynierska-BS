import { Component, OnInit } from '@angular/core';
import { ClassesCategory } from 'src/app/core/models/classes-category-payload';
import { PaginatedList } from 'src/app/core/models/paginated-list-type';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-classes-category-list',
  templateUrl: './classes-category-list.component.html',
  styleUrls: ['./classes-category-list.component.css']
})
export class ClassesCategoryListComponent implements OnInit {

  constructor(private http: SharedService) { 
    this.selectedClassCategory = {id: -1, name: '', description: ''};
  }

  classCategoryList: any = [];
  selectedClassCategory!: ClassesCategory;

  ngOnInit(): void {
    this.refreshClassCategoryList();
  }

  refreshClassCategoryList(){
    this.http.getClassCategoryList().subscribe(data=> {
      this.classCategoryList = data;
    });
  }

  onClassCategoryClick(category: ClassesCategory){
    this.selectedClassCategory.id = category.id;
    this.selectedClassCategory.name = category.name;
    this.selectedClassCategory.description = category.description;
  }

  addClassCategory(){
    this.http.addClassCategory(this.selectedClassCategory).subscribe(
      data => {
        this.classCategoryList.push(data);
      }
    )
  }

  editClassCategory(){
    this.http.updateClassCategory(this.selectedClassCategory).subscribe(
      data => {
        this.refreshClassCategoryList();
      }
    )
  }

  deleteClassCategory(item: number){
    this.http.deleteClassCategory(item).subscribe((data) => {
      this.refreshClassCategoryList();
    });
  }

  show(){
    if(confirm("Are you sure?")){
      console.log(this.classCategoryList);
    }
    
  }
}
