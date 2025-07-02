"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function MockiMessage() {
  return (
    <Card className="hover:border-primary/30 w-full max-w-2xl gap-2 py-2 shadow-lg transition-all duration-300">
      <CardHeader className="flex items-center justify-between border-b [.border-b]:pb-2"></CardHeader>

      <CardContent className="space-y-2 text-left"></CardContent>
    </Card>
  );
}
