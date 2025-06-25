import Link from "next/link";
import { Flame, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const LOGO_ICON_SIZE = "h-8 w-8";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Documentation", href: "/docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Contact", href: "/contact" },
        { name: "Status", href: "/status" },
      ],
    },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
            {/* Company Info - Spans 2 columns on desktop */}
            <div className="col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <Flame
                  className={`${LOGO_ICON_SIZE} text-orange-500 group-hover:text-orange-600 transition-colors`}
                />
                <span className="text-xl font-bold font-heading">Ignidash</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Design your life. Plan your FIRE journey. Get AI-powered
                insights tailored to your values and goals.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 pt-4">
                <a
                  href="mailto:joe@schelske.dev"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email us at joe@schelske.dev"
                >
                  <Mail className="h-4 w-4" />
                  joe@schelske.dev
                </a>
                <a
                  href="tel:+19522425109"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Call us at (952) 242-5109"
                >
                  <Phone className="h-4 w-4" />
                  (952) 242-5109
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Twin Cities, Minnesota
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-sm font-semibold font-heading tracking-wider uppercase">
                  {section.title}
                </h3>
                <nav aria-label={`${section.title} links`}>
                  <ul className="space-y-2" role="list">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-1 -mx-1"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Schelske Dev Co. LLC. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <nav aria-label="Social media links">
              <ul className="flex items-center gap-4" role="list">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit our ${link.name} page`}
                      >
                        {link.name}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
