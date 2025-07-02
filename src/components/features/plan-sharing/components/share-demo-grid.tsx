import { MockBrowser } from "./mock-browser";
import { PlatformPreviewCard } from "./platform-preview-card";

export function ShareDemoGrid() {
  return (
    <div className="space-y-8">
      {/* Browser Demo */}
      <div className="flex justify-center">
        <div className="animate-in fade-in-50 duration-700">
          <MockBrowser />
        </div>
      </div>

      {/* Platform Previews */}
      <div className="space-y-6">
        <div className="animate-in fade-in-50 text-center delay-300 duration-700">
          <p className="text-sm font-medium tracking-wide text-gray-600 uppercase dark:text-gray-400">
            Share everywhere with one simple link
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="animate-in fade-in-50 slide-in-from-bottom-4 space-y-2 delay-500 duration-700">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Community Feedback
              </p>
              <p className="text-xs text-gray-500">
                Get insights from FIRE community
              </p>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <PlatformPreviewCard platform="reddit" />
            </div>
          </div>

          <div className="animate-in fade-in-50 slide-in-from-bottom-4 space-y-2 delay-700 duration-700">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Professional Sharing
              </p>
              <p className="text-xs text-gray-500">
                Share your journey publicly
              </p>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <PlatformPreviewCard platform="twitter" />
            </div>
          </div>

          <div className="animate-in fade-in-50 slide-in-from-bottom-4 space-y-2 delay-900 duration-700">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Family Discussion
              </p>
              <p className="text-xs text-gray-500">
                Keep loved ones in the loop
              </p>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <PlatformPreviewCard platform="imessage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
