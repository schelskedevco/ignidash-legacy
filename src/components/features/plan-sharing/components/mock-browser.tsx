"use client";

import { useState } from "react";
import { Copy, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function MockBrowser() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="hover:border-primary/30 w-full max-w-2xl shadow-lg transition-all duration-300">
      <CardHeader className="flex items-center gap-2 border-b">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-4 min-w-0 flex-1">
          <div className="bg-muted flex items-center gap-2 rounded-md px-3 py-1.5 text-sm">
            <Globe className="h-4 w-4 flex-shrink-0" />
            <span className="truncate font-mono">
              ignidash.com/shared/sabbatical-explorer-2024
            </span>
          </div>
        </div>
      </CardHeader>

      {/* Page Content */}
      <CardContent className="space-y-4 p-6">
        {/* Copy Link Section */}
        <div className="flex items-center justify-center gap-3">
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
      </CardContent>
    </Card>
  );
}
