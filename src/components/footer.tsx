import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
    { name: "Support", href: "/support" },
  ];

  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Company info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Schelske Dev Co. LLC</h3>
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Footer links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
