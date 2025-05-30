import { APITester } from '@/APITester';
import { Card, CardContent } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-muted">
      <CardContent className="pt-6">
        <h1 className="text-5xl font-bold my-4 leading-tight text-red-400">
          Bun + React
        </h1>
        <p>
          Edit{' '}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            src/App.tsx
          </code>{' '}
          and save to test HMR
        </p>
        <APITester />
      </CardContent>
    </Card>
  );
}
