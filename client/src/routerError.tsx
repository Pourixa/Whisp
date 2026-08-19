import { Alert, AlertDescription, AlertTitle } from "#components/ui/alert"
import { Button } from "#components/ui/button"
import { AlertTriangle, ArrowLeft, House } from "lucide-react"
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router"

export function RouterError() {
  const error = useRouteError()
  const navigate = useNavigate()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404
  const title = isNotFound ? "Page not found" : "Something went wrong"
  const description = isNotFound
    ? "The page you are looking for does not exist."
    : "We could not load this page. Try going back or return to your chats."

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <section className="w-full max-w-md space-y-6">
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft />
            Go back
          </Button>
          <Button onClick={() => navigate("/")}>
            <House />
            Go to chats
          </Button>
        </div>
      </section>
    </main>
  )
}