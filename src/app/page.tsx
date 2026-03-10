'use client';

import { useState } from 'react';
import Link from 'next/link';
import { courseDays, courseModules } from '@/data/courseData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Calendar, 
  Search, 
  ChevronRight,
  GraduationCap,
  Target,
  Star,
  Clock
} from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCourses = courseDays.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.weekTheme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">钟格传奇投资特训营</h1>
                <p className="text-sm text-slate-500">从400元到20亿的投资心法 | 三周精华内容</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800">
              <Star className="w-3 h-3 mr-1" />
              价值千万的实战课程
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 课程特色 */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">🌟 课程特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold">真实经历穿插</div>
                <div className="text-sm opacity-80">每节课都有真实投资故事</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">💬</div>
                <div className="font-semibold">通俗易懂讲解</div>
                <div className="text-sm opacity-80">避免专业术语，生活化语言</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-semibold">实战案例导向</div>
                <div className="text-sm opacity-80">理论结合实战案例分析</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold">循序渐进学习</div>
                <div className="text-sm opacity-80">从基础到进阶，层层深入</div>
              </div>
            </div>
          </div>
        </section>

        {/* 课程体系概览 */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">课程体系</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseModules.map((module) => (
              <Card key={module.id} className="hover:shadow-lg transition-shadow border-2 hover:border-blue-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
                      <span className="text-lg font-bold text-white">{module.id}</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base mb-1">{module.title}</CardTitle>
                      <CardDescription className="text-sm">{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 搜索栏 */}
        <section className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="搜索课程主题..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </section>

        {/* 课程列表 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">{courseDays.length}天课程安排</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <Link key={course.day} href={`/day/${course.day}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:border-blue-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                        <span className="text-lg font-bold text-white">第{course.day}天</span>
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="text-xs mb-1">{course.week}</Badge>
                        <CardTitle className="text-base leading-tight">{course.title}</CardTitle>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <CardDescription className="text-sm">{course.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {course.highlights.slice(0, 4).map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{course.segments.length}个分段内容</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500">
            <p>课件记录系统 - 方便讲课复制讲解</p>
            <p className="mt-1">30年投资智慧浓缩成{courseDays.length}天精华内容</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
