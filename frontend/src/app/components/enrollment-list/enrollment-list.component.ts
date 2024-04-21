import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {

  enrollmentSearch = ''
  name = ''
  subjects: any;
  currentSubject = null;
  currentIndex = -1;

  constructor(private enrollmentService: EnrollmentService, private subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  setActiveSubjects(subject, index): void {
    this.currentSubject = subject;
    this.currentIndex = index;
  }

  searchEnrollment(): void {
    if(this.enrollmentSearch === ''){
      this.subjects = []
      this.currentSubject = null
    }

    else {
      this.enrollmentService.findByCode(this.enrollmentSearch)
      .subscribe(
        data => {
          console.log(data)
          this.name = data[0].name
          this.searchSubjects(data[0].subj_enroll)
        },
        error => {
          console.log(error);
        });
    }
  }

  searchSubjects(subj_enroll): void {
    this.subjectService.getAll()
      .subscribe(
        data => {
          this.subjects = data.filter(subject => subj_enroll.some(studentSubjects => studentSubjects === subject.code))
        },
        error => {
          console.log(error);
      });  
  }
  

}

