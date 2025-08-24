import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { CourseInfo } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'course-details',
  imports: [ReactiveFormsModule, CurrencyPipe, UpperCasePipe, CardModule, BadgeModule, TagModule, ButtonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  courseId: string = "-1";
  course: CourseInfo | undefined;
  courseService = inject(CourseService);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const courseId = this.route.snapshot.params['id'];
    this.courseService.getCourseById(courseId).then((course) => {
      this.course = course;
    });
  }

  submitApplication() {
    this.courseService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
