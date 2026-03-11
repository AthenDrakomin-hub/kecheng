'use client';

import { useState, useCallback } from 'react';

interface UseCopyOptions {
  /** 复制成功后的持续时间（毫秒） */
  duration?: number;
  /** 复制成功的回调 */
  onSuccess?: () => void;
  /** 复制失败的回调 */
  onError?: (error: Error) => void;
}

interface UseCopyReturn {
  /** 复制文本 */
  copy: (text: string) => Promise<boolean>;
  /** 当前是否已复制 */
  isCopied: boolean;
  /** 复制错误 */
  error: Error | null;
}

/**
 * 复制文本到剪贴板的自定义 Hook
 */
export function useCopy(options: UseCopyOptions = {}): UseCopyReturn {
  const { duration = 2000, onSuccess, onError } = options;
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);
      onSuccess?.();
      
      setTimeout(() => {
        setIsCopied(false);
      }, duration);
      
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('复制失败');
      setError(error);
      onError?.(error);
      return false;
    }
  }, [duration, onSuccess, onError]);

  return { copy, isCopied, error };
}

/**
 * 管理多个复制状态的自定义 Hook
 */
export function useCopyMultiple() {
  const [copiedIds, setCopiedIds] = useState<Set<string>>(new Set());

  const copy = useCallback(async (text: string, id: string, duration = 2000): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIds(prev => new Set([...prev, id]));
      
      setTimeout(() => {
        setCopiedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, duration);
      
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }, []);

  const isCopied = useCallback((id: string) => copiedIds.has(id), [copiedIds]);

  return { copy, isCopied, copiedIds };
}
