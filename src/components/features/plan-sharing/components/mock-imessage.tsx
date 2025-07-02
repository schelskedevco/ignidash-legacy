import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChevronLeft, Video } from "lucide-react";

export function MockiMessage() {
  return (
    <Card className="hover:border-primary/30 w-full max-w-2xl gap-2 py-2 shadow-lg transition-all duration-300">
      <CardHeader className="flex items-center justify-between border-b [.border-b]:pb-2">
        <ChevronLeft className="h-8 w-8" />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
          <span className="text-sm font-semibold text-white">J</span>
        </div>
        <Video className="h-8 w-8" />
      </CardHeader>

      <CardContent className="space-y-2 text-left"></CardContent>
    </Card>
  );
}
