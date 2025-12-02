// components/layout/footer.tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Social media icons (using Lucide React)
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import SafeExitButton from "../buttons/safe-exit";
import MoveToTopButton from "../buttons/move-to-top-button";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("Footer");
  const tLinks = useTranslations("Link-Labels");
  const tNavbar = useTranslations("Navbar.Logo");

  const mainPages = [
    { href: "/", label: tLinks("Home") },
    { href: "/about", label: tLinks("About") },
    { href: "/survivor-voices", label: tLinks("Survivor-Voices") },
    { href: "/get-involved", label: tLinks("Get-Involved") },
    { href: "/contact-us", label: tLinks("Contact-Us") },
    { href: "/events-activities", label: tLinks("Events-And-Activities") },
    { href: "/support-services", label: tLinks("Support-Services") },
    { href: "/research-publications", label: tLinks("Research-And-Publications") },
    { href: "/news-media", label: tLinks("News-And-Media") },
    { href: "/resources", label: tLinks("Resources") },
    { href: "https://janmitranyas.in/report.html", label: tLinks("Comprehensive-Report")},
  ];

  const supportLinks = [
    { href: "/privacy-policy", label: t("Privacy-Policy") },
    { href: "/terms-of-service", label: t("Terms-of-Service") },
    { href: "/accessibility", label: t("Accessibility") },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/survivorconnect",
      icon: Facebook,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/survivorconnect",
      icon: Twitter,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/survivorconnect",
      icon: Instagram,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/user/pvchrindia",
      icon: Youtube,
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: t("Emergency-Helpline"),
      subtext: "+919935599333",
    },
    {
      icon: Mail,
      text: t("Email"),
      subtext: "pvchr.india@gmail.com",
    },
    {
      icon: MapPin,
      text: t("Address"),
      subtext: t("Address-Line"),
    },
  ];

  return (
    <footer id="footer" className="relative bg-background border-t border-border mb-16 md:mb-0">
      <MoveToTopButton/>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section - Matching Navbar */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Exact same logo structure as navbar */}
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="text-base md:text-xl font-bold p-1 flex gap-1 md:gap-2 items-center">
                    <div className=" relative size-7 md:size-10 lg:size-14" >
                      <Image
                      
                      height={1000}
                      width={1000}
                      alt="Logo"
                      src="/logo.png"
                      className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-0.5 md:gap-1">
                      <h1 className="uppercase leading-tight">{tNavbar("Firm-Name-1")}</h1>
                      <h1 className="uppercase leading-tight text-muted-foreground text-xs md:text-sm">
                        {tNavbar("Firm-Name-2")}
                      </h1>
                    </div>
                  </div>
                </div>
              </Link>
              
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                {t("Description")}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <item.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {item.text}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.subtext}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-foreground">
              {t("Quick-Links")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mainPages.slice(0, 6).map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="text-sm text-muted-foreground hover:text-primary duration-200 py-1 hover:translate-x-1 transform transition-all"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>

          {/* More Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-foreground">
              {t("More")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mainPages.slice(6).map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="text-sm text-muted-foreground hover:text-primary duration-200 py-1 hover:translate-x-1 transform transition-all"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-foreground">
              {t("Stay-Connected")}
            </h3>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">
                {t("Newsletter-Description")}
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder={t("Email-Placeholder")}
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 duration-200">
                  {t("Subscribe")}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                {t("Follow-Us")}
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-y border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Survivor Connect. {t("All-Rights-Reserved")}
            </div>

            {/* Support Links */}
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    "text-sm text-muted-foreground hover:text-primary duration-200",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <SafeExitButton/>
            </div>

            {/* Made with love */}
            <div className="text-sm text-muted-foreground flex items-center space-x-1">
              <span>{t("Made-With")}</span>
              <span className="text-red-500">❤</span>
              <span>{t("For-Survivors")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-center text-sm text-muted-foreground py-2.5">
          {t("Developed-By")}
        </p>
      </div>
    </footer>
  );
}