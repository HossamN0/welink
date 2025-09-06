'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PerformanceMonitor, getMemoryUsage, analyzeBundleSize } from '@/utils/performance';
import { useMemoryUsage } from '@/hooks/usePerformance';
import { Environment } from '@/constants/enums';

interface PerformanceDashboardProps {
  isVisible?: boolean;
}

export default function PerformanceDashboard({ isVisible = false }: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [memoryUsage, setMemoryUsage] = useState<any>(null);
  const [bundleInfo, setBundleInfo] = useState<any>(null);
  const memoryHook = useMemoryUsage();

  // Memoize the formatBytes function to prevent recreation on every render
  const formatBytes = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Memoize the updateMetrics function to prevent recreation
  const updateMetrics = useCallback(() => {
    const monitor = PerformanceMonitor.getInstance();
    setMetrics(monitor.getAllMetrics());
    setMemoryUsage(getMemoryUsage());
    setBundleInfo(analyzeBundleSize());
  }, []);

  useEffect(() => {
    // Skip in production unless explicitly enabled
    if (process.env.NODE_ENV === Environment.PRODUCTION && !process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING) {
      return;
    }

    if (!isVisible) return;

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);

    return () => clearInterval(interval);
  }, [isVisible, updateMetrics]);

  // Memoize the current memory data to prevent unnecessary recalculations
  const currentMemoryData = useMemo(() => {
    return memoryUsage || memoryHook;
  }, [memoryUsage, memoryHook]);

  // Early return for production
  if (process.env.NODE_ENV === Environment.PRODUCTION && !process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
      <h3 className="text-sm font-bold mb-2">Performance Dashboard</h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Component Render Times:</strong>
          {Object.entries(metrics).map(([component, time]) => (
            <div key={component} className="ml-2">
              {component}: {time.toFixed(2)}ms
            </div>
          ))}
        </div>
        
        {currentMemoryData && (
          <div>
            <strong>Memory Usage:</strong>
            <div className="ml-2">
              Used: {formatBytes(currentMemoryData?.usedJSHeapSize || 0)}
            </div>
            <div className="ml-2">
              Total: {formatBytes(currentMemoryData?.totalJSHeapSize || 0)}
            </div>
            <div className="ml-2">
              Limit: {formatBytes(currentMemoryData?.jsHeapSizeLimit || 0)}
            </div>
          </div>
        )}
        
        {bundleInfo && (
          <div>
            <strong>Bundle Info:</strong>
            <div className="ml-2">Scripts: {bundleInfo.scripts}</div>
            <div className="ml-2">Stylesheets: {bundleInfo.stylesheets}</div>
            <div className="ml-2">Total Resources: {bundleInfo.totalResources}</div>
          </div>
        )}
      </div>
    </div>
  );
}
