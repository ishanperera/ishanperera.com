import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div className="pt-24 pb-16">
      <section className="container-wide py-16">
        <Skeleton className="h-4 w-20 mb-3" />
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-6 w-96" />
      </section>

      <section className="container-wide pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
