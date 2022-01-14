import { Component, OnInit } from '@angular/core';
import { Classes } from 'src/app/core/models/classes';
import { AddClasses } from 'src/app/core/models/classes-add';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {

  constructor(private http: SharedService) { }
  classesList!: any;
  selectedClass!: Classes;
  addClasses!: AddClasses;
  displayedColumns: string[] = ['id', 'trainer', 'classroom', 'start_date', 'class_category', 'capacity', 'options'];
  ngOnInit(): void {
    this.refreshClassesList();
    this.selectedClass = {    
      id: -1,
      trainer: 'trainer',
      classroom: 'Big hall',
      start_date: '2022-01-07T14:46:00Z',
      end_date: '2022-01-07T14:46:00Z',
      max_capacity: -1,
      current_capacity: 0,
      class_category: 'Tabata',
      participants: []
    
    };
  }

  refreshClassesList(){
    this.http.getClassesList().subscribe((data: any)=> {
      this.classesList = data;
    });
  }

  addClass(){
    this.http.addClass(this.selectedClass).subscribe(
      data => {
        this.classesList.push(data);
        this.refreshClassesList();
      });
  }

  deleteClass(id: number) {
    if(confirm("Are you sure you want to delete it?")){
      this.http.deleteClass(id).subscribe(
        data=> {
          this.refreshClassesList()
        }
      )
    }
  }
  
  show(clas: Classes){
    console.log(clas);
    console.log("TUUU", this.classesList);
  }
}
