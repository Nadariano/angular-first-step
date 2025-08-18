import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, LucideUser, LucideTimer } from 'lucide-angular';
import { CourseInfo } from '../../interfaces/course';

@Component({
  selector: 'app-course',
  imports: [LucideAngularModule, RouterLink],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="course().image"
        alt="Exterior photo of {{ course().name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ course().name }}</h2>
      <p class="listing-location">
        <lucide-icon [img]="LucideUser" class="my-icon" size="32" />
        {{ course().author }}
      </p>
      <p class="listing-location">
        <lucide-icon [img]="LucideTimer" class="my-icon" size="32" />
        {{ course().duration }}
      </p>
      <a [routerLink]="['/details', course().id]">Learn More</a>
    </section>
  `,
  styleUrl: './course.css',
})

export class Course {
  readonly LucideUser = LucideUser;
  readonly LucideTimer = LucideTimer;
  course = input.required<CourseInfo>();
}
