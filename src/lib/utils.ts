import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Course} from "@/types/course";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function findCourses(query: string, courses: Course[]): Course[] {
  if (!query) return courses;

  const lowerCaseQuery = query.toLowerCase();

  return courses.filter(course =>
      course.author.toLowerCase().includes(lowerCaseQuery) ||
      course.title.toLowerCase().includes(lowerCaseQuery) ||
      course.subtitle.toLowerCase().includes(lowerCaseQuery) ||
      course.description.toLowerCase().includes(lowerCaseQuery)
  );
}
