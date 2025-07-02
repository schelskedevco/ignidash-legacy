"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share,
} from "lucide-react";

export function MockReddit() {
  return (
    <Card className="hover:border-primary/30 w-full max-w-2xl gap-2 py-2 shadow-lg transition-all duration-300">
      <CardHeader className="flex items-center justify-between border-b [.border-b]:pb-2">
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
          <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
            Join
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-left">
        {/* Post Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
              <span className="text-xs font-semibold text-white">S</span>
            </div>
            <span className="text-sm font-medium">u/sabbatical_dreamer</span>
            <span className="text-muted-foreground text-sm">• </span>
            <span className="text-muted-foreground text-sm">2 hr. ago</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal size={16} />
          </Button>
        </div>

        {/* Post Title */}
        <h3 className="cursor-pointer text-base font-medium hover:underline">
          Finally mapped out my Barista FIRE plan - 47 feels achievable!
        </h3>

        {/* Post Content Preview */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          Just mapped out my complete FIRE journey with{" "}
          <span className="cursor-pointer text-blue-500 hover:underline dark:text-blue-400">
            Ignidash
          </span>{" "}
          and wanted to share for feedback. 35yo, $200k NW, targeting $1.05M for
          Barista FIRE. My plan shows...
          <br />
          <span className="cursor-pointer text-blue-500 hover:underline dark:text-blue-400">
            https://ignidash.com/p/barista-fire-journey
          </span>
        </p>

        {/* Embedded Ignidash Link Preview */}

        {/* Engagement Bar */}
        <div className="flex items-center gap-2 border-t pt-2">
          <div className="flex items-center gap-1 rounded-3xl border-1">
            <Button variant="ghost" size="sm" className="h-8 rounded-3xl px-2">
              <ArrowUp size={16} className="text-[#FF4500]" />
            </Button>
            <span className="text-sm font-medium">33</span>
            <Button variant="ghost" size="sm" className="h-8 rounded-3xl px-2">
              <ArrowDown size={16} className="text-muted-foreground" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 rounded-3xl border-1"
          >
            <MessageCircle size={16} />
            <span className="text-sm">26</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 rounded-3xl border-1"
          >
            <Share size={16} />
            <span className="text-sm">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
