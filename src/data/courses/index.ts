import { CourseDay, CourseModule } from '@/types/course';
import { courseModules } from './modules';
import { week1Courses } from './week1';
import { week2Courses } from './week2';
import { week3Courses } from './week3';

// 重新导出课程模块
export { courseModules };

// 合并所有课程数据
export const courseDays: CourseDay[] = [
  ...week1Courses,
  ...week2Courses,
  ...week3Courses
];

// 按周导出
export { week1Courses, week2Courses, week3Courses };

// 获取指定周的课程
export function getCoursesByWeek(week: number): CourseDay[] {
  switch (week) {
    case 1:
      return week1Courses;
    case 2:
      return week2Courses;
    case 3:
      return week3Courses;
    default:
      return [];
  }
}

// 获取指定日期的课程
export function getCourseByDay(day: number): CourseDay | undefined {
  return courseDays.find(c => c.day === day);
}

// 获取课程总数
export function getTotalCourses(): number {
  return courseDays.length;
}

// 获取周数
export function getTotalWeeks(): number {
  return courseModules.length;
}
