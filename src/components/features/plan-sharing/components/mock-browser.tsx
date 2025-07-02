"use client";

import { useState } from "react";
import { Copy, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARD_BORDER_RADIUS } from "@/lib/design-constants";

export function MockBrowser() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`border bg-white dark:bg-gray-800 ${CARD_BORDER_RADIUS} w-full max-w-2xl overflow-hidden shadow-lg`}
    >
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 border-b bg-gray-100 px-4 py-3 dark:bg-gray-700">
        {/* Traffic lights */}
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
        </div>

        {/* Address bar */}
        <div className="mx-4 flex-1">
          <div className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm dark:bg-gray-600">
            <Globe className="h-4 w-4 text-gray-500" />
            <span className="font-mono text-gray-700 dark:text-gray-300">
              ignidash.com/shared/sabbatical-explorer-2024
            </span>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="space-y-4 p-6">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Work-Optional Explorer Plan
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            35yo targeting flexible lifestyle by 42
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 border-t border-b py-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              $95k
            </div>
            <div className="text-xs text-gray-500">Annual Income</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              $1.2M
            </div>
            <div className="text-xs text-gray-500">Target Assets</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              7 years
            </div>
            <div className="text-xs text-gray-500">To Freedom</div>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
