import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { SubjectsListComponent } from './components/subject-list/subject-list.component';
import { AddEnrollmentComponent } from './components/add-enrollment/add-enrollment.component';
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSubjectComponent,
    SubjectDetailsComponent,
    SubjectsListComponent,
    AddEnrollmentComponent,
    EnrollmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
