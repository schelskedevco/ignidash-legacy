import Link from "next/link";
import { Flame, Menu, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

const ICON_SIZE = "h-6 w-6";
const BUTTON_ICON_SIZE = "h-4 w-4";
const LOGO_ICON_SIZE = "h-8 w-8";
const SHEET_WIDTH = "w-[400px] sm:w-[540px]";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Flame className={`${LOGO_ICON_SIZE} text-orange-500`} />
      <span className="text-xl font-bold font-heading">Ignidash</span>
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
      className="flex items-center justify-between p-4 text-base font-medium group"
    >
      <span className="group-hover:text-orange-500 transition-colors">
        {children}
      </span>
      <ChevronRight className={`${ICON_SIZE} text-muted-foreground`} />
    </Link>
  );
}

export function Navbar() {
  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle iconSize={ICON_SIZE} />
            <Button asChild variant="ghost">
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
              <Link href="/dashboard" className="flex items-center gap-2">
                Get Started
                <ArrowRight className={BUTTON_ICON_SIZE} />
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle iconSize={ICON_SIZE} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className={ICON_SIZE} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className={SHEET_WIDTH}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Mobile Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b">
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
