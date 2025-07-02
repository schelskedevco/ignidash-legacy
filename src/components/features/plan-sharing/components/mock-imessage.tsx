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

      <CardContent className="space-y-4">
        <div className="space-y-1 text-center">
          <p className="text-muted-foreground text-xs font-medium">iMessage</p>
          <p className="text-xs">
            <span className="text-foreground/80 font-medium">Today</span>{" "}
            <span className="text-muted-foreground font-normal">9:41 AM</span>
          </p>
        </div>

        {/* Messages */}
        <div className="space-y-2 px-2">
          {/* Sent message */}
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-tl-2xl rounded-tr-2xl rounded-br-xs rounded-bl-2xl bg-blue-500 px-4 py-2 text-white">
              <p className="text-sm">Thank you! I should be there by 9:10</p>
            </div>
          </div>

          {/* Received message */}
          <div className="flex justify-start">
            <div className="bg-muted max-w-[75%] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-xs px-4 py-2">
              <p className="text-foreground text-sm">
                Don&apos;t rush. I&apos;ve got it covered.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
