"use client";

import { MessageCircle, ArrowUp, Heart, MoreHorizontal } from "lucide-react";
import { CARD_BORDER_RADIUS } from "@/lib/design-constants";

type Platform = "reddit" | "twitter" | "imessage";

interface PlatformPreviewCardProps {
  platform: Platform;
}

export function PlatformPreviewCard({ platform }: PlatformPreviewCardProps) {
  if (platform === "reddit") {
    return (
      <div
        className={`border bg-white dark:bg-gray-800 ${CARD_BORDER_RADIUS} overflow-hidden shadow-sm`}
      >
        {/* Reddit Header */}
        <div className="border-b bg-gray-50 p-3 dark:bg-gray-700/50">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              r
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              r/financialindependence
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">u/fireseeker2024</span>
          </div>
        </div>

        {/* Reddit Post */}
        <div className="space-y-3 p-4">
          <h4 className="leading-snug font-medium text-gray-900 dark:text-gray-100">
            My flexible FIRE plan - 35yo targeting work-optional by 42,
            thoughts?
          </h4>

          <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-700/50">
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div>💰 Income: $95k → Part-time: $1.5k/month</div>
              <div>🎯 Target: $1.2M for flexible lifestyle</div>
              <div>✈️ Focus: Sabbaticals + part-time work blend</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4" />
              <span>247</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>89 comments</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (platform === "twitter") {
    return (
      <div
        className={`border bg-white dark:bg-gray-800 ${CARD_BORDER_RADIUS} overflow-hidden shadow-sm`}
      >
        {/* Twitter Header */}
        <div className="border-b p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
              A
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Alex Chen
                </span>
                <span className="text-gray-500">@alexplansfire</span>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-500">2h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tweet Content */}
        <div className="space-y-3 p-4">
          <p className="text-gray-900 dark:text-gray-100">
            Sharing my FIRE roadmap - $95k income → work-optional by 42 with
            $1.2M target 🎯
            <br />
            <br />
            Planning for sabbaticals + part-time work blend. Anyone else going
            the flexible route?
            <br />
            <br />
            #FIRE #FinancialIndependence #WorkOptional
          </p>

          {/* Link Card */}
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="bg-gray-50 p-3 dark:bg-gray-700/50">
              <div className="mb-1 text-sm text-gray-500">ignidash.com</div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Work-Optional Explorer Plan
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                35yo targeting flexible lifestyle by 42 with $1.2M goal
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-gray-500">
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">12</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="text-sm">34</span>
            </div>
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  if (platform === "imessage") {
    return (
      <div
        className={`bg-gray-100 dark:bg-gray-800 ${CARD_BORDER_RADIUS} overflow-hidden shadow-sm`}
      >
        {/* iMessage Header */}
        <div className="border-b bg-gray-200 p-3 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
                M
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Mom & Dad
              </span>
            </div>
            <div className="text-sm text-gray-500">Messages</div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="space-y-3 bg-gradient-to-b from-gray-50 to-gray-100 p-4 dark:from-gray-800 dark:to-gray-900">
          {/* Sent Message */}
          <div className="flex justify-end">
            <div className="max-w-xs">
              <div className="rounded-2xl rounded-br-md bg-blue-500 p-3 text-white">
                <p className="text-sm">
                  Hey! Check out my retirement plan, would love your thoughts on
                  the timeline 😊
                </p>
              </div>
            </div>
          </div>

          {/* Link Preview */}
          <div className="flex justify-end">
            <div className="max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
              <div className="p-3">
                <div className="mb-1 text-xs text-gray-500">IGNIDASH.COM</div>
                <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Work-Optional Explorer Plan
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  $95k income, targeting $1.2M by 42 for flexible lifestyle
                </div>
              </div>
            </div>
          </div>

          {/* Response Preview */}
          <div className="flex justify-start">
            <div className="max-w-xs">
              <div className="rounded-2xl rounded-bl-md bg-gray-300 p-3 text-gray-900 dark:bg-gray-600 dark:text-gray-100">
                <p className="text-sm">
                  This looks great honey! Dad and I are so proud of your
                  planning 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
