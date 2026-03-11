// 向后兼容的导出
// 实际数据已拆分到 ./courses/ 目录下
export { 
  courseModules, 
  courseDays, 
  week1Courses, 
  week2Courses, 
  week3Courses,
  getCoursesByWeek,
  getCourseByDay,
  getTotalCourses,
  getTotalWeeks
} from './courses/index';
