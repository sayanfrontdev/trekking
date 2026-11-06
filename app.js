const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
const trips = [
  { slug: "sandakphu", title: "Sandakphu: the trail above the clouds", category: "Trekking", region: "West Bengal", days: "7 days", level: "Moderate", price: "₹18,500", image: photo("photo-1464822759023-fed622ff2c3b"), description: "Follow a ridge-top trail to sweeping views of the world's highest peaks.", badge: "Most loved" },
  { slug: "sikkim", title: "Sikkim, slowly", category: "Culture & nature", region: "Sikkim", days: "6 days", level: "Easy", price: "₹24,900", image: photo("photo-1470770841072-f978cf4d019e"), description: "Monasteries, mountain villages, and quiet roads in the eastern Himalayas.", badge: "Small groups" },
  { slug: "darjeeling", title: "Tea trails & Darjeeling mornings", category: "Weekend escape", region: "Darjeeling", days: "3 days", level: "Easy", price: "₹9,800", image: photo("photo-1500530855697-b586d89ba3ee"), description: "A restorative long weekend among tea gardens and old hill-town lanes.", badge: "New dates" },
  { slug: "kashmir", title: "Kashmir, the great outdoors", category: "Nature escape", region: "Kashmir", days: "8 days", level: "Easy", price: "₹32,500", image: photo("photo-1500534623283-312aade485b7"), description: "Alpine meadows, clear lakes and warm welcomes in the valley.", badge: "Seasonal" },
  { slug: "himachal", title: "Himachal beyond the postcards", category: "Mountain journey", region: "Himachal Pradesh", days: "5 days", level: "Moderate", price: "₹21,000", image: photo("photo-1472396961693-142e6e269027"), description: "Take the scenic way through pine forests, rivers and mountain hamlets.", badge: "Local favorite" },
  { slug: "weekend", title: "A little further into the hills", category: "Weekend escape", region: "North Bengal", days: "2 days", level: "Easy", price: "₹6,400", image: photo("photo-1470252649378-9c29740c9fa8"), description: "Unplug for a couple of days with a thoughtful local host.", badge: "Quick escape" }
];
const articles = [
  { title: "How to prepare for your first Himalayan trek", category: "Trail notes", date: "October 18, 2026", read: "7 min read", author: "Aditi Sen", image: photo("photo-1551632811-561732d1e306"), excerpt: "A practical, no-pressure guide to getting ready for your first multi-day walk in the mountains." },
  { title: "The quiet magic of a Darjeeling dawn", category: "Slow travel", date: "October 04, 2026", read: "5 min read", author: "Rohan Das", image: photo("photo-1500530855697-b586d89ba3ee"), excerpt: "Tea gardens, sleepy lanes and a first cup of the day: let the hills set the pace." },
  { title: "A local's guide to Sikkim's monastery trails", category: "Culture", date: "September 22, 2026", read: "6 min read", author: "Nima Bhutia", image: photo("photo-1470770841072-f978cf4d019e"), excerpt: "Walk between mountain monasteries and learn what makes these paths feel so special." },
  { title: "What to pack for a changing mountain forecast", category: "Trail notes", date: "September 10, 2026", read: "4 min read", author: "Aditi Sen", image: photo("photo-1464822759023-fed622ff2c3b"), excerpt: "Layering made simple, with a checklist that leaves room for the unexpected." },
  { title: "Why we travel in smaller groups", category: "Our approach", date: "August 28, 2026", read: "5 min read", author: "Rohan Das", image: photo("photo-1472396961693-142e6e269027"), excerpt: "More space to listen, linger and make a real connection with the places we visit." },
  { title: "Five beautiful weekends in the hills", category: "Inspiration", date: "August 11, 2026", read: "6 min read", author: "Aditi Sen", image: photo("photo-1500534623283-312aade485b7"), excerpt: "Little escapes for when you need fresh air, unhurried mornings and a change of view." }
];
const destinations = [
  { title: "Sandakphu", sub: "West Bengal · India", image: photo("photo-1464822759023-fed622ff2c3b", 850), slug: "sandakphu" },
  { title: "Darjeeling", sub: "West Bengal · India", image: photo("photo-1500530855697-b586d89ba3ee", 850), slug: "darjeeling" },
  { title: "Sikkim", sub: "Eastern Himalayas", image: photo("photo-1470770841072-f978cf4d019e", 850), slug: "sikkim" },
  { title: "Kashmir", sub: "Northern India", image: photo("photo-1500534623283-312aade485b7", 850), slug: "kashmir" },
  { title: "Himachal Pradesh", sub: "Western Himalayas", image: photo("photo-1472396961693-142e6e269027", 850), slug: "himachal" }
];
const legalData = {
  privacy: { title: "Privacy policy", intro: "Your trust matters to us. Here's how we handle the information you share when exploring or booking a TREKKING journey.", sections: [
    ["Information we collect", "We may collect contact details and trip preferences that you choose to share through our forms or booking enquiries. Payment information is handled by the payment provider you select; please review that provider's privacy notice."],
    ["How we use information", "We use information to respond to enquiries, coordinate requested travel arrangements, provide customer support, and improve this website. We do not sell personal information."],
    ["Cookies and tracking", "This website may use essential cookies for basic functionality. Optional analytics or marketing technologies should only be enabled with your consent where required."],
    ["Third-party services", "Maps, payment providers, social networks and other external services may process data under their own privacy policies. We only share information needed to fulfil a service you request."],
    ["Data security and retention", "We use reasonable safeguards and retain information only for as long as needed for the purpose collected or as required by applicable law. No online transmission can be guaranteed completely secure."],
    ["Your choices and rights", "Depending on where you live, you may have rights to access, correct or request deletion of personal information. Contact us using the details below to make a request."],
    ["Contact", "For privacy questions, contact hello@trekking.example. Replace this placeholder email with your approved business contact before publication."]
  ] },
  terms: { title: "Terms & conditions", intro: "These terms explain the basics of using our website and enquiring about or booking a journey. Please read them before confirming a trip.", sections: [
    ["Using this website", "Use the site lawfully and do not interfere with its operation or attempt to access systems or information that are not intended for you."],
    ["Bookings and confirmation", "A booking is confirmed only when we provide written confirmation and the required payment has been received. Enquiries and itinerary requests are not confirmed bookings."],
    ["Pricing and availability", "Prices, departure dates and availability can change until a booking is confirmed. Any inclusions, exclusions and taxes will be stated in the applicable trip details and confirmation."],
    ["Payments", "Payment schedules and accepted methods will be shared before booking. Do not send payment details through unsecured messages. Applicable payment provider terms also apply."],
    ["Customer responsibilities", "Travellers are responsible for providing accurate details, carrying valid identification and travel documents, and following local laws and reasonable guidance from trip leaders."],
    ["Travel requirements and safety", "Check entry rules, health guidance, insurance needs and fitness requirements for your trip. Adventure travel carries inherent risks; review the trip-specific information before booking."],
    ["Changes and cancellation", "Changes, cancellations and refunds are governed by the cancellation policy and the terms included in your booking confirmation."],
    ["Liability and intellectual property", "To the extent permitted by law, website content is provided for general information. Website text, design and brand assets may not be reused without permission."]
  ] },
  cancellation: { title: "Cancellation & refund policy", intro: "Plans can change. This policy describes how cancellation requests and company-initiated changes are handled. Your booking confirmation may contain trip-specific terms.", sections: [
    ["Requesting a cancellation", "Send your request in writing to hello@trekking.example and include your booking reference. The date we receive the written request is used to assess any applicable cancellation terms."],
    ["Customer cancellations", "Any cancellation charges or refundable amount depend on the trip, notice period, and non-recoverable costs already committed. The exact schedule must be shown in your booking confirmation before payment."],
    ["Company cancellations", "If we cancel a departure, we will contact affected travellers with available options. Any refund or alternative arrangements will follow the terms provided for that trip and applicable law."],
    ["Refund processing", "Approved refunds are returned using the original payment method where possible. Processing time can depend on the payment provider; we will communicate the expected timeline when confirming a refund."],
    ["Rescheduling", "Date changes depend on availability and may involve a price adjustment or supplier charges. Contact us as early as possible to discuss options."],
    ["No-shows and late arrivals", "Missing a departure or arriving too late to join may be treated as a cancellation and may not be refundable. Contact the trip coordinator as soon as possible if delayed."],
    ["Force majeure", "Severe weather, access restrictions, safety concerns and other circumstances outside reasonable control may require itinerary changes or cancellation. We will explain available options under your booking terms."]
  ] },
  disclaimer: { title: "Travel disclaimer", intro: "Mountain travel is rewarding, but conditions and plans can change. Please use trip information as a guide and make informed decisions.", sections: [
    ["Information accuracy", "We take care to keep website information useful and current, but routes, opening times, prices and conditions may change. Confirm important details with us before travel."],
    ["Weather and environment", "Weather, altitude, terrain and local conditions are unpredictable. Itineraries may change to protect traveller and community safety."],
    ["Itinerary changes", "Trip leaders may adjust plans in response to conditions, access, health, local advice or other operational needs. A published itinerary is an outline, not a guarantee of every activity."],
    ["Third-party providers", "Some services may be provided by independent accommodation, transport or activity partners, subject to their own terms and operating conditions."],
    ["Personal responsibility and adventure risk", "Outdoor activities involve inherent risks. Travellers should assess their fitness, follow safety guidance, disclose relevant needs and obtain suitable travel insurance."]
  ] },
  cookies: { title: "Cookie policy", intro: "This page explains the small data files and similar technologies this website may use, and how you can manage your choices.", sections: [
    ["What cookies are", "Cookies are small files stored by your browser. Similar technologies can remember preferences or help a website understand how it is used."],
    ["Essential cookies", "Essential cookies support core site functions such as navigation and security. They cannot be switched off through our site preferences."],
    ["Analytics cookies", "If enabled, analytics cookies help us understand aggregated website use and improve pages. They should remain disabled until you consent where required."],
    ["Marketing cookies", "Marketing cookies may be used to measure campaigns or tailor promotions. We do not enable optional marketing cookies without the appropriate consent."],
    ["Managing preferences", "You can use browser settings to view, block or delete cookies. Blocking some cookies may affect site functionality. Use the cookie settings control on this site to update optional preferences."],
    ["Contact", "For questions about cookies, contact hello@trekking.example."]
  ] }
};

