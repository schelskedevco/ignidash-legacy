import Link from "next/link";
import { Flame, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-4 py-5 text-base font-medium hover:bg-muted/50 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Flame className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold">Ignidash</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button asChild variant="ghost">
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              {/* Mobile Header */}
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <Link href="/" className="flex items-center gap-2">
                  <Flame className="h-8 w-8 text-orange-500" />
                  <span className="text-xl font-bold">Ignidash</span>
                </Link>
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
    </nav>
  );
}
