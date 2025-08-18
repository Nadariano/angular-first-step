import { Injectable } from '@angular/core';
import axios from 'axios';
import { CourseInfo } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  COURSE_URL = 'https://6537443cbb226bb85dd30234.mockapi.io/courses';
  FAV_COURSE_URL = 'https://6537443cbb226bb85dd30234.mockapi.io/my_favorites';

  createCourse = async (newCourse: CourseInfo) => {
    try {
      const response = await axios.post(this.COURSE_URL, newCourse);
      console.log('Created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  async getAllCourses(): Promise<CourseInfo[]> {
    try {
      const response = await axios.get(this.COURSE_URL);
      console.log('Fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  async getCourseById(courseId: number): Promise<CourseInfo | undefined> {
    const response = await axios.get(`${this.COURSE_URL}/${courseId}`);
    return response.data ?? {};
  }

  async updateCourse(courseId: string, updatedCourse: CourseInfo): Promise<CourseInfo | null> {
    try {
      const response = await axios.put(`${this.COURSE_URL}/${courseId}`, updatedCourse);
      console.log('Updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      return null;
    }
  };

  async deleteCourse(courseId: string): Promise<void> {
    try {
      await axios.delete(`${this.COURSE_URL}/${courseId}`);
      console.log(`Deleted course with id: ${courseId}`);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName:${firstName}, lastName: ${lastName}, emai: ${email}`
    );
  }
}
