import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CourseInfo } from '../interfaces/course';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  COURSE_URL = 'https://6537443cbb226bb85dd30234.mockapi.io/courses';
  FAV_COURSE_URL = 'https://6537443cbb226bb85dd30234.mockapi.io/my_favorites';

  constructor(private http: HttpClient) {}

  async createCourse(newCourse: CourseInfo): Promise<CourseInfo | null> {
    try {
      const response$ = this.http.post<CourseInfo>(this.COURSE_URL, newCourse);
      return await firstValueFrom(response$);
    } catch (err) {
      console.error('Create failed', err);
      return null;
    }
  }

  async getAllCourses(searchStr: string | null): Promise<CourseInfo[]> {
    try {
      let params = new HttpParams();
      if (searchStr && searchStr.trim() !== '') {
        params = params.set('name', searchStr);
      }
      const response$ = this.http.get<CourseInfo[]>(this.COURSE_URL, { params });
      return await firstValueFrom(response$);
    } catch (err) {
      console.error('Fetch failed', err);
      return [];
    }
  }

  async getCourseById(courseId: number): Promise<CourseInfo | undefined> {
    try {
      const response$ = this.http.get<CourseInfo>(`${this.COURSE_URL}/${courseId}`);
      return await firstValueFrom(response$);
    } catch (err) {
      console.error('Fetch by id failed', err);
      return undefined;
    }
  }

  async updateCourse(courseId: string, updatedCourse: CourseInfo): Promise<CourseInfo | null> {
    try {
      const response$ = this.http.put<CourseInfo>(`${this.COURSE_URL}/${courseId}`, updatedCourse);
      return await firstValueFrom(response$);
    } catch (err) {
      console.error('Update failed', err);
      return null;
    }
  }

  async toggleFavorite(course: CourseInfo): Promise<CourseInfo | null> {
    try {
      const response$ = this.http.put<CourseInfo>(`${this.COURSE_URL}/${course.id}`, {
        ...course,
        isFav: !course.isFav,
      });
      return await firstValueFrom(response$);
    } catch (err) {
      console.error('Toggle fav failed', err);
      return null;
    }
  }

  async deleteCourse(courseId: string): Promise<void> {
    try {
      const response$ = this.http.delete<void>(`${this.COURSE_URL}/${courseId}`);
      await firstValueFrom(response$);
      console.log(`Deleted course with id: ${courseId}`);
    } catch (err) {
      console.error('Delete failed', err);
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Course application received: firstName:${firstName}, lastName: ${lastName}, email: ${email}`
    );
  }
}
