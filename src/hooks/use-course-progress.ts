'use client';

import { useState, useEffect, useCallback } from 'react';

interface CourseProgress {
  /** 已学习的课程天数列表 */
  completedDays: number[];
  /** 最后学习的课程天数 */
  lastVisitedDay: number | null;
  /** 总学习时长（分钟） */
  totalStudyTime: number;
}

const STORAGE_KEY = 'course-progress';

const defaultProgress: CourseProgress = {
  completedDays: [],
  lastVisitedDay: null,
  totalStudyTime: 0,
};

/**
 * 课程进度追踪 Hook
 */
export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从 localStorage 加载进度
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load progress:', err);
    }
    setIsLoaded(true);
  }, []);

  // 保存到 localStorage
  const saveProgress = useCallback((newProgress: CourseProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  }, []);

  // 标记课程为已完成
  const markCompleted = useCallback((day: number) => {
    setProgress(prev => {
      if (prev.completedDays.includes(day)) return prev;
      const newProgress = {
        ...prev,
        completedDays: [...prev.completedDays, day].sort((a, b) => a - b),
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // 取消课程完成标记
  const unmarkCompleted = useCallback((day: number) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        completedDays: prev.completedDays.filter(d => d !== day),
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // 更新最后访问的课程
  const updateLastVisited = useCallback((day: number) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        lastVisitedDay: day,
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // 增加学习时长
  const addStudyTime = useCallback((minutes: number) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        totalStudyTime: prev.totalStudyTime + minutes,
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // 检查课程是否已完成
  const isCompleted = useCallback((day: number) => {
    return progress.completedDays.includes(day);
  }, [progress.completedDays]);

  // 获取完成进度百分比
  const getCompletionRate = useCallback((totalDays: number) => {
    if (totalDays === 0) return 0;
    return Math.round((progress.completedDays.length / totalDays) * 100);
  }, [progress.completedDays.length]);

  // 重置进度
  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    saveProgress(defaultProgress);
  }, [saveProgress]);

  return {
    progress,
    isLoaded,
    markCompleted,
    unmarkCompleted,
    updateLastVisited,
    addStudyTime,
    isCompleted,
    getCompletionRate,
    resetProgress,
  };
}
