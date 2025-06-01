import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="ml-64">
        <div className="h-16 bg-card/50 backdrop-blur-sm border-b border-border"></div>
        <main className="p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-4 w-84" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-48" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 rounded-lg border">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-3 w-full" />
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
