import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DatabaseLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="ml-64">
        <div className="h-16 bg-card/50 backdrop-blur-sm border-b border-border"></div>
        <main className="p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-88" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
