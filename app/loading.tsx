import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-background">
      <main>
        {/* Hero Section Skeleton */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <Skeleton className="absolute inset-0 w-full h-full" />
          <div className="relative z-10 text-center space-y-6">
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
        </section>

        {/* Featured Categories Skeleton */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-slate-100/50 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-10 w-80 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Skeleton */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12 space-y-4">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-10 w-96 mx-auto" />
              <Skeleton className="h-6 w-80 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="group">
                  <CardHeader className="p-0">
                    <Skeleton className="aspect-square w-full rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-4" />
                      ))}
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </CardContent>
                  <CardHeader className="p-4 pt-0">
                    <Skeleton className="h-10 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Skeleton className="h-12 w-40 mx-auto" />
            </div>
          </div>
        </section>

        {/* Services Section Skeleton */}
        <section className="py-16 bg-gradient-to-br from-secondary/15 via-primary/10 to-secondary/15">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-10 w-80 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="text-center">
                  <CardHeader className="space-y-4">
                    <Skeleton className="w-16 h-16 rounded-full mx-auto" />
                    <Skeleton className="h-6 w-32 mx-auto" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-24 mx-auto" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
