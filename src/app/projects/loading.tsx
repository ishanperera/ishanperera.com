import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div className="pt-24 pb-16">
      <section className="container-wide py-16">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-6 w-80" />
      </section>

      <section className="container-wide pb-24">
        <Skeleton className="h-4 w-20 mb-6" />
        <Skeleton className="h-48 w-full rounded-xl mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </section>

      <section className="container-wide pb-24">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-10 w-72 mb-4" />
        <Skeleton className="h-6 w-96 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
