import React, { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
export const LazyOrb = lazy(() => import('@/components/backgrounds/orb'));
export const LazyTicketAnimation = lazy(() => import('@/app/gate/[gateId]/_components/ticket-animation'));
export const LazySubscriptionForm = lazy(() => import('@/components/form-fields/subscription-form'));

// Loading fallback components
export const OrbFallback = () => (
  <div className="w-full h-[600px] bg-black flex items-center justify-center">
    <Skeleton className="w-32 h-32 rounded-full" />
  </div>
);

export const TicketAnimationFallback = () => (
  <div className="perspective-[1000px] mt-11">
    <div className="relative h-[150px] md:w-[320px] w-[250px] rounded-xl bg-white/10 animate-pulse">
      <Skeleton className="w-full h-full rounded-xl" />
    </div>
  </div>
);

export const SubscriptionFormFallback = () => (
  <div className="mb-4 space-y-4">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);

// Higher-order component for lazy loading with fallback
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ComponentType
) {
  return function LazyComponent(props: T) {
    return (
      <Suspense fallback={fallback ? React.createElement(fallback) : <Skeleton className="w-full h-20" />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Preload components for better UX
export function preloadComponents() {
  if (typeof window === 'undefined') return;
  
  // Preload critical components
  import('@/components/backgrounds/orb');
  import('@/app/gate/[gateId]/_components/ticket-animation');
}
