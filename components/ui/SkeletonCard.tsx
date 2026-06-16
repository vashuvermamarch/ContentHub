'use client';

export default function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[--radius-md-lg] bg-md-surface-container">
      <div className="h-44 w-full bg-md-surface-variant/50" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded-full bg-md-surface-variant/50" />
        <div className="h-3 w-full rounded-full bg-md-surface-variant/40" />
        <div className="h-3 w-2/3 rounded-full bg-md-surface-variant/40" />
        <div className="flex justify-between">
          <div className="h-3 w-20 rounded-full bg-md-surface-variant/30" />
          <div className="h-3 w-16 rounded-full bg-md-surface-variant/30" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
