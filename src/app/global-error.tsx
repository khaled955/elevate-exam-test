"use client"
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p className="text-red-500 text-sm text-center">{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}