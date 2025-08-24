import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  LucideHeart,
  LucideTimer,
  LucideUser,
} from 'lucide-angular';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { CourseInfo } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  imports: [LucideAngularModule, RouterLink, CurrencyPipe, CardModule, TagModule, BadgeModule, ButtonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {
  themeColor = '';

  @Output() favCourseAdded = new EventEmitter<CourseInfo>();

  readonly LucideUser = LucideUser;
  readonly LucideTimer = LucideTimer;
  readonly LucideHeart = LucideHeart;
  course = input.required<CourseInfo>();
  courseService = inject(CourseService);

  toggleFav(course: CourseInfo) {
    this.courseService.toggleFavorite(course).then((course) => {
      if (course !== null) {
        this.favCourseAdded.emit(course);
      }
    });
  }
}
