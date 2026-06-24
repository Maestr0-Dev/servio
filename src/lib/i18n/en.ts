const en = {
  nav: {
    brand: "Servio",
    tagline: "Smart Voice Receptionist",
    language: "Language",
  },
  hero: {
    badge: "Coming Soon",
    title1: "Run your business,",
    title2: "we handle the rest.",
    description:
      "Never miss a call again. Servio gives your business a 24/7 smart receptionist that answers calls, books appointments, and sends confirmations \u2014 all while you approve with one tap on Telegram.",
    formPlaceholder: "Enter your email",
    formButton: "Join Waitlist",
    formLoading: "Joining...",
    waitlistNote: "Join the waitlist. Be the first to know when we launch.",
  },
  form: {
    success: "Check your email for a verification link!",
    pendingTitle: "You already signed up",
    pendingMessage:
      "Check your inbox or click resend to get a new verification link.",
    resendButton: "Resend Email",
    differentEmail: "Different Email",
    networkError: "Network error. Please try again.",
  },
  features: {
    title: "What Servio Lets You Do",
    subtitle:
      "A complete smart receptionist system for your business. Here\u2019s everything you get.",
    items: [
      {
        title: "24/7 Smart Receptionist",
        description:
          "Never miss a call. Your smart receptionist answers questions, takes bookings, and provides information around the clock.",
      },
      {
        title: "Telegram Approval System",
        description:
          "Review and approve bookings with one tap. Stay in control while the system handles the heavy lifting.",
      },
      {
        title: "Automatic SMS Confirmations",
        description:
          "Customers receive instant booking confirmations via text message. No manual follow-up needed.",
      },
      {
        title: "Live Business Updates",
        description:
          "Post temporary notices like \"Closed today\" or \"New hours\". Your receptionist will inform callers automatically.",
      },
      {
        title: "Service Management",
        description:
          "Add, edit, or remove services and pricing. Your receptionist always has the latest information.",
      },
      {
        title: "Multi-Tenant Isolation",
        description:
          "Each business gets its own isolated setup. Your data, your bot, your control.",
      },
    ],
  },
  benefits: {
    title: "Why You Should Use Servio",
    subtitle:
      "It\u2019s not just about answering calls. It\u2019s about running a better business.",
    items: [
      {
        title: "Weekly Call Insights",
        description:
          "Get a clear breakdown of every customer interaction. See what they asked, what they booked, and what they wanted but you didn\u2019t offer. Know your customers better than ever.",
        stat: "Weekly reports",
      },
      {
        title: "Never Miss a Lead Again",
        description:
          "Every missed call is lost revenue. Your smart receptionist picks up every single time \u2014 evenings, weekends, holidays. Capture 100% of your potential bookings.",
        stat: "100% pickup rate",
      },
      {
        title: "Save on Staff Costs",
        description:
          "Hiring a receptionist is expensive. Servio handles calls, bookings, and confirmations for a fraction of the price \u2014 no salary, no sick days, no training.",
        stat: "Up to 90% savings",
      },
      {
        title: "Focus on What You Do Best",
        description:
          "Stop juggling the phone while cutting hair, fixing teeth, or repairing cars. Let your smart receptionist handle the admin while you focus on your craft.",
        stat: "3+ hours saved daily",
      },
      {
        title: "Instant Customer Confirmations",
        description:
          "Customers get a text the moment their booking is approved. No awkward back-and-forth, no forgotten appointments. Professional and seamless every time.",
        stat: "Instant SMS alerts",
      },
      {
        title: "Grow Without Limits",
        description:
          "Whether you get 5 calls or 500 a day, Servio scales with you. Add new services, update hours, and post notices \u2014 all from one simple dashboard.",
        stat: "Unlimited calls",
      },
    ],
  },
  verify: {
    success: {
      title: "You\u2019re Verified!",
      alreadyTitle: "You\u2019re Already Verified",
      message: "Your email has been confirmed. You\u2019re officially on the Servio waitlist.",
      alreadyMessage:
        "Your email was already confirmed. You\u2019re all set on the waitlist.",
      subtext: "We\u2019ll let you know as soon as Servio is ready.",
      button: "Back to Home",
    },
    error: {
      missingToken: {
        title: "Link Incomplete",
        message:
          "The verification link is missing the security token. Please use the full link from your email.",
      },
      invalidToken: {
        title: "Link Expired or Invalid",
        message:
          "This verification link is no longer valid. It may have already been used or expired.",
      },
      server: {
        title: "Something Went Wrong",
        message:
          "We couldn\u2019t verify your email right now. This is a temporary issue \u2014 please try again in a moment.",
      },
      whatToDo: "What to do:",
      instructions: [
        "Check your inbox for the latest verification email",
        "If the link expired, go back and join the waitlist again with your email",
      ],
      button: "Back to Home",
    },
  },
  admin: {
    title: "Waitlist Admin",
    subtitle: "Manage your waitlist entries",
    totalSignups: "Total Signups",
    verified: "Verified",
    pending: "Pending",
    email: "Email",
    status: "Status",
    joined: "Joined",
    noEntries: "No waitlist entries yet.",
    verifiedBadge: "Verified",
    pendingBadge: "Pending",
  },
  footer: {
    copyright: "\u00a9 {year} Servio. All rights reserved.",
  },
} as const;

export default en;
