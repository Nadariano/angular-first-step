import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { CourseInfo } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';
import { CourseCreatorComponent } from '../course-creator/course-creator.component';
import { CourseComponent } from "../course/course.component";

@Component({
  selector: 'app-home',
  imports: [
    CourseCreatorComponent,
    CardModule,
    CommonModule,
    ButtonModule,
    RatingModule,
    DialogModule,
    CourseComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private messageService = inject(MessageService);
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  courseList = signal<CourseInfo[]>([]);
  filteredCourseList = signal<CourseInfo[]>([]);
  courseService: CourseService = inject(CourseService);
  showForm = signal<boolean>(false);

  previewVisible = false;
  selectedCourse: CourseInfo | null = null;

  constructor() {
    this.loadCourses(null);
  }

  async loadCourses(searchStr: string | null) {
    const courses = await this.courseService.getAllCourses(searchStr);
    this.courseList.set(courses);
    this.filteredCourseList.set(courses);
  }

  filterResults(text: string) {
    this.loadCourses(text);
  }

  toggleForm() {
    this.showForm.update((v: boolean) => !v);
  }

  async onCourseAdded(course: CourseInfo) {
    await this.loadCourses(null);
    this.showForm.set(false);

    this.messageService.add({
      severity: 'success',
      summary: '✅ Course Created',
      detail: `The course "${course.name}" was added successfully! 🚀`,
    });
  }

  async onCourseAddedToFav(course: CourseInfo) {
    await this.loadCourses(null);
    this.messageService.add({
      severity: course.isFav ? 'success' : 'info',
      summary: course.isFav
        ? '❤️ Added to Favorites'
        : '💔 Removed from Favorites',
      detail: `The course "${course.name}" is now ${
        course.isFav ? 'in' : 'out of'
      } your favorites.`,
    });
  }

  addToCart(course: CourseInfo) {
    this.messageService.add({
      severity: 'success',
      summary: 'Added to Cart',
      detail: `"${course.name}" was added to your cart.`,
    });
  }

  previewCourse(course: CourseInfo) {
    this.selectedCourse = course;
    this.previewVisible = true;
  }
}
