import { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';
import { PerformanceMonitor } from '@/utils/performance';

// Hook for performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const startTime = useRef(performance.now());
  const hasMeasured = useRef(false);
  
  // Use useLayoutEffect for more accurate timing measurements
  useLayoutEffect(() => {
    // Only measure once per component mount
    if (!hasMeasured.current) {
      const monitor = PerformanceMonitor.getInstance();
      monitor.measureRender(componentName, startTime.current);
      hasMeasured.current = true;
    }
  }, [componentName]); // Include componentName in dependencies
}

// Hook for debounced callbacks
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

// Hook for throttled callbacks
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCallRef = useRef(0);
  
  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    }) as T,
    [callback, delay]
  );
}

// Hook for intersection observer (lazy loading)
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);
  
  return isIntersecting;
}

// Hook for memory usage monitoring
export function useMemoryUsage() {
  const [memoryUsage, setMemoryUsage] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);
  
  useEffect(() => {
    // Skip in production unless explicitly enabled
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING) {
      return;
    }
    
    if (typeof window === 'undefined' || !('memory' in performance)) return;
    
    const updateMemoryUsage = () => {
      const memory = (performance as any).memory;
      setMemoryUsage({
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      });
    };
    
    updateMemoryUsage();
    const interval = setInterval(updateMemoryUsage, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return memoryUsage;
}

// Hook for component visibility tracking
export function useVisibilityChange(callback: (isVisible: boolean) => void) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      callback(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [callback]);
}