const main = document.querySelector("#main-content");
const footer = document.querySelector("#site-footer");
function destinationMenuTemplate() {
  const feature = destinations[0];
  const destinationLink = destination => `<a href="${pageFile(`destination/${destination.slug}`)}" data-feature-image="${destination.image}" data-feature-title="${destination.title}">${destination.title}</a>`;
  return `<li class="nav-item dropdown mega-dropdown"><a class="nav-link dropdown-toggle" href="destinations.html" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Destinations</a><div class="dropdown-menu mega-menu"><div class="row g-4"><div class="col-md-4"><span class="mega-label">Find your landscape</span><a class="mega-feature" data-destination-feature-link href="destinations.html"><img data-destination-feature src="${feature.image}" alt="${feature.title} landscape"><span data-destination-feature-title>Explore ${feature.title}<i class="bi bi-arrow-up-right"></i></span></a></div><div class="col-md-4"><span class="mega-label">The Himalayas</span>${destinations.slice(0, 3).map(destinationLink).join("")}</div><div class="col-md-4"><span class="mega-label">Slow travel favorites</span>${destinations.slice(3).map(destinationLink).join("")}<a href="destinations.html" class="mega-all">Explore all destinations <i class="bi bi-arrow-right"></i></a></div></div></div></li>`;
}
if (!document.querySelector(".theme-toggle")) {
  document.body.insertAdjacentHTML("afterbegin", `<div class="announcement-bar"><div class="container"><p class="mb-0"><i class="bi bi-stars me-2"></i>New season, new stories — <a href="upcoming-departures.html">discover upcoming departures</a></p></div></div><header class="site-header sticky-top"><nav class="navbar"><div class="container flex-wrap"><a class="navbar-brand" href="index.html"><img src="images/logo.svg" alt="TREKKING" width="154" height="41"><span class="brand-tagline">Explore More. Experience Life.</span></a><div class="header-actions d-flex align-items-center gap-2 ms-auto"><button class="btn theme-toggle" type="button" aria-label="Switch color theme"><i class="bi bi-moon-stars"></i></button><a class="btn btn-outline-navy" href="booking-details.html">Book now</a><a class="btn btn-primary-navy" href="trip-planner.html">Plan your trip</a></div><div class="navbar-collapse"><ul class="navbar-nav flex-row flex-wrap justify-content-center"><li class="nav-item"><a class="nav-link" href="index.html">Home</a></li><li class="nav-item"><a class="nav-link" href="destinations.html">Destinations</a></li><li class="nav-item"><a class="nav-link" href="destination-sandakphu.html">Sandakphu</a></li><li class="nav-item"><a class="nav-link" href="destination-sikkim.html">Sikkim</a></li><li class="nav-item"><a class="nav-link" href="destination-darjeeling.html">Darjeeling</a></li><li class="nav-item"><a class="nav-link" href="destination-kashmir.html">Kashmir</a></li><li class="nav-item"><a class="nav-link" href="destination-himachal.html">Himachal</a></li><li class="nav-item"><a class="nav-link" href="tour-packages.html">Tour packages</a></li><li class="nav-item"><a class="nav-link" href="trekking.html">Trekking</a></li><li class="nav-item"><a class="nav-link" href="weekend-trips.html">Weekend trips</a></li><li class="nav-item"><a class="nav-link" href="about.html">About</a></li><li class="nav-item"><a class="nav-link" href="blog.html">Journal</a></li><li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li></ul></div></div></nav></header>`);
}
if (!document.querySelector("#mobileNav")) {
  const generatedNavbar = document.querySelector(".site-header .navbar");
  const generatedNav = generatedNavbar.querySelector(".navbar-collapse");
  const headerActions = generatedNavbar.querySelector(".header-actions");
  generatedNavbar.classList.add("navbar-expand-xl");
  generatedNav.classList.add("collapse", "order-xl-2");
  generatedNav.id = "pageDesktopNav";
  generatedNav.innerHTML = `<ul class="navbar-nav mx-auto align-items-xl-center"><li class="nav-item"><a class="nav-link" href="index.html">Home</a></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="destinations.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Destinations</a><ul class="dropdown-menu"><li><a class="dropdown-item" href="destinations.html">All destinations</a></li><li><a class="dropdown-item" href="destination-sandakphu.html">Sandakphu & Singalila</a></li><li><a class="dropdown-item" href="destination-sikkim.html">Sikkim</a></li><li><a class="dropdown-item" href="destination-himachal.html">Himachal Pradesh</a></li><li><a class="dropdown-item" href="destination-darjeeling.html">Darjeeling</a></li><li><a class="dropdown-item" href="destination-kashmir.html">Kashmir</a></li></ul></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="tour-packages.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tour packages</a><ul class="dropdown-menu"><li><a class="dropdown-item" href="tour-packages.html">All journeys</a></li><li><a class="dropdown-item" href="trekking.html">Trekking expeditions</a></li><li><a class="dropdown-item" href="weekend-trips.html">Weekend escapes</a></li><li><a class="dropdown-item" href="upcoming-departures.html">Upcoming departures</a></li></ul></li><li class="nav-item"><a class="nav-link" href="trekking.html">Trekking</a></li><li class="nav-item"><a class="nav-link" href="weekend-trips.html">Weekend trips</a></li><li class="nav-item"><a class="nav-link" href="about.html">About us</a></li><li class="nav-item"><a class="nav-link" href="blog.html">Journal</a></li><li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li></ul>`;
  const destinationToggle = generatedNav.querySelector('a.nav-link[href="destinations.html"]');
  if (destinationToggle) destinationToggle.closest(".nav-item").outerHTML = destinationMenuTemplate();
  headerActions.classList.add("order-xl-3");
  headerActions.querySelector(".btn-outline-navy").classList.add("d-none", "d-xxl-inline-flex");
  headerActions.querySelector(".btn-primary-navy").classList.add("d-none", "d-sm-inline-flex");
  headerActions.insertAdjacentHTML("beforeend", `<button class="navbar-toggler ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-controls="mobileNav" aria-label="Open navigation"><span class="navbar-toggler-icon"></span></button>`);
  document.body.insertAdjacentHTML("beforeend", `<div class="offcanvas offcanvas-end mobile-nav" tabindex="-1" id="mobileNav" aria-labelledby="mobileNavLabel"><div class="offcanvas-header"><a href="index.html" class="navbar-brand" id="mobileNavLabel"><img src="images/logo.svg" alt="TREKKING" width="142" height="38"></a><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close menu"></button></div><div class="offcanvas-body"><a class="mobile-link" href="index.html">Home</a><a class="mobile-link" href="destinations.html">Destinations <i class="bi bi-arrow-up-right"></i></a><a class="mobile-link" href="destination-sandakphu.html">Sandakphu</a><a class="mobile-link" href="destination-sikkim.html">Sikkim</a><a class="mobile-link" href="destination-darjeeling.html">Darjeeling</a><a class="mobile-link" href="destination-kashmir.html">Kashmir</a><a class="mobile-link" href="destination-himachal.html">Himachal Pradesh</a><a class="mobile-link" href="tour-packages.html">Tour packages</a><a class="mobile-link" href="trekking.html">Trekking</a><a class="mobile-link" href="weekend-trips.html">Weekend trips</a><a class="mobile-link" href="about.html">About us</a><a class="mobile-link" href="blog.html">Journal</a><a class="mobile-link" href="contact.html">Contact</a><div class="mobile-nav-footer"><a class="btn btn-primary-navy w-100" href="trip-planner.html">Plan your trip <i class="bi bi-arrow-up-right ms-2"></i></a><a class="btn btn-outline-navy w-100 mt-2" href="booking-details.html">Book now</a><p class="small mt-4 mb-2">Have a question? Give us a call</p><a class="fw-semibold" href="tel:+911234567890">+91 12345 67890</a></div></div></div>`);
}
function setDestinationMenuOpen(isOpen) {
  document.body.classList.toggle("destination-menu-open", isOpen);
}
document.querySelectorAll(".mega-dropdown").forEach(dropdown => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  dropdown.addEventListener("mouseenter", () => setDestinationMenuOpen(true));
  dropdown.addEventListener("mouseleave", () => {
    if (!toggle.classList.contains("show")) setDestinationMenuOpen(false);
  });
  toggle.addEventListener("shown.bs.dropdown", () => setDestinationMenuOpen(true));
  toggle.addEventListener("hidden.bs.dropdown", () => {
    if (!dropdown.matches(":hover")) setDestinationMenuOpen(false);
  });
});
const skipLink = document.querySelector(".skip-link");
const announcementBar = document.querySelector(".announcement-bar");
if (skipLink && announcementBar && announcementBar.previousElementSibling !== skipLink) document.body.insertBefore(skipLink, announcementBar);
if (!document.querySelector(".mobile-booking-cta")) document.body.insertAdjacentHTML("beforeend", `<a class="mobile-booking-cta" href="trip-planner.html"><i class="bi bi-compass"></i> Plan your trip <i class="bi bi-arrow-right"></i></a>`);
if (!document.querySelector(".back-to-top")) document.body.insertAdjacentHTML("beforeend", `<button class="back-to-top" type="button" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button>`);
if (!document.querySelector("#siteToast")) document.body.insertAdjacentHTML("beforeend", `<div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="siteToast" class="toast" role="status" aria-live="polite" aria-atomic="true"><div class="toast-body"><i class="bi bi-check-circle-fill text-success me-2"></i><span>Thanks! Your request is ready.</span></div></div></div>`);
const themeButton = document.querySelector(".theme-toggle");
let storyFilmCleanup;
let statsVisibilityHandler;
let blogPaginationCleanup;
let cookieConsentController;
let cookieConsentInitialized = false;
let cookieFocusReturn = null;
const statsAnimationTimers = new Set();
const routeHref = path => pageFile(path);
function pageFile(path) {
  if (!path) return "index.html";
  if (path.startsWith("destination/")) return `destination-${path.split("/")[1]}.html`;
  if (path.startsWith("trip/")) return `tour-${path.split("/")[1]}.html`;
  if (path.startsWith("legal/")) return `${{ privacy: "privacy-policy", terms: "terms-conditions", cancellation: "cancellation-refund-policy", disclaimer: "travel-disclaimer", cookies: "cookie-policy" }[path.split("/")[1]] || "404"}.html`;
  return ({
    packages: "tour-packages.html",
    planner: "trip-planner.html",
    booking: "booking-details.html",
    confirmation: "booking-confirmation.html",
    payment: "booking-confirmation.html",
    "payment-success": "payment-success.html",
    "payment-failed": "payment-failed.html",
    departures: "upcoming-departures.html",
    reviews: "customer-reviews.html",
    gallery: "gallery.html",
    faq: "faq.html",
    "blog/article": "blog-how-to-prepare.html"
  })[path] || `${path.replaceAll("/", "-")}.html`;
}
function rewritePageLinks(root) {
  root.querySelectorAll('a[href^="#/"]').forEach(link => {
    const path = link.getAttribute("href").replace(/^#\/?/, "").split("?")[0].replace(/\/$/, "");
    link.setAttribute("href", pageFile(path));
  });
}
const image = (src, alt, cls = "") => `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy">`;
const breadcrumb = (items) => `<nav aria-label="Breadcrumb"><ol class="breadcrumb">${items.map((item, index) => `<li class="breadcrumb-item ${index === items.length - 1 ? "active" : ""}">${index === items.length - 1 ? item.label : `<a href="${item.href}">${item.label}</a>`}</li>`).join("")}</ol></nav>`;
const pageHero = (title, intro, imageUrl = "", crumbs = []) => `<section class="page-hero ${imageUrl ? "has-image" : ""}" ${imageUrl ? `style="--page-image:url('${imageUrl}')"` : ""}><div class="container">${breadcrumb([{ label: "Home", href: "#/" }, ...crumbs, { label: title }])}<span class="eyebrow mt-4">${crumbs.length ? crumbs.at(-1).label : "A little inspiration"}</span><h1>${title}</h1><p>${intro}</p></div></section>`;
const sectionHeading = (eyebrow, title, copy, centered = false) => `<div class="section-heading ${centered ? "centered" : ""}"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><p>${copy}</p></div>`;
function statsMarkup() {
  const metrics = [
    { target: 2400, decimals: 0, suffix: "+", label: "happy trail companions", final: "2,400+" },
    { target: 38, decimals: 0, suffix: "", label: "carefully made journeys", final: "38" },
    { target: 12, decimals: 0, suffix: "", label: "local communities", final: "12" },
    { target: 4.9, decimals: 1, suffix: "/5", label: "traveller love", final: "4.9/5" }
  ];
  return `<div class="stats-strip">${metrics.map(metric => `<div class="stat-item"><strong data-counter-target="${metric.target}" data-counter-decimals="${metric.decimals}" data-counter-suffix="${metric.suffix}" aria-label="${metric.final}">${metric.decimals ? "0.0" : "0"}${metric.suffix}</strong><span>${metric.label}</span></div>`).join("")}</div>`;
}
function statsSection() {
  return `<section class="stats-section section-soft" aria-label="TREKKING at a glance"><div class="container">${statsMarkup()}</div></section>`;
}
function ratingStars(rating, maxRating = 5) {
  const numericRating = Number(rating);
  const safeRating = Number.isFinite(numericRating) ? Math.min(maxRating, Math.max(0, numericRating)) : 0;
  const roundedRating = Math.round(safeRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating - fullStars === 0.5;
  const emptyStars = maxRating - fullStars - Number(hasHalfStar);
  const displayRating = Number.isInteger(roundedRating) ? String(roundedRating) : roundedRating.toFixed(1);
  const icons = `${'<i class="bi bi-star-fill" aria-hidden="true"></i>'.repeat(fullStars)}${hasHalfStar ? '<i class="bi bi-star-half" aria-hidden="true"></i>' : ""}${'<i class="bi bi-star" aria-hidden="true"></i>'.repeat(emptyStars)}`;
  return `<div class="review-stars" role="img" aria-label="Rated ${displayRating} out of ${maxRating}">${icons}<span class="rating-score" aria-hidden="true">${displayRating}/${maxRating}</span></div>`;
}
function cookieConsentTemplate() {
  return `<div class="cookie-consent" id="cookieConsent" hidden aria-hidden="true"><section class="cookie-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="cookieConsentTitle" tabindex="-1"><div class="cookie-consent-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></div><p class="eyebrow">A little note about privacy</p><h2 id="cookieConsentTitle">Your privacy matters.</h2><p class="cookie-consent-copy">We use essential storage to make this site work. With your permission, we’d also like to save optional analytics and marketing preferences on this device.</p><div class="cookie-consent-actions" data-cookie-actions><button class="btn btn-outline-navy" type="button" data-cookie-choice="necessary">Only necessary</button><button class="btn btn-outline-navy" type="button" data-cookie-manage>Choose settings</button><button class="btn btn-primary-navy" type="button" data-cookie-choice="all">Accept all</button></div><form class="cookie-settings" data-cookie-settings hidden><div class="cookie-setting-row"><div><strong>Essential</strong><small>Required for basic site operation; always active.</small></div><input class="form-check-input" type="checkbox" checked disabled aria-label="Essential storage always active"></div><label class="cookie-setting-row" for="cookieConsentAnalytics"><span><strong>Analytics</strong><small>Help us understand how the site is used.</small></span><input class="form-check-input" type="checkbox" id="cookieConsentAnalytics"></label><label class="cookie-setting-row" for="cookieConsentMarketing"><span><strong>Marketing</strong><small>Help measure promotions and campaigns.</small></span><input class="form-check-input" type="checkbox" id="cookieConsentMarketing"></label><div class="cookie-consent-actions"><button class="btn btn-outline-navy" type="button" data-cookie-back>Back</button><button class="btn btn-primary-navy" type="submit">Save choices</button></div></form><p class="cookie-consent-footnote">You can change your choice later on our <a href="cookie-policy.html">Cookie policy</a> page.</p></section></div>`;
}
function setupCookieConsent() {
  if (!document.querySelector("#cookieConsent")) document.body.insertAdjacentHTML("beforeend", cookieConsentTemplate());
  const overlay = document.querySelector("#cookieConsent");
  const dialog = overlay.querySelector(".cookie-consent-dialog");
  const summaryActions = overlay.querySelector("[data-cookie-actions]");
  const settings = overlay.querySelector("[data-cookie-settings]");
  const analytics = overlay.querySelector("#cookieConsentAnalytics");
  const marketing = overlay.querySelector("#cookieConsentMarketing");
  const consentKey = "trekking-cookie-consent";
  let previousFocus = null;
  let closeTimer = 0;

  function show() {
    window.clearTimeout(closeTimer);
    previousFocus = document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("cookie-consent-open");
    overlay.classList.add("is-open");
    dialog.focus();
  }
  function close() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cookie-consent-open");
    closeTimer = window.setTimeout(() => { overlay.hidden = true; }, 220);
    previousFocus?.focus();
  }
  function saveConsent(analyticsChoice, marketingChoice) {
    localStorage.setItem("trekking-cookie-analytics", String(analyticsChoice));
    localStorage.setItem("trekking-cookie-marketing", String(marketingChoice));
    localStorage.setItem(consentKey, "saved");
    close();
  }
  function openSettings() {
    analytics.checked = localStorage.getItem("trekking-cookie-analytics") === "true";
    marketing.checked = localStorage.getItem("trekking-cookie-marketing") === "true";
    summaryActions.hidden = true;
    settings.hidden = false;
    if (overlay.hidden) show();
    analytics.focus();
  }
  overlay.addEventListener("click", event => {
    const choice = event.target.closest("[data-cookie-choice]");
    if (choice?.dataset.cookieChoice === "all") {
      saveConsent(true, true);
      return;
    }
    if (choice?.dataset.cookieChoice === "necessary") {
      saveConsent(false, false);
      return;
    }
    if (event.target === overlay) return;
    if (event.target.closest("[data-cookie-manage]")) {
      openSettings();
      return;
    }
    if (event.target.closest("[data-cookie-back]")) {
      settings.hidden = true;
      summaryActions.hidden = false;
    }
  });
  overlay.addEventListener("submit", event => {
    if (!event.target.matches("[data-cookie-settings]")) return;
    event.preventDefault();
    saveConsent(analytics.checked, marketing.checked);
  });
  overlay.addEventListener("keydown", event => {
    if (overlay.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      if (settings.hidden) saveConsent(false, false);
      else close();
    } else if (event.key === "Tab") {
      const focusable = [...dialog.querySelectorAll("button:not([hidden]), input:not([disabled]):not([hidden]), a[href]")].filter(element => !element.closest("[hidden]"));
      if (event.shiftKey && (document.activeElement === dialog || document.activeElement === focusable[0])) {
        event.preventDefault();
        focusable.at(-1)?.focus();
      } else if (!event.shiftKey && (document.activeElement === dialog || document.activeElement === focusable.at(-1))) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    }
  });
  document.addEventListener("click", event => {
    if (!event.target.closest("[data-open-cookie-settings]")) return;
    event.preventDefault();
    if (overlay.hidden) show();
    openSettings();
  });

  if (localStorage.getItem(consentKey) !== "saved") {
    summaryActions.hidden = false;
    settings.hidden = true;
    show();
  }
  return { openSettings, close };
}
function setupBlogPagination(root) {
  const grid = root.querySelector("#articleGrid");
  const pagination = root.querySelector('[aria-label="Blog pages"]');
  const search = root.querySelector("#articleSearch");
  if (!grid || !pagination) return;
  const cards = [...grid.querySelectorAll(".article-result")];
  const emptyMessage = document.createElement("div");
  emptyMessage.className = "col-12 empty-message";
  emptyMessage.textContent = "No stories match your search. Try another keyword or category.";
  emptyMessage.hidden = true;
  grid.append(emptyMessage);
  const pageSize = 3;
  let currentPage = 1;
  let activeCategory = "all";
  let query = "";

  function render() {
    const matches = cards.filter(card => (activeCategory === "all" || card.dataset.category === activeCategory) && card.dataset.search.includes(query));
    const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const start = (currentPage - 1) * pageSize;
    const currentCards = new Set(matches.slice(start, start + pageSize));
    cards.forEach(card => card.classList.toggle("d-none", !currentCards.has(card)));
    emptyMessage.hidden = matches.length > 0;
    pagination.hidden = pageCount <= 1;
    const items = [];
    const addControl = (label, page, disabled = false, active = false, ariaLabel = "") => {
      items.push(`<li class="page-item ${disabled ? "disabled" : ""} ${active ? "active" : ""}"><button class="page-link" type="button" data-article-page="${page}" ${disabled ? "disabled" : ""} ${active ? 'aria-current="page"' : ""} ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}>${label}</button></li>`);
    };
    addControl('<i class="bi bi-chevron-left"></i>', currentPage - 1, currentPage === 1, false, "Previous page");
    for (let page = 1; page <= pageCount; page += 1) addControl(String(page), page, false, page === currentPage, `Page ${page}`);
    addControl('Next <i class="bi bi-arrow-right"></i>', currentPage + 1, currentPage === pageCount, false, "Next page");
    pagination.querySelector(".pagination")?.replaceChildren();
    const list = pagination.querySelector(".pagination");
    if (list) list.innerHTML = items.join("");
  }

  function onFilterClick(event) {
    const button = event.target.closest("[data-article-filter]");
    const categoryLink = event.target.closest("[data-category-jump]");
    if (!button && !categoryLink) return;
    event.preventDefault();
    event.stopPropagation();
    activeCategory = button?.dataset.articleFilter || categoryLink.dataset.categoryJump;
    currentPage = 1;
    root.querySelectorAll("[data-article-filter]").forEach(filter => filter.classList.toggle("active", filter.dataset.articleFilter === activeCategory));
    render();
  }
  function onSearchInput(event) {
    if (event.target !== search) return;
    event.stopPropagation();
    query = search.value.toLowerCase().trim();
    currentPage = 1;
    render();
  }
  function onPaginationClick(event) {
    const button = event.target.closest("[data-article-page]");
    if (!button || button.disabled) return;
    event.preventDefault();
    currentPage = Number(button.dataset.articlePage);
    render();
  }
  root.addEventListener("click", onFilterClick);
  search?.addEventListener("input", onSearchInput);
  pagination.addEventListener("click", onPaginationClick);
  render();
  return () => {
    root.removeEventListener("click", onFilterClick);
    search?.removeEventListener("input", onSearchInput);
    pagination.removeEventListener("click", onPaginationClick);
  };
}
function animateStats(root) {
  statsAnimationTimers.forEach(timer => window.clearInterval(timer));
  statsAnimationTimers.clear();
  if (statsVisibilityHandler) {
    window.removeEventListener("scroll", statsVisibilityHandler);
    window.removeEventListener("resize", statsVisibilityHandler);
    statsVisibilityHandler = null;
  }
  const counters = root.querySelectorAll("[data-counter-target]");
  if (!counters.length) return;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderFinal = counter => {
    const decimals = Number(counter.dataset.counterDecimals || 0);
    counter.textContent = `${new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(Number(counter.dataset.counterTarget))}${counter.dataset.counterSuffix || ""}`;
  };
  const runCounter = counter => {
    if (counter.dataset.counterStarted) return;
    counter.dataset.counterStarted = "true";
    if (reducedMotion) {
      renderFinal(counter);
      return;
    }
    const target = Number(counter.dataset.counterTarget);
    const decimals = Number(counter.dataset.counterDecimals || 0);
    const suffix = counter.dataset.counterSuffix || "";
    const duration = 1500;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / duration);
      const eased = 1 - (1 - progress) ** 4;
      const value = target * eased;
      counter.textContent = `${new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(progress === 1 ? target : Number(value.toFixed(decimals)))}${suffix}`;
      if (progress === 1) {
        window.clearInterval(timer);
        statsAnimationTimers.delete(timer);
      }
    }, 16);
    statsAnimationTimers.add(timer);
  };
  if (reducedMotion) {
    counters.forEach(runCounter);
    return;
  }
  statsVisibilityHandler = () => {
    counters.forEach(counter => {
      if (counter.dataset.counterStarted) return;
      const bounds = counter.getBoundingClientRect();
      if (bounds.top <= window.innerHeight * .9 && bounds.bottom >= 0) runCounter(counter);
    });
  };
  window.addEventListener("scroll", statsVisibilityHandler, { passive: true });
  window.addEventListener("resize", statsVisibilityHandler);
  statsVisibilityHandler();
}
function cookieConsentTemplateLegacy() {
  return `<div class="cookie-consent" id="cookieConsent" hidden aria-hidden="true"><section class="cookie-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="cookieConsentTitle" tabindex="-1"><div class="cookie-consent-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></div><p class="eyebrow">A little note about privacy</p><h2 id="cookieConsentTitle">Your privacy matters.</h2><p class="cookie-consent-copy">We use essential storage to make this site work. With your permission, we’d also like to save optional analytics and marketing preferences on this device.</p><div class="cookie-consent-actions" data-cookie-actions><button class="btn btn-outline-navy" type="button" data-cookie-choice="necessary">Only necessary</button><button class="btn btn-outline-navy" type="button" data-cookie-manage>Choose settings</button><button class="btn btn-primary-navy" type="button" data-cookie-choice="all">Accept all</button></div><form class="cookie-settings" data-cookie-settings hidden><div class="cookie-setting-row"><div><strong>Essential</strong><small>Required for basic site operation; always active.</small></div><input class="form-check-input" type="checkbox" checked disabled aria-label="Essential storage always active"></div><label class="cookie-setting-row" for="cookieConsentAnalytics"><span><strong>Analytics</strong><small>Help us understand how the site is used.</small></span><input class="form-check-input" type="checkbox" id="cookieConsentAnalytics"></label><label class="cookie-setting-row" for="cookieConsentMarketing"><span><strong>Marketing</strong><small>Help measure promotions and campaigns.</small></span><input class="form-check-input" type="checkbox" id="cookieConsentMarketing"></label><div class="cookie-consent-actions"><button class="btn btn-outline-navy" type="button" data-cookie-back>Back</button><button class="btn btn-primary-navy" type="submit">Save choices</button></div></form><p class="cookie-consent-footnote">You can change your choice later on our <a href="cookie-policy.html">Cookie policy</a> page.</p></section></div>`;
}
function setupCookieConsentLegacy() {
  if (!document.querySelector("#cookieConsent")) document.body.insertAdjacentHTML("beforeend", cookieConsentTemplate());
  const overlay = document.querySelector("#cookieConsent");
  const dialog = overlay.querySelector(".cookie-consent-dialog");
  const summaryActions = overlay.querySelector("[data-cookie-actions]");
  const settings = overlay.querySelector("[data-cookie-settings]");
  const analytics = overlay.querySelector("#cookieConsentAnalytics");
  const marketing = overlay.querySelector("#cookieConsentMarketing");
  const consentKey = "trekking-cookie-consent";
  let closeTimer = 0;
  let focusReturn = null;

  function close() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cookie-consent-open");
    closeTimer = window.setTimeout(() => { overlay.hidden = true; }, 220);
    focusReturn?.focus();
  }
  function saveConsent(allowOptional) {
    localStorage.setItem("trekking-cookie-analytics", String(allowOptional && analytics.checked));
    localStorage.setItem("trekking-cookie-marketing", String(allowOptional && marketing.checked));
    localStorage.setItem(consentKey, "saved");
    close();
  }
  function openSettings() {
    analytics.checked = localStorage.getItem("trekking-cookie-analytics") === "true";
    marketing.checked = localStorage.getItem("trekking-cookie-marketing") === "true";
    summaryActions.hidden = true;
    settings.hidden = false;
    analytics.focus();
  }
  function handleClick(event) {
    const choice = event.target.closest("[data-cookie-choice]");
    if (choice) {
      const acceptAll = choice.dataset.cookieChoice === "all";
      if (acceptAll) {
        analytics.checked = true;
        marketing.checked = true;
        saveConsent(true);
      } else saveConsent(false);
      return;
    }
    if (event.target.closest("[data-cookie-manage]")) {
      openSettings();
      return;
    }
    if (event.target.closest("[data-cookie-back]")) {
      settings.hidden = true;
      summaryActions.hidden = false;
    }
  }
  function handleSubmit(event) {
    if (!event.target.matches("[data-cookie-settings]")) return;
    event.preventDefault();
    saveConsent(true);
  }
  function handleKeydown(event) {
    if (overlay.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      settings.hidden ? saveConsent(false) : close();
    } else if (event.key === "Tab") {
      const focusable = [...dialog.querySelectorAll("button:not([hidden]), input:not([disabled]):not([hidden]), a[href]")].filter(element => !element.closest("[hidden]"));
      if (event.shiftKey && (document.activeElement === dialog || document.activeElement === focusable[0])) {
        event.preventDefault();
        focusable.at(-1)?.focus();
      } else if (!event.shiftKey && (document.activeElement === dialog || document.activeElement === focusable.at(-1))) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    }
  }
  overlay.addEventListener("click", handleClick);
  overlay.addEventListener("submit", handleSubmit);
  overlay.addEventListener("keydown", handleKeydown);
  if (localStorage.getItem(consentKey) !== "saved") {
    focusReturn = document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("cookie-consent-open");
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    dialog.focus();
  }
  return { close };
}

