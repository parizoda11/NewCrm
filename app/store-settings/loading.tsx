import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function StoreSettingsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="ml-64">
        <div className="h-16 bg-card/50 backdrop-blur-sm border-b border-border"></div>
        <main className="p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
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
