import { Environment } from '@/constants/enums';
import React from 'react';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure component render time
  measureRender(componentName: string, startTime: number): void {
    // Skip performance monitoring in production unless explicitly enabled
    if (process.env.NODE_ENV === Environment.PRODUCTION && !process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING) {
      return;
    }
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    if (!this.metrics.has(componentName)) {
      this.metrics.set(componentName, []);
    }
    
    const times = this.metrics.get(componentName)!;
    times.push(renderTime);
    
    // Keep only last 100 measurements
    if (times.length > 100) {
      times.shift();
    }
    
    // Log slow renders in development
    if (process.env.NODE_ENV === Environment.DEVELOPMENT && renderTime > 16) {
      console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
  }

  // Get average render time for a component
  getAverageRenderTime(componentName: string): number {
    const times = this.metrics.get(componentName);
    if (!times || times.length === 0) return 0;
    
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }

  // Get all metrics
  getAllMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [componentName] of this.metrics) {
      result[componentName] = this.getAverageRenderTime(componentName);
    }
    return result;
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics.clear();
  }
}

// Higher-order component for performance monitoring
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceMonitoredComponent(props: P) {
    const startTime = React.useRef(performance.now());
    
    React.useEffect(() => {
      const monitor = PerformanceMonitor.getInstance();
      monitor.measureRender(componentName, startTime.current);
    }, []); // Only run once on mount
    
    return React.createElement(Component, props);
  };
}

// Hook for measuring performance
export function usePerformanceMonitor(componentName: string) {
  const startTime = React.useRef(performance.now());
  const hasMeasured = React.useRef(false);
  
  React.useLayoutEffect(() => {
    // Only measure once per component mount
    if (!hasMeasured.current) {
      const monitor = PerformanceMonitor.getInstance();
      monitor.measureRender(componentName, startTime.current);
      hasMeasured.current = true;
    }
  }, [componentName]); // Include componentName in dependencies
}

// Web Vitals monitoring
export function measureWebVitals() {
  if (typeof window === 'undefined') return;
  
  // Skip in production unless explicitly enabled
  if (process.env.NODE_ENV === Environment.PRODUCTION && !process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING) {
    return;
  }

  // Measure Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
          console.log('LCP:', entry.startTime);
        }
      }
      if (entry.entryType === 'layout-shift') {
        if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
          console.log('CLS:', (entry as any).value);
        }
      }
    }
  });

  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
}

// Memory usage monitoring
export function getMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) return null;
  
  const memory = (performance as any).memory;
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
  };
}

// Bundle size analyzer helper
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return null;
  
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  return {
    scripts: scripts.length,
    stylesheets: stylesheets.length,
    totalResources: scripts.length + stylesheets.length,
  };
}
