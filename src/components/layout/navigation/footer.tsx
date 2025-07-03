import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  LOGO_SIZE,
  SPACING,
  MAX_WIDTHS,
  LINK_FOCUS_STATE,
  ICON_SIZES,
} from "@/lib/constants/design-constants";

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
    <footer className="bg-background border-t">
      <div className={`mx-auto ${MAX_WIDTHS.container} ${SPACING.container}`}>
        {/* Main Footer Content */}
        <div className={SPACING.sectionVertical}>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 md:gap-12">
            {/* Company Info - Spans 2 columns on desktop */}
            <div className="col-span-2 space-y-4">
              <Link
                href="/"
                className={`group flex items-center gap-2 ${LINK_FOCUS_STATE}`}
              >
                <Image
                  src="/flame-icon.svg"
                  alt="Ignidash flame icon"
                  className={LOGO_SIZE}
                  width={32}
                  height={32}
                />
                <span className="font-heading text-xl font-bold">Ignidash</span>
              </Link>
              <p className={`text-muted-foreground ${MAX_WIDTHS.xs} text-sm`}>
                Design your life. Plan your FIRE journey. Get AI-powered
                insights tailored to your values and goals.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 pt-4">
                <a
                  href="mailto:joe@schelske.dev"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                  aria-label="Email us at joe@schelske.dev"
                >
                  <Mail className={ICON_SIZES.sm} />
                  joe@schelske.dev
                </a>
                <a
                  href="tel:+19522425109"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                  aria-label="Call us at (952) 242-5109"
                >
                  <Phone className={ICON_SIZES.sm} />
                  (952) 242-5109
                </a>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className={ICON_SIZES.sm} />
                  Twin Cities, Minnesota
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="font-heading text-sm font-semibold tracking-wider uppercase">
                  {section.title}
                </h3>
                <nav aria-label={`${section.title} links`}>
                  <ul className="space-y-2" role="list">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className={`text-muted-foreground hover:text-foreground -mx-1 px-1 text-sm transition-colors ${LINK_FOCUS_STATE}`}
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
        <div className={SPACING.sectionVerticalSm}>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-muted-foreground text-sm">
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
