import { UserDebug } from "@/components/debug/user-debug"

export default function DebugPage() {
  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Debug Information</h1>
            <p className="text-muted-foreground mt-2">Check user authentication and profile creation status</p>
          </div>

          <UserDebug />
        </div>
      </main>

    </div>
  )
}
