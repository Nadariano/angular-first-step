import { Component, inject } from '@angular/core';
import { CourseInfo } from '../../interfaces/course';
import { Course } from '../course/course';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-home',
  imports: [Course],
  template: `
    <section>
      <form class="search-fields">
        <input type="text" placeholder="Filter by name" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <!-- <div>
      <h2>What you are typing: {{ label() }}</h2>
    </div> -->
    <section class="results">
      @for(course of filteredCourseList; track $index) {
      <app-course [course]="course"></app-course>
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  courseList: CourseInfo[] = [];
  filteredCourseList: CourseInfo[] = [];
  courseService: CourseService = inject(CourseService);
  // value = input('', { transform: trimString });
  // label = computed(() => this.value().toString);

  constructor() {
     this.courseService
      .getAllCourses()
      .then((courseList: CourseInfo[]) => {
        this.courseList = courseList;
        this.filteredCourseList = courseList;
      });
    this.filteredCourseList = this.courseList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredCourseList = this.courseList;
      return;
    }
    this.filteredCourseList = this.courseList.filter((course) =>
      course?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}

// function trimString(value: string | undefined): string {
//   return value?.trim() ?? '';
// }
