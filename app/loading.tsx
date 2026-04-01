import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Skeleton className="h-[240px] rounded-[32px]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[154px] rounded-[28px]" />
        ))}
      </div>
      <Skeleton className="h-[126px] rounded-[28px]" />
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <Skeleton className="h-[410px] rounded-[28px]" />
        <Skeleton className="h-[410px] rounded-[28px]" />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
        <Skeleton className="h-[520px] rounded-[28px]" />
        <Skeleton className="h-[520px] rounded-[28px]" />
      </div>
    </div>
  );
}
