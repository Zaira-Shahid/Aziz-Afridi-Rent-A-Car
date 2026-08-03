import type { ServiceDetail } from "@/types";

const hotelTransfer: ServiceDetail = {
  slug: "hotel-transfer",
  name: "Hotel Transfer",
  metaDescription:
    "Comfortable hotel transfer services across Pakistan with Signature Rent A Car — professional chauffeurs, fixed pricing, and door-to-door luxury.",
  hero: {
    badge: "Premium Logistics",
    title: "Comfortable Hotel Transfer Services",
    description:
      "Experience seamless door-to-door luxury travel with our professional chauffeur service. We bridge the gap between your arrival and your destination with uncompromising elegance. Every transfer is pre-scheduled, fixed-price, and tracked end-to-end, so there are no surprises at either end of your journey.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVVaQAWZFJ0YCSkQ1uJZwiYmBS9MMFnSJNttOQMUhdXkmsLJh8CDvnNUKInESgnr8hxNnYRIEBAzHB5UOFoi4-TX4WatCkThIWjZmo2ihJtaynQN_gYMpeFmYqGPXGQxkHwfy2rTKHZgB4icjlWxvHwgHLnw-1V3lN17U5BKPbpqA8byOBPo3dAOC_bX-88VIE3e1p5YqUbNwm7n1mIb-eaZ-2USjZM4LlzXp0uciPK1Hi3zU4bBKT",
    primaryCta: { label: "Reserve Transfer", href: "/contact" },
    secondaryCta: { label: "Explore Fleet", href: "#fleet" },
  },
  features: {
    title: "World-Class Transfers",
    description:
      "Tailored travel solutions for the discerning passenger, ensuring punctuality and privacy at every turn. Each chauffeur is trained on hotel etiquette and local routes to keep every transfer smooth, quiet, and on schedule.",
    items: [
      {
        icon: "flight_land",
        title: "Airport to Hotel",
        text: "Greeter service and seamless pickup from major hubs directly to your lobby.",
      },
      {
        icon: "flight_takeoff",
        title: "Hotel to Airport",
        text: "Punctual departures for stress-free boarding.",
      },
      {
        icon: "map",
        title: "City Tour",
        text: "Personalized itineraries with expert drivers.",
      },
      {
        icon: "business_center",
        title: "Business Transfers",
        text: "Move between meetings with the efficiency and confidentiality your executive status demands. Our fleet is equipped with Wi-Fi and privacy partitions.",
      },
    ],
  },
  coverage: {
    title: "National Coverage",
    description: "Luxury at your doorstep across Pakistan's most prominent cities and retreats.",
    cities: [
      {
        name: "Islamabad",
        tag: "24/7 Availability",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCdIEGISQQlT0Kfudh7Fh-erk5291TdfPLfrSpFPLX0PW_RNkgPIMIswbraPw0uc1OimVbGU-AUFft9dtXGsHAxevvGmJ3FnAn4vmF0lzny_DDKhXJ3Ls0gaT7vy33qy3Qh2wsBECWMwPhdlyqmU5CGwUfw2kUjZxWb6lbIiF7JvLFJH5NvDHald78U9p1aqp47luBNzD0kIe45XrlMXCjH42aYqekpHq3mmd1ITnYavuPg5fdlOifD",
      },
      {
        name: "Lahore",
        tag: "15 Hotels Linked",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1pw8ZdADhhjXqe3eBcw5Ux6FQE01oLp9riGzxi4-xTyNcSB2xKyD-xwool_ERPMHO9bL8ZYCIFfVkwqcsfCLoEnw91qH0XMJUwojeOKI-cix6d8-PhQ92OR_RLoU7SdFybmC8-2aPEDCYxP6y_1-n37Um0uZteHkeVfA4qGV-w2vRqaUszBO8RKync40dmIhD5sx71dw4JS1yE5r91XYhtCG9JzF7NO8PoFdXfk5RiWLJVAF0S0K",
      },
      {
        name: "Karachi",
        tag: "Airport VIP Fast-track",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCTr08rLdv7jmHeVvULIesxu9a2lDVLd_lGNxxuxW2B7tHVDDO8x5rgSks4Ff5vFrUz_SpxseN_oFRi9mDSHAq0iSicFFKmT3-uXkh9CyQJpfZZTBURLXeNwq2kb0v8xG_klDAUZFPz32aXwdHYp0SMsSp-navc9YZLfsFSG6Rvlr-KzQbRk7hLc75qE_41OBynzzTYeVJtENdqpu2KyZSKud-agQ5PexN2IE4obbcPeQhn_wCJhrv1",
      },
      {
        name: "Murree",
        tag: "4x4 Premium Fleet",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCJcDcSvcULxf6DizyBbP_HUgOVTsAm7M7F6irkK57fXMLDyuCvh587NX92tbaJYlza5Yf5rDXT7Nqtr6DchROkdfS77qraVchaIcZ1gIimzFaJbiOHmcCtfefsKPH_K3l0MtmDfNwB5imVHoUBzB_B4Gr2sA7F5tUCLiaqecq8eTvRu8eeZtFeAyEofZFERtOmqtpjOiOFCeHacefiSd4LSBryGWhWCvjCNJ376MxAy6L08pNmoZHC",
      },
    ],
  },
  booking: {
    title: "Secure Your Private Chauffeur",
    description:
      "Simple, fast, and transparent booking. Your vehicle will be waiting precisely when you need it.",
    highlights: [
      { icon: "verified", text: "Fixed Transparent Pricing" },
      { icon: "schedule", text: "Free Waiting Time (60 mins)" },
      { icon: "person", text: "Bilingual Professional Drivers" },
    ],
  },
  fleet: {
    title: "Our Premium Fleet",
    description: "Choose the vehicle that matches your itinerary and party size.",
    items: [
      {
        name: "Executive Sedan",
        tag: "2024 Model",
        seats: 3,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBTJ4YCSAXfXW6Y-F7FvY_-_wMNDMe19tv0kTN4gf_1_OTG2I-rHZtuKg0WHVGh6hUBgcibDiFcbPKTZg1Bawg9Jcf3nbX1FF-VXH---fIRKEsn-O-r_Zyo8I1fyeK2TlfB0pSajCL6fEozPXAQCNg9zPh9Whx06E0f7znuiOYtiFlInuVFKrBxBmPVGtrih0lCiWc2qRS2k0leBI3QUeFU73NubDvicTLNla98M2RxdcIw57n1hxr9",
        priceDay: 32000,
      },
      {
        name: "Luxury SUV",
        tag: "Top Choice",
        seats: 5,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBQpYu3onFZyjQJ9dC_b9w1SdoBPXJtp0iBEOfN-3s-VlIUP2iMYMXswA4sgY2oFaam7m3tNj2NXvqUQ3p7xAMMAcwiZwwgQJQ5kNBj8qDno3KmB1t3NWbmi8FYrQN3uY_poeKnw74oITVdEx7RMJtzx4UmvB2Alp677m-2Tyg9dySMPvX6rsRuVvR3idcGDwUuNKQO8YM1epYyZmLkHqbov8CWZEHeFP-IsHXKBfYvQIkm8cZpoJIo",
        priceDay: 38000,
      },
      {
        name: "Business Van",
        tag: "Large Group",
        seats: 7,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDhnGMFWj4w1_ItWViPEd0sqK8vIx-AvGiXvtAdTV8vXraov31OmtiTXkTNI0LTwIvlpwy3CPgqSjjKGkZjRnnb1LdNvu0NiWXZ4krNQi5QGW5I3vikKBfz_6zUJIJ60SZBqbEtfKOYuaU-SQCHUUdz-GjyHyrXM2YoZ8VLr5IvLdtqPs0yCWy0JSM814ACQ8i9TnhP6GVgbtPGWSnZDmtaiobl5VUkK7pz-gFcBQviqu98Q9HJ4U4U",
        priceDay: 28000,
      },
    ],
  },
  included: {
    title: "What's Included",
    description: "Every hotel transfer is priced all-inclusive — no hidden extras at drop-off.",
    items: [
      { icon: "person", text: "Professional, uniformed chauffeur for the entire journey" },
      { icon: "local_gas_station", text: "Fuel fully included — the fixed fare covers the full route" },
      { icon: "water_drop", text: "Complimentary bottled water for every passenger" },
      { icon: "wifi", text: "In-car Wi-Fi available on Business Van and Executive Sedan bookings" },
      { icon: "schedule", text: "60 minutes of free waiting time at the pickup point" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Built for anyone who needs a reliable, comfortable link between the airport, hotel, and city.",
    items: [
      {
        icon: "flight",
        title: "International Travelers",
        text: "Land, clear immigration, and step straight into a waiting private vehicle without haggling for a taxi.",
      },
      {
        icon: "business_center",
        title: "Corporate Guests",
        text: "Reliable, punctual transfers for delegates and visiting staff attending meetings or conferences.",
      },
      {
        icon: "groups",
        title: "Families & Groups",
        text: "Spacious SUVs and vans for families and tour groups traveling together with luggage.",
      },
    ],
  },
  notes: {
    title: "Flight Delays & Meet-and-Greet",
    description: "We plan around your flight, not the other way around.",
    items: [
      {
        icon: "flight_land",
        title: "Real-Time Flight Monitoring",
        text: "We track your flight number, so delayed or early arrivals never leave you without a car.",
      },
      {
        icon: "badge",
        title: "Meet & Greet at Arrivals",
        text: "Your chauffeur waits at the arrivals hall with a name board, ready to assist with luggage.",
      },
      {
        icon: "hourglass_top",
        title: "Complimentary Grace Period",
        text: "60 minutes of free waiting is included after landing to clear immigration and baggage claim.",
      },
    ],
  },
};

const executiveCarRental: ServiceDetail = {
  slug: "executive-car-rental",
  name: "Executive Car Rental",
  metaDescription:
    "Executive car rental with premium chauffeur service from Signature Rent A Car — designed for global leaders who demand privacy, punctuality, and prestige.",
  hero: {
    badge: "VIP Chauffeur Services",
    title: "Executive Car Rental With Premium Chauffeur Service",
    description:
      "Experience the pinnacle of corporate travel. Our fleet of meticulously maintained luxury vehicles and professional chauffeurs ensure your journey is as productive as it is comfortable. From single transfers to standing monthly arrangements, every detail is coordinated so you can focus on business, not logistics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2cP6lh8z8yLUyvfAS2r5Kyu0c2myayXrEh3Tqte9GAzqwXkZEqJwAF8FLPzpBDlejLFxqcK39gyEJY3xGwD2WPQdVxW-96QI_vkw1LPOQP5Djf4DqLUm4c96I8VJnurZE8uEgbeowL3JmC3k54rEtgS_FWgb3uyZ8oKvA5VYVQBqTGvkFHShX583W7gfpzW-JwSoOXMpnA5J45sfEONUI3iTcqPnmu0QLVRu4yCCvXX6_N-uuPvCw",
    primaryCta: { label: "Explore Fleet", href: "#fleet" },
    secondaryCta: { label: "Contact Concierge", href: "/contact" },
  },
  fleet: {
    title: "Our Exclusive Fleet",
    description:
      "Selected for comfort, safety, and executive presence. Choose the perfect statement for your arrival.",
    items: [
      {
        name: "Mercedes-Benz S-Class",
        tag: "Ultimate Luxury",
        seats: 4,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDRNpKn2dSR_BZtlgLJflMI3WLS3g0yKN0rM7j_hYRi0Jjlu-tRAKxwDnOW2uXQ1DXJdmLCESbGHacruNEJgeyVeoDqonuaBdMvYDL1bBfVksiAAsGbIP8FfM_5FMLUr0teyvPPdVFDUkke1dMK2BY-53HrsoQqGlM7ZmAk-q4NhfEtd-sZoYP9eBSKMBUFz_ctlhVCB5BpB01tr-takOFVa11Xnemhbze-FSX_s3wKVSEmrZsanXKv",
        priceDay: 65000,
      },
      {
        name: "BMW 7 Series",
        tag: "Innovation",
        seats: 4,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA1d8iVz2j2ubfPwx1GLKTeiZwGSZkK8352f6k8LiCV_f0TQDJGcp1qeMdsbdL3jQ2jEjSjKV4Uctpydz2J6d1Nf1dT7PpU8I1rz7YHN1fWUNatRoMCvJTXD44TmlVnQOUeAmCZrHXW0C7nDcrRsUTTbDHf31v-5bXUekZiMSC7JsBYuDEgFtgk4pxr1pyLchh21zOzWYUQKYQNuhpKJZeahvVBaDW75TLs3S9BgW3O5B4Z5TjzVcrG",
        priceDay: 58000,
      },
      {
        name: "Toyota Prado",
        tag: "Versatile",
        seats: 7,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBpMGf94j8_5aLqXiiiORSGHteXiLtJq9hhYvBawIF1XYWySMy_9Hr3PeguFIZYmnajqVGJ2_cXRW68Ro9Pzbz6ofLnPCQEwz7wl0zCoql2RAH7gOKi7b8ByqdUgLHnWaCCExkMc1ZhnUMLhlwtAZJkEVmDVcbiYhvlg_8KKn43zlb-iSmKALvEZYiPW5_iYJj1oAVvYz_PORP971byOfFrj-Ff4qD1jJCa18TuHi0ZXnGIICuZ7vRA",
        priceDay: 32000,
      },
      {
        name: "Toyota Fortuner",
        tag: "Commanding",
        seats: 7,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA00v0p_QuJU2LFknjEzdWtWgmyEGyZD8ZS_O4BLwfG42sH1FZ3oYoSdvaZosAzZkGOmuOPhphhmWuruhNBKshsmWipIs0wOybaFklc7dV-zbK_e2l4AJO_CZKCKHTBi_FXpxzJWSM4rbSPWYwGwvjjpbjKQgGHIhRMasgsGhm7foAN3iHwBQRzgbtM3mFrSZ-SRra74-xFD9QLVSdPfuJmeTR68Ex6eTzqPlXWjQg5jg0B_C27Sdzu",
        priceDay: 25000,
      },
    ],
  },
  features: {
    title: "Designed for Global Leaders",
    description:
      "Our services go beyond transportation. We provide a mobile sanctuary for the modern executive, with vehicles maintained to a five-star standard and chauffeurs briefed on your itinerary in advance.",
    items: [
      {
        icon: "flight_takeoff",
        title: "VIP Transfers",
        text: "Seamless airport pickups with meet-and-greet service and luggage assistance directly to your destination.",
      },
      {
        icon: "business_center",
        title: "Business Meetings",
        text: "Arrive composed and prepared. Use the travel time for final preparations while we handle the navigation.",
      },
      {
        icon: "celebration",
        title: "Corporate Events",
        text: "Full fleet support for gala dinners, conferences, and board meetings with dedicated event coordinators.",
      },
      {
        icon: "language",
        title: "Intercity Travel",
        text: "Comfortable long-distance travel between cities with scheduled breaks and premium refreshments.",
      },
    ],
  },
  story: {
    title: "The Gold Standard in Professional Chauffeur Service",
    description:
      "Our chauffeurs are more than just drivers; they are expertly trained logistics specialists and local guides committed to your safety and schedule.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGa-vGukjgP8fGr7vX34p5XKOeXU-NPCsxWd74FvO-GAtO_owb_LmaSmfCPbNoozVrkhaDWctD3CNPrlN9dibkNRl5ES-EAjw8wvk78xHYNXMQIpN9ir2twigOcmIGNAIrKm5ysLedyv-_kLo4t9yQ8t3tMPumQSQrZoyW53-t1DCL7_3zgStGQEcm5QG74lBtz7ppDdDGS3xbF_lG9TCIs4XK5OfY4wcfEXbs1LrKFZs2iy1tBpo7",
    stat: { value: "15+", label: "Years of Average Experience" },
    points: [
      {
        icon: "workspace_premium",
        title: "Advanced Training",
        text: "Each chauffeur undergoes rigorous defensive driving and executive etiquette training annually.",
      },
      {
        icon: "privacy_tip",
        title: "Unwavering Privacy",
        text: "We understand the value of confidentiality. What happens in the cabin stays in the cabin.",
      },
      {
        icon: "auto_fix_high",
        title: "Immaculate Grooming",
        text: "Our staff represents you. We maintain the highest standards of professional attire and hygiene.",
      },
    ],
  },
  process: {
    title: "Effortless Reservation Process",
    steps: [
      { icon: "search", title: "1. Select Vehicle", text: "Choose from our curated fleet of luxury sedans and SUVs." },
      {
        icon: "calendar_month",
        title: "2. Pick Schedule",
        text: "Define your route, date, and specific chauffeur preferences.",
      },
      { icon: "credit_card", title: "3. Confirm Booking", text: "Secure payment and receive instant digital confirmation." },
      { icon: "handshake", title: "4. Luxury Ride", text: "Your chauffeur arrives early, ready to provide a 5-star service." },
    ],
  },
  testimonials: {
    title: "Voices of Excellence",
    items: [
      {
        quote:
          "Signature has become our exclusive partner for all executive travel. Their attention to detail and the professionalism of their chauffeurs are unmatched in the industry.",
        name: "Haris Ahmed",
        role: "CEO, TechFlow",
      },
      {
        quote:
          "The airport transfer service was flawless. My flight was delayed, but the chauffeur was waiting at the terminal when I landed. Exceptionally reliable.",
        name: "Elena Vance",
        role: "Global Logistics Director",
      },
    ],
  },
  included: {
    title: "What's Included",
    description: "A fully managed experience from pickup to drop-off, with nothing left for you to arrange.",
    items: [
      { icon: "person", text: "Formally attired, professionally trained chauffeur" },
      { icon: "local_gas_station", text: "Fuel fully covered on all point-to-point and hourly bookings" },
      { icon: "water_drop", text: "Complimentary bottled water and refreshments in the cabin" },
      { icon: "wifi", text: "In-car Wi-Fi and phone charging for uninterrupted productivity" },
      { icon: "schedule", text: "Flexible waiting time for meetings that run over schedule" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Trusted by professionals who cannot afford unpredictable travel.",
    items: [
      {
        icon: "workspace_premium",
        title: "C-Suite & Business Leaders",
        text: "Discreet, on-time travel between meetings, airports, and events without the stress of driving.",
      },
      {
        icon: "diversity_3",
        title: "Diplomats & Delegations",
        text: "Coordinated multi-vehicle movements for official visits, with security-conscious chauffeurs.",
      },
      {
        icon: "event",
        title: "Event & Conference Organizers",
        text: "Scheduled fleets for speakers, sponsors, and VIP guests throughout multi-day events.",
      },
    ],
  },
  notes: {
    title: "Corporate Account Benefits",
    description: "Simplify recurring travel for your organization with a dedicated Signature corporate account.",
    items: [
      {
        icon: "receipt_long",
        title: "Consolidated Monthly Invoicing",
        text: "One clean invoice for all rides across your team, instead of individual receipts.",
      },
      {
        icon: "support_agent",
        title: "Dedicated Account Manager",
        text: "A single point of contact who understands your company's travel patterns and preferences.",
      },
      {
        icon: "priority_high",
        title: "Priority Fleet Allocation",
        text: "Guaranteed vehicle availability during peak business hours and high-demand periods.",
      },
      {
        icon: "percent",
        title: "Volume-Based Discounts",
        text: "Preferential rates that scale with your organization's monthly booking volume.",
      },
    ],
  },
};

const weddingCarRental: ServiceDetail = {
  slug: "wedding-car-rental",
  name: "Wedding Car Rental",
  metaDescription:
    "Premium wedding car rental from Signature Rent A Car — make your wedding journey memorable with a decorated luxury fleet and dedicated concierge.",
  hero: {
    badge: "Premium Wedding Rentals",
    title: "Make Your Wedding Journey",
    accent: "Memorable",
    description:
      "Experience unparalleled luxury on your special day. From executive sedans to grand SUVs, we provide the perfect chariot for your once-in-a-lifetime celebration. Our wedding concierge coordinates every vehicle in your convoy — bride, groom, and family — so timings stay perfectly in sync from baraat to reception.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJJHBE-bmZHercJDx_Uq8yAQGd519l2l3SfHdJPoEx6mb-fWl7IPlGEGMU1Sd0oCAKwBuRY2VKEJPqZDUag3ipyIPVH0koJipFZKr1UhAL4H504Zb_6gSqmydhrIPeCfDGKI-Za7Qwaobdt5NH6aHFIddN7RaUpgsEq0HbPv3g8he9vbblpfSeNNTzT9rKcOQimfTETxqd1rAtBbwc6CzVcVJdCgS8tOrJekEAuC4DrT0d468CbGCd",
    primaryCta: { label: "Reserve Your Car", href: "#booking" },
    secondaryCta: { label: "View Our Fleet", href: "#fleet" },
  },
  features: {
    title: "Premium Experience Guaranteed",
    description:
      "Our service is defined by meticulous attention to detail, from the scent of the interior to the uniform of the chauffeur. We ensure every mile reflects the elegance of your wedding, with each vehicle detailed and inspected the morning of your event.",
    items: [
      {
        icon: "schedule",
        title: "On-Time Arrival",
        text: "Punctuality is our promise. We arrive 15 minutes early to ensure your schedule remains perfect.",
      },
      {
        icon: "auto_awesome",
        title: "Custom Decoration",
        text: "Tailored floral arrangements to match your wedding theme.",
      },
      {
        icon: "support_agent",
        title: "24/7 Concierge",
        text: "Dedicated wedding planner support from booking to send-off.",
      },
      {
        icon: "distance",
        title: "Route Mapping",
        text: "Optimized scenic travel paths between venues.",
      },
    ],
  },
  fleet: {
    title: "Our Wedding Fleet",
    description: "Selected for elegance, comfort, and luxury.",
    items: [
      {
        name: "Toyota Prado",
        tag: "SUV Luxury",
        seats: 7,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCPY5_PMYGQYo0Waqtr0gQOWBLGeG3Abd006l8T-3Jg0-nWsm2E1pwkrKBBOrnZhn94JsjI7SBVHQUxQ6xsZaHOFw8dZocQClcp6GSlKQEKFQS6JpspWNd-UdG088WEA4bPnpQKaAUOoHy0zPNuBTxMHjiQWQX-5UlzJQzYJS49TJeb0odAj05Hwe1_V-3SF07KqxH-w1QDYuD2oH5mIIVpKIht00JUkq7HOrsetbuLSKPulT-Bh0h0",
        priceDay: 35000,
      },
      {
        name: "Toyota Fortuner",
        tag: "Executive SUV",
        seats: 7,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBzADb0DK4icmYnocK74sO8pHPCYx9c5wxy32-q5HddPova4FmP7EEHgIbVsrqgEgEpeJzce4c5xrP4J8T-z6KhGT0iuGHYc6FWq23zFhdDxwFtdQ0MVlNDQ-YOkI4pKqoFuPtNdVZZp7pS3nrgLBn-UU23IPZdx9Pk-15zL2dgA5Wq2rLivIQj2_myHQUbVIuk93LQbHfs0wYudTt9QvlH5sFASUhbrc3Wc8WB7dzQ5S9aP2wUV_cJ",
        priceDay: 28000,
      },
      {
        name: "Mercedes S-Class",
        tag: "Luxury Sedan",
        seats: 4,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAuaOzWRWQYA0uw2yt7UyJNB_QmzM3A4YzyQllk_PJLUq6cl08wmiYPZg3O0XRx_xCpBfmDZ0FCilJDKgFhAGYrk9N0qi-03FP_ruiy2wb_VGexSnpBdU6uNdnyMEWfPjUhU6zDeOwWAKHKvjBxgwP70jnQrp9d7Do9SMgvvEH_85_QhpiITW-55h_68wSPU9sZwM49d3SESkmztpoHrRAu4pyuv_vfeIl-7Q3NSPWND7k7Z0efKwrd",
        priceDay: 60000,
      },
      {
        name: "Rolls-Royce Ghost",
        tag: "Executive Elite",
        seats: 4,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDXqik-wRX7WtXJLneIcUXCKNAqtBcIVXhktuJKQDZd-NIK6kKfttaGwp5FC0ZzUXfg6aCV7gjo0s6bkWDkJQg-t6goUYT5ih_c9_gueGD_Wnh_rwiDLaXOwueRDiFUDKJveYCAak_1wG0Yp91eQGuqyPeDcaOKwxsiRYL9Jj3UxGlSavJXVhhiZJr8FP292NNS5FK5PMejDKS5TsCCfVM0S-77Qx0kG47SXdwfyL5yFe6-pVXf_K40",
        priceDay: 120000,
      },
    ],
  },
  categories: {
    title: "Wedding Transportation Services",
    description:
      "We provide comprehensive logistics for the entire wedding party, ensuring everyone arrives in style and comfort.",
    items: [
      {
        icon: "favorite",
        title: "Bride & Groom",
        text: "The main event. A flagship luxury car meticulously cleaned and decorated for the couple's grand entrance and exit.",
        bullets: ["Complimentary Refreshments", "Uniformed Chauffeur", "Red Carpet Arrival"],
      },
      {
        icon: "family_restroom",
        title: "Family Transportation",
        text: "Spacious SUVs and executive sedans for the immediate family to travel together in comfort and elegance.",
        bullets: ["Multiple Pickup Points", "Large Luggage Space", "Multi-Car Coordination"],
      },
      {
        icon: "group",
        title: "Guest Pickup",
        text: "Airport transfers and venue shuttles for out-of-town guests, providing a seamless luxury experience.",
        bullets: ["Meet & Greet Service", "Luxury Shuttle Vans", "Timed Group Pickups"],
      },
    ],
  },
  booking: {
    title: "Book Your Dream Car",
    description:
      "Fill out the form and our wedding concierge will get back to you within 2 hours with a customized quote and availability.",
    contact: [
      { icon: "call", label: "Direct Line", value: "+92 300 0000000" },
      { icon: "mail", label: "Email Us", value: "info@signaturerentacar.com" },
    ],
  },
  included: {
    title: "What's Included",
    description: "Every wedding booking arrives fully prepared, so your only job is to enjoy the day.",
    items: [
      { icon: "person", text: "Uniformed chauffeur trained in wedding-day etiquette and timing" },
      { icon: "local_gas_station", text: "Fuel fully included for the entire route between venues" },
      { icon: "water_drop", text: "Chilled bottled water kept ready in every vehicle" },
      { icon: "auto_awesome", text: "Standard floral decoration included on the lead car" },
      { icon: "schedule", text: "Extended waiting time built in for photo sessions and ceremony delays" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Perfect for anyone planning the transportation around a wedding celebration.",
    items: [
      {
        icon: "favorite",
        title: "Bride & Groom",
        text: "A flagship decorated car for the grand entrance, exit, and every photo in between.",
      },
      {
        icon: "family_restroom",
        title: "Families Hosting the Event",
        text: "Coordinated vehicles for parents, in-laws, and close family across multiple functions.",
      },
      {
        icon: "event_available",
        title: "Wedding Planners",
        text: "A single reliable transport partner for baraat, valima, and guest logistics across the event.",
      },
    ],
  },
  notes: {
    title: "Decoration Options & Convoy Coordination",
    description: "Personalize your fleet and keep every vehicle moving together, on schedule.",
    items: [
      {
        icon: "local_florist",
        title: "Fresh Floral Arrangements",
        text: "Choose from classic white, colorful, or theme-matched flower decorations for the lead car.",
      },
      {
        icon: "auto_awesome",
        title: "Ribbons, Signage & Lighting",
        text: "Add silk ribbons, custom 'Just Married' signage, or LED accents for evening events.",
      },
      {
        icon: "route",
        title: "Multi-Car Convoy Coordination",
        text: "Booking several vehicles? Our concierge sequences pickups and routes so the entire convoy arrives together.",
      },
    ],
  },
};

const dailyCarRental: ServiceDetail = {
  slug: "daily-car-rental",
  name: "Daily Car Rental",
  metaDescription:
    "Rent a car for a day with Signature Rent A Car — flexible booking, affordable rates, and fast doorstep delivery across Pakistan.",
  hero: {
    badge: "Premium Daily Rental",
    title: "Rent A Car For A Day With",
    accent: "Easy Booking",
    description:
      "Experience the pinnacle of automotive engineering for a day. Whether it's a business meeting or a weekend escape, drive the extraordinary with Signature. Choose self-drive for full control or add a chauffeur for a stress-free ride, with doorstep delivery available across every major city.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-dunIcvM038_EixrJ7bpLCmUGRjDv0r1ufOXWfY_ZhiL5bc_FWICTBOU3alwtKozX5I4bfq_pV0MXp-0G8DlVWQtIKebtt-vHlmE4X26uW21kPQA4EKQry8Lp3npT8q9ofVW1Oj_HWWSMgfwgl83vBIWWIK3B7lYsiw3Kwx17jx4AKrxR7_LP7VLZOvoPP5Qch56Y-m60z_cRhJl1sQGKZ1ARsQ-kA7tLgYyrYmje9mZc4Mx_UDK8",
    primaryCta: { label: "Search Available Cars", href: "#fleet" },
    secondaryCta: { label: "Book Now", href: "/contact" },
  },
  features: {
    title: "The Signature Advantage",
    description:
      "Setting the gold standard for daily car rentals, with transparent pricing and a fleet ready whenever your plans change.",
    items: [
      {
        icon: "verified",
        title: "Flexible Booking",
        text: "Change of plans? No problem. Modify or cancel your booking up to 24 hours before your pickup time at no extra cost.",
      },
      {
        icon: "payments",
        title: "Affordable Rates",
        text: "Luxury doesn't always have to be expensive. Competitive daily pricing without hidden fees.",
      },
      {
        icon: "sanitizer",
        title: "Clean Vehicles",
        text: "Every vehicle undergoes a rigorous 20-point sanitization process before every single rental.",
      },
      {
        icon: "speed",
        title: "Fast Delivery",
        text: "We deliver your chosen vehicle directly to your doorstep in under 60 minutes across major city centers.",
      },
    ],
  },
  fleet: {
    title: "Explore Our Fleet",
    description: "Tailored collections for every destination.",
    items: [
      {
        name: "Suzuki Alto",
        tag: "Economy",
        seats: 5,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC0wQvGJEYMKEXQA_WiSQb5KC9VX9IhkjBqEG9bx7tD5svMCXRTwqXeDykIUGvye2zV_jOdPrF7ffAzT43jtzf_ptcurIGzXOCWX2cpUuk_e82kC3lZXan3oTixRoiNaYV1PnavdhIHI--J_VBC9-I8hzHwPpNHwYD69q_0X3KqUC_qFJwQk7JSCXzgULyktL61nxbXAtBCbPkYUb9NNQf3hgxaQa61H8Hcpy_-LAx_ueFW_oy_BkxB",
        priceDay: 6500,
      },
      {
        name: "BMW 5 Series",
        tag: "Sedan",
        seats: 5,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAtxzNlP5pVA6EvQHoDD9CnAkJq6G3nmesEf8tCPcw16hP1LNFORPivhGg9uVxI2A8X6Ius8ho8oaz2mH_Cnhh7Vd3CVMpugJpLFB3Nv9QDlJryfE7ZjiNoKxs645N-RTxDY1rL8kp9ToUw8LTMuv7Z9aH7r61OhqV5epZNSBeJcYYg1ztryOPxTlLwy4Rb508RYiHzRscjdD8lQrvh-h3A1p8pIc0be6OclqK9-iRD7Odog995EcWu",
        priceDay: 24000,
      },
      {
        name: "Range Rover Vogue",
        tag: "SUV",
        seats: 7,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDEFTKKMfymY2CZ7clB2dJHOHP9XFyFzTHXI12j9rovLrZO43qd0kPqvJwN8vSj-jrozbaCfN2imZTTSQ6k999X5n3xYePdMXDhzBgSFnXLjcc1V2KE2FTwAPGSQt-CgfmrHcpX7i-1b2dhjib_OJbdtgv_4yQyj1s1PJUEp8cJM2MKyJQWIkzD2sglD78PLgSDSCz7scyUs51rJbB7fpqxJZgj4Co82sODxTN34IbiCdHSgy_20UT0",
        priceDay: 45000,
      },
      {
        name: "Lamborghini Huracán",
        tag: "Luxury",
        seats: 2,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCrPHYvOd2RIsBxRB8ytIOJQah-HNwTrC7kTMcnZbiGmPxdCSCQCFPj8ML_RcCw9WmFS0hj3n5N3gauD6d7C-yjAXalrQI8uxG8s1hsIN35Q6gEty5dvt8fDgmFm_2vCc3-DXwZgk5wU49MXkVkBNuE2wrIjPMAfEb1vytVOcStfDzVw4mhsGWsleK2alMsRolGjKVgolEQCgkNjdDztaKV1npbciYt9agpbQsC7arqvQgmwHWLqQai",
        priceDay: 85000,
      },
    ],
  },
  packages: {
    title: "Daily Rental Packages",
    description:
      "Choose the plan that suits your journey — from a light city run to a fully chauffeured touring package, each tier is priced per 24-hour day with no hidden extras.",
    items: [
      {
        name: "City Explorer",
        priceDay: 12900,
        features: [
          { text: "150km Included", included: true },
          { text: "Basic Insurance", included: true },
          { text: "Standard Delivery", included: true },
          { text: "Priority Support", included: false },
        ],
      },
      {
        name: "Business Executive",
        priceDay: 24900,
        featured: true,
        features: [
          { text: "Unlimited km", included: true },
          { text: "Full Comp Insurance", included: true },
          { text: "Airport Pickup/Drop", included: true },
          { text: "24/7 Priority Support", included: true },
        ],
      },
      {
        name: "Grand Touring",
        priceDay: 59900,
        features: [
          { text: "Unlimited km", included: true },
          { text: "Platinum Coverage", included: true },
          { text: "Chauffeur Included", included: true },
          { text: "Concierge Service", included: true },
        ],
      },
    ],
  },
  testimonials: {
    title: "Drive Stories from Our Clients",
    ratingSummary: { value: "4.9/5 Rating", label: "Based on 2.4k reviews" },
    items: [
      {
        quote:
          "Rented a BMW 5 Series for a last-minute business trip. The delivery was seamless, arriving exactly at my hotel in 45 minutes. The car was pristine. Truly a premium experience.",
        name: "Omar Farooq",
        role: "Investment Banker",
      },
      {
        quote:
          "Booked a Range Rover for a family weekend getaway to Murree. The flexible cancellation saved me when our plans shifted. Super clean vehicle and amazing customer service.",
        name: "Sara Khan",
        role: "Travel Vlogger",
      },
    ],
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What documents do I need for a 1-day rental?",
        answer:
          "You'll need a valid Driving License (held for at least 1 year), a CNIC or Passport, and a card or cash for the security deposit. International visitors may require an International Driving Permit. All documents must be original — photocopies are not accepted at handover.",
      },
      {
        question: "Is there a minimum age requirement?",
        answer:
          "The minimum age for standard vehicles is 21. For luxury and performance categories, the minimum age is 25. Drivers under 25 may be subject to a young driver surcharge and a reduced selection of high-performance models.",
      },
      {
        question: "Can I pick up in one city and drop in another?",
        answer:
          "Yes, we offer one-way rentals across all major cities. A standard relocation fee applies based on the distance between the pickup and drop-off locations, and this fee is confirmed upfront before you book.",
      },
      {
        question: "Is fuel included in the daily rate?",
        answer:
          "Vehicles are provided on a Full-to-Full fuel policy: you receive a full tank and are expected to return it full. This keeps pricing transparent — you only ever pay for the fuel you actually use.",
      },
      {
        question: "Can I add a chauffeur to a self-drive booking?",
        answer:
          "Yes. A professional chauffeur can be added to any package for a fixed daily supplement, or included automatically with the Grand Touring package. Simply mention this when confirming your reservation.",
      },
    ],
  },
  included: {
    title: "What's Included",
    description: "Every daily rental, self-drive or chauffeured, comes with these standard inclusions.",
    items: [
      { icon: "local_gas_station", text: "Full-to-Full fuel policy — pay only for what you use" },
      { icon: "sanitizer", text: "20-point sanitization completed before every handover" },
      { icon: "water_drop", text: "Complimentary bottled water in every vehicle" },
      { icon: "support_agent", text: "Optional professional chauffeur available on all packages" },
      { icon: "schedule", text: "15-minute grace period on both pickup and return" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Flexible enough for a single day, reliable enough for repeat use.",
    items: [
      {
        icon: "work",
        title: "Business Travelers",
        text: "A dependable vehicle delivered to your hotel or office for same-day meetings and errands.",
      },
      {
        icon: "luggage",
        title: "Tourists & Weekend Explorers",
        text: "Self-drive freedom to explore cities and getaways like Murree at your own pace.",
      },
      {
        icon: "home_repair_service",
        title: "Residents Needing a Temporary Car",
        text: "A short-term replacement while your own vehicle is being serviced or repaired.",
      },
    ],
  },
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "hotel-transfer": hotelTransfer,
  "executive-car-rental": executiveCarRental,
  "wedding-car-rental": weddingCarRental,
  "daily-car-rental": dailyCarRental,
};

export const serviceDetailSlugs = Object.keys(serviceDetails);
