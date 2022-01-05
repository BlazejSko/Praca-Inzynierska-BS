import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from 'src/app/core/models/classroom';

@Component({
  selector: 'app-add-edit-classroom',
  templateUrl: './add-edit-classroom.component.html',
  styleUrls: ['./add-edit-classroom.component.css']
})
export class AddEditClassroomComponent implements OnInit {

  constructor() { }

  @Input() classroom!: Classroom;
  ClassroomId!: string;
  ClassroomName!: string;
  ngOnInit(): void {
    // this.ClassroomId = this.classroom.id;
    this.ClassroomName = this.classroom.name;
  }
  
  addClassroom(){

  }

  updateClassroom(){

  }
}
