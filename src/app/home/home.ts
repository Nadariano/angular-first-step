import { Component, inject, signal } from '@angular/core';
import { CourseInfo } from '../../interfaces/course';
import { Course } from '../course/course';
import { CourseService } from '../../services/course.service';
import { NgForm } from '@angular/forms';
import { CourseCreator } from '../course-creator/course-creator';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [Course, CourseCreator],
  template: `
    <section>
      <form class="search-fields">
        <input type="text" placeholder="Filter by name" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <button (click)="toggleForm()">
      {{ showForm() ? 'Close Form' : 'Add Course' }}
    </button>
    @if (showForm()) {
    <app-course-creator (courseAdded)="addCourse($event)"></app-course-creator>
    }
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
  showForm = signal<boolean>(false);

  constructor() {
    this.courseService.getAllCourses().then((courseList: CourseInfo[]) => {
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

  toggleForm() {
    this.showForm.update((v: boolean) => !v);
  }

  addCourse(newCourse: CourseInfo) {
    // this.courseList.update(c => [...c, newCourse]);
    this.showForm.set(false);
  }
}
