import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseInfo } from '../../interfaces/course';
import { CourseService } from '../../services/course.service'; // 👈 import your service
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-course-creator',
  imports: [ReactiveFormsModule, ButtonModule, FloatLabelModule, NgIf],
  templateUrl: './course-creator.component.html',
  styleUrls: ['./course-creator.component.scss'],
})
export class CourseCreatorComponent {
  courseForm: FormGroup;

  @Output() courseAdded = new EventEmitter<CourseInfo>();
  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(150)]],
      image: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      duration: [4, [Validators.required, Validators.min(4), Validators.max(20)]],
      price: [100, [Validators.required, Validators.min(100), Validators.max(500)]],
    });

  }

  onCancel() {
    this.close.emit();
  }

  async onSubmit() {
    if (this.courseForm.valid) {
      const newCourse: CourseInfo = this.courseForm.value;

      try {
        const created = await this.courseService.createCourse(newCourse);
        if (created) {
          this.courseAdded.emit(created);
          this.courseForm.reset();
        }
      } catch (err) {
        console.error('Create failed', err);
      }
    }
  }
}
