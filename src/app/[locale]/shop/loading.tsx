import { Navbar } from "@/components/layout/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4">
        <div className="h-10 w-64 bg-muted/50 rounded-md animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-muted/30 border-none">
              <div className="aspect-square bg-muted/40 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-1/4 bg-muted/50 animate-pulse rounded" />
                <div className="h-5 w-3/4 bg-muted/50 animate-pulse rounded" />
                <div className="h-4 w-1/3 bg-muted/50 animate-pulse rounded mt-2" />
              </div>
              <div className="p-5 pt-0">
                <div className="h-10 w-full bg-muted/50 animate-pulse rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
