import Link from "next/link";
import { Menu, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import {
  ICON_SIZES,
  BUTTON_ICON_SIZE,
  LOGO_SIZE,
  MAX_WIDTHS,
  SPACING,
  LINK_FOCUS_STATE,
  GRADIENTS,
} from "@/lib/design-constants";

const SHEET_WIDTH = "w-[400px] sm:w-[540px]";

function Logo() {
  return (
    <Link href="/" className={`flex items-center gap-2 ${LINK_FOCUS_STATE}`}>
      <Image
        src="/flame-icon.svg"
        alt="Ignidash flame icon"
        className={LOGO_SIZE}
        width={32}
        height={32}
      />
      <span className="font-heading text-xl font-bold">Ignidash</span>
    </Link>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between p-4 text-base font-medium ${LINK_FOCUS_STATE}`}
    >
      <span className="transition-colors group-hover:text-orange-500">
        {children}
      </span>
      <ChevronRight className={`${ICON_SIZES.lg} text-muted-foreground`} />
    </Link>
  );
}

export function Navbar() {
  return (
    <nav className="bg-background sticky top-0 z-50 border-b">
      <div className={`mx-auto ${MAX_WIDTHS.container}`}>
        <div
          className={`flex h-16 items-center justify-between ${SPACING.container}`}
        >
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">
            <ModeToggle iconSize={ICON_SIZES.lg} />
            <Button asChild variant="ghost">
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button
              asChild
              className={`${GRADIENTS.primaryReverse} text-white hover:from-pink-600 hover:via-red-600 hover:to-orange-600`}
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                Get Started
                <ArrowRight className={BUTTON_ICON_SIZE} />
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle iconSize={ICON_SIZES.lg} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className={ICON_SIZES.lg} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className={SHEET_WIDTH}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Mobile Header */}
                <div className="flex h-16 items-center justify-between border-b px-4">
                  <Logo />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col">
                  <NavLink href="/dashboard">Sign In</NavLink>
                  <div className="mx-2">
                    <Separator />
                  </div>
                  <NavLink href="/dashboard">Get Started</NavLink>
                  <div className="mx-2">
                    <Separator />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
