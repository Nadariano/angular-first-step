import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseInfo } from '../../interfaces/course';

@Component({
  selector: 'app-course-creator',
  imports: [ReactiveFormsModule],
  templateUrl: './course-creator.html',
  styleUrls: ['./course-creator.css']
})
export class CourseCreator {
  courseForm: FormGroup;

  @Output() courseAdded = new EventEmitter<CourseInfo>();

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      author: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const newCourse: CourseInfo = this.courseForm.value;
      this.courseAdded.emit(newCourse);
      this.courseForm.reset();
    }
  }
}
