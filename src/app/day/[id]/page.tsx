import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateCourseMetadata, generateStaticParams, getCourseData, getAdjacentCourses } from '@/lib/course-seo';
import CourseDetailClient from './CourseDetailClient';

// 生成静态参数
export { generateStaticParams };

// 生成动态 metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return generateCourseMetadata(parseInt(id));
}

// 服务端组件
export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const day = parseInt(id);
  const course = getCourseData(day);

  if (!course) {
    notFound();
  }

  const { prevCourse, nextCourse } = getAdjacentCourses(day);

  return (
    <CourseDetailClient 
      course={course} 
      prevCourse={prevCourse} 
      nextCourse={nextCourse} 
    />
  );
}
