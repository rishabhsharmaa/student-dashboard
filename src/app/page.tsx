import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import type { Course } from "@/types/database";
import BentoGrid from "@/components/BentoGrid";
import { DashboardSkeleton } from "@/components/SkeletonTile";

export const dynamic = "force-dynamic";

async function DashboardContent() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY in your .env.local file."
    );
  }

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return <BentoGrid courses={(courses as Course[]) ?? []} />;
}

export default function Home() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
