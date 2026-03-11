'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CourseDay } from '@/types/course';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Clock,
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface CourseDetailClientProps {
  course: CourseDay;
  prevCourse?: CourseDay;
  nextCourse?: CourseDay;
}

export default function CourseDetailClient({ course, prevCourse, nextCourse }: CourseDetailClientProps) {
  const [copiedSections, setCopiedSections] = useState<Set<string>>(new Set());
  const [copiedAll, setCopiedAll] = useState(false);

  const copyToClipboard = async (text: string, sectionId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSections(prev => new Set([...prev, sectionId]));
      setTimeout(() => {
        setCopiedSections(prev => {
          const newSet = new Set(prev);
          newSet.delete(sectionId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllContent = async () => {
    const allContent = `
【第${course.day}天】${course.title}
${course.subtitle}

${course.week} | ${course.weekTheme}

${course.segments.map(s => `【${s.time}】${s.title}\n${s.content}`).join('\n\n')}

【课后作业】
${course.homework || '无'}

【次日预告】
${course.nextDayTeaser}
    `.trim();
    
    try {
      await navigator.clipboard.writeText(allContent);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  返回首页
                </Button>
              </Link>
              <Badge variant="outline">{course.week}</Badge>
            </div>
            <Button 
              onClick={copyAllContent}
              className="gap-2"
              variant={copiedAll ? "default" : "outline"}
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4" />
                  已复制全部
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  复制全部内容
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 课程标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">第{course.day}天</span>
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">{course.weekTheme}</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{course.title}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">{course.subtitle}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {course.highlights.map((highlight, idx) => (
              <Badge key={idx} variant="outline" className="gap-1" >
                <Sparkles className="w-3 h-3" />
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* 课程分段内容 */}
        <div className="space-y-4 mb-8">
          {course.segments.map((segment, index) => {
            const sectionId = `segment-${index}`;
            return (
              <Card key={index} className={`${segment.isInteractive ? "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20" : ""} overflow-hidden`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                        <Clock className="w-3 h-3" />
                        {segment.time}
                      </div>
                      <CardTitle className="text-lg">{segment.title}</CardTitle>
                      {segment.isInteractive && (
                        <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          互动环节
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(
                        `【${segment.time}】${segment.title}\n\n${segment.content}`,
                        sectionId
                      )}
                      className="gap-1 shrink-0"
                    >
                      {copiedSections.has(sectionId) ? (
                        <>
                          <Check className="w-3 h-3" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          复制
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
                    {segment.content}
                  </div>
                  {segment.image && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                      <Image
                        src={segment.image}
                        alt={segment.title}
                        width={800}
                        height={500}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 课后作业 */}
        {course.homework && (
          <Card className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>📝</span> 课后作业
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{course.homework}</p>
            </CardContent>
          </Card>
        )}

        {/* 次日预告 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>🔔</span> 次日预告
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300">{course.nextDayTeaser}</p>
          </CardContent>
        </Card>

        {/* 导航按钮 */}
        <div className="flex justify-between items-center">
          {prevCourse ? (
            <Link href={`/day/${prevCourse.day}`}>
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                第{prevCourse.day}天
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextCourse ? (
            <Link href={`/day/${nextCourse.day}`}>
              <Button variant="outline" className="gap-2">
                第{nextCourse.day}天
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>股票投资课程合集 - 系统学习投资知识</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
