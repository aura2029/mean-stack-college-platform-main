import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectsListComponent implements OnInit {

  subjects: any;
  currentSubject = null;
  currentIndex = -1;
  code = '';

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.retrieveSubjects();
  }

  retrieveSubjects(): void {
    this.subjectService.getAll()
      .subscribe(
        data => {
          this.subjects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveSubjects();
    this.currentSubject = null;
    this.currentIndex = -1;
  }

  setActiveSubjects(subject, index): void {
    this.currentSubject = subject;
    this.currentIndex = index;
    
  }

  removeAllSubjects(): void {
    this.subjectService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchCode(): void {
    this.subjectService.findByCode(this.code)
      .subscribe(
        data => {
          this.subjects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
