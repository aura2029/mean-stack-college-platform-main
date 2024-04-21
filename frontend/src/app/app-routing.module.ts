import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsListComponent } from './components/subject-list/subject-list.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component'; 
import { AddEnrollmentComponent } from './components/add-enrollment/add-enrollment.component';  
import { EnrollmentListComponent } from './components/enrollment-list/enrollment-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'subjects', pathMatch: 'full' },
  { path: 'subjects', component: SubjectsListComponent },
  { path: 'subjects/:id', component: SubjectDetailsComponent },
  { path: 'add-subj', component: AddSubjectComponent },
  { path: 'add-enroll', component: AddEnrollmentComponent },
  { path: 'enrollments', component: EnrollmentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
