import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})

export class AddSubjectComponent implements OnInit {
  
  subject = {
    code: '',
    name: '',
    credit: 64
  };
  submitted = false;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  saveSubject(): void {
    const data = {
      code: this.subject.code,
      name: this.subject.name,
      credit: this.subject.credit
    };

    this.subjectService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newSubject(): void {
    this.submitted = false;
    this.subject = {
      code: '',
      name: '',
      credit: 0
    };
  }

}
