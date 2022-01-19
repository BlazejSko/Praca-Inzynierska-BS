import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/app/core/models/classroom';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {

  constructor(private http: SharedService) { 
    this.selectedClassroom = {id: -1, name: '', url:''}
  }
  ClassroomList: any = [];
  selectedClassroom!: Classroom;
  displayedColumns: string[] = ['id', 'name'];

  ngOnInit(): void {
    this.refreshClassroomsList();
  }
  show(){
    console.log(this.ClassroomList)
  }

  refreshClassroomsList(){
    this.http.getClassroomsList().subscribe((data)=>{
      this.ClassroomList = data;
    });
  }

  addClassroom(){
    this.http.addClassroom(this.selectedClassroom).subscribe(
      data => {
        this.ClassroomList.push(data);
      }
    )
  }

  editClassroom(){
    this.http.updateClassroom(this.selectedClassroom).subscribe(
      data => {
        this.refreshClassroomsList();
      }
    )
  }
  classroomClicked(classroom: Classroom){
    this.http.getOneClassroom(classroom.id).subscribe(data=>{
      this.selectedClassroom = data;
    })
  }

  deleteClassroom(item: number){
    this.http.deleteClassroom(item).subscribe((data) => {
      this.refreshClassroomsList();
    });
  }

}
