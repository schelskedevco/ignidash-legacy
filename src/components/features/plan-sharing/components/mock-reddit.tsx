"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function MockReddit() {
  return (
    <Card className="hover:border-primary/30 w-full max-w-2xl shadow-lg transition-all duration-300">
      <CardHeader className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center">
            <Image
              src="/fire-icon.jpg"
              alt="r/Fire subreddit icon"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div>
            <h2 className="text-left text-lg font-semibold">
              <a
                href="https://www.reddit.com/r/Fire/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                r/Fire
              </a>
            </h2>
            <p className="text-muted-foreground text-sm">
              722k members • 129 online
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full">
            Create Post
          </Button>
          <Button className="rounded-full bg-blue-600 hover:bg-blue-700">
            Join
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6"></CardContent>
    </Card>
  );
}
