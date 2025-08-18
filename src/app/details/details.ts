import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseInfo } from '../../interfaces/course';

@Component({
  selector: 'details',
  imports: [ReactiveFormsModule],
  template: `
    <div class="card">
      <img
        class="listing-photo"
        [src]="course?.image"
        alt="Exterior photo of {{ course?.name }}"
        crossorigin
      />
      <div class="listing-contents">
        <section class="listing-description">
          <h2 class="listing-heading">{{ course?.name }}</h2>
          <p class="listing-location">{{ course?.author }}, {{ course?.duration }}</p>
        </section>
        <section class="listing-features">
          <h2 class="section-heading">{{ course?.price}}</h2>
          <ul>
            <li>Description: {{ course?.description }}</li>
          </ul>
        </section>
        <section class="listing-apply">
          <h2 class="section-heading">Enrol now!</h2>
          <form [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="first-name">First Name</label>
            <input id="first-name" type="text" formControlName="firstName" />
            <label for="last-name">Last Name</label>
            <input id="last-name" type="text" formControlName="lastName" />
            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email" />
            <button type="submit" class="primary">Apply now</button>
          </form>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./details.css'],
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  courseId: Number = -1;
  course: CourseInfo | undefined;
  courseService = inject(CourseService);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const courseId = parseInt(this.route.snapshot.params['id'], 10);
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
