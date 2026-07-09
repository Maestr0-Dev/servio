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
  auth: {
    login: {
      title: "Sign in to your dashboard",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      submitButton: "Sign In",
      loading: "Signing in...",
      error: "Invalid email or password",
      noAccount: "Don\u2019t have an account?",
      signUp: "Sign up",
    },
    register: {
      title: "Create your account",
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "At least 8 characters",
      submitButton: "Create Account",
      loading: "Creating account...",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
      error: "An error occurred while creating your account. Please try again.",
      checkEmail: "Check Your Email",
      checkEmailMessage: "We sent a verification link to",
      checkEmailInstruction: "Please click the link to verify your account.",
      goToSignIn: "Go to Sign In",
    },
  },
  businesses: {
    title: "Your Businesses",
    subtitle: "Create and manage your business profiles. Each business has its own credits, services, and settings.",
    createNew: "Create New Business",
    createDescription: "Set up a new business profile to start receiving calls",
    credits: "credits",
    noBusinesses: "No businesses yet",
    noBusinessesDescription: "Create your first business profile to get started with Servio.",
    createFirst: "Create Your First Business",
    createModal: {
      title: "Create New Business",
      nameLabel: "Business Name",
      namePlaceholder: "e.g. Studio Cutz",
      cancel: "Cancel",
      create: "Create",
    },
    loading: "Loading businesses...",
  },
  dashboard: {
    overview: {
      title: "Dashboard",
      subtitle: "Overview of your business performance",
      totalCalls: "Total Calls",
      bookings: "Bookings",
      credits: "Credits",
      conversion: "Conversion",
      quickSetup: "Quick Setup",
      setupShop: "Set up shop",
      setupShopDesc: "Add your business info",
      addServices: "Add services",
      addServicesDesc: "Define what you offer",
      connectTelegram: "Connect Telegram",
      connectTelegramDesc: "Receive booking requests",
      recentBookings: "Recent Bookings",
      noBookings: "No bookings yet. Set up your shop and connect your Telegram bot.",
    },
    shop: {
      title: "Shop Configuration",
      subtitle: "Set up your business profile for the smart receptionist",
      businessInfo: "Business Information",
      businessName: "Business Name",
      businessNamePlaceholder: "e.g. Studio Cutz",
      aiPhone: "AI Phone Number",
      aiPhonePlaceholder: "+1 (555) 123-4567",
      aiPhoneHint: "The phone number customers will call.",
      description: "Business Description & Hours",
      descriptionPlaceholder: "e.g. Hair salon. Open Mon-Fri 9am-7pm, Sat 10am-5pm.",
      liveNotice: "Live Notice",
      liveNoticePlaceholder: "e.g. Closed today for renovation. Back tomorrow at 9am.",
      liveNoticeHint: "Temporary notice that callers will hear. Leave empty for none.",
      telegram: "Telegram Integration",
      botToken: "Bot Token",
      botTokenHint: "Create a bot via @BotFather and paste the token here.",
      saveButton: "Save Changes",
      saving: "Saving...",
      saved: "Changes saved",
      loading: "Loading...",
    },
    services: {
      title: "Services",
      subtitle: "Manage the services your smart receptionist offers",
      addService: "Add New Service",
      serviceName: "Service name",
      price: "Price",
      duration: "Min",
      addButton: "Add",
      noServices: "No services yet. Add your first service above.",
      loading: "Loading services...",
    },
    bookings: {
      title: "Bookings",
      subtitle: "View and manage all incoming bookings",
      all: "All",
      pending: "Pending",
      confirmed: "Confirmed",
      rejected: "Rejected",
      noBookings: "No bookings yet. Connect your Telegram bot to start receiving calls.",
      noFilteredBookings: "No {status} bookings.",
      loading: "Loading bookings...",
    },
    credits: {
      title: "Credits",
      subtitle: "Manage your call credits and billing",
      balance: "Current Balance",
      creditsAvailable: "credits available",
      topUp: "Top Up Credits",
      howItWorks: "How Credits Work",
      step1Title: "1. Top Up",
      step1Desc: "Add credits to your business. Pay what you want.",
      step2Title: "2. Use Credits",
      step2Desc: "Credits are used automatically as calls come in.",
      step3Title: "3. Top Up Again",
      step3Desc: "Run low? Add more credits anytime.",
      transactionHistory: "Transaction History",
      noTransactions: "No transactions yet. Top up to get started.",
    },
    sidebar: {
      overview: "Overview",
      shop: "Shop",
      services: "Services",
      bookings: "Bookings",
      credits: "Credits",
      allBusinesses: "All Businesses",
      signOut: "Sign Out",
    },
  },
} as const;

export default en;
