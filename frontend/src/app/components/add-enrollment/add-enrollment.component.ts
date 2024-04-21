import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-enrollment',
  templateUrl: './add-enrollment.component.html',
  styleUrls: ['./add-enrollment.component.css']
})

export class AddEnrollmentComponent implements OnInit {

  enrollment = {
    nro_enroll: '',
    name: '',
    subj_enroll: []
  };
  submitted = false;

  subjects: any;

  constructor(private enrollmentService: EnrollmentService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.retrieveSubjects();  
  }

  saveEnrollment(): void {
    const data = {
      nro_enroll: this.enrollment.nro_enroll,
      name: this.enrollment.name,
      subj_enroll: this.enrollment.subj_enroll
    };

    this.enrollmentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newEnrollment(): void {
    this.submitted = false;
    this.enrollment = {
      nro_enroll: '',
      name: '',
      subj_enroll: []
    };

    console.log(this.enrollment);
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

  enrollments = [];
  onCheckboxChange(event) {
    if (event.target.checked) {
      this.enrollments.push(event.target.value);
      console.log(this.enrollments);
    } else {
      this.enrollments.splice(this.enrollments.indexOf(event.target.value), 1);
      console.log(this.enrollments);
    }

    this.enrollment.subj_enroll = this.enrollments;
  }
}