function tripCard(trip) {
  return `<article class="journey-card"><a class="journey-card-image" href="${routeHref(`trip/${trip.slug}`)}">${image(trip.image, trip.title)}<span class="journey-badge">${trip.badge}</span></a><div class="journey-card-body"><div class="journey-card-meta"><span><i class="bi bi-clock"></i>${trip.days}</span><span><i class="bi bi-geo-alt"></i>${trip.region}</span></div><h3><a href="${routeHref(`trip/${trip.slug}`)}">${trip.title}</a></h3><p>${trip.description}</p><div class="journey-card-bottom"><div><small>Starting from</small><br><strong>${trip.price}</strong></div><a class="text-link" href="${routeHref(`trip/${trip.slug}`)}">Explore <i class="bi bi-arrow-right"></i></a></div></div></article>`;
}
function articleCard(article, featured = false) {
  return `<article class="blog-card">${image(article.image, article.title)}<span class="blog-category">${article.category}</span><h3><a href="#/blog/article">${article.title}</a></h3><p>${article.excerpt}</p><div class="blog-meta">${article.author} <span class="mx-1">·</span> ${article.date} <span class="mx-1">·</span> ${article.read}</div></article>`;
}
function footerTemplate() {
  return `<div class="site-footer"><div class="footer-main"><div class="container"><div class="row g-4"><div class="col-lg-4 col-md-6 footer-brand"><a href="#/"><img src="images/logo.svg" alt="TREKKING"></a><p>Thoughtful journeys for people who want to feel a place, not just see it. Come find your own way into the mountains.</p><div class="footer-socials"><a href="https://instagram.com" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="https://facebook.com" aria-label="Facebook"><i class="bi bi-facebook"></i></a><a href="https://youtube.com" aria-label="YouTube"><i class="bi bi-youtube"></i></a></div></div><div class="col-6 col-lg-2 col-md-3 footer-column"><h3>Explore</h3><a href="#/">Home</a><a href="#/about">About us</a><a href="#/destinations">Destinations</a><a href="#/packages">Tour packages</a><a href="#/blog">Journal</a><a href="#/contact">Contact</a><a href="#/gallery">Gallery</a></div><div class="col-6 col-lg-2 col-md-3 footer-column"><h3>Popular places</h3><a href="#/destination/sandakphu">Sandakphu</a><a href="#/destination/darjeeling">Darjeeling</a><a href="#/destination/sikkim">Sikkim</a><a href="#/destination/kashmir">Kashmir</a><a href="#/destination/himachal">Himachal Pradesh</a><a href="#/departures">Upcoming departures</a></div><div class="col-lg-4 col-md-6 footer-column"><h3>Here to help</h3><p><i class="bi bi-telephone"></i>+91 12345 67890</p><p><i class="bi bi-envelope"></i>hello@trekking.example</p><p><i class="bi bi-whatsapp"></i>WhatsApp us</p><p><i class="bi bi-geo-alt"></i>Office address — add your business address</p><a href="#/reviews">Traveller reviews</a><a href="#/faq">FAQs</a></div></div></div></div><div class="footer-bottom"><div class="container"><p>© ${new Date().getFullYear()} TREKKING. Explore More. Experience Life.</p><div class="footer-legal"><a href="#/legal/privacy">Privacy</a><a href="#/legal/terms">Terms</a><a href="#/legal/cancellation">Cancellations</a><a href="#/legal/disclaimer">Disclaimer</a><a href="#/legal/cookies">Cookies</a><a href="#/faq">FAQs</a></div></div></div></div>`;
}
function homePage() {
  return `<section class="hero"><img class="hero-image" src="${photo("photo-1464822759023-fed622ff2c3b", 2000)}" alt="Snowy Himalayan peaks above a sea of clouds"><div class="container hero-content"><span class="eyebrow">Take the scenic route</span><h1>Out there is<br><em>where you belong.</em></h1><p class="hero-copy">Small-group journeys, local stories and the kind of mountain air that stays with you long after you come home.</p><div class="hero-buttons"><a class="btn btn-primary-navy" href="#/packages">Find your next journey <i class="bi bi-arrow-up-right ms-2"></i></a><a class="btn btn-quiet" href="#/about"><i class="bi bi-play-circle me-2"></i>Get to know us</a></div><div class="hero-note"><span class="avatar-stack">${image(photo("photo-1534528741775-53994a69daeb", 100), "TREKKING traveller")}${image(photo("photo-1500648767791-00dcc994a43e", 100), "TREKKING traveller")}${image(photo("photo-1531123897727-8f129e1688ce", 100), "TREKKING traveller")}</span><span><strong>Good company, every step.</strong><br>Join a journey that feels like yours.</span></div></div></section>
  <div class="container hero-search-wrap"><form class="hero-search" id="tripSearch"><div class="search-field"><i class="bi bi-compass"></i><div class="w-100"><label for="searchDestination">Where to?</label><select id="searchDestination" name="destination"><option value="">All destinations</option>${destinations.map(d => `<option value="${d.slug}">${d.title}</option>`).join("")}</select></div></div><div class="search-field"><i class="bi bi-calendar3"></i><div class="w-100"><label for="searchMonth">When?</label><select id="searchMonth"><option value="">Any time</option><option>October – December</option><option>January – March</option><option>April – June</option></select></div></div><div class="search-field"><i class="bi bi-people"></i><div class="w-100"><label for="searchStyle">Travel style</label><select id="searchStyle"><option value="">Any style</option><option>Trekking</option><option>Weekend escape</option><option>Culture & nature</option></select></div></div><button class="btn btn-primary-navy" type="submit">Find a journey <i class="bi bi-arrow-right ms-2"></i></button></form></div>
  <section class="section"><div class="container"><div class="section-heading-row">${sectionHeading("Somewhere wonderful", "Find your kind of wild", "From high Himalayan ridgelines to tea-scented hill towns, there's a place that will feel like yours.")}<a class="text-link" href="#/destinations">All destinations <i class="bi bi-arrow-right"></i></a></div><div class="region-row row g-3">${destinations.slice(0, 4).map(d => `<div class="col-6 col-lg-3"><a class="region-card" href="#/destination/${d.slug}">${image(d.image, d.title)}<div class="region-card-content"><span class="small">${d.sub}</span><h3>${d.title}</h3></div><i class="bi bi-arrow-up-right region-card-arrow"></i></a></div>`).join("")}</div></div></section>
  <section class="section section-soft"><div class="container"><div class="section-heading-row">${sectionHeading("The good stuff", "Journeys worth taking", "Made with local knowledge, generous breathing room and a little room for the unexpected.")}<a class="text-link" href="#/packages">View all trips <i class="bi bi-arrow-right"></i></a></div><div class="row g-4">${trips.slice(0, 3).map(t => `<div class="col-md-6 col-lg-4">${tripCard(t)}</div>`).join("")}</div></div></section>
  <section class="section"><div class="container"><div class="feature-split"><div class="feature-image">${image(photo("photo-1500530855697-b586d89ba3ee", 1000), "A peaceful sunrise over the mountains")}${image(photo("photo-1464822759023-fed622ff2c3b", 500), "A mountain trail at sunrise", "image-inset")}<div class="experience-badge"><strong>10+</strong><span>years outside</span></div></div><div class="feature-copy"><span class="eyebrow">Travel with intention</span><h2>More than a trip.<br>A feeling you take home.</h2><p>We believe the best journeys happen when you slow down, meet the people who call a place home, and leave enough space for wonder.</p><p>Our local trip leaders know the quiet trails, the family-run kitchens and the stories behind the view. We'll take care of the details, so you can be where your feet are.</p><div class="feature-list"><div><i class="bi bi-people"></i> Small, thoughtful groups</div><div><i class="bi bi-heart"></i> Locally rooted experiences</div><div><i class="bi bi-shield-check"></i> Considered trip planning</div><div><i class="bi bi-tree"></i> A lighter footprint</div></div><a class="btn btn-primary-navy" href="#/about">A little about us <i class="bi bi-arrow-up-right ms-2"></i></a></div></div><div class="stats-strip"><div class="stat-item"><strong>2,400+</strong><span>happy trail companions</span></div><div class="stat-item"><strong>38</strong><span>carefully made journeys</span></div><div class="stat-item"><strong>12</strong><span>local communities</span></div><div class="stat-item"><strong>4.9/5</strong><span>traveller love</span></div></div></div></section>
  <section class="story-banner"><div class="container"><div><span class="eyebrow">Made for your kind of curious</span><h2>The mountains are calling.<br>Let's make a plan.</h2><p>Tell us what you have in mind. We'll help you find your way there.</p></div><a class="btn btn-light" href="#/planner">Plan a trip with us <i class="bi bi-arrow-up-right ms-2"></i></a></div></section>
  <section class="section section-soft"><div class="container"><div class="section-heading-row">${sectionHeading("From the trail", "A few words from the way", "Real people, fresh air and the memories that have a way of following you home.")}<a class="text-link" href="#/reviews">Read all stories <i class="bi bi-arrow-right"></i></a></div><div class="swiper reviews-swiper"><div class="swiper-wrapper">${[["The kind of trip that makes you breathe differently.", "Maya R.", "Sandakphu trail", 5],["Every detail felt considered, but never over-planned.", "Arjun K.", "Sikkim, slowly", 4.5],["We came as strangers and left with a new favourite place.", "Neha & Dev", "Darjeeling weekend", 4.5]].map((r, i) => `<div class="swiper-slide"><article class="review-card">${ratingStars(r[3])}<blockquote>“${r[0]}”</blockquote><div class="review-person">${image(photo(["photo-1534528741775-53994a69daeb","photo-1500648767791-00dcc994a43e","photo-1531123897727-8f129e1688ce"][i], 100), r[1])}<div><strong>${r[1]}</strong><small>${r[2]}</small></div></div></article></div>`).join("")}</div><div class="swiper-pagination mt-4"></div></div></div></section>
  <section class="section"><div class="container"><div class="section-heading-row">${sectionHeading("Notes from the hills", "Stories for the journey", "A little inspiration, local knowledge and practical notes for wherever the trail takes you next.")}<a class="text-link" href="#/blog">Visit the journal <i class="bi bi-arrow-right"></i></a></div><div class="row g-4">${articles.slice(0, 3).map(a => `<div class="col-md-4">${articleCard(a)}</div>`).join("")}</div><div class="newsletter-box mt-5"><div><h3>A good note, now and then.</h3><p>Fresh trail stories and thoughtful trip ideas. No noise, just the good stuff.</p></div><form class="newsletter-form" data-message="You're on the list. See you out there!"><input type="email" placeholder="Your email address" aria-label="Your email address" required><button class="btn btn-primary-navy" type="submit">Sign me up</button></form></div></div></section>`;
}
function storyFilmTemplate() {
  return `<div class="story-film-modal" id="storyFilmModal" hidden aria-hidden="true"><div class="story-film-dialog" role="dialog" aria-modal="true" aria-labelledby="storyFilmTitle" tabindex="-1"><button class="story-film-close" type="button" data-film-close aria-label="Close film"><i class="bi bi-x-lg"></i></button><div class="story-film-screen"><img class="story-film-image" data-film-image src="${photo("photo-1464822759023-fed622ff2c3b", 1600)}" alt="" aria-hidden="true"><div class="story-film-vignette"></div><div class="story-film-brand"><img src="images/logo.svg" alt="TREKKING"><span>A short film about finding your way</span></div><div class="story-film-copy" aria-live="polite"><span class="story-film-kicker" data-film-kicker>THE CALL OF THE HILLS · 01 / 04</span><h2 id="storyFilmTitle" data-film-title>Out there is where you belong.</h2><p data-film-copy>Some journeys begin with a view. The best ones begin with a feeling.</p></div><span class="story-film-location"><i class="bi bi-geo-alt-fill"></i> THE HIMALAYAS, INDIA</span></div><div class="story-film-controls"><button class="story-film-control" type="button" data-film-toggle aria-label="Pause film"><i class="bi bi-pause-fill"></i><span data-film-toggle-label>Pause</span></button><label class="visually-hidden" for="storyFilmProgress">Film progress</label><input id="storyFilmProgress" class="story-film-progress" data-film-progress type="range" min="0" max="100" value="0"><span class="story-film-time" data-film-time>00:00 / 00:24</span><button class="story-film-control story-film-replay" type="button" data-film-replay aria-label="Replay film"><i class="bi bi-arrow-counterclockwise"></i><span>Replay</span></button></div></div></div>`;
}
function setupStoryFilm() {
  const modal = main.querySelector("#storyFilmModal");
  const trigger = main.querySelector(".hero-buttons .btn-quiet");
  if (!modal || !trigger) return;

  const dialog = modal.querySelector(".story-film-dialog");
  const filmImage = modal.querySelector("[data-film-image]");
  const filmTitle = modal.querySelector("[data-film-title]");
  const filmCopy = modal.querySelector("[data-film-copy]");
  const filmKicker = modal.querySelector("[data-film-kicker]");
  const progress = modal.querySelector("[data-film-progress]");
  const timeLabel = modal.querySelector("[data-film-time]");
  const toggleButton = modal.querySelector("[data-film-toggle]");
  const toggleLabel = modal.querySelector("[data-film-toggle-label]");
  const scenes = [
    { title: "Out there is where you belong.", copy: "Some journeys begin with a view. The best ones begin with a feeling.", label: "THE CALL OF THE HILLS", image: photo("photo-1464822759023-fed622ff2c3b", 1600) },
    { title: "Take the scenic route.", copy: "Follow quiet trails, wake to mountain light, and leave room for the unexpected.", label: "FIND YOUR PACE", image: photo("photo-1470770841072-f978cf4d019e", 1600) },
    { title: "Meet the people who make a place.", copy: "Local stories and warm welcomes turn a beautiful landscape into somewhere you remember.", label: "TRAVEL A LITTLE CLOSER", image: photo("photo-1551632811-561732d1e306", 1600) },
    { title: "Come back with more than photos.", copy: "Small-group journeys across the Himalayas, made for the feeling you take home.", label: "TREKKING · EXPLORE MORE", image: photo("photo-1500530855697-b586d89ba3ee", 1600) }
  ];
  const sceneDuration = 6000;
  let sceneIndex = 0;
  let elapsed = 0;
  let lastFrame = null;
  let playbackTimer = 0;
  let closeTimer = 0;
  let isPlaying = false;
  let previousFocus = null;

  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }
  function renderScene() {
    const scene = scenes[sceneIndex];
    filmImage.classList.remove("is-entering");
    void filmImage.offsetWidth;
    filmImage.src = scene.image;
    filmImage.classList.add("is-entering");
    filmTitle.textContent = scene.title;
    filmCopy.textContent = scene.copy;
    filmKicker.textContent = `${scene.label} · 0${sceneIndex + 1} / 04`;
  }
  function updateControls() {
    const totalTime = sceneIndex * sceneDuration + elapsed;
    const percentage = totalTime / (scenes.length * sceneDuration) * 100;
    progress.value = String(Math.min(100, percentage));
    progress.style.setProperty("--film-progress", `${percentage}%`);
    timeLabel.textContent = `${formatTime(totalTime)} / 00:24`;
    toggleButton.setAttribute("aria-label", isPlaying ? "Pause film" : "Play film");
    toggleButton.querySelector("i").className = `bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`;
    toggleLabel.textContent = isPlaying ? "Pause" : sceneIndex === scenes.length - 1 && elapsed >= sceneDuration ? "Play again" : "Play";
  }
  function pauseFilm() {
    isPlaying = false;
    lastFrame = null;
    window.clearInterval(playbackTimer);
    playbackTimer = 0;
    updateControls();
  }
  function advanceFilm() {
    if (!isPlaying) return;
    const now = performance.now();
    if (lastFrame !== null) elapsed += now - lastFrame;
    lastFrame = now;
    if (elapsed >= sceneDuration) {
      if (sceneIndex < scenes.length - 1) {
        elapsed -= sceneDuration;
        sceneIndex += 1;
        renderScene();
      } else {
        elapsed = sceneDuration;
        pauseFilm();
        return;
      }
    }
    updateControls();
  }
  function playFilm() {
    if (sceneIndex === scenes.length - 1 && elapsed >= sceneDuration) {
      sceneIndex = 0;
      elapsed = 0;
      renderScene();
    }
    isPlaying = true;
    lastFrame = performance.now();
    updateControls();
    window.clearInterval(playbackTimer);
    playbackTimer = window.setInterval(advanceFilm, 80);
  }
  function closeFilm() {
    pauseFilm();
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("story-film-open");
    closeTimer = window.setTimeout(() => { modal.hidden = true; }, 240);
    previousFocus?.focus();
  }
  function openFilm() {
    window.clearTimeout(closeTimer);
    previousFocus = trigger;
    sceneIndex = 0;
    elapsed = 0;
    renderScene();
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("story-film-open");
    modal.classList.add("is-open");
    dialog.focus();
    playFilm();
  }
  function onTriggerClick(event) {
    event.preventDefault();
    openFilm();
  }
  function onModalClick(event) {
    if (event.target === modal || event.target.closest("[data-film-close]")) closeFilm();
    else if (event.target.closest("[data-film-toggle]")) isPlaying ? pauseFilm() : playFilm();
    else if (event.target.closest("[data-film-replay]")) {
      sceneIndex = 0;
      elapsed = 0;
      renderScene();
      playFilm();
    }
  }
  function onProgressInput() {
    const seekPercentage = Number(progress.value);
    const wasPlaying = isPlaying;
    pauseFilm();
    const total = seekPercentage / 100 * scenes.length * sceneDuration;
    sceneIndex = Math.min(scenes.length - 1, Math.floor(total / sceneDuration));
    elapsed = total >= scenes.length * sceneDuration ? sceneDuration : total % sceneDuration;
    renderScene();
    updateControls();
    if (wasPlaying) playFilm();
  }
  function onKeydown(event) {
    if (modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeFilm();
    } else if (event.key === "Tab") {
      const focusable = [...dialog.querySelectorAll("button, input")].filter(item => !item.disabled);
      if (event.shiftKey && (document.activeElement === dialog || document.activeElement === focusable[0])) {
        event.preventDefault();
        focusable.at(-1).focus();
      } else if (!event.shiftKey && (document.activeElement === dialog || document.activeElement === focusable.at(-1))) {
        event.preventDefault();
        focusable[0].focus();
      }
    }
  }

  trigger.setAttribute("href", "#storyFilmModal");
  trigger.setAttribute("role", "button");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-controls", "storyFilmModal");
  trigger.addEventListener("click", onTriggerClick);
  trigger.addEventListener("keydown", event => {
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      openFilm();
    }
  });
  modal.addEventListener("click", onModalClick);
  modal.addEventListener("keydown", onKeydown);
  progress.addEventListener("input", onProgressInput);
  renderScene();
  updateControls();

  return () => {
    pauseFilm();
    window.clearTimeout(closeTimer);
    document.body.classList.remove("story-film-open");
  };
}
function collectionPage(kind) {
  const isDest = kind === "destinations";
  const isWeekend = kind === "weekend-trips";
  const isTrek = kind === "trekking";
  const title = isDest ? "Places that stay with you" : isWeekend ? "A little escape, a lot of fresh air" : isTrek ? "Find your feet on the trail" : "Journeys worth taking";
  const intro = isDest ? "Thoughtful journeys across the Himalayas and beyond. Start with a place, then let the details fall into place." : isWeekend ? "Short on days, big on fresh air. Find the hill-town weekends and easy escapes waiting just outside your routine." : isTrek ? "Walk a little further, breathe a little deeper. Find a trail that fits your pace and your kind of adventure." : "Small-group trips with a local heartbeat, a little room to roam and all the details thoughtfully taken care of.";
  if (isDest) return `${pageHero(title, intro, photo("photo-1470770841072-f978cf4d019e"))}<section class="page-content"><div class="container"><div class="row g-4 region-row">${destinations.map(d => `<div class="col-6 col-lg-4"><a class="region-card" href="#/destination/${d.slug}">${image(d.image, d.title)}<div class="region-card-content"><span class="small">${d.sub}</span><h3>${d.title}</h3></div><i class="bi bi-arrow-up-right region-card-arrow"></i></a></div>`).join("")}</div></div></section>`;
  const selected = trips.filter(t => isWeekend ? t.category.toLowerCase().includes("weekend") || t.slug === "sikkim" : isTrek ? t.category.toLowerCase().includes("trek") || t.level === "Moderate" : true);
  return `${pageHero(title, intro, photo(isWeekend ? "photo-1500530855697-b586d89ba3ee" : "photo-1464822759023-fed622ff2c3b"))}<section class="page-content"><div class="container"><div class="filter-bar"><button class="filter-chip active" data-trip-filter="all">All journeys</button><button class="filter-chip" data-trip-filter="Easy">Easy pace</button><button class="filter-chip" data-trip-filter="Moderate">Moderate</button><select class="search-input ms-md-auto" id="tripSort" aria-label="Sort journeys"><option value="featured">Sort: Featured</option><option value="price">Price: Low to high</option></select></div><div class="row g-4" id="tripGrid">${selected.map(t => `<div class="col-md-6 col-lg-4" data-level="${t.level}" data-price="${Number(t.price.replace(/[^\d]/g, ""))}">${tripCard(t)}</div>`).join("")}</div></div></section>`;
}
function destinationDetail(slug) {
  const dest = destinations.find(d => d.slug === slug) || destinations[0];
  const related = trips.filter(t => t.slug === slug || t.region.toLowerCase().includes(dest.title.split(" ")[0].toLowerCase())).slice(0, 3);
  const list = related.length ? related : trips.slice(0, 3);
  return `${pageHero(dest.title, `Take the scenic way into ${dest.title}. Explore local stories, quiet corners and thoughtfully planned journeys in ${dest.sub}.`, dest.image, [{ label: "Destinations", href: "#/destinations" }])}<section class="section"><div class="container"><div class="feature-split"><div><span class="eyebrow">A place to find your pace</span><h2>Come for the view.<br>Stay for the feeling.</h2><p>${dest.title} is best experienced with time to wander, a curious appetite and a local guide who knows the way. Our journeys combine the familiar highlights with moments you'd never find on your own.</p><p>Every itinerary is shaped around real conditions and local knowledge. Talk to us about the season, your travel style and what you'd love to discover.</p><div class="feature-list"><div><i class="bi bi-calendar-check"></i> Best time: Oct – May</div><div><i class="bi bi-cloud-sun"></i> Weather-aware itineraries</div><div><i class="bi bi-person-walking"></i> Options for different paces</div><div><i class="bi bi-geo-alt"></i> Local trip leaders</div></div><a class="btn btn-primary-navy" href="#/planner">Plan a ${dest.title} trip</a></div><div class="feature-image">${image(dest.image, `${dest.title} landscape`)}${image(photo("photo-1470770841072-f978cf4d019e", 500), "A mountain village", "image-inset")}</div></div></div></section><section class="section section-soft"><div class="container">${sectionHeading("Made for this place", `Journeys in ${dest.title}`, "Find a trip that lets you settle in and experience the region at your own pace.")}<div class="row g-4">${list.map(t => `<div class="col-md-6 col-lg-4">${tripCard(t)}</div>`).join("")}</div></div></section>`;
}
function tripDetail(slug) {
  const trip = trips.find(t => t.slug === slug) || trips[0];
  return `${pageHero(trip.title, trip.description, trip.image, [{ label: "Tour packages", href: "#/packages" }])}<section class="section"><div class="container"><div class="row g-5"><div class="col-lg-8"><span class="tag">${trip.category}</span><h2 class="mt-3">The long way is the lovely way.</h2><p>Come experience the hills at a human pace. This thoughtfully planned journey makes room for local stories, easy moments and time to take it all in. Our trip leaders are on hand to make the days feel seamless, while keeping the experience genuinely local.</p><h3 class="mt-4">The journey, at a glance</h3><div class="row g-3 my-2"><div class="col-6 col-md-3"><div class="content-panel"><small>Duration</small><br><strong>${trip.days}</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Pace</small><br><strong>${trip.level}</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Group size</small><br><strong>6–10 people</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Region</small><br><strong>${trip.region}</strong></div></div></div><h3 class="mt-4">A few things to know</h3><ul><li>Local trip leader and thoughtfully planned daily route</li><li>Handpicked stays and select meals, as detailed in your confirmation</li><li>Small group setting with time to explore independently</li><li>Trip-specific packing and arrival notes shared before departure</li></ul><div class="accordion mt-4" id="tripFaq"><div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#tripFaqOne">What should I bring?</button></h3><div id="tripFaqOne" class="accordion-collapse collapse show" data-bs-parent="#tripFaq"><div class="accordion-body small>We send a practical packing list based on the season and route before your trip. Good walking shoes and layers are a great place to start.</div></div></div><div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#tripFaqTwo">Can I join solo?</button></h3><div id="tripFaqTwo" class="accordion-collapse collapse" data-bs-parent="#tripFaq"><div class="accordion-body small">Absolutely. Many travellers join on their own and meet their group along the way.</div></div></div></div></div><div class="col-lg-4"><div class="sidebar-card" style="top:120px"><span class="tag">Small groups</span><h3 class="mt-3">${trip.title}</h3><p class="small">Starting from</p><div class="h3">${trip.price} <small class="fs-6">/ person</small></div><hr><p><i class="bi bi-calendar3 me-2"></i>Next departure: Nov 18, 2026</p><p><i class="bi bi-check-circle me-2"></i>Flexible date options</p><a class="btn btn-primary-navy w-100 mt-2" href="#/booking">Check availability <i class="bi bi-arrow-right ms-2"></i></a><a class="btn btn-outline-navy w-100 mt-2" href="#/contact">Ask us a question</a><small class="d-block mt-3">Trip details and terms confirmed before booking.</small></div></div></div></div></section>`;
}
function blogPage() {
  const featured = articles[0];
  return `${pageHero("The TREKKING journal", "Trail notes, thoughtful travel ideas and the little details that make a place feel like yours.", photo("photo-1551632811-561732d1e306"))}<section class="page-content"><div class="container"><div class="featured-article">${image(featured.image, featured.title)}<div class="featured-article-copy"><span class="tag">Featured story</span><h2 class="mt-3">${featured.title}</h2><p>${featured.excerpt}</p><div class="blog-meta mb-3">${featured.author} · ${featured.date} · ${featured.read}</div><a class="text-link" href="#/blog/article">Read the story <i class="bi bi-arrow-right"></i></a></div></div><div class="row g-5"><div class="col-lg-8"><div class="filter-bar"><input class="search-input" id="articleSearch" type="search" placeholder="Search stories..." aria-label="Search stories"><div class="d-flex flex-wrap gap-2" id="articleFilters"><button class="filter-chip active" data-article-filter="all">All stories</button>${[...new Set(articles.map(a => a.category))].map(c => `<button class="filter-chip" data-article-filter="${c}">${c}</button>`).join("")}</div></div><div class="row g-4" id="articleGrid">${articles.map((a, i) => `<div class="col-md-6 article-result" data-category="${a.category}" data-search="${`${a.title} ${a.excerpt} ${a.category}`.toLowerCase()}">${articleCard(a)}</div>`).join("")}</div><nav class="mt-5" aria-label="Blog pages"><ul class="pagination"><li class="page-item active"><a class="page-link" href="#/blog" aria-current="page">1</a></li><li class="page-item"><a class="page-link" href="#/blog">2</a></li><li class="page-item"><a class="page-link" href="#/blog">Next <i class="bi bi-arrow-right"></i></a></li></ul></nav></div><aside class="col-lg-4"><div class="sidebar-card"><h3>Popular articles</h3>${articles.slice(1, 4).map(a => `<a href="#/blog/article">${a.title}<i class="bi bi-arrow-up-right"></i></a>`).join("")}</div><div class="sidebar-card"><h3>Categories</h3>${[...new Set(articles.map(a => a.category))].map(c => `<a href="#/blog" data-category-jump="${c}">${c}<i class="bi bi-arrow-right"></i></a>`).join("")}</div><div class="sidebar-card"><h3>A little note from us</h3><p class="small">Occasional stories and good ideas for wherever you're headed.</p><form class="newsletter-form flex-column" data-message="Thanks for joining us. Watch your inbox!"><input type="email" placeholder="Email address" aria-label="Email address" required><button class="btn btn-primary-navy" type="submit">Subscribe</button></form></div></aside></div></div></section>`;
}
function articlePage() {
  const article = articles[0];
  const toc = ["Before you go", "Build your base", "Pack with purpose", "On the trail"];
  return `${pageHero(article.title, "A practical, no-pressure guide to getting ready for your first multi-day walk in the mountains.", "", [{ label: "Journal", href: "#/blog" }])}<section class="page-content"><div class="container"><div class="row align-items-center mb-4"><div class="col-md"><div class="author-card"><img src="${photo("photo-1534528741775-53994a69daeb", 120)}" alt="Aditi Sen"><div><strong>Aditi Sen</strong><small class="d-block">${article.date} · ${article.read}</small></div></div></div><div class="col-md-auto mt-3 mt-md-0"><div class="share-buttons" aria-label="Share article"><a href="https://www.facebook.com/sharer/sharer.php?u=https://trekking.example/#/blog/article" aria-label="Share on Facebook"><i class="bi bi-facebook"></i></a><a href="https://twitter.com/intent/tweet?url=https://trekking.example/#/blog/article" aria-label="Share on X"><i class="bi bi-twitter-x"></i></a><a href="mailto:?subject=How%20to%20prepare%20for%20your%20first%20Himalayan%20trek" aria-label="Share by email"><i class="bi bi-envelope"></i></a></div></div></div><div class="article-layout"><article class="article-body">${image(article.image, article.title)}<p class="lead mt-3">Your first trek doesn't have to be a test of toughness. With a little preparation, the right layers and a willingness to go at your own pace, the trail has a way of meeting you where you are.</p><div class="author-card my-4"><img src="${photo("photo-1534528741775-53994a69daeb", 120)}" alt="Aditi Sen"><p class="mb-0"><strong>A note from Aditi</strong><br><span class="small">Trip leader, occasional tea enthusiast and firm believer in taking the long way around.</span></p></div><h2 id="before-you-go">${toc[0]}</h2><p>Start by choosing a route that feels exciting and manageable. Look at the number of walking hours, the altitude and the type of terrain rather than focusing only on distance. A good trip operator will answer questions honestly and help you decide if a route suits you.</p><p>Build a little more walking into your everyday routine. Consistency matters more than speed: a few comfortable walks each week, including a longer one at the weekend, can help you feel more at ease.</p><figure>${image(photo("photo-1551632811-561732d1e306", 1100), "Hikers following a mountain trail")}<figcaption>Give yourself time to find your own rhythm on the trail.</figcaption></figure><h2 id="build-your-base">${toc[1]}</h2><p>You don't need a complicated training plan. Regular walks, stairs and gentle strength work can all help. Practise with the shoes and daypack you plan to bring, and leave space to rest between bigger efforts.</p><div class="content-panel"><strong><i class="bi bi-lightbulb me-2"></i>A kinder goal</strong><p class="mb-0 mt-2">Aim to finish each practice walk feeling like you could do a little more tomorrow. The mountains will still be there; your body deserves a thoughtful introduction.</p></div><h2 id="pack-with-purpose">${toc[2]}</h2><p>Weather can shift quickly in the hills. Pack light, breathable layers that work together, a waterproof outer layer, sun protection, water and any personal medication. Your trip leader should share a route-specific packing list before departure.</p><ul><li>Comfortable, already-worn-in walking shoes</li><li>Warm and waterproof layers for changing conditions</li><li>A small daypack and refillable water bottle</li><li>Sun protection and personal essentials</li></ul><h2 id="on-the-trail">${toc[3]}</h2><p>Walk at a pace that lets you talk, take breaks and notice the world around you. Tell your leader if you feel unwell, drink water regularly and follow local guidance. The best first trek is the one you enjoy enough to want to do again.</p><hr><h3>Keep exploring</h3><p>Curious about a first trek? <a href="#/trip/sandakphu">Take a look at our Sandakphu journey</a> or <a href="#/contact">ask us a question</a>.</p></article><aside class="article-sidebar"><nav class="toc"><h3>In this story</h3>${toc.map((x, i) => `<a href="#${["before-you-go","build-your-base","pack-with-purpose","on-the-trail"][i]}">${x}</a>`).join("")}</nav><div class="sidebar-card mt-3"><h3>Recent posts</h3>${articles.slice(1, 4).map(a => `<a href="#/blog/article">${a.title}<i class="bi bi-arrow-up-right"></i></a>`).join("")}</div><div class="sidebar-card"><h3>Get the good notes</h3><p class="small">A thoughtful travel note, every now and then.</p><form class="newsletter-form flex-column" data-message="You're subscribed. Happy trails!"><input type="email" placeholder="Email address" aria-label="Email address" required><button class="btn btn-primary-navy" type="submit">Subscribe</button></form></div></aside></div><section class="mt-5"><h2 class="mb-4">More from the journal</h2><div class="row g-4">${articles.slice(1, 4).map(a => `<div class="col-md-4">${articleCard(a)}</div>`).join("")}</div></section></div></section>`;
}
function legalPage(slug) {
  const data = legalData[slug];
  const sections = data.sections.map(([title, copy], i) => `<section id="legal-${i + 1}"><h2>${i + 1}. ${title}</h2><p>${copy}</p></section>`).join("");
  const cookiePreferences = slug === "cookies" ? `<form class="content-panel mt-4" id="cookiePreferences"><h2 class="mt-0">Manage optional cookies</h2><p>Essential storage is always on. Choose whether to allow optional categories on this device.</p><div class="form-check mb-2"><input class="form-check-input" type="checkbox" checked disabled id="cookieEssential"><label class="form-check-label" for="cookieEssential">Essential — required for basic site operation</label></div><div class="form-check mb-2"><input class="form-check-input" type="checkbox" id="cookieAnalytics"><label class="form-check-label" for="cookieAnalytics">Analytics — help us understand site usage</label></div><div class="form-check mb-3"><input class="form-check-input" type="checkbox" id="cookieMarketing"><label class="form-check-label" for="cookieMarketing">Marketing — measure promotions and campaigns</label></div><button class="btn btn-primary-navy" type="submit">Save preferences</button></form>` : "";
  return `${pageHero(data.title, data.intro, "", [{ label: "Information", href: "#/faq" }])}<section class="page-content"><div class="container"><div class="legal-layout"><nav class="legal-toc" aria-label="On this page"><strong>On this page</strong>${data.sections.map(([title], i) => `<a href="#legal-${i + 1}">${i + 1}. ${title}</a>`).join("")}<a href="#legal-contact">Contact</a></nav><article class="legal-content"><p class="legal-updated"><strong>Last updated:</strong> November 5, 2026</p><p>${data.intro}</p>${sections}${cookiePreferences}<section id="legal-contact"><h2>Questions? Get in touch.</h2><p>Contact us at <a href="mailto:hello@trekking.example">hello@trekking.example</a> or call +91 12345 67890. Replace these editable contact placeholders with your approved business details before publishing.</p><div class="alert alert-warning small mt-4">This is starter website copy for review, not legal advice. Have the final policy reviewed for your business and applicable jurisdictions before publication. No company registration details or unverified promises are stated here.</div></section><a class="text-link mt-3 d-inline-flex" href="#" data-back-top>Back to top <i class="bi bi-arrow-up"></i></a></article></div></div></section>`;
}
function faqPage() {
  const groups = [
    ["Booking", ["How do I book a trip?", "Can I join a trip by myself?", "When is my booking confirmed?"]],
    ["Payments", ["How can I pay?", "When is payment due?"]],
    ["Cancellations", ["What if I need to cancel?", "Can I change my travel dates?"]],
    ["Trekking", ["Do I need prior trekking experience?", "How fit do I need to be?"]],
    ["Stays & safety", ["What kind of accommodation is included?", "What happens if the weather changes?"]]
  ];
  return `${pageHero("A few useful answers", "A little clarity before the adventure. Still have a question? Our team is happy to help.", photo("photo-1472396961693-142e6e269027"))}<section class="page-content"><div class="container"><div class="row g-5"><div class="col-lg-8">${groups.map((group, gi) => `<h2 class="h4 mt-4 mb-3">${group[0]} FAQs</h2><div class="accordion mb-4" id="faq-${gi}">${group[1].map((q, qi) => `<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button ${qi ? "collapsed" : ""}" data-bs-toggle="collapse" data-bs-target="#faq-${gi}-${qi}">${q}</button></h3><div id="faq-${gi}-${qi}" class="accordion-collapse collapse ${qi ? "" : "show"}" data-bs-parent="#faq-${gi}"><div class="accordion-body small text-muted">${faqAnswer(q)}</div></div></div>`).join("")}</div>`).join("")}</div><aside class="col-lg-4"><div class="sidebar-card"><h3>Need a human answer?</h3><p>Tell us what's on your mind and we'll point you in the right direction.</p><a class="btn btn-primary-navy w-100" href="#/contact">Talk to our team</a></div></aside></div></div></section>`;
}
function faqAnswer(question) {
  if (question.includes("book")) return "Browse a trip and use the booking enquiry form. Our team will confirm availability, trip terms and payment details with you before a booking is final.";
  if (question.includes("myself")) return "Of course. Many of our travellers join solo and find a lovely group of fellow explorers along the way.";
  if (question.includes("confirmed")) return "Your booking is confirmed after written confirmation and receipt of the required payment. We will share the details by email.";
  if (question.includes("pay") || question.includes("due")) return "Payment methods and due dates are shared with your trip-specific quote and booking terms. Please contact us if you need clarification.";
  if (question.includes("cancel") || question.includes("dates")) return "Please contact us as early as possible. Options and any charges depend on the trip terms in your booking confirmation. Read our cancellation policy for more.";
  if (question.includes("experience") || question.includes("fit")) return "It depends on the route. Each trip lists an approximate pace and difficulty. Share your experience and questions with our team before booking.";
  if (question.includes("accommodation")) return "Stays vary by trip and are detailed in the itinerary and booking confirmation. Ask us about accessibility or accommodation preferences.";
  return "Mountain conditions can change quickly. Our trip leaders monitor local guidance and may adjust the itinerary when needed to prioritise safety.";
}
function contactPage() {
  return `${pageHero("Let's talk about the trip", "A question, an idea or just not sure where to start? Tell us a little and a real person from our team will be in touch.", photo("photo-1470770841072-f978cf4d019e"))}<section class="page-content"><div class="container"><div class="row g-5"><div class="col-lg-5"><span class="eyebrow">Say hello</span><h2 class="mt-3">We're good listeners.</h2><p class="mt-3">Share what you're dreaming about. We'll help you figure out the rest, one thoughtful step at a time.</p><div class="sidebar-card mt-4"><h3>Reach our team</h3><p><i class="bi bi-telephone me-2"></i><a href="tel:+911234567890">+91 12345 67890</a></p><p><i class="bi bi-envelope me-2"></i><a href="mailto:hello@trekking.example">hello@trekking.example</a></p><p><i class="bi bi-whatsapp me-2"></i>WhatsApp: +91 12345 67890</p><p><i class="bi bi-geo-alt me-2"></i>Office address — add your business address</p><small>Replace contact placeholders with your verified business details.</small></div></div><div class="col-lg-7"><form class="content-panel" data-message="Thanks for reaching out. We'll be in touch soon."><div class="row g-3"><div class="col-md-6"><label class="form-label" for="contactName">Your name</label><input id="contactName" class="form-control" required autocomplete="name" placeholder="Name"></div><div class="col-md-6"><label class="form-label" for="contactEmail">Email address</label><input id="contactEmail" class="form-control" type="email" required autocomplete="email" placeholder="you@example.com"></div><div class="col-md-6"><label class="form-label" for="contactPhone">Phone (optional)</label><input id="contactPhone" class="form-control" type="tel" autocomplete="tel" placeholder="+91"></div><div class="col-md-6"><label class="form-label" for="contactInterest">What are you interested in?</label><select id="contactInterest" class="form-select"><option>Help me choose</option><option>Trekking</option><option>Weekend trip</option><option>Custom journey</option><option>Existing booking</option></select></div><div class="col-12"><label class="form-label" for="contactMessage">Your message</label><textarea id="contactMessage" class="form-control" rows="5" required placeholder="Tell us what you have in mind..."></textarea></div><div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="privacyAgree" required><label class="form-check-label small" for="privacyAgree">I agree to the <a href="#/legal/privacy">Privacy Policy</a> and consent to being contacted about this enquiry.</label></div></div><div class="col-12"><button class="btn btn-primary-navy" type="submit">Send your note <i class="bi bi-arrow-up-right ms-2"></i></button><p class="form-hint small mt-3 mb-0">Demo form: connect a secure form endpoint before accepting real enquiries.</p></div></div></form></div></div></div></section>`;
}
function setupPlannerWizard() {
  const form = main.querySelector("#plannerForm");
  if (!form) return;
  const formRow = form.querySelector(".row");
  const submitColumn = formRow.querySelector("button[type='submit']")?.closest(".col-12");
  if (submitColumn) {
    const verificationColumn = document.createElement("div");
    verificationColumn.className = "col-12";
    verificationColumn.innerHTML = `<div class="planner-verification"><label class="planner-verification-check" for="plannerVerification"><input class="form-check-input" id="plannerVerification" type="checkbox" required><span>I’m not a robot</span></label><span class="planner-verification-badge"><i class="bi bi-shield-check" aria-hidden="true"></i><small>Human<br>verification</small></span></div>`;
    formRow.insertBefore(verificationColumn, submitColumn);
  }
  const fieldColumns = [...formRow.children];
  const stepIndicator = main.querySelector(".step-indicator");
  const title = main.querySelector(".trip-planner > h2");
  const description = main.querySelector(".trip-planner > p");
  const steps = [
    { title: "First, the kind of journey.", description: "Choose a place and the kind of experience you have in mind.", fields: ["plannerPlace", "plannerStyle"] },
    { title: "Let’s shape the details.", description: "Tell us when you’d like to go, who’s coming, and anything else we should know.", fields: ["plannerDates", "plannerPeople", "plannerDream"] },
    { title: "Where can we reach you?", description: "Add your contact details and confirm the quick human check to send your trip idea.", fields: ["plannerEmail", "plannerName", "plannerVerification"] }
  ];
  fieldColumns.forEach(column => {
    const field = column.querySelector("input, select, textarea, button[type='submit']");
    const fieldId = field?.id;
    if (column.querySelector("button[type='submit']")) column.dataset.plannerStep = "2";
    else column.dataset.plannerStep = String(Math.max(0, steps.findIndex(step => step.fields.includes(fieldId))));
  });
  const actions = document.createElement("div");
  actions.className = "planner-step-actions";
  actions.innerHTML = `<button class="btn btn-outline-navy" type="button" data-planner-back><i class="bi bi-arrow-left me-2"></i>Back</button><span class="planner-step-count" data-planner-step-count aria-live="polite"></span><button class="btn btn-primary-navy" type="button" data-planner-next>Continue <i class="bi bi-arrow-right ms-2"></i></button>`;
  form.append(actions);
  let currentStep = 0;
  const backButton = actions.querySelector("[data-planner-back]");
  const nextButton = actions.querySelector("[data-planner-next]");
  const stepCount = actions.querySelector("[data-planner-step-count]");
  function showStep(step, moveFocus = false) {
    currentStep = Math.max(0, Math.min(steps.length - 1, step));
    form.dataset.currentStep = String(currentStep);
    fieldColumns.forEach(column => { column.hidden = Number(column.dataset.plannerStep) !== currentStep; });
    title.textContent = steps[currentStep].title;
    description.textContent = steps[currentStep].description;
    stepIndicator.setAttribute("role", "progressbar");
    stepIndicator.setAttribute("aria-valuemin", "1");
    stepIndicator.setAttribute("aria-valuemax", String(steps.length));
    stepIndicator.setAttribute("aria-valuenow", String(currentStep + 1));
    stepIndicator.setAttribute("aria-label", `Step ${currentStep + 1} of ${steps.length}`);
    stepIndicator.querySelectorAll("span").forEach((bar, index) => {
      bar.classList.toggle("active", index <= currentStep);
      if (index === currentStep) bar.setAttribute("aria-current", "step");
      else bar.removeAttribute("aria-current");
    });
    backButton.hidden = currentStep === 0;
    nextButton.hidden = currentStep === steps.length - 1;
    stepCount.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    if (moveFocus) form.querySelector(`[data-planner-step="${currentStep}"] input, [data-planner-step="${currentStep}"] select, [data-planner-step="${currentStep}"] textarea`)?.focus();
  }
  nextButton.addEventListener("click", () => {
    const currentFields = fieldColumns.filter(column => Number(column.dataset.plannerStep) === currentStep).flatMap(column => [...column.querySelectorAll("input, select, textarea")]);
    const invalidField = currentFields.find(field => field.required && !field.checkValidity());
    if (invalidField) {
      invalidField.reportValidity();
      return;
    }
    showStep(currentStep + 1, true);
  });
  backButton.addEventListener("click", () => showStep(currentStep - 1, true));
  form.addEventListener("reset", () => showStep(0));
  showStep(0);
}

