import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

export const routes: Routes = [
   {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: CourseDetailsComponent,
    title: 'Course details',
    data: {
      renderMode: 'server', //prevent re-render
    },
  },
];
