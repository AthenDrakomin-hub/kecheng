import { Metadata } from 'next';
import { courseDays } from '@/data/courseData';

// 生成课程详情页的动态 metadata
export function generateCourseMetadata(day: number): Metadata {
  const course = courseDays.find(c => c.day === day);
  
  if (!course) {
    return {
      title: '课程未找到',
      description: '该课程不存在',
    };
  }

  return {
    title: `第${course.day}天 ${course.title}`,
    description: course.subtitle,
    keywords: [...course.highlights, course.weekTheme, '股票投资', '投资课程'],
    openGraph: {
      title: `第${course.day}天 ${course.title} | 股票投资课程合集`,
      description: course.subtitle,
      type: 'article',
      locale: 'zh_CN',
    },
  };
}

// 生成所有课程的静态参数（用于静态生成）
export function generateStaticParams() {
  return courseDays.map((course) => ({
    id: course.day.toString(),
  }));
}

// 获取课程数据
export function getCourseData(day: number) {
  return courseDays.find(c => c.day === day);
}

// 获取相邻课程
export function getAdjacentCourses(day: number) {
  const prevCourse = courseDays.find(c => c.day === day - 1);
  const nextCourse = courseDays.find(c => c.day === day + 1);
  return { prevCourse, nextCourse };
}