function plannerPage() {
  return `${pageHero("Your trip, your way", "A good journey starts with a conversation. Tell us what matters to you and we'll help shape the right kind of escape.", photo("photo-1464822759023-fed622ff2c3b"))}<section class="page-content"><div class="container"><div class="trip-planner content-panel"><div class="step-indicator"><span class="active"></span><span></span><span></span></div><h2 class="h3">Let's start with the big picture.</h2><p class="small mb-4">No need to have it all figured out. This is just a helpful starting point.</p><form id="plannerForm"><div class="row g-3"><div class="col-md-6"><label for="plannerPlace" class="form-label">Where would you love to go?</label><select class="form-select" id="plannerPlace" required><option value="">Choose a place</option>${destinations.map(d => `<option>${d.title}</option>`).join("")}<option>Open to ideas</option></select></div><div class="col-md-6"><label for="plannerStyle" class="form-label">What feels like your kind of trip?</label><select class="form-select" id="plannerStyle" required><option value="">Choose a travel style</option><option>Trekking & walking</option><option>Culture & nature</option><option>Weekend escape</option><option>A bit of everything</option></select></div><div class="col-md-6"><label for="plannerDates" class="form-label">When are you thinking?</label><input class="form-control" id="plannerDates" placeholder="A month or rough dates"></div><div class="col-md-6"><label for="plannerPeople" class="form-label">How many people?</label><select class="form-select" id="plannerPeople"><option>Just me</option><option>2 people</option><option>3–5 people</option><option>6+ people</option></select></div><div class="col-12"><label for="plannerDream" class="form-label">Anything else we should know?</label><textarea class="form-control" id="plannerDream" rows="3" placeholder="A pace you love, a special occasion, a place you've always wanted to see..."></textarea></div><div class="col-md-6"><label for="plannerEmail" class="form-label">Your email</label><input type="email" class="form-control" id="plannerEmail" required placeholder="you@example.com"></div><div class="col-md-6"><label for="plannerName" class="form-label">Your name</label><input class="form-control" id="plannerName" required placeholder="Name"></div><div class="col-12 mt-3"><div class="alert alert-light border small mb-3">Submitting this sample form does not create a booking. Connect a secure enquiry service before launch.</div><button class="btn btn-primary-navy" type="submit">Start the conversation <i class="bi bi-arrow-right ms-2"></i></button></div></div></form></div></div></section>`;
}
function bookingPage() {
  return `${pageHero("A few details, then the daydreaming", "Send us your booking request. We'll check availability and confirm the trip details with you before anything is final.", photo("photo-1470770841072-f978cf4d019e"))}<section class="page-content"><div class="container"><div class="row g-5"><div class="col-lg-7"><form class="content-panel" id="bookingForm"><h2 class="h3 mb-4">Booking details</h2><div class="row g-3"><div class="col-12"><label class="form-label" for="bookingTrip">Choose a journey</label><select class="form-select" id="bookingTrip" required>${trips.map(t => `<option>${t.title}</option>`).join("")}</select></div><div class="col-md-6"><label class="form-label" for="bookingName">Full name</label><input class="form-control" id="bookingName" required autocomplete="name"></div><div class="col-md-6"><label class="form-label" for="bookingEmail">Email address</label><input class="form-control" id="bookingEmail" required type="email" autocomplete="email"></div><div class="col-md-6"><label class="form-label" for="bookingDate">Preferred departure</label><select class="form-select" id="bookingDate"><option>Nov 18, 2026</option><option>Dec 09, 2026</option><option>Jan 20, 2027</option><option>Flexible dates</option></select></div><div class="col-md-6"><label class="form-label" for="bookingGuests">Travellers</label><select class="form-select" id="bookingGuests"><option>1 traveller</option><option>2 travellers</option><option>3 travellers</option><option>4+ travellers</option></select></div><div class="col-12"><label class="form-label" for="bookingNotes">Anything we should know?</label><textarea class="form-control" id="bookingNotes" rows="3"></textarea></div><div class="col-12"><button class="btn btn-primary-navy" type="submit">Request to book <i class="bi bi-arrow-right ms-2"></i></button><p class="small mt-3 mb-0">This is a demo booking request. No payment is collected and no reservation is confirmed.</p></div></div></form></div><aside class="col-lg-5"><div class="sidebar-card"><h3>What happens next?</h3><p>1. We check availability for your preferred departure.</p><p>2. We send confirmed trip details, inclusions and terms.</p><p>3. Your booking is final only after you confirm and complete the agreed payment.</p><a href="#/legal/cancellation">Read cancellation information <i class="bi bi-arrow-right"></i></a></div></aside></div></div></section>`;
}
function statusPage(kind) {
  const success = kind === "confirmation" || kind === "payment-success";
  const failed = kind === "payment-failed";
  const heading = kind === "confirmation" ? "Request received." : kind === "payment-success" ? "Payment successful." : failed ? "Payment didn't go through." : "You're all set.";
  const copy = kind === "confirmation" ? "Your demo booking request has been received. A member of our team will contact you to confirm availability and next steps." : kind === "payment-success" ? "This is a sample confirmation screen. In a live booking flow, your receipt and trip details would be sent to your email." : failed ? "No payment has been recorded. You can try another method or contact our team for help." : "Thanks for getting in touch. Your message is ready for our team.";
  return `<section class="section section-soft min-vh-50"><div class="container text-center py-5"><div class="display-1 ${success ? "text-success" : "text-warning"}"><i class="bi ${success ? "bi-check-circle" : failed ? "bi-exclamation-circle" : "bi-envelope-check"}"></i></div><h1 class="h2 mt-4">${heading}</h1><p class="mx-auto my-3" style="max-width:540px">${copy}</p><p class="small">Reference: ${success ? "TRK-2026-0481" : "DEMO-REQUEST"}</p><a class="btn btn-primary-navy mt-3" href="#/">Back to the home page</a> <a class="btn btn-outline-navy mt-3" href="#/contact">Contact us</a>${kind === "confirmation" ? `<div class="mt-4"><small class="d-block mb-2">Demo payment screens only — no payment will be processed.</small><a class="text-link mx-2" href="#/payment-success">Payment success preview</a><a class="text-link mx-2" href="#/payment-failed">Payment failure preview</a></div>` : ""}</div></section>`;
}
function departuresPage() {
  return `${pageHero("Good days to get outside", "Find an upcoming group departure, or talk with us about dates that work better for you.", photo("photo-1464822759023-fed622ff2c3b"))}<section class="page-content"><div class="container"><div class="content-panel">${[["Sandakphu: the trail above the clouds","Nov 18 – Nov 24, 2026","7 days","₹18,500"],["Sikkim, slowly","Dec 09 – Dec 14, 2026","6 days","₹24,900"],["A little further into the hills","Jan 15 – Jan 17, 2027","3 days","₹6,400"],["Himachal beyond the postcards","Jan 20 – Jan 24, 2027","5 days","₹21,000"]].map((d,i)=>`<div class="departure-row"><div><strong>${d[0]}</strong><small>${d[1]}</small></div><div><small>Length</small>${d[2]}</div><div><small>From</small><span class="price">${d[3]}</span></div><div><span class="status-pill">${i === 0 ? "4 spots left" : "Open"}</span></div><a class="btn btn-outline-navy btn-sm" href="#/booking">Details</a></div>`).join("")}</div></div></section>`;
}
function reviewsPage() {
  const ratings = [5, 4.5, 4.5, 4, 5, 3.5];
  return `${pageHero("Good company, great stories", "A few notes from people who came along for the view and left with a little more.", photo("photo-1500530855697-b586d89ba3ee"))}<section class="page-content"><div class="container"><div class="row g-4">${Array.from({ length: 6 }, (_, i) => `<div class="col-md-6 col-lg-4"><article class="review-card">${ratingStars(ratings[i])}<blockquote>“${["The kind of trip that makes you breathe differently.", "Every detail felt considered, but never over-planned.", "We came as strangers and left with a new favourite place.", "The local stories were every bit as memorable as the views.", "A wonderful pace, lovely people and the best cups of tea.", "I felt looked after, while still free to discover my own rhythm."][i]}”</blockquote><div class="review-person">${image(photo(["photo-1534528741775-53994a69daeb","photo-1500648767791-00dcc994a43e","photo-1531123897727-8f129e1688ce"][i%3], 100), "Traveller") }<div><strong>${["Maya R.","Arjun K.","Neha & Dev","Samira P.","Kabir M.","Leela D."][i]}</strong><small>${trips[i%trips.length].title}</small></div></div></article></div>`).join("")}</div><p class="small mt-4">Sample review content for design preview. Replace with permissioned, verified customer testimonials before publication.</p></div></section>`;
}
function galleryPage() {
  const gallery = ["photo-1464822759023-fed622ff2c3b","photo-1500530855697-b586d89ba3ee","photo-1470770841072-f978cf4d019e","photo-1500534623283-312aade485b7","photo-1472396961693-142e6e269027","photo-1551632811-561732d1e306","photo-1470252649378-9c29740c9fa8","photo-1500530855697-b586d89ba3ee","photo-1464822759023-fed622ff2c3b","photo-1470770841072-f978cf4d019e","photo-1500534623283-312aade485b7"];
  return `${pageHero("A little window to the mountains", "A collection of moments, landscapes and little pauses from the places we love.", photo("photo-1500530855697-b586d89ba3ee"))}<section class="page-content"><div class="container"><div class="photo-grid">${gallery.map((p,i)=>image(photo(p,800), `Mountain travel moment ${i+1}`)).join("")}</div><p class="small text-muted mt-3">Photography shown for design preview. Add your own licensed trip photography before launch.</p></div></section>`;
}
function aboutPage() {
  return `${pageHero("Travel should feel like something.", "We're a small team of curious people who believe the best journeys start with listening — to a place, to its people, and to what you need from a little time away.", photo("photo-1470770841072-f978cf4d019e"))}<section class="section"><div class="container"><div class="feature-split"><div class="feature-image">${image(photo("photo-1500530855697-b586d89ba3ee", 1000), "A sunrise in the hills")}${image(photo("photo-1551632811-561732d1e306", 500), "Walking together", "image-inset")}</div><div class="feature-copy"><span class="eyebrow">A different kind of journey</span><h2>Less checklist.<br>More connection.</h2><p>TREKKING began with a simple idea: travel can bring you closer to the places you visit when the people who know them best help show the way.</p><p>Today, we work with local trip leaders and small community partners to create unhurried journeys through the Himalayas. We sweat the details so there's room for the moments that can't be planned.</p><div class="feature-list"><div><i class="bi bi-person-heart"></i> People before itineraries</div><div><i class="bi bi-signpost-split"></i> Curiosity over checklists</div><div><i class="bi bi-tree"></i> Respect for local places</div><div><i class="bi bi-chat-heart"></i> Thoughtful from hello to home</div></div><a class="btn btn-primary-navy" href="#/packages">Come find your journey</a></div></div></div></section><section class="section section-soft"><div class="container">${sectionHeading("What matters to us", "Good travel is a relationship", "A place is never a backdrop. We're guests in somebody else's home, and we want every journey to feel mindful of that.", true)}<div class="row g-4"><div class="col-md-4"><div class="content-panel h-100"><i class="bi bi-people fs-3 text-primary"></i><h3 class="h5 mt-3">Go local</h3><p class="small mb-0">Work with local guides and hosts who bring real knowledge and warmth to every journey.</p></div></div><div class="col-md-4"><div class="content-panel h-100"><i class="bi bi-hourglass-split fs-3 text-primary"></i><h3 class="h5 mt-3">Make room</h3><p class="small mb-0">Keep groups small and days unhurried, with the space to listen, wander and be present.</p></div></div><div class="col-md-4"><div class="content-panel h-100"><i class="bi bi-heart fs-3 text-primary"></i><h3 class="h5 mt-3">Travel thoughtfully</h3><p class="small mb-0">Ask better questions about impact and keep learning how to show up well in the places we visit.</p></div></div></div></div></section>`;
}
function aboutNotFound() {
  return `${pageHero("A quieter kind of adventure", "Thoughtfully planned journeys through mountain places, made better by the people who call them home.", photo("photo-1464822759023-fed622ff2c3b"))}<section class="page-content"><div class="container"><div class="row g-4">${trips.slice(0,3).map(t=>`<div class="col-md-4">${tripCard(t)}</div>`).join("")}</div></div></section>`;
}
function route() {
  const path = main.dataset.staticPage || location.hash.replace(/^#\/?/, "").split("?")[0].replace(/\/$/, "");
  const parts = path.split("/");
  let html;
  let title = "TREKKING — Explore More. Experience Life.";
  let description = "Thoughtful journeys and mountain adventures across India.";
  if (!path) html = homePage();
  else if (["destinations", "packages", "trekking", "weekend-trips"].includes(path)) html = collectionPage(path);
  else if (parts[0] === "destination") html = destinationDetail(parts[1]);
  else if (parts[0] === "trip") html = tripDetail(parts[1]);
  else if (path === "about") html = aboutPage();
  else if (path === "contact") html = contactPage();
  else if (path === "planner") html = plannerPage();
  else if (path === "booking") html = bookingPage();
  else if (path === "confirmation" || path === "payment-success" || path === "payment-failed" || path === "payment") html = statusPage(path === "payment" ? "confirmation" : path);
  else if (path === "departures") html = departuresPage();
  else if (path === "reviews") html = reviewsPage();
  else if (path === "gallery") html = galleryPage();
  else if (path === "blog") html = blogPage();
  else if (path === "blog/article") html = articlePage();
  else if (path === "faq") html = faqPage();
  else if (parts[0] === "legal" && legalData[parts[1]]) html = legalPage(parts[1]);
  else html = `<section class="section section-soft"><div class="container text-center py-5"><div class="error-code">404</div><h1 class="h2">Well, this is a scenic detour.</h1><p class="mx-auto" style="max-width:500px">We can't find the page you're looking for. Let's get you back on the trail.</p><a class="btn btn-primary-navy mt-3" href="#/">Take me home</a></div></section>`;
  if (path) {
    title = `${path.split("/").at(-1).replaceAll("-", " ").replace(/\b\w/g, c => c.toUpperCase())} | TREKKING`;
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
    if (h1) title = `${h1[1].replace(/<[^>]+>/g, "")} | TREKKING`;
    const intro = html.match(/<section class="page-hero[^"]*"[^>]*>[\s\S]*?<p>(.*?)<\/p>/);
    if (intro) description = intro[1].replace(/<[^>]+>/g, "").slice(0, 155);
  } else if (path === "blog/article") {
    title = `${articles[0].title} | TREKKING Journal`;
    description = articles[0].excerpt;
  }
  storyFilmCleanup?.();
  storyFilmCleanup = null;
  blogPaginationCleanup?.();
  blogPaginationCleanup = null;
  main.innerHTML = html;
  if (path === "planner") setupPlannerWizard();
  if (!path) {
    main.insertAdjacentHTML("beforeend", storyFilmTemplate());
    storyFilmCleanup = setupStoryFilm();
  }
  const homepageStats = main.querySelector(".stats-strip");
  if (homepageStats) homepageStats.outerHTML = statsMarkup();
  else if (path) main.insertAdjacentHTML("beforeend", statsSection());
  animateStats(main);
  rewritePageLinks(main);
  if (path === "blog") blogPaginationCleanup = setupBlogPagination(main);
  if (path === "faq") main.querySelector(".page-content")?.classList.add("faq-page");
  const cookieForm = document.querySelector("#cookiePreferences");
  if (cookieForm) {
    cookieForm.querySelector("#cookieAnalytics").checked = localStorage.getItem("trekking-cookie-analytics") === "true";
    cookieForm.querySelector("#cookieMarketing").checked = localStorage.getItem("trekking-cookie-marketing") === "true";
  }
  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
  document.querySelector('link[rel="canonical"]').setAttribute("href", `https://trekking.example/${pageFile(path)}`);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", title);
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", description);
  const existingLd = document.querySelector("#article-structured-data");
  if (existingLd) existingLd.remove();
  const existingBreadcrumbLd = document.querySelector("#breadcrumb-structured-data");
  if (existingBreadcrumbLd) existingBreadcrumbLd.remove();
  if (path === "blog/article") addArticleStructuredData();
  footer.innerHTML = footerTemplate();
  rewritePageLinks(footer);
  const footerLegal = footer.querySelector(".footer-legal");
  if (footerLegal) footerLegal.insertAdjacentHTML("beforeend", `<a href="#cookie-settings" data-open-cookie-settings>Cookie settings</a>`);
  document.querySelectorAll(".mobile-nav .mobile-link").forEach(link => link.addEventListener("click", () => bootstrap.Offcanvas.getInstance(document.querySelector("#mobileNav"))?.hide()));
  document.querySelectorAll(".mobile-submenu a").forEach(link => link.addEventListener("click", () => bootstrap.Offcanvas.getInstance(document.querySelector("#mobileNav"))?.hide()));
  if (document.querySelector(".reviews-swiper")) {
    new Swiper(".reviews-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: { el: ".reviews-swiper .swiper-pagination", clickable: true },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }
  document.querySelectorAll('[data-back-top]').forEach(link => link.addEventListener("click", event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }));
  window.scrollTo({ top: 0, behavior: "instant" });
}
function addArticleStructuredData() {
  const script = document.createElement("script");
  script.id = "article-structured-data";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articles[0].title,
    description: articles[0].excerpt,
    image: articles[0].image,
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    author: { "@type": "Person", name: articles[0].author },
    publisher: { "@type": "Organization", name: "TREKKING" },
    mainEntityOfPage: "https://trekking.example/blog-how-to-prepare.html"
  });
  document.head.append(script);
  const crumb = document.createElement("script");
  crumb.type = "application/ld+json";
  crumb.id = "breadcrumb-structured-data";
  crumb.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://trekking.example/index.html" }, { "@type": "ListItem", position: 2, name: "Journal", item: "https://trekking.example/blog.html" }, { "@type": "ListItem", position: 3, name: articles[0].title, item: "https://trekking.example/blog-how-to-prepare.html" }] });
  document.head.append(crumb);
}
function showToast(message) {
  const toast = document.querySelector("#siteToast");
  toast.querySelector(".toast-body span").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toast, { delay: 5000 }).show();
}
function persistTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("trekking-theme", theme);
  const dark = theme === "dark";
  themeButton.innerHTML = `<i class="bi ${dark ? "bi-sun" : "bi-moon-stars"}"></i>`;
  themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  themeButton.title = `Switch to ${dark ? "light" : "dark"} mode`;
}
themeButton.addEventListener("click", () => persistTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
persistTheme(localStorage.getItem("trekking-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
if (main.dataset.staticPage) {
  route();
} else {
  footer.innerHTML = footerTemplate();
  window.addEventListener("hashchange", route);
  route();
}
cookieConsentController = setupCookieConsent();
document.querySelector(".back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => document.querySelector(".back-to-top").classList.toggle("is-visible", window.scrollY > 500));
document.addEventListener("submit", event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.id === "tripSearch") {
    event.preventDefault();
    const destination = form.querySelector("#searchDestination").value;
    location.href = destination ? `destination-${destination}.html` : "tour-packages.html";
    return;
  }
  if (form.id === "plannerForm") {
    event.preventDefault();
    if (Number(form.dataset.currentStep) < 2) {
      form.querySelector("[data-planner-next]").click();
      return;
    }
    if (!form.reportValidity()) return;
    showToast("Your trip idea is ready. Connect a form service to receive enquiries.");
    form.reset();
    return;
  }
  if (form.id === "bookingForm") {
    event.preventDefault();
    if (!form.reportValidity()) return;
    location.href = "booking-confirmation.html";
    return;
  }
  if (form.id === "cookiePreferences") {
    event.preventDefault();
    localStorage.setItem("trekking-cookie-analytics", String(form.querySelector("#cookieAnalytics").checked));
    localStorage.setItem("trekking-cookie-marketing", String(form.querySelector("#cookieMarketing").checked));
    localStorage.setItem("trekking-cookie-consent", "saved");
    showToast("Your cookie preferences have been saved on this device.");
    return;
  }
  if (form.dataset.message) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    showToast(form.dataset.message);
    form.reset();
  }
});
function updateDestinationPreview(event) {
  const item = event.target.closest?.(".mega-menu [data-feature-image]");
  if (!item) return;
  const menu = item.closest(".mega-menu");
  const image = menu.querySelector("[data-destination-feature]");
  const title = menu.querySelector("[data-destination-feature-title]");
  const featureLink = menu.querySelector("[data-destination-feature-link]");
  if (image) {
    image.src = item.dataset.featureImage;
    image.alt = `${item.dataset.featureTitle} landscape`;
  }
  if (title) {
    title.replaceChildren(document.createTextNode(item.dataset.featureTitle));
    const icon = document.createElement("i");
    icon.className = "bi bi-arrow-up-right";
    title.append(icon);
  }
  if (featureLink) featureLink.href = item.href;
}
document.addEventListener("pointerover", updateDestinationPreview);
document.addEventListener("focusin", updateDestinationPreview);
document.addEventListener("click", event => {
  const pageLink = event.target.closest('a[href^="#/"]');
  if (pageLink) {
    event.preventDefault();
    const path = pageLink.getAttribute("href").replace(/^#\/?/, "").split("?")[0].replace(/\/$/, "");
    window.location.href = pageFile(path);
    return;
  }
  const tripFilter = event.target.closest("[data-trip-filter]");
  if (tripFilter) {
    document.querySelectorAll("[data-trip-filter]").forEach(b => b.classList.remove("active"));
    tripFilter.classList.add("active");
    const grid = document.querySelector("#tripGrid");
    if (!grid) return;
    grid.querySelectorAll("[data-level]").forEach(card => card.classList.toggle("d-none", tripFilter.dataset.tripFilter !== "all" && card.dataset.level !== tripFilter.dataset.tripFilter));
  }
  const articleFilter = event.target.closest("[data-article-filter], [data-category-jump]");
  if (articleFilter) {
    if (event.target.closest("[data-category-jump]")) event.preventDefault();
    const category = articleFilter.dataset.articleFilter || articleFilter.dataset.categoryJump;
    document.querySelectorAll("[data-article-filter]").forEach(b => b.classList.toggle("active", b.dataset.articleFilter === category));
    document.querySelectorAll(".article-result").forEach(card => card.classList.toggle("d-none", category !== "all" && card.dataset.category !== category));
  }
});
document.addEventListener("input", event => {
  if (event.target.id === "articleSearch") {
    const query = event.target.value.toLowerCase().trim();
    document.querySelectorAll(".article-result").forEach(card => card.classList.toggle("d-none", !card.dataset.search.includes(query)));
  }
});
document.addEventListener("change", event => {
  if (event.target.id === "tripSort") {
    const grid = document.querySelector("#tripGrid");
    if (!grid) return;
    [...grid.children].sort((a,b) => event.target.value === "price" ? Number(a.dataset.price) - Number(b.dataset.price) : trips.findIndex(t => a.textContent.includes(t.title)) - trips.findIndex(t => b.textContent.includes(t.title))).forEach(card => grid.append(card));
  }
});
