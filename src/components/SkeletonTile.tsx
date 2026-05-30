"use client";

export function SkeletonHero() {
  return (
    <article className="rounded-2xl bg-surface border border-border p-8 col-span-1 md:col-span-2 min-h-[180px]">
      <div className="skeleton h-8 w-48 mb-4" />
      <div className="skeleton h-5 w-72 mb-3" />
      <div className="skeleton h-5 w-40" />
    </article>
  );
}

export function SkeletonCourse() {
  return (
    <article className="rounded-2xl bg-surface border border-border p-6 min-h-[160px]">
      <div className="skeleton h-10 w-10 rounded-xl mb-4" />
      <div className="skeleton h-5 w-36 mb-3" />
      <div className="skeleton h-4 w-20 mb-4" />
      <div className="skeleton h-[6px] w-full rounded-full" />
    </article>
  );
}

export function SkeletonActivity() {
  return (
    <article className="rounded-2xl bg-surface border border-border p-6 col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[200px]">
      <div className="skeleton h-6 w-32 mb-6" />
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: 70 }).map((_, i) => (
          <div key={i} className="skeleton aspect-square rounded-[3px]" />
        ))}
      </div>
    </article>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SkeletonHero />
      <SkeletonActivity />
      <SkeletonCourse />
      <SkeletonCourse />
      <SkeletonCourse />
      <div className="md:col-span-2 lg:col-span-2">
        <SkeletonCourse />
      </div>
    </div>
  );
}
