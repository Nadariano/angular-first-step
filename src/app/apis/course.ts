import axios from "axios";
import { CourseInfo } from "../../interfaces/course";

const COURSE_URL = "https://6537443cbb226bb85dd30234.mockapi.io/courses";
const FAV_COURSE_URL = "https://6537443cbb226bb85dd30234.mockapi.io/my_favorites";

export const createCourse = async (newCourse: CourseInfo) => {
  try {
    const response = await axios.post(COURSE_URL, newCourse);
    console.log("Created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const getAllCourses = async () => {
  try {
    const response = await axios.get(COURSE_URL);
    console.log("Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const updateCourse = async (courseId: string, updatedCourse: CourseInfo) => {
  try {
    const response = await axios.put(`${COURSE_URL}/${courseId}`, updatedCourse);
    console.log("Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    await axios.delete(`${COURSE_URL}/${courseId}`);
    console.log(`Deleted course with id: ${courseId}`);
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};
