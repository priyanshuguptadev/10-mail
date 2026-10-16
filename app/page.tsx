import Link from 'next/link'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/toggle-mode'
import { ArrowRight, Download, KeyRound, Tag, Check, X } from 'lucide-react'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://10mail.pryns.me/#webapp',
      name: '10-Mail',
      url: 'https://10mail.pryns.me',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Free 10-minute temporary disposable email service. Protect your personal inbox from spam, grab verification codes, and keep your email secure and private.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://10mail.pryns.me/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a 10-minute email?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a free disposable email address created just for you that self-destructs after ten minutes. You can use it to sign up for websites, get confirmation codes, or download free files without giving away your personal email.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to create an account or password?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. There are no passwords, no registrations, and no phone numbers required. You just click the button and your temporary inbox opens immediately.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens after the ten minutes are up?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The email address is permanently deactivated and all messages inside it are wiped clean. If that company attempts to send marketing newsletters later, their messages simply bounce and never reach you.',
          },
        },
        {
          '@type': 'Question',
          name: 'What if my confirmation email is running late?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can easily renew your session inside the inbox view to add another ten minutes, giving slower websites plenty of time to send your link or code.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can other people see my temporary emails?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Every temporary email address is randomly generated with a unique sequence of characters that belongs solely to your active browser session.',
          },
        },
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <div className="min-h-svh bg-background text-foreground flex flex-col selection:bg-foreground selection:text-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight hover:opacity-80 transition-opacity"
          >
            <Logo className="size-6 text-foreground" />
            <span className="text-base font-semibold">10-Mail</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <a
              href="#use-cases"
              className="hidden sm:inline-block text-muted-foreground hover:text-foreground transition-colors"
            >
              Why use it
            </a>
            <a
              href="#comparison"
              className="hidden sm:inline-block text-muted-foreground hover:text-foreground transition-colors"
            >
              Comparison
            </a>
            <a
              href="#faq"
              className="hidden sm:inline-block text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </a>
            <ModeToggle />
            <Link
              href="/inbox"
              className="inline-flex h-9 items-center justify-center rounded-md bg-foreground text-background px-3.5 text-xs sm:text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-[transform,opacity]"
            >
              Open Inbox
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Hero Section - Centered Typographic Statement */}
        <section className="pt-24 sm:pt-32 pb-24 text-center flex flex-col items-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.06] taste-reveal-1">
              Keep spam out of your real inbox.
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed taste-reveal-2 max-w-2xl mx-auto">
              Use an instant temporary email to sign up, grab your verification
              codes, and keep your personal inbox completely free of promotional
              junk.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 taste-reveal-3">
              <Link
                href="/inbox"
                className="inline-flex h-12 items-center justify-center rounded-md bg-foreground text-background px-7 text-base font-medium hover:opacity-90 active:scale-[0.98] transition-[transform,opacity] gap-2.5"
              >
                <span>Get a 10-Minute Inbox</span>
                <ArrowRight className="size-4" />
              </Link>

              <a
                href="#use-cases"
                className="inline-flex h-12 items-center justify-center rounded-md px-5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                See how it works
              </a>
            </div>

            <div className="mt-8 text-xs text-muted-foreground taste-reveal-4">
              No registration required · Free forever · Auto-deleted in 10
              minutes
            </div>
          </div>
        </section>

        {/* Section 1: Use Cases & Proof Beside Text */}
        <section id="use-cases" className="py-24">
          <div className="max-w-2xl mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground taste-reveal-1">
              Keep your personal inbox clean.
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed taste-reveal-2">
              Use a disposable address whenever a website demands your email
              before letting you explore.
            </p>
          </div>

          <div className="space-y-20">
            {/* Module 1: Discount Codes and Shopping Deals */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div
                data-ui="true"
                className="md:col-span-6 w-full min-h-55 rounded-lg bg-card p-5 text-card-foreground"
              >
                <div className="flex items-center justify-between text-xs pb-3 text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Incoming Email
                  </span>
                  <span className="text-[11px]">Store Promotion</span>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="text-sm font-semibold text-foreground">
                    Welcome! Here is your 15% discount coupon
                  </div>
                  <div className="text-xs text-muted-foreground">
                    From: Summer Fashion Store &lt;deals@boutique-shop.com&gt;
                  </div>
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-muted/60 text-foreground text-xs font-medium">
                      <Tag className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Coupon Code: SAVE15 (Valid today)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 max-w-md pt-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Claim discounts without daily promos.
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Online shops often offer 10% or 15% off in exchange for your
                  email, only to email you every morning afterwards. Grab your
                  coupon, complete your order, and keep your inbox quiet.
                </p>
              </div>
            </div>

            {/* Module 2: Account Activation & One-Time Passcodes */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div
                data-ui="true"
                className="md:col-span-6 w-full min-h-55 rounded-lg bg-card p-5 text-card-foreground"
              >
                <div className="flex items-center justify-between text-xs pb-3 text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Verification Notice
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Delivered instantly
                  </span>
                </div>
                <div className="pt-4 flex flex-col justify-center items-center py-4 bg-muted/40 rounded-md">
                  <div className="text-xs text-muted-foreground mb-1 font-medium">
                    Your Confirmation Code
                  </div>
                  <div className="text-3xl tabular-nums font-bold tracking-widest text-foreground select-all">
                    481-902
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1">
                    <KeyRound className="size-3" />
                    <span>Copy this code to finish logging in</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 max-w-md pt-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Confirm accounts in seconds.
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Signing up for public Wi-Fi, community forums, or web apps you
                  only plan to use once? Your sign-in code arrives in seconds so
                  you can paste it and get on with your day.
                </p>
              </div>
            </div>

            {/* Module 3: Free PDF Guides and Templates */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div
                data-ui="true"
                className="md:col-span-6 w-full min-h-55 rounded-lg bg-card p-5 text-card-foreground"
              >
                <div className="flex items-center justify-between text-xs pb-3 text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Free Download
                  </span>
                  <span className="text-[11px]">Ready to save</span>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="text-sm font-semibold text-foreground">
                    Resume Template &amp; Cover Letter Pack
                  </div>
                  <div className="text-xs text-muted-foreground">
                    From: Career Resource Hub &lt;team@careers-guide.org&gt;
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-foreground text-background text-xs font-medium cursor-pointer hover:opacity-90"
                    >
                      <Download className="size-3.5" />
                      <span>Download Template Pack (ZIP · 2.1 MB)</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 max-w-md pt-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Download files without follow-ups.
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Need a printable checklist, budget spreadsheet, or PDF guide?
                  Enter your temporary address to download what you need without
                  getting trapped on a permanent email list.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Real-World Comparison */}
        <section id="comparison" className="py-24">
          <div className="max-w-2xl mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              The difference in your inbox.
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              See what happens when you sign up for a quick account with your
              real email versus 10-Mail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left: Your Real Email */}
            <div className="rounded-lg bg-muted/30 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <X className="size-5 text-destructive" />
                  <span className="text-lg font-semibold text-foreground">
                    Using your real email
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  What usually happens when you provide your personal Gmail or
                  Outlook address:
                </p>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-muted-foreground/60 mt-2 shrink-0" />
                    <span>
                      You receive your single confirmation code or download
                      link.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-muted-foreground/60 mt-2 shrink-0" />
                    <span>
                      The website saves your email into their permanent
                      marketing database.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-muted-foreground/60 mt-2 shrink-0" />
                    <span>
                      Daily promotional blasts and partner deals begin arriving
                      every week.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-muted-foreground/60 mt-2 shrink-0" />
                    <span>
                      Unsubscribe buttons are hidden, ignored, or fail to stop
                      third-party spam.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 text-xs text-muted-foreground">
                Result: Hundreds of unread spam emails cluttering your real
                account.
              </div>
            </div>

            {/* Right: With 10-Mail */}
            <div className="rounded-lg bg-card p-6 sm:p-8 text-card-foreground flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-foreground mb-3">
                  <Check className="size-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-lg font-semibold text-foreground">
                    With 10-Mail
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  How disposable email keeps your everyday personal inbox clean:
                </p>

                <div className="space-y-4 text-sm text-foreground">
                  <div className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    <span>
                      Click once to get an instant address without passwords or
                      accounts.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    <span>
                      Paste it into the website and receive your code or link in
                      seconds.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    <span>
                      Finish signing up, downloading your file, or testing the
                      service.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="size-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    <span>
                      After ten minutes, the inbox self-destructs and all
                      messages are wiped clean.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 text-xs font-medium text-foreground">
                Result: Zero junk mail ever reaches your real personal inbox.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: FAQ Accordion */}
        <section id="faq" className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Common questions
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Everything you need to know about using a temporary email
                address.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-3">
              <details
                name="faq"
                className="group rounded-lg bg-muted/40 p-5 open:bg-muted/70 transition-colors"
                open
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-base sm:text-lg font-medium text-foreground select-none">
                  <span>What is a 10-minute email?</span>
                  <span className="size-5 rounded flex items-center justify-center text-sm text-muted-foreground group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-xl">
                  It is a free disposable email address created just for you
                  that self-destructs after ten minutes. You can use it to sign
                  up for websites, get confirmation codes, or download free
                  files without giving away your personal email.
                </p>
              </details>

              <details
                name="faq"
                className="group rounded-lg bg-muted/40 p-5 open:bg-muted/70 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-base sm:text-lg font-medium text-foreground select-none">
                  <span>Do I need to create an account or password?</span>
                  <span className="size-5 rounded flex items-center justify-center text-sm text-muted-foreground group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-xl">
                  No. There are no passwords, no registrations, and no phone
                  numbers required. You just click the button and your temporary
                  inbox opens immediately.
                </p>
              </details>

              <details
                name="faq"
                className="group rounded-lg bg-muted/40 p-5 open:bg-muted/70 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-base sm:text-lg font-medium text-foreground select-none">
                  <span>What happens after the ten minutes are up?</span>
                  <span className="size-5 rounded flex items-center justify-center text-sm text-muted-foreground group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-xl">
                  The email address is permanently deactivated and all messages
                  inside it are wiped clean. If that company attempts to send
                  marketing newsletters later, their messages simply bounce and
                  never reach you.
                </p>
              </details>

              <details
                name="faq"
                className="group rounded-lg bg-muted/40 p-5 open:bg-muted/70 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-base sm:text-lg font-medium text-foreground select-none">
                  <span>What if my confirmation email is running late?</span>
                  <span className="size-5 rounded flex items-center justify-center text-sm text-muted-foreground group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-xl">
                  You can easily renew your session inside the inbox view to add
                  another ten minutes, giving slower websites plenty of time to
                  send your link or code.
                </p>
              </details>

              <details
                name="faq"
                className="group rounded-lg bg-muted/40 p-5 open:bg-muted/70 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-base sm:text-lg font-medium text-foreground select-none">
                  <span>Can other people see my temporary emails?</span>
                  <span className="size-5 rounded flex items-center justify-center text-sm text-muted-foreground group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-xl">
                  No. Every temporary email address is randomly generated with a
                  unique sequence of characters that belongs solely to your
                  active browser session.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Single Quiet Line Blueprint */}
      <footer className="mt-24 py-8 text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-foreground font-medium">
            10-Mail · Free temporary email
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/priyanshugupta/10-mail"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="#use-cases"
              className="hover:text-foreground transition-colors"
            >
              Why use it
            </a>
            <a
              href="#comparison"
              className="hover:text-foreground transition-colors"
            >
              Comparison
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
            <Link
              href="/inbox"
              className="hover:text-foreground transition-colors"
            >
              Inbox
            </Link>
          </div>

          <div className="text-xs text-muted-foreground">
            © 2026 · Simple privacy for everyone
          </div>
        </div>
      </footer>
    </div>
  )
}
