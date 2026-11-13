const profilePortraits = {
  "photo-1534528741775-53994a69daeb": "images/profile-aditi.svg",
  "photo-1500648767791-00dcc994a43e": "images/profile-rohan.svg",
  "photo-1531123897727-8f129e1688ce": "images/profile-nima.svg"
};
const localPhotos = {
  "photo-1464822759023-fed622ff2c3b": "images/sandakphu-ridge.jpg",
  "photo-1454496522488-7a8e488e8606": "images/sandakphu-snow.jpg",
  "photo-1551632811-561732d1e306": "images/sandakphu-tonglu-hut.jpg",
  "photo-1500530855697-b586d89ba3ee": "images/darjeeling-teascape.jpg",
  "photo-1470252649378-9c29740c9fa8": "images/darjeeling-tea-garden.jpg",
  "photo-1511497584788-876760111969": "images/darjeeling-kanchenjunga.jpg",
  "photo-1470770841072-f978cf4d019e": "images/sikkim-tsomgo.jpg",
  "photo-1482938289607-e9573fc25ebb": "images/sikkim-tsomgo-mist.jpg",
  "photo-1448375240586-882707db888b": "images/sikkim-enchey-monastery.jpg",
  "photo-1516026672322-bc52d61a55d5": "images/sikkim-rumtek-monastery.jpg",
  "photo-1464278533981-50106e6176b1": "images/kashmir-dal-lake.jpg",
  "photo-1500534623283-312aade485b7": "images/kashmir-baisaran.jpg",
  "photo-1501785888041-af3ef285b470": "images/kashmir-pahalgam-trail.jpg",
  "photo-1472396961693-142e6e269027": "images/himachal-baspa-valley.jpg",
  "photo-1441974231531-c6227db76b6e": "images/himachal-barshaini.jpg",
  "photo-1473448912268-2022ce9509d8": "images/himachal-manali-mountains.jpg",
  "photo-1519681393784-d120267933ba": "images/himachal-key-monastery.jpg",
  "photo-1470071459604-3b5ec3a7fe05": "images/himachal-spiti-river.jpg",
  "photo-1433086966358-54859d0ed716": "images/sikkim-tsomgo-mist.jpg",
  "photo-1486870591958-9b9d0d1dda99": "images/sandakphu-ridge.jpg",
  "photo-1500534314209-a25ddb2bd429": "images/darjeeling-tea-garden.jpg",
  "photo-1523712999610-f77fbcfc3843": "images/sikkim-rumtek-monastery.jpg",
  "photo-1483728642387-6c3bdd6c93e5": "images/himachal-manali-mountains.jpg",
  "photo-1494783367193-149034c05e8f": "images/sandakphu-snow.jpg",
  "photo-1510798831971-661eb04b3739": "images/himachal-key-monastery.jpg"
};
const photo = id => profilePortraits[id] || (id.startsWith("images/") ? id : localPhotos[id] || "images/sandakphu-ridge.jpg");
const trips = [
  { slug: "sandakphu", title: "Sandakphu: the trail above the clouds", category: "Trekking", region: "West Bengal", destinations: ["sandakphu"], seasons: ["oct-dec", "jan-mar"], styles: ["Trekking"], level: "Moderate", image: "images/sandakphu-ridge.jpg", description: "Trace the high ridge above Singalila, with long views toward the Himalayan range and quiet stops in mountain settlements.", badge: "High ridge" },
  { slug: "sandakphu-village-trail", title: "Singalila ridge and quiet villages", category: "Trekking", region: "West Bengal", destinations: ["sandakphu"], seasons: ["oct-dec", "jan-mar"], styles: ["Trekking"], level: "Easy", image: "images/sandakphu-tonglu-hut.jpg", description: "Take a gentler route through forest paths and ridge-top settlements near Sandakphu, with time to pause between walks.", badge: "Gentle pace" },
  { slug: "sikkim", title: "Sikkim, slowly", category: "Culture & nature", region: "Sikkim", destinations: ["sikkim"], seasons: ["oct-dec", "jan-mar", "apr-jun"], styles: ["Culture & nature"], level: "Easy", image: "images/sikkim-enchey-monastery.jpg", description: "Explore monastery courtyards, mountain villages, and the quieter roads of the eastern Himalayas.", badge: "Monastery routes" },
  { slug: "sikkim-village-walk", title: "Sikkim village walks and monastery stays", category: "Culture & nature", region: "Sikkim", destinations: ["sikkim"], seasons: ["oct-dec", "jan-mar", "apr-jun"], styles: ["Culture & nature"], level: "Moderate", image: "images/sikkim-rumtek-monastery.jpg", description: "Build a journey around village trails, local food, and time to learn about the region's living traditions.", badge: "Village routes" },
  { slug: "darjeeling", title: "Tea trails & Darjeeling mornings", category: "Weekend escape", region: "Darjeeling", destinations: ["darjeeling"], seasons: ["oct-dec", "jan-mar", "apr-jun"], styles: ["Weekend escape"], level: "Easy", image: "images/darjeeling-teascape.jpg", description: "Walk among tea gardens, explore old hill-town lanes, and make room for an unhurried morning.", badge: "Tea garden walk" },
  { slug: "darjeeling-tea-country", title: "Darjeeling tea country by foot", category: "Weekend escape", region: "Darjeeling", destinations: ["darjeeling"], seasons: ["oct-dec", "jan-mar", "apr-jun"], styles: ["Weekend escape"], level: "Moderate", image: "images/darjeeling-tea-garden.jpg", description: "Follow paths through tea country and hillside lanes, with time to meet local growers and hosts along the way.", badge: "Tea garden walk" },
  { slug: "kashmir", title: "Kashmir, the great outdoors", category: "Nature escape", region: "Kashmir", destinations: ["kashmir"], seasons: ["apr-jun"], styles: ["Culture & nature"], level: "Easy", image: "images/kashmir-dal-lake.jpg", description: "Spend time beside clear lakes and open meadows, and take the valley at a pace that leaves room for local encounters.", badge: "Valley landscape" },
  { slug: "kashmir-meadows", title: "Kashmir meadow and lake escape", category: "Nature escape", region: "Kashmir", destinations: ["kashmir"], seasons: ["apr-jun", "oct-dec"], styles: ["Culture & nature"], level: "Moderate", image: "images/kashmir-baisaran.jpg", description: "Pair lakeside pauses with walks through the valley's changing landscapes and seasonal meadows.", badge: "Lakes & meadows" },
  { slug: "himachal", title: "Himachal beyond the postcards", category: "Mountain journey", region: "Himachal Pradesh", destinations: ["himachal"], seasons: ["oct-dec", "jan-mar", "apr-jun"], styles: ["Trekking"], level: "Moderate", image: "images/himachal-baspa-valley.jpg", description: "Take the scenic way through pine forests, rivers, and mountain hamlets, with stops shaped around the route and conditions.", badge: "Pine forest route" },
  { slug: "himachal-forest-paths", title: "Pine forest paths of Himachal", category: "Mountain journey", region: "Himachal Pradesh", destinations: ["himachal"], seasons: ["oct-dec", "jan-mar", "apr-jun"], styles: ["Trekking"], level: "Easy", image: "images/himachal-barshaini.jpg", description: "Start with a relaxed mountain walk through pine woods and riverside villages, with room to find your own rhythm.", badge: "Forest walk" },
  { slug: "weekend", title: "A little further into the hills", category: "Weekend escape", region: "North Bengal", destinations: ["darjeeling"], seasons: ["oct-dec", "jan-mar", "apr-jun"], styles: ["Weekend escape"], level: "Easy", image: "images/darjeeling-kanchenjunga.jpg", description: "Step away from the usual routine for a short hill-country escape built around fresh air, local food, and unhurried time.", badge: "Short escape" }
];
const articles = [
  { title: "How to prepare for your first Himalayan trek", category: "Trail notes", read: "7 min read", author: "TREKKING Journal", image: photo("photo-1519681393784-d120267933ba"), excerpt: "A practical guide to choosing a route, building confidence on local walks, and preparing for changing mountain conditions." },
  { title: "The quiet magic of a Darjeeling dawn", category: "Slow travel", read: "5 min read", author: "TREKKING Journal", image: photo("photo-1511497584788-876760111969"), excerpt: "Explore tea country in the softer hours of the day, when hillside paths and old lanes invite a slower pace." },
  { title: "A local's guide to Sikkim's monastery trails", category: "Culture", read: "6 min read", author: "TREKKING Journal", image: photo("photo-1448375240586-882707db888b"), excerpt: "A thoughtful visitor's guide to approaching monastery paths with curiosity, care, and respect for local customs." },
  { title: "What to pack for a changing mountain forecast", category: "Trail notes", read: "4 min read", author: "TREKKING Journal", image: photo("photo-1470071459604-3b5ec3a7fe05"), excerpt: "Use a flexible layering system, protect essentials from rain, and leave space for the conditions you cannot predict." },
  { title: "Why we travel in smaller groups", category: "Our approach", read: "5 min read", author: "TREKKING Journal", image: photo("photo-1523712999610-f77fbcfc3843"), excerpt: "Smaller groups can make it easier to adapt a day's pace, listen to local guides, and leave room for conversation." },
  { title: "Five beautiful weekends in the hills", category: "Inspiration", read: "6 min read", author: "TREKKING Journal", image: photo("photo-1433086966358-54859d0ed716"), excerpt: "Ideas for a short change of scene, from tea-country walks to quiet forest paths and lakeside pauses." }
];
const destinations = [
  { title: "Sandakphu", sub: "West Bengal · India", image: "images/sandakphu-ridge.jpg", aboutImage: "images/sandakphu-snow.jpg", slug: "sandakphu" },
  { title: "Darjeeling", sub: "West Bengal · India", image: "images/darjeeling-teascape.jpg", aboutImage: "images/darjeeling-kanchenjunga.jpg", slug: "darjeeling" },
  { title: "Sikkim", sub: "Eastern Himalayas", image: "images/sikkim-tsomgo.jpg", aboutImage: "images/sikkim-enchey-monastery.jpg", slug: "sikkim" },
  { title: "Kashmir", sub: "Northern India", image: "images/kashmir-dal-lake.jpg", aboutImage: "images/kashmir-baisaran.jpg", slug: "kashmir" },
  { title: "Himachal Pradesh", sub: "Western Himalayas", image: "images/himachal-baspa-valley.jpg", aboutImage: "images/himachal-key-monastery.jpg", slug: "himachal" }
];
// Demo examples sourced from Trekking Alps on Trustpilot, not reviews for this India-travel site.
// Keep the demo disclosure visible anywhere these examples are rendered.
const customerReviews = [
  { name: "S. Spence", initials: "SS", image: "images/profile-rohan.svg", rating: 5, summary: "Said the self-guided route and arrangements matched their group’s needs and went smoothly.", journey: "8-day Val Maira self-guided hike", source: "https://www.trustpilot.com/reviews/6ab933c47048e6a70f35957f" },
  { name: "Benedetta", initials: "B", image: "images/profile-aditi.svg", rating: 4.5, summary: "Enjoyed a challenging Gran Paradiso hike, scenic views, welcoming hospitality, and good food in the mountain huts.", journey: "Gran Paradiso four-day hike", source: "https://www.trustpilot.com/reviews/6aa91756a2bd03766f9054d6" },
  { name: "D. Karimi", initials: "DK", image: "images/profile-nima.svg", rating: 4, summary: "Praised the guide, beautiful hike, food, and warm group atmosphere.", journey: "Italian Alps hike", source: "https://www.trustpilot.com/reviews/6aa6d01babd334626046af8c" },
  { name: "Sarah Hickey", initials: "SH", image: "images/profile-aditi.svg", rating: 4.8, summary: "Described a well-planned family trek with balanced routes, dependable transfers, comfortable stays, and thoughtful support.", journey: "Val d’Ayas & Monterosa week-long hut-to-hut trek", source: "https://www.trustpilot.com/reviews/6a82654ac0c6422cf8619d9f" },
  { name: "Cindy Carpenter", initials: "CC", image: "images/profile-rohan.svg", rating: 4.2, summary: "Said a custom Val Maira route fit the group’s requested dates, distance, and elevation, with arrangements running smoothly.", journey: "Five-day Val Maira hike", source: "https://www.trustpilot.com/reviews/6a6f54d3e25b98b2466aef43" },
  { name: "Egle Tiskeviciute", initials: "ET", image: "images/profile-nima.svg", rating: 3.5, summary: "Enjoyed a Susa Valley hut-to-hut trek and highlighted the guide’s care, communication, local stories, and wildlife.", journey: "Four-day Susa Valley Ring Trek", source: "https://www.trustpilot.com/reviews/6a67797f698c7a0ca57ad9bd" }
];
const legalData = {
  privacy: { title: "Privacy policy", intro: "Your trust matters to us. Here's how we handle the information you share when exploring or booking a TREKKING journey.", sections: [
    ["Information we collect", "We may collect contact details and trip preferences that you choose to share through our forms or booking enquiries. Payment information is handled by the payment provider you select; please review that provider's privacy notice."],
    ["How we use information", "We use information to respond to enquiries, coordinate requested travel arrangements, provide customer support, and improve this website. We do not sell personal information."],
    ["Cookies and tracking", "This website may use essential cookies for basic functionality. Optional analytics or marketing technologies should only be enabled with your consent where required."],
    ["Third-party services", "Maps, payment providers, social networks and other external services may process data under their own privacy policies. We only share information needed to fulfil a service you request."],
    ["Data security and retention", "We use reasonable safeguards and retain information only for as long as needed for the purpose collected or as required by applicable law. No online transmission can be guaranteed completely secure."],
    ["Your choices and rights", "Depending on where you live, you may have rights to access, correct or request deletion of personal information. Contact us using the details below to make a request."],
    ["Contact", "Use the contact form to prepare a privacy question. The form must be connected to an approved business contact before submissions can be received."]
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
    ["Requesting a cancellation", "Use the contact form to prepare a written request and include your booking reference. No request is received until the website is connected to a business communication service."],
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
    ["Contact", "Use the contact form to prepare a question about this policy. No message is sent until the website is connected to a business communication service."]
  ] }
};

const main = document.querySelector("#main-content");
const footer = document.querySelector("#site-footer");
function destinationMenuTemplate() {
  const feature = { title: "India, beyond the ordinary", image: photo("photo-1464822759023-fed622ff2c3b", 700) };
  const destinationLink = destination => `<a href="${pageFile(`destination/${destination.slug}`)}" data-feature-image="${destination.image}" data-feature-title="${destination.title}">${destination.title}</a>`;
  return `<li class="nav-item dropdown mega-dropdown"><a class="nav-link dropdown-toggle" href="destinations.html" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Destinations</a><div class="dropdown-menu mega-menu"><div class="row g-4"><div class="col-md-4"><span class="mega-label">Find your landscape</span><a class="mega-feature" data-destination-feature-link data-default-href="destinations.html" href="destinations.html"><img data-destination-feature data-default-image="${feature.image}" src="${feature.image}" alt="${feature.title} landscape"><span data-destination-feature-title data-default-title="${feature.title}">${feature.title}<i class="bi bi-arrow-up-right"></i></span></a></div><div class="col-md-4"><span class="mega-label">The Himalayas</span>${destinations.slice(0, 3).map(destinationLink).join("")}</div><div class="col-md-4"><span class="mega-label">Slow travel favorites</span>${destinations.slice(3).map(destinationLink).join("")}<a href="destinations.html" class="mega-all">Explore all destinations <i class="bi bi-arrow-right"></i></a></div></div></div></li>`;
}
function siteHeaderTemplate() {
  return `<div class="announcement-bar"><div class="container"><p class="mb-0"><i class="bi bi-stars me-2"></i>New season, new stories — <a href="upcoming-departures.html">discover upcoming departures</a></p></div></div><header class="site-header sticky-top"><nav class="navbar"><div class="container flex-wrap"><a class="navbar-brand" href="index.html"><img src="images/logo.svg" alt="TREKKING" width="154" height="41"><span class="brand-tagline">Explore More. Experience Life.</span></a><div class="header-actions d-flex align-items-center gap-2 ms-auto"><button class="btn theme-toggle" type="button" aria-label="Switch color theme"><i class="bi bi-moon-stars"></i></button><a class="btn btn-outline-navy" href="booking-details.html">Book now</a><a class="btn btn-primary-navy" href="trip-planner.html">Plan your trip</a></div><div class="navbar-collapse"><ul class="navbar-nav flex-row flex-wrap justify-content-center"><li class="nav-item"><a class="nav-link" href="index.html">Home</a></li><li class="nav-item"><a class="nav-link" href="destinations.html">Destinations</a></li><li class="nav-item"><a class="nav-link" href="destination-sandakphu.html">Sandakphu</a></li><li class="nav-item"><a class="nav-link" href="destination-sikkim.html">Sikkim</a></li><li class="nav-item"><a class="nav-link" href="destination-darjeeling.html">Darjeeling</a></li><li class="nav-item"><a class="nav-link" href="destination-kashmir.html">Kashmir</a></li><li class="nav-item"><a class="nav-link" href="destination-himachal.html">Himachal</a></li><li class="nav-item"><a class="nav-link" href="tour-packages.html">Tour packages</a></li><li class="nav-item"><a class="nav-link" href="trekking.html">Trekking</a></li><li class="nav-item"><a class="nav-link" href="weekend-trips.html">Weekend trips</a></li><li class="nav-item"><a class="nav-link" href="about.html">About</a></li><li class="nav-item"><a class="nav-link" href="blog.html">Journal</a></li><li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li></ul></div></div></nav></header>`;
}
if (!document.querySelector(".site-header")) document.body.insertAdjacentHTML("afterbegin", siteHeaderTemplate());
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
const mobileHelp = document.querySelector(".mobile-nav-footer");
if (mobileHelp) {
  const mobileHelpText = mobileHelp.querySelector("p");
  if (mobileHelpText) mobileHelpText.textContent = "Have a question about a route?";
  mobileHelp.querySelector('a[href^="tel:"]')?.replaceWith(Object.assign(document.createElement("a"), { className: "fw-semibold", href: "contact.html", textContent: "Open the contact form" }));
}
function setDestinationMenuOpen(isOpen) {
  document.body.classList.toggle("destination-menu-open", isOpen);
}
document.querySelectorAll(".mega-dropdown").forEach(dropdown => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  dropdown.addEventListener("mouseenter", () => {
    setDestinationMenuOpen(true);
    resetDestinationPreview(dropdown.querySelector(".mega-menu"));
  });
  dropdown.addEventListener("mouseleave", () => {
    if (!toggle.classList.contains("show")) setDestinationMenuOpen(false);
  });
  toggle.addEventListener("shown.bs.dropdown", () => {
    setDestinationMenuOpen(true);
    resetDestinationPreview(dropdown.querySelector(".mega-menu"));
  });
  toggle.addEventListener("hidden.bs.dropdown", () => {
    if (!dropdown.matches(":hover")) setDestinationMenuOpen(false);
  });
});
const skipLink = document.querySelector(".skip-link");
const announcementBar = document.querySelector(".announcement-bar");
function initializeNoticeTicker() {
  if (!announcementBar) return;
  const notice = "IMPORTANT NOTICE: Departure dates, route conditions, inclusions, and pricing are confirmed with the trip team before booking.";
  announcementBar.classList.add("notice-ticker");
  announcementBar.setAttribute("role", "region");
  announcementBar.setAttribute("aria-label", "Important travel notice");
  announcementBar.innerHTML = `<div class="container notice-ticker-window"><div class="notice-ticker-track" aria-hidden="true"><span>${notice} <a href="contact.html">Contact the trip team</a><i class="bi bi-circle-fill"></i></span><span>${notice} <a href="contact.html">Contact the trip team</a><i class="bi bi-circle-fill"></i></span></div><p class="visually-hidden mb-0">${notice} Contact the trip team for current details.</p></div>`;
}
function initializeSpecialOffer() {
  const header = document.querySelector(".site-header");
  if (!header || document.querySelector(".offer-banner")) return;
  header.insertAdjacentHTML("afterend", `<aside class="offer-banner" aria-label="Special offer"><div class="container offer-banner-inner"><p class="offer-banner-copy mb-0"><i class="bi bi-stars" aria-hidden="true"></i><strong>Special offer</strong><span>Save 10% on select winter journeys</span><a href="upcoming-departures.html">Explore trips <i class="bi bi-arrow-right" aria-hidden="true"></i></a></p><div class="offer-countdown" aria-label="Offer countdown" data-offer-deadline="2026-12-01T23:59:59+05:30"><span class="offer-countdown-label">Ends in</span><span class="offer-countdown-unit"><b data-countdown-days>00</b><small>days</small></span><span class="offer-countdown-unit"><b data-countdown-hours>00</b><small>hrs</small></span><span class="offer-countdown-unit"><b data-countdown-minutes>00</b><small>min</small></span><span class="offer-countdown-unit"><b data-countdown-seconds>00</b><small>sec</small></span></div><p class="offer-expired mb-0" hidden>Offer ended. <a href="contact.html">Ask us about current offers</a></p></div></aside>`);
  const countdown = document.querySelector(".offer-banner [data-offer-deadline]");
  const deadline = new Date(countdown.dataset.offerDeadline).getTime();
  let countdownTimer;
  const updateCountdown = () => {
    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      countdown.hidden = true;
      document.querySelector(".offer-banner-copy").hidden = true;
      document.querySelector(".offer-expired").hidden = false;
      window.clearInterval(countdownTimer);
      return;
    }
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    countdown.querySelector("[data-countdown-days]").textContent = String(days).padStart(2, "0");
    countdown.querySelector("[data-countdown-hours]").textContent = String(hours).padStart(2, "0");
    countdown.querySelector("[data-countdown-minutes]").textContent = String(minutes).padStart(2, "0");
    countdown.querySelector("[data-countdown-seconds]").textContent = String(seconds).padStart(2, "0");
  };
  updateCountdown();
  countdownTimer = window.setInterval(updateCountdown, 1000);
}
initializeNoticeTicker();
initializeSpecialOffer();
const headerAuthActions = document.querySelector(".site-header .header-actions");
if (headerAuthActions && !headerAuthActions.querySelector("[data-open-auth]")) {
  const authButton = document.createElement("button");
  authButton.className = "btn btn-outline-navy auth-header-button";
  authButton.type = "button";
  authButton.dataset.openAuth = "";
  authButton.setAttribute("aria-label", "Sign in or create an account");
  authButton.title = "Sign in or create an account";
  authButton.innerHTML = `<i class="bi bi-person-circle" data-auth-guest-icon aria-hidden="true"></i><img class="auth-profile-image" data-auth-avatar alt="" hidden><span class="auth-header-label">Sign in</span>`;
  const menuButton = headerAuthActions.querySelector(".navbar-toggler");
  if (menuButton) menuButton.before(authButton);
  else headerAuthActions.append(authButton);
}
if (skipLink && announcementBar && announcementBar.previousElementSibling !== skipLink) document.body.insertBefore(skipLink, announcementBar);
if (!document.querySelector(".mobile-booking-cta")) document.body.insertAdjacentHTML("beforeend", `<a class="mobile-booking-cta" href="trip-planner.html"><i class="bi bi-compass"></i> Plan your trip <i class="bi bi-arrow-right"></i></a>`);
if (!document.querySelector(".back-to-top")) document.body.insertAdjacentHTML("beforeend", `<button class="back-to-top" type="button" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button>`);
if (!document.querySelector("#siteToast")) document.body.insertAdjacentHTML("beforeend", `<div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="siteToast" class="toast" role="status" aria-live="polite" aria-atomic="true"><div class="toast-body"><i class="bi bi-check-circle-fill text-success me-2"></i><span>Thanks! Your request is ready.</span></div></div></div>`);
const themeButton = document.querySelector(".theme-toggle");
let storyFilmCleanup;
let statsVisibilityHandler;
let blogPaginationCleanup;
let cookieConsentController;
let authPopupController;
let cookieConsentInitialized = false;
let cookieFocusReturn = null;
let sectionNavigationCleanup;
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
function updateActiveNavigation(path) {
  const currentFile = pageFile(path || "index");
  const navigationLinks = document.querySelectorAll(".site-header a.nav-link, .site-header .dropdown-item, .site-header .mega-menu a, .site-header .header-actions a, .mobile-nav .mobile-link, #site-footer .footer-column a, #site-footer .footer-legal a");
  navigationLinks.forEach(link => {
    const href = link.getAttribute("href");
    const isCurrent = href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:") && new URL(href, location.href).pathname.split("/").at(-1) === currentFile;
    link.classList.toggle("active", Boolean(isCurrent));
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  document.querySelectorAll(".site-header .nav-item.dropdown").forEach(item => {
    const hasCurrentChild = item.querySelector(".dropdown-menu a.active");
    const toggle = item.querySelector(":scope > .nav-link");
    const isCurrentGroup = (path.startsWith("destination/") && toggle?.getAttribute("href") === "destinations.html")
      || ((["packages", "trekking", "weekend-trips", "departures", "trip-results", "trip-detail"].includes(path) || path.startsWith("trip/")) && toggle?.getAttribute("href") === "tour-packages.html");
    if (toggle && (hasCurrentChild || isCurrentGroup)) toggle.classList.add("active");
  });

  const activateRelatedLinks = selector => document.querySelectorAll(selector).forEach(link => link.classList.add("active"));
  if (path === "blog/article") activateRelatedLinks('.site-header .nav-link[href="blog.html"], #site-footer .footer-column a[href="blog.html"]');
  if (path.startsWith("destination/")) activateRelatedLinks('.mobile-nav .mobile-link[href="destinations.html"]');
  if (["packages", "trekking", "weekend-trips", "departures", "trip-results", "trip-detail"].includes(path) || path.startsWith("trip/")) {
    activateRelatedLinks('#site-footer .footer-column a[href="tour-packages.html"]');
    activateRelatedLinks('.mobile-nav .mobile-link[href="tour-packages.html"]');
  }
  if (["confirmation", "payment", "payment-success", "payment-failed"].includes(path)) {
    activateRelatedLinks('.site-header .header-actions a[href="booking-details.html"]');
  }
}
function setupSectionNavigation(root) {
  sectionNavigationCleanup?.();
  const links = [...root.querySelectorAll(".toc a[href^='#'], .legal-toc a[href^='#']")];
  const sections = links.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
  if (!links.length || !sections.length) return;

  const setActiveSection = section => {
    links.forEach(link => {
      const active = link.hash === `#${section.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  let frame = 0;
  const updateFromScroll = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => {
      const offset = 135;
      let current = sections[0];
      sections.forEach(section => {
        if (section.getBoundingClientRect().top <= offset) current = section;
      });
      setActiveSection(current);
    });
  };
  const onClick = event => {
    const link = event.target.closest("a[href^='#']");
    const section = sections.find(item => `#${item.id}` === link?.hash);
    if (section) setActiveSection(section);
  };

  root.addEventListener("click", onClick);
  window.addEventListener("scroll", updateFromScroll, { passive: true });
  window.addEventListener("resize", updateFromScroll);
  updateFromScroll();
  sectionNavigationCleanup = () => {
    window.cancelAnimationFrame(frame);
    root.removeEventListener("click", onClick);
    window.removeEventListener("scroll", updateFromScroll);
    window.removeEventListener("resize", updateFromScroll);
  };
}
const image = (src, alt, cls = "") => `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy">`;
const breadcrumb = (items) => `<nav aria-label="Breadcrumb"><ol class="breadcrumb">${items.map((item, index) => `<li class="breadcrumb-item ${index === items.length - 1 ? "active" : ""}">${index === items.length - 1 ? item.label : `<a href="${item.href}">${item.label}</a>`}</li>`).join("")}</ol></nav>`;
const pageHero = (title, intro, imageUrl = "", crumbs = []) => `<section class="page-hero ${imageUrl ? "has-image" : ""}" ${imageUrl ? `style="--page-image:url('${imageUrl}')"` : ""}><div class="container">${breadcrumb([{ label: "Home", href: "#/" }, ...crumbs, { label: title }])}<span class="eyebrow mt-4">${crumbs.length ? crumbs.at(-1).label : "A little inspiration"}</span><h1>${title}</h1><p>${intro}</p></div></section>`;
const sectionHeading = (eyebrow, title, copy, centered = false) => `<div class="section-heading ${centered ? "centered" : ""}"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><p>${copy}</p></div>`;
function statsMarkup() {
  const principles = [
    { title: "Start with place", label: "Choose a region, then explore its routes and local character." },
    { title: "Find your pace", label: "Compare walking grades and trip styles before you enquire." },
    { title: "Plan with care", label: "Confirm dates, current conditions, inclusions, and price before booking." },
    { title: "Leave room", label: "Keep time for local conversations and the unexpected moments." }
  ];
  return `<div class="stats-strip journey-principles">${principles.map(principle => `<div class="stat-item"><strong>${principle.title}</strong><span>${principle.label}</span></div>`).join("")}</div>`;
}
function statsSection() {
  return `<section class="stats-section section-soft" aria-label="TREKKING at a glance"><div class="container">${statsMarkup()}</div></section>`;
}
function ratingStars(rating, maxRating = 5, labelPrefix = "Rated") {
  const numericRating = Number(rating);
  const safeRating = Number.isFinite(numericRating) ? Math.min(maxRating, Math.max(0, numericRating)) : 0;
  const displayRating = Number.isInteger(safeRating) ? String(safeRating) : safeRating.toFixed(1);
  const icons = Array.from({ length: maxRating }, (_, index) => {
    const fill = Math.round(Math.max(0, Math.min(1, safeRating - index)) * 100);
    return `<span class="rating-star" style="--star-fill:${fill}%" aria-hidden="true"><i class="bi bi-star"></i><i class="bi bi-star-fill"></i></span>`;
  }).join("");
  return `<div class="review-stars" role="img" aria-label="${labelPrefix} ${displayRating} out of ${maxRating}">${icons}<span class="rating-score" aria-hidden="true">${displayRating}/${maxRating}</span></div>`;
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
    closeTimer = window.setTimeout(() => {
      overlay.hidden = true;
      document.dispatchEvent(new CustomEvent("trekking-cookie-consent-closed"));
    }, 220);
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
function authPopupTemplate() {
  return `<div class="auth-popup" id="authPopup" hidden aria-hidden="true"><section class="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="authPopupTitle" tabindex="-1"><button class="auth-close" type="button" data-auth-close aria-label="Continue browsing"><i class="bi bi-x-lg" aria-hidden="true"></i></button><span class="eyebrow">A place for your plans</span><h2 id="authPopupTitle">Sign in or create an account</h2><p class="auth-intro">Save the journeys you’re considering and keep your trip enquiries together.</p><div class="auth-tabs" role="tablist" aria-label="Account access"><button class="auth-tab active" id="authLoginTab" type="button" role="tab" aria-selected="true" aria-controls="authLoginPanel" data-auth-mode="login">Sign in</button><button class="auth-tab" id="authSignupTab" type="button" role="tab" aria-selected="false" aria-controls="authSignupPanel" data-auth-mode="signup">Create account</button></div><div class="auth-social-buttons"><button class="auth-social-button" type="button" data-auth-provider="Google"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4 2-6.8 2-5.2 0-9.7-3.5-11.3-8.2H5.8v5.3A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.7 27.9a12 12 0 0 1 0-7.8v-5.3H5.8a20 20 0 0 0 0 18.4l6.9-5.3Z"/><path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 14.8l6.9 5.3c1.6-4.7 6.1-8 11.3-8Z"/></svg><span>Continue with Google</span></button><button class="auth-social-button" type="button" data-auth-provider="Apple"><i class="bi bi-apple" aria-hidden="true"></i><span>Continue with Apple</span></button></div><div class="auth-divider"><span>or continue with email</span></div><p class="auth-service-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Email accounts are ready. Google and Apple sign-in become available when their OAuth credentials are configured on the server.</p><form id="authLoginPanel" data-auth-panel="login" role="tabpanel" aria-labelledby="authLoginTab"><label class="form-label" for="authLoginEmail">Email address</label><input class="form-control" id="authLoginEmail" type="email" autocomplete="email" required><label class="form-label mt-3" for="authLoginPassword">Password</label><input class="form-control" id="authLoginPassword" type="password" autocomplete="current-password" required minlength="12"><button class="btn btn-primary-navy w-100 mt-4" type="submit">Sign in</button></form><form id="authSignupPanel" data-auth-panel="signup" role="tabpanel" aria-labelledby="authSignupTab" hidden><label class="form-label" for="authSignupName">Your name</label><input class="form-control" id="authSignupName" autocomplete="name" required><label class="form-label mt-3" for="authSignupEmail">Email address</label><input class="form-control" id="authSignupEmail" type="email" autocomplete="email" required><label class="form-label mt-3" for="authSignupPassword">Create a password</label><input class="form-control" id="authSignupPassword" type="password" autocomplete="new-password" required minlength="12" aria-describedby="authPasswordHelp"><small class="form-text" id="authPasswordHelp">Use at least 12 characters.</small><label class="form-label mt-3" for="authSignupConfirm">Confirm password</label><input class="form-control" id="authSignupConfirm" type="password" autocomplete="new-password" required minlength="12"><button class="btn btn-primary-navy w-100 mt-4" type="submit">Create account</button></form><p class="auth-form-status" id="authFormStatus" role="status" aria-live="polite"></p><button class="auth-guest-link" type="button" data-auth-close>Continue browsing as a guest</button></section></div>`;
}
function enhancePasswordFields(root = document) {
  root.querySelectorAll('input[type="password"]').forEach(input => {
    if (input.closest(".password-field")) return;
    const wrapper = document.createElement("span");
    wrapper.className = "password-field";
    input.parentNode.insertBefore(wrapper, input);
    wrapper.append(input);
    const toggle = document.createElement("button");
    toggle.className = "password-visibility-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Show password");
    toggle.setAttribute("aria-controls", input.id);
    toggle.title = "Show password";
    toggle.innerHTML = '<i class="bi bi-eye" aria-hidden="true"></i>';
    toggle.addEventListener("click", () => {
      const reveal = input.type === "password";
      input.type = reveal ? "text" : "password";
      toggle.setAttribute("aria-label", reveal ? "Hide password" : "Show password");
      toggle.title = reveal ? "Hide password" : "Show password";
      toggle.innerHTML = `<i class="bi ${reveal ? "bi-eye-slash" : "bi-eye"}" aria-hidden="true"></i>`;
      input.focus({ preventScroll: true });
    });
    wrapper.append(toggle);
  });
}
function setupAuthPopup() {
  if (!document.querySelector("#authPopup")) document.body.insertAdjacentHTML("beforeend", authPopupTemplate());
  const overlay = document.querySelector("#authPopup");
  enhancePasswordFields(overlay);
  const dialog = overlay.querySelector(".auth-dialog");
  const status = overlay.querySelector("#authFormStatus");
  const sessionKey = "trekking-auth-prompt-seen";
  let returnFocus = null;
  let signedInUser = null;
  const logoutButton = document.createElement("button");
  logoutButton.className = "auth-guest-link";
  logoutButton.type = "button";
  logoutButton.dataset.authLogout = "";
  logoutButton.textContent = "Sign out";
  logoutButton.hidden = true;
  status.insertAdjacentElement("afterend", logoutButton);
  const loginPanel = overlay.querySelector('[data-auth-panel="login"]');
  const forgotButton = document.createElement("button");
  forgotButton.className = "auth-forgot-link";
  forgotButton.type = "button";
  forgotButton.dataset.authForgot = "";
  forgotButton.textContent = "Forgot password?";
  loginPanel.append(forgotButton);
  const forgotPanel = document.createElement("form");
  forgotPanel.id = "authForgotPanel";
  forgotPanel.dataset.authPanel = "forgot";
  forgotPanel.setAttribute("aria-label", "Request a password reset");
  forgotPanel.hidden = true;
  forgotPanel.innerHTML = `<label class="form-label" for="authForgotEmail">Email address</label><input class="form-control" id="authForgotEmail" type="email" autocomplete="email" required><button class="btn btn-primary-navy w-100 mt-4" type="submit">Send reset link</button><button class="auth-guest-link" type="button" data-auth-back-login>Back to sign in</button>`;
  status.before(forgotPanel);
  const accountRequests = document.createElement("section");
  accountRequests.className = "auth-account-requests";
  accountRequests.hidden = true;
  accountRequests.setAttribute("aria-live", "polite");
  accountRequests.innerHTML = `<h3>Your trip requests</h3><p class="auth-account-loading">Loading your requests…</p><ul></ul>`;
  status.insertAdjacentElement("afterend", accountRequests);

  async function loadAccountRequests() {
    accountRequests.hidden = !signedInUser;
    if (!signedInUser) return;
    const requestedEmail = signedInUser.email;
    const list = accountRequests.querySelector("ul");
    list.replaceChildren();
    accountRequests.querySelector(".auth-account-loading").textContent = "Loading your requests…";
    try {
      const response = await fetch("/api/account/requests", { cache: "no-store" });
      const result = await response.json();
      if (signedInUser?.email !== requestedEmail) return;
      if (!response.ok) throw new Error(result.error || "Requests could not be loaded.");
      accountRequests.querySelector(".auth-account-loading").textContent = result.requests.length ? "" : "No trip requests yet.";
      result.requests.forEach(request => {
        const item = document.createElement("li");
        const title = document.createElement("strong");
        title.textContent = request.trip;
        const detail = document.createElement("span");
        detail.textContent = `${request.type === "booking" ? "Booking request" : "Trip plan"} · ${request.status}${request.paymentStatus === "paid" ? " · Deposit paid" : ""}`;
        item.append(title, detail);
        list.append(item);
      });
    } catch (error) {
      if (signedInUser?.email === requestedEmail) accountRequests.querySelector(".auth-account-loading").textContent = error.message;
    }
  }

  function renderAccountState() {
    overlay.querySelector("#authPopupTitle").textContent = signedInUser ? "Your account" : "Sign in or create an account";
    overlay.querySelector(".auth-intro").textContent = signedInUser
      ? "View your trip requests and manage your account."
      : "Save the journeys you’re considering and keep your trip enquiries together.";
    document.querySelectorAll("[data-open-auth]").forEach(button => {
      const label = signedInUser ? "" : "Sign in";
      button.classList.toggle("is-authenticated", Boolean(signedInUser));
      button.querySelector(".auth-header-label")?.replaceChildren(document.createTextNode(label));
      const avatar = button.querySelector("[data-auth-avatar]");
      const guestIcon = button.querySelector("[data-auth-guest-icon]");
      if (avatar && guestIcon) {
        if (signedInUser) {
          const initials = signedInUser.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "T";
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="#022468"/><text x="40" y="42" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-family="Arial,sans-serif" font-size="30" font-weight="700">${initials}</text></svg>`;
          const fallbackAvatar = `data:image/svg+xml,${encodeURIComponent(svg)}`;
          avatar.onerror = signedInUser.avatarUrl ? () => { avatar.onerror = null; avatar.src = fallbackAvatar; } : null;
          avatar.src = signedInUser.avatarUrl || fallbackAvatar;
          avatar.alt = "Account profile";
          avatar.hidden = false;
          guestIcon.hidden = true;
        } else {
          avatar.hidden = true;
          avatar.removeAttribute("src");
          guestIcon.hidden = false;
        }
      }
      button.setAttribute("aria-label", signedInUser ? "Account profile" : "Sign in or create an account");
      button.title = signedInUser ? "Account profile" : "Sign in or create an account";
    });
    overlay.querySelectorAll("[data-auth-panel]").forEach(panel => { panel.hidden = Boolean(signedInUser) || panel.dataset.authPanel !== "login"; });
    overlay.querySelector(".auth-social-buttons").hidden = Boolean(signedInUser);
    overlay.querySelector(".auth-divider").hidden = Boolean(signedInUser);
    overlay.querySelector(".auth-service-note").hidden = Boolean(signedInUser);
    overlay.querySelector("[data-auth-logout]").hidden = !signedInUser;
    if (signedInUser) status.textContent = `Signed in as ${signedInUser.email}.`;
    loadAccountRequests();
  }

  function setMode(mode) {
    overlay.querySelector(".auth-tabs").hidden = Boolean(signedInUser);
    overlay.querySelector(".auth-social-buttons").hidden = Boolean(signedInUser);
    overlay.querySelector(".auth-divider").hidden = Boolean(signedInUser);
    overlay.querySelector(".auth-service-note").hidden = Boolean(signedInUser);
    overlay.querySelectorAll("[data-auth-mode]").forEach(tab => {
      const active = tab.dataset.authMode === mode;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    overlay.querySelectorAll("[data-auth-panel]").forEach(panel => {
      panel.hidden = Boolean(signedInUser) || panel.dataset.authPanel !== mode;
    });
    status.textContent = signedInUser ? `Signed in as ${signedInUser.email}.` : "";
    overlay.querySelector("[data-auth-logout]").hidden = !signedInUser;
    if (signedInUser) return;
    overlay.querySelector(mode === "login" ? "#authLoginEmail" : "#authSignupName").focus();
  }
  function showForgotPassword() {
    overlay.querySelector(".auth-tabs").hidden = true;
    overlay.querySelector(".auth-social-buttons").hidden = true;
    overlay.querySelector(".auth-divider").hidden = true;
    overlay.querySelector(".auth-service-note").hidden = true;
    overlay.querySelectorAll("[data-auth-panel]").forEach(panel => { panel.hidden = panel.dataset.authPanel !== "forgot"; });
    status.textContent = "Enter your account email and we’ll send a reset link if an account exists.";
    overlay.querySelector("#authForgotEmail").focus();
  }
  function close() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("auth-popup-open");
    sessionStorage.setItem(sessionKey, "true");
    window.setTimeout(() => { overlay.hidden = true; }, 220);
    returnFocus?.focus();
  }
  function open(force = false) {
    if (!force && sessionStorage.getItem(sessionKey) === "true") return;
    const cookieDialog = document.querySelector("#cookieConsent");
    if (cookieDialog && !cookieDialog.hidden) return;
    returnFocus = document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("auth-popup-open");
    overlay.classList.add("is-open");
    setMode("login");
  }

  overlay.addEventListener("click", async event => {
    const modeTab = event.target.closest("[data-auth-mode]");
    if (modeTab) setMode(modeTab.dataset.authMode);
    else if (event.target.closest("[data-auth-forgot]")) showForgotPassword();
    else if (event.target.closest("[data-auth-back-login]")) setMode("login");
    else if (event.target.closest("[data-auth-provider]")) {
      const provider = event.target.closest("[data-auth-provider]").dataset.authProvider.toLowerCase();
      try {
        const response = await fetch("/api/auth/providers");
        const result = await response.json();
        if (result.providers?.[provider]) location.assign(`/auth/${provider}`);
        else status.textContent = `${provider === "google" ? "Google" : "Apple"} sign-in needs its OAuth credentials configured on the server.`;
      } catch {
        status.textContent = "Social sign-in is unavailable right now. Please try email and password.";
      }
    }
    else if (event.target.closest("[data-auth-logout]")) {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        signedInUser = null;
        renderAccountState();
        setMode("login");
      } catch {
        status.textContent = "Sign-out could not be completed. Please try again.";
      }
    }
    else if (event.target === overlay || event.target.closest("[data-auth-close]")) close();
  });
  overlay.addEventListener("submit", async event => {
    if (!event.target.matches("[data-auth-panel]")) return;
    event.preventDefault();
    if (event.target.dataset.authPanel === "forgot") {
      const button = event.target.querySelector('button[type="submit"]');
      button.disabled = true;
      status.textContent = "Sending reset link…";
      try {
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: event.target.querySelector("#authForgotEmail").value })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "The reset request could not be completed.");
        status.textContent = result.message;
        event.target.reset();
      } catch (error) {
        status.textContent = error.message || "The reset request could not be completed.";
      } finally {
        button.disabled = false;
      }
      return;
    }
    const isSignup = event.target.dataset.authPanel === "signup";
    if (isSignup && event.target.querySelector("#authSignupPassword").value !== event.target.querySelector("#authSignupConfirm").value) {
      status.textContent = "Those passwords don’t match. Please check them and try again.";
      event.target.querySelector("#authSignupConfirm").focus();
      return;
    }
    const button = event.target.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = "Connecting securely…";
    try {
      const response = await fetch(`/api/auth/${isSignup ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: isSignup ? event.target.querySelector("#authSignupName").value : undefined,
          email: event.target.querySelector(isSignup ? "#authSignupEmail" : "#authLoginEmail").value,
          password: event.target.querySelector(isSignup ? "#authSignupPassword" : "#authLoginPassword").value
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Account access failed.");
      signedInUser = result.user;
      renderAccountState();
      setMode("login");
    } catch (error) {
      status.textContent = error.message || "Account access is temporarily unavailable.";
    } finally {
      button.disabled = false;
    }
  });
  overlay.addEventListener("keydown", event => {
    if (overlay.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      const focusable = [...dialog.querySelectorAll("button:not([disabled]), input:not([disabled]), a[href]")].filter(element => !element.closest("[hidden]"));
      if (event.shiftKey && (document.activeElement === dialog || document.activeElement === focusable[0])) {
        event.preventDefault();
        focusable.at(-1)?.focus();
      } else if (!event.shiftKey && (document.activeElement === dialog || document.activeElement === focusable.at(-1))) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    }
  });

  fetch("/api/auth/me").then(response => response.json()).then(result => {
    signedInUser = result.user;
    renderAccountState();
  }).catch(() => {});
  document.addEventListener("click", event => {
    if (!event.target.closest("[data-open-auth]")) return;
    event.preventDefault();
    open(true);
  });

  if (localStorage.getItem("trekking-cookie-consent") === "saved") window.setTimeout(open, 300);
  else document.addEventListener("trekking-cookie-consent-closed", () => window.setTimeout(open, 260), { once: true });
  return { close, open };
}
function setupBlogPagination(root) {
  const grid = root.querySelector("#articleGrid");
  const pagination = root.querySelector('[aria-label="Blog pages"]');
  const search = root.querySelector("#articleSearch");
  if (!grid || !pagination) return;
  const cards = [...grid.querySelectorAll(".article-result")];
  const emptyMessage = document.createElement("div");
  emptyMessage.className = "col-12";
  emptyMessage.innerHTML = noResultsMarkup("No stories match your search. Try another keyword or category.");
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
  const existingTripPages = ["sandakphu", "sikkim", "darjeeling", "kashmir", "himachal", "weekend"];
  const detailHref = existingTripPages.includes(trip.slug) ? routeHref(`trip/${trip.slug}`) : `trip-detail.html?trip=${encodeURIComponent(trip.slug)}`;
  return `<article class="journey-card"><a class="journey-card-image" href="${detailHref}">${image(trip.image, trip.title)}<span class="journey-badge">${trip.badge}</span></a><div class="journey-card-body"><div class="journey-card-meta"><span><i class="bi bi-geo-alt"></i>${trip.region}</span><span>${trip.category}</span></div><h3><a href="${detailHref}">${trip.title}</a></h3><p>${trip.description}</p><div class="journey-card-bottom"><div><small>Current dates and price</small><br><strong>Confirm by enquiry</strong></div><a class="text-link" href="contact.html">Ask us <i class="bi bi-arrow-right"></i></a></div></div></article>`;
}
function noResultsMarkup(message, hidden = false) {
  return `<div class="content-panel no-results-message text-center py-5" role="status"${hidden ? " hidden" : ""}><span class="no-results-icon"><i class="bi bi-search" aria-hidden="true"></i></span><h2 class="h4">No results found</h2><p class="mb-0">${message}</p></div>`;
}
function articleCard(article, featured = false) {
  return `<article class="blog-card">${image(article.image, article.title)}<span class="blog-category">${article.category}</span><h3><a href="#/blog/article">${article.title}</a></h3><p>${article.excerpt}</p><div class="blog-meta">${article.author} <span class="mx-1">·</span> ${article.read}</div></article>`;
}
function footerTemplate() {
  return `<div class="site-footer"><div class="footer-main"><div class="container"><div class="row g-4"><div class="col-lg-4 col-md-6 footer-brand"><a href="#/"><img src="images/logo.svg" alt="TREKKING"></a><p>Thoughtful journeys for people who want to feel a place, not just see it. Come find your own way into the mountains.</p><div class="footer-socials"><a href="https://instagram.com" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="https://facebook.com" aria-label="Facebook"><i class="bi bi-facebook"></i></a><a href="https://youtube.com" aria-label="YouTube"><i class="bi bi-youtube"></i></a></div></div><div class="col-6 col-lg-2 col-md-3 footer-column"><h3>Explore</h3><a href="#/">Home</a><a href="#/about">About us</a><a href="#/destinations">Destinations</a><a href="#/packages">Tour packages</a><a href="#/blog">Journal</a><a href="#/contact">Contact</a><a href="#/gallery">Gallery</a></div><div class="col-6 col-lg-2 col-md-3 footer-column"><h3>Popular places</h3><a href="#/destination/sandakphu">Sandakphu</a><a href="#/destination/darjeeling">Darjeeling</a><a href="#/destination/sikkim">Sikkim</a><a href="#/destination/kashmir">Kashmir</a><a href="#/destination/himachal">Himachal Pradesh</a><a href="#/departures">Upcoming departures</a></div><div class="col-lg-4 col-md-6 footer-column"><h3>Here to help</h3><p><i class="bi bi-telephone"></i>+91 12345 67890</p><p><i class="bi bi-envelope"></i>hello@trekking.example</p><p><i class="bi bi-whatsapp"></i>WhatsApp us</p><p><i class="bi bi-geo-alt"></i>Office address — add your business address</p><a href="#/reviews">Traveller reviews</a><a href="#/faq">FAQs</a></div></div></div></div><div class="footer-bottom"><div class="container"><p>© ${new Date().getFullYear()} TREKKING. Explore More. Experience Life.</p><div class="footer-legal"><a href="#/legal/privacy">Privacy</a><a href="#/legal/terms">Terms</a><a href="#/legal/cancellation">Cancellations</a><a href="#/legal/disclaimer">Disclaimer</a><a href="#/legal/cookies">Cookies</a><a href="#/faq">FAQs</a></div></div></div></div>`;
}
function homePage() {
  return `<section class="hero"><!-- <img class="hero-image" src="${photo("photo-1464822759023-fed622ff2c3b", 2000)}" alt="Snow-covered Himalayan peaks above a sea of clouds"> --><video class="hero-video" src="images/cinematic-video.mp4" autoplay muted loop playsinline preload="auto" aria-hidden="true"></video><div class="container hero-content"><span class="eyebrow">Take the scenic route</span><h1>Out there is<br><em>where you belong.</em></h1><p class="hero-copy">Small-group journeys, local stories and the kind of mountain air that stays with you long after you come home.</p><div class="hero-buttons"><a class="btn btn-primary-navy" href="#/packages">Find your next journey <i class="bi bi-arrow-up-right ms-2"></i></a><a class="btn btn-quiet" href="#/about"><i class="bi bi-play-circle me-2"></i>Get to know us</a></div><div class="hero-note"><span class="hero-note-icon"><i class="bi bi-compass" aria-hidden="true"></i></span><span><strong>Start with a place.</strong><br>Then shape a route that fits you.</span></div></div></section>
  <div class="container hero-search-wrap"><form class="hero-search" id="tripSearch"><div class="search-field"><i class="bi bi-compass"></i><div class="w-100"><label for="searchDestination">Where to?</label><select id="searchDestination" name="destination"><option value="">All destinations</option>${destinations.map(d => `<option value="${d.slug}">${d.title}</option>`).join("")}</select></div></div><div class="search-field"><i class="bi bi-calendar3"></i><div class="w-100"><label for="searchMonth">When?</label><select id="searchMonth" name="season"><option value="">Any time</option><option value="oct-dec">October – December</option><option value="jan-mar">January – March</option><option value="apr-jun">April – June</option></select></div></div><div class="search-field"><i class="bi bi-people"></i><div class="w-100"><label for="searchStyle">Travel style</label><select id="searchStyle" name="style"><option value="">Any style</option><option value="Trekking">Trekking</option><option value="Weekend escape">Weekend escape</option><option value="Culture &amp; nature">Culture &amp; nature</option></select></div></div><button class="btn btn-primary-navy" type="submit">Find a journey <i class="bi bi-arrow-right ms-2"></i></button></form></div>
  <section class="section"><div class="container"><div class="section-heading-row">${sectionHeading("Somewhere wonderful", "Find your kind of wild", "From high Himalayan ridgelines to tea-scented hill towns, there's a place that will feel like yours.")}<a class="text-link" href="#/destinations">All destinations <i class="bi bi-arrow-right"></i></a></div><div class="region-row row g-3">${destinations.slice(0, 4).map(d => `<div class="col-6 col-lg-3"><a class="region-card" href="#/destination/${d.slug}">${image(d.image, d.title)}<div class="region-card-content"><span class="small">${d.sub}</span><h3>${d.title}</h3></div><i class="bi bi-arrow-up-right region-card-arrow"></i></a></div>`).join("")}</div></div></section>
  <section class="section section-soft"><div class="container"><div class="section-heading-row">${sectionHeading("The good stuff", "Journeys worth taking", "Made with local knowledge, generous breathing room and a little room for the unexpected.")}<a class="text-link" href="#/packages">View all trips <i class="bi bi-arrow-right"></i></a></div><div class="row g-4">${trips.slice(0, 3).map(t => `<div class="col-md-6 col-lg-4">${tripCard(t)}</div>`).join("")}</div></div></section>
  <section class="section"><div class="container"><div class="feature-split"><div class="feature-image">${image(photo("photo-1500530855697-b586d89ba3ee", 1000), "A peaceful sunrise over the mountains")}${image(photo("photo-1464822759023-fed622ff2c3b", 500), "A mountain trail at sunrise", "image-inset")}<div class="experience-badge"><strong>10+</strong><span>years outside</span></div></div><div class="feature-copy"><span class="eyebrow">Travel with intention</span><h2>More than a trip.<br>A feeling you take home.</h2><p>We believe the best journeys happen when you slow down, meet the people who call a place home, and leave enough space for wonder.</p><p>Our local trip leaders know the quiet trails, the family-run kitchens and the stories behind the view. We'll take care of the details, so you can be where your feet are.</p><div class="feature-list"><div><i class="bi bi-people"></i> Small, thoughtful groups</div><div><i class="bi bi-heart"></i> Locally rooted experiences</div><div><i class="bi bi-shield-check"></i> Considered trip planning</div><div><i class="bi bi-tree"></i> A lighter footprint</div></div><a class="btn btn-primary-navy" href="#/about">A little about us <i class="bi bi-arrow-up-right ms-2"></i></a></div></div><div class="stats-strip"><div class="stat-item"><strong>2,400+</strong><span>happy trail companions</span></div><div class="stat-item"><strong>38</strong><span>carefully made journeys</span></div><div class="stat-item"><strong>12</strong><span>local communities</span></div><div class="stat-item"><strong>4.9/5</strong><span>traveller love</span></div></div></div></section>
  <section class="story-banner"><div class="container"><div><span class="eyebrow">Made for your kind of curious</span><h2>The mountains are calling.<br>Let's make a plan.</h2><p>Tell us what you have in mind. We'll help you find your way there.</p></div><a class="btn btn-light" href="#/planner">Plan a trip with us <i class="bi bi-arrow-up-right ms-2"></i></a></div></section>
  <section class="section section-soft"><div class="container"><div class="section-heading-row">${sectionHeading("From the trail", "A few words from the way", "Real people, fresh air and the memories that have a way of following you home.")}<a class="text-link" href="#/reviews">Read all stories <i class="bi bi-arrow-right"></i></a></div><div class="swiper reviews-swiper"><div class="swiper-wrapper">${[["The kind of trip that makes you breathe differently.", "Maya R.", "Sandakphu trail", 5],["Every detail felt considered, but never over-planned.", "Arjun K.", "Sikkim, slowly", 4.5],["We came as strangers and left with a new favourite place.", "Neha & Dev", "Darjeeling weekend", 4.5]].map((r, i) => `<div class="swiper-slide"><article class="review-card">${ratingStars(r[3])}<blockquote>“${r[0]}”</blockquote><div class="review-person">${image(photo(["photo-1534528741775-53994a69daeb","photo-1500648767791-00dcc994a43e","photo-1531123897727-8f129e1688ce"][i], 100), r[1])}<div><strong>${r[1]}</strong><small>${r[2]}</small></div></div></article></div>`).join("")}</div><div class="swiper-pagination mt-4"></div></div></div></section>
  <section class="section"><div class="container"><div class="section-heading-row">${sectionHeading("Notes from the hills", "Stories for the journey", "A little inspiration, local knowledge and practical notes for wherever the trail takes you next.")}<a class="text-link" href="#/blog">Visit the journal <i class="bi bi-arrow-right"></i></a></div><div class="row g-4">${articles.slice(0, 3).map(a => `<div class="col-md-4">${articleCard(a)}</div>`).join("")}</div><div class="newsletter-box mt-5"><div><h3>A good note, now and then.</h3><p>Fresh trail stories and thoughtful trip ideas. No noise, just the good stuff.</p></div><form class="newsletter-form" data-message="You're on the list. See you out there!"><input type="email" placeholder="Your email address" aria-label="Your email address" required><button class="btn btn-primary-navy" type="submit">Sign me up</button></form></div></div></section>`;
}
function storyFilmTemplate() {
  return `<div class="story-film-modal" id="storyFilmModal" hidden aria-hidden="true"><div class="story-film-dialog" role="dialog" aria-modal="true" aria-labelledby="storyFilmTitle" tabindex="-1"><button class="story-film-close" type="button" data-film-close aria-label="Close film"><i class="bi bi-x-lg"></i></button><div class="story-film-screen"><img class="story-film-image" data-film-image src="${photo("photo-1486870591958-9b9d0d1dda99", 1600)}" alt="" aria-hidden="true"><div class="story-film-vignette"></div><div class="story-film-brand"><img src="images/logo.svg" alt="TREKKING"><span>A short film about finding your way</span></div><div class="story-film-copy" aria-live="polite"><span class="story-film-kicker" data-film-kicker>THE CALL OF THE HILLS · 01 / 04</span><h2 id="storyFilmTitle" data-film-title>Out there is where you belong.</h2><p data-film-copy>Some journeys begin with a view. The best ones begin with a feeling.</p></div><span class="story-film-location"><i class="bi bi-geo-alt-fill"></i> THE HIMALAYAS, INDIA</span></div><div class="story-film-controls"><button class="story-film-control" type="button" data-film-toggle aria-label="Pause film"><i class="bi bi-pause-fill"></i><span data-film-toggle-label>Pause</span></button><label class="visually-hidden" for="storyFilmProgress">Film progress</label><input id="storyFilmProgress" class="story-film-progress" data-film-progress type="range" min="0" max="100" value="0"><span class="story-film-time" data-film-time>00:00 / 00:24</span><button class="story-film-control story-film-replay" type="button" data-film-replay aria-label="Replay film"><i class="bi bi-arrow-counterclockwise"></i><span>Replay</span></button></div></div></div>`;
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
    { title: "Out there is where you belong.", copy: "Some journeys begin with a view. The best ones begin with a feeling.", label: "THE CALL OF THE HILLS", image: photo("photo-1523712999610-f77fbcfc3843", 1600) },
    { title: "Take the scenic route.", copy: "Follow quiet trails, wake to mountain light, and leave room for the unexpected.", label: "FIND YOUR PACE", image: photo("photo-1473448912268-2022ce9509d8", 1600) },
    { title: "Meet the people who make a place.", copy: "Local stories and warm welcomes turn a beautiful landscape into somewhere you remember.", label: "TRAVEL A LITTLE CLOSER", image: photo("photo-1433086966358-54859d0ed716", 1600) },
    { title: "Come back with more than photos.", copy: "Take home a clearer understanding of the place and the route you travelled.", label: "TREKKING · EXPLORE MORE", image: photo("photo-1501785888041-af3ef285b470", 1600) }
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
  const collectionImage = isWeekend ? "photo-1483728642387-6c3bdd6c93e5" : isTrek ? "photo-1519681393784-d120267933ba" : "photo-1494783367193-149034c05e8f";
  return `${pageHero(title, intro, photo(collectionImage))}<section class="page-content"><div class="container"><div class="filter-bar"><button class="filter-chip active" data-trip-filter="all">All journeys</button><button class="filter-chip" data-trip-filter="Easy">Easy pace</button><button class="filter-chip" data-trip-filter="Moderate">Moderate</button><select class="search-input ms-md-auto" id="tripSort" aria-label="Sort journeys"><option value="featured">Recommended order</option><option value="name">Name: A to Z</option></select></div><div class="row g-4" id="tripGrid">${selected.map(t => `<div class="col-md-6 col-lg-4" data-level="${t.level}" data-title="${t.title.toLowerCase()}">${tripCard(t)}</div>`).join("")}</div>${noResultsMarkup("There are no journeys in this collection yet.", Boolean(selected.length))}</div></section>`;
}
function tripSearchResultsPage() {
  const params = new URLSearchParams(location.search);
  const editSearchLink = `index.html${location.search}#tripSearch`;
  const requestedDestination = params.get("destination");
  const destination = destinations.find(item => item.slug === requestedDestination);
  const seasonLabels = { "oct-dec": "October – December", "jan-mar": "January – March", "apr-jun": "April – June" };
  const requestedSeason = params.get("season");
  const season = seasonLabels[requestedSeason] ? { value: requestedSeason, label: seasonLabels[requestedSeason] } : null;
  const styleOptions = ["Trekking", "Weekend escape", "Culture & nature"];
  const requestedStyle = params.get("style");
  const style = styleOptions.includes(requestedStyle) ? requestedStyle : "";
  const hasInvalidFilter = Boolean((requestedDestination && !destination) || (requestedSeason && !season) || (requestedStyle && !style));
  const matches = hasInvalidFilter ? [] : trips.filter(trip =>
    (!destination || trip.destinations.includes(destination.slug))
    && (!season || trip.seasons.includes(season.value))
    && (!style || trip.styles.includes(style))
  );
  const title = destination ? `Journeys in ${destination.title}` : style ? `${style} journeys` : "Find your next journey";
  const filters = [
    destination ? `<span class="tag">Where: ${destination.title}</span>` : "",
    season ? `<span class="tag">When: ${season.label}</span>` : "",
    style ? `<span class="tag">Style: ${style}</span>` : ""
  ].filter(Boolean).join("");
  const intro = filters ? `Trips matching your selections: ${[destination?.title, season?.label, style].filter(Boolean).join(" · ")}.` : "Explore all of our thoughtfully planned journeys across the Himalayas.";
  const results = matches.length
    ? `<div class="row g-4">${matches.map(trip => `<div class="col-md-6 col-lg-4">${tripCard(trip)}</div>`).join("")}</div>`
    : `${noResultsMarkup("Try another season or travel style to see more options.")}<div class="text-center mt-3"><a class="btn btn-primary-navy" href="${editSearchLink}">Update your search <i class="bi bi-arrow-right ms-2"></i></a></div>`;
  return `${pageHero(title, intro, destination?.image || photo("photo-1494783367193-149034c05e8f"), [{ label: "Tour packages", href: "tour-packages.html" }])}<section class="page-content"><div class="container"><div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4"><div><span class="eyebrow">Your search results</span><h2 class="h3 mt-2 mb-0">${matches.length} ${matches.length === 1 ? "journey" : "journeys"} found</h2></div><a class="btn btn-outline-navy" href="${editSearchLink}">Edit search</a></div>${filters ? `<div class="d-flex flex-wrap gap-2 mb-4" aria-label="Selected search filters">${filters}</div>` : ""}${results}</div></section>`;
}
function destinationDetail(slug) {
  const dest = destinations.find(d => d.slug === slug) || destinations[0];
  const list = trips.filter(trip => trip.destinations.includes(slug));
  const listings = list.length
    ? `<div class="row g-4">${list.map(trip => `<div class="col-md-6 col-lg-4">${tripCard(trip)}</div>`).join("")}</div>`
    : noResultsMarkup(`We don't have a published journey for ${dest.title} just yet. Check back soon.`);
  return `${pageHero(dest.title, `Explore the landscapes, routes, and local character of ${dest.title}, ${dest.sub}. Compare the journeys below and ask about current conditions and plans before you book.`, dest.image, [{ label: "Destinations", href: "#/destinations" }])}<section class="section"><div class="container"><div class="feature-split"><div><span class="eyebrow">A place to find your pace</span><h2>Explore with curiosity.<br>Travel with care.</h2><p>Start by deciding what you want from the journey: a walking route, time in town, a cultural visit, or a mix of all three. The right balance depends on the season and the people travelling with you.</p><p>Use the trips below as a starting point. Confirm route access, accommodation, transport, inclusions, and current pricing with the trip team before making plans.</p><div class="feature-list"><div><i class="bi bi-signpost-split"></i> Compare route styles</div><div><i class="bi bi-cloud-sun"></i> Check conditions before travel</div><div><i class="bi bi-person-walking"></i> Choose a comfortable pace</div><div><i class="bi bi-chat-dots"></i> Ask for current trip details</div></div><a class="btn btn-primary-navy" href="#/planner">Plan a ${dest.title} journey</a></div><div class="feature-image">${image(dest.image, `${dest.title} landscape`)}${image(dest.aboutImage, `A different view of ${dest.title}`, "image-inset")}</div></div></div></section><section class="section section-soft"><div class="container">${sectionHeading("Explore this region", `Journeys in ${dest.title}`, "Review the trip styles below, then ask for the latest dates and inclusions.")}${listings}</div></section>`;
}
function tripDetail(slug) {
  const trip = trips.find(t => t.slug === slug) || trips[0];
  return `${pageHero(trip.title, trip.description, trip.image, [{ label: "Tour packages", href: "#/packages" }])}<section class="section"><div class="container"><div class="row g-5"><div class="col-lg-8"><span class="tag">${trip.category}</span><h2 class="mt-3">The long way is the lovely way.</h2><p>Come experience the hills at a human pace. This thoughtfully planned journey makes room for local stories, easy moments and time to take it all in. Our trip leaders are on hand to make the days feel seamless, while keeping the experience genuinely local.</p><h3 class="mt-4">The journey, at a glance</h3><div class="row g-3 my-2"><div class="col-6 col-md-3"><div class="content-panel"><small>Duration</small><br><strong>${trip.days}</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Pace</small><br><strong>${trip.level}</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Group size</small><br><strong>6–10 people</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Region</small><br><strong>${trip.region}</strong></div></div></div><h3 class="mt-4">A few things to know</h3><ul><li>Local trip leader and thoughtfully planned daily route</li><li>Handpicked stays and select meals, as detailed in your confirmation</li><li>Small group setting with time to explore independently</li><li>Trip-specific packing and arrival notes shared before departure</li></ul><div class="accordion mt-4" id="tripFaq"><div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#tripFaqOne">What should I bring?</button></h3><div id="tripFaqOne" class="accordion-collapse collapse show" data-bs-parent="#tripFaq"><div class="accordion-body small>We send a practical packing list based on the season and route before your trip. Good walking shoes and layers are a great place to start.</div></div></div><div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#tripFaqTwo">Can I join solo?</button></h3><div id="tripFaqTwo" class="accordion-collapse collapse" data-bs-parent="#tripFaq"><div class="accordion-body small">Absolutely. Many travellers join on their own and meet their group along the way.</div></div></div></div></div><div class="col-lg-4"><div class="sidebar-card" style="top:120px"><span class="tag">Small groups</span><h3 class="mt-3">${trip.title}</h3><p class="small">Starting from</p><div class="h3">${trip.price} <small class="fs-6">/ person</small></div><hr><p><i class="bi bi-calendar3 me-2"></i>Next departure: Nov 18, 2026</p><p><i class="bi bi-check-circle me-2"></i>Flexible date options</p><a class="btn btn-primary-navy w-100 mt-2" href="#/booking">Check availability <i class="bi bi-arrow-right ms-2"></i></a><a class="btn btn-outline-navy w-100 mt-2" href="#/contact">Ask us a question</a><small class="d-block mt-3">Trip details and terms confirmed before booking.</small></div></div></div></div></section>`;
}
function finalizeTripDetail(root, trip) {
  const heading = [...root.querySelectorAll(".col-lg-8 > h3")].find(item => item.textContent.trim() === "The journey, at a glance");
  const summary = heading?.nextElementSibling;
  if (heading && summary) {
    heading.textContent = "Planning details to confirm";
    summary.innerHTML = `<div class="col-6 col-md-3"><div class="content-panel"><small>Trip style</small><br><strong>${trip.category}</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Walking pace</small><br><strong>${trip.level}</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Region</small><br><strong>${trip.region}</strong></div></div><div class="col-6 col-md-3"><div class="content-panel"><small>Dates and price</small><br><strong>Confirm by enquiry</strong></div></div>`;
  }
  const details = root.querySelector(".col-lg-8 > ul");
  if (details) details.innerHTML = "<li>Confirm the route, walking effort, and current access conditions.</li><li>Ask which transport, accommodation, meals, and permits are included.</li><li>Share mobility, dietary, or equipment needs before making arrangements.</li><li>Request current dates, inclusions, and pricing in writing.</li>";
  const intro = root.querySelector(".col-lg-8 > h2 + p");
  if (intro) intro.textContent = "Use this outline as a starting point for your enquiry. The exact route, travel dates, transport, accommodation, and inclusions should be confirmed for your plans.";
  const faq = root.querySelector("#tripFaq");
  if (faq) faq.outerHTML = `<section class="content-panel mt-4"><h3 class="h5">Before you confirm</h3><p class="mb-0">Request the current itinerary, route effort, accessibility details, accommodation, transport, inclusions, and total price in writing. Conditions and availability can change.</p></section>`;
  const aside = root.querySelector(".col-lg-4");
  if (aside) aside.innerHTML = `<div class="content-panel"><span class="tag">${trip.category}</span><h2 class="h4 mt-3">Details to request</h2><ul class="mb-4"><li>Current dates and route access</li><li>Written inclusions and total price</li><li>Transport, accommodation, and meal details</li><li>Walking effort and accessibility information</li></ul><p class="small">This website does not make bookings or take payments.</p><a class="btn btn-primary-navy w-100" href="contact.html">Prepare an enquiry</a></div>`;
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
  if (question.includes("book")) return "Use a trip page to compare route ideas, then request the current itinerary, inclusions, and total price in writing. This site does not submit bookings.";
  if (question.includes("myself")) return "Solo participation depends on the specific departure and its arrangements. Ask the trip provider about availability, rooming, and any single-occupancy cost before booking.";
  if (question.includes("confirmed")) return "A booking is not confirmed through this website. Treat it as confirmed only after you receive written confirmation directly from the service provider.";
  if (question.includes("pay") || question.includes("due")) return "This website does not process payments. Request a written quote and verify the provider and payment instructions independently before sending money.";
  if (question.includes("cancel") || question.includes("dates")) return "Cancellation terms and date changes depend on the provider and trip. Read the written terms before paying and keep a copy of the confirmation.";
  if (question.includes("experience") || question.includes("fit")) return "Compare the walking grade with your recent experience, ask about terrain and daily effort, and share any health or mobility needs before committing.";
  if (question.includes("accommodation")) return "Accommodation differs by route. Ask which stays, room arrangements, meals, and accessibility features are included in the written itinerary.";
  return "Weather, access, and local guidance can change. Confirm the latest route conditions with the provider shortly before travel and follow local safety advice.";
}
function contactPage() {
  return `${pageHero("Let's talk about the trip", "A question, an idea or just not sure where to start? Send a note for the TREKKING team to review.", photo("photo-1470770841072-f978cf4d019e"))}<section class="page-content"><div class="container"><div class="row g-5"><div class="col-lg-5"><span class="eyebrow">Say hello</span><h2 class="mt-3">We're good listeners.</h2><p class="mt-3">Share what you're dreaming about. We'll help you figure out the rest, one thoughtful step at a time.</p><div class="sidebar-card mt-4"><h3>Reach our team</h3><p><i class="bi bi-telephone me-2"></i><a href="tel:+911234567890">+91 12345 67890</a></p><p><i class="bi bi-envelope me-2"></i><a href="mailto:hello@trekking.example">hello@trekking.example</a></p><p><i class="bi bi-whatsapp me-2"></i>WhatsApp: +91 12345 67890</p><p><i class="bi bi-geo-alt me-2"></i>Office address — add your business address</p><small>Replace contact placeholders with your verified business details.</small></div></div><div class="col-lg-7"><form class="content-panel" data-message="Thanks for reaching out. We'll be in touch soon."><div class="row g-3"><div class="col-md-6"><label class="form-label" for="contactName">Your name</label><input id="contactName" class="form-control" required autocomplete="name" placeholder="Name"></div><div class="col-md-6"><label class="form-label" for="contactEmail">Email address</label><input id="contactEmail" class="form-control" type="email" required autocomplete="email" placeholder="you@example.com"></div><div class="col-md-6"><label class="form-label" for="contactPhone">Phone (optional)</label><input id="contactPhone" class="form-control" type="tel" autocomplete="tel" placeholder="+91"></div><div class="col-md-6"><label class="form-label" for="contactInterest">What are you interested in?</label><select id="contactInterest" class="form-select"><option>Help me choose</option><option>Trekking</option><option>Weekend trip</option><option>Custom journey</option><option>Existing booking</option></select></div><div class="col-12"><label class="form-label" for="contactMessage">Your message</label><textarea id="contactMessage" class="form-control" rows="5" required placeholder="Tell us what you have in mind..."></textarea></div><div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="privacyAgree" required><label class="form-check-label small" for="privacyAgree">I agree to the <a href="#/legal/privacy">Privacy Policy</a> and consent to being contacted about this enquiry.</label></div></div><div class="col-12"><button class="btn btn-primary-navy" type="submit">Send your note <i class="bi bi-arrow-up-right ms-2"></i></button><p class="form-hint small mt-3 mb-0">Your message is saved on this server for team review. No email notification is sent.</p></div></div></form></div></div></div></section>`;
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
  return `${pageHero("Your trip, your way", "A good journey starts with a conversation. Tell us what matters to you and we'll help shape the right kind of escape.", photo("photo-1464822759023-fed622ff2c3b"))}<section class="page-content"><div class="container"><div class="trip-planner content-panel"><div class="step-indicator"><span class="active"></span><span></span><span></span></div><h2 class="h3">Let's start with the big picture.</h2><p class="small mb-4">No need to have it all figured out. This is just a helpful starting point.</p><form id="plannerForm"><div class="row g-3"><div class="col-md-6"><label for="plannerPlace" class="form-label">Where would you love to go?</label><select class="form-select" id="plannerPlace" required><option value="">Choose a place</option>${destinations.map(d => `<option>${d.title}</option>`).join("")}<option>Open to ideas</option></select></div><div class="col-md-6"><label for="plannerStyle" class="form-label">What feels like your kind of trip?</label><select class="form-select" id="plannerStyle" required><option value="">Choose a travel style</option><option>Trekking & walking</option><option>Culture & nature</option><option>Weekend escape</option><option>A bit of everything</option></select></div><div class="col-md-6"><label for="plannerDates" class="form-label">When are you thinking?</label><input class="form-control" id="plannerDates" placeholder="A month or rough dates"></div><div class="col-md-6"><label for="plannerPeople" class="form-label">How many people?</label><select class="form-select" id="plannerPeople"><option>Just me</option><option>2 people</option><option>3–5 people</option><option>6+ people</option></select></div><div class="col-12"><label for="plannerDream" class="form-label">Anything else we should know?</label><textarea class="form-control" id="plannerDream" rows="3" placeholder="A pace you love, a special occasion, a place you've always wanted to see..."></textarea></div><div class="col-md-6"><label for="plannerEmail" class="form-label">Your email</label><input type="email" class="form-control" id="plannerEmail" required placeholder="you@example.com"></div><div class="col-md-6"><label for="plannerName" class="form-label">Your name</label><input class="form-control" id="plannerName" required placeholder="Name"></div><div class="col-12 mt-3"><div class="alert alert-light border small mb-3">Submitting saves a trip enquiry for the TREKKING team. This is not a booking confirmation.</div><button class="btn btn-primary-navy" type="submit">Start the conversation <i class="bi bi-arrow-right ms-2"></i></button></div></div></form></div></div></section>`;
}
function bookingPage() {
  return `${pageHero("A few details, then the daydreaming", "Send us your booking request. We'll check availability and confirm the trip details with you before anything is final.", photo("photo-1470770841072-f978cf4d019e"))}<section class="page-content"><div class="container"><div class="row g-5"><div class="col-lg-7"><form class="content-panel" id="bookingForm"><h2 class="h3 mb-4">Booking details</h2><div class="row g-3"><div class="col-12"><label class="form-label" for="bookingTrip">Choose a journey</label><select class="form-select" id="bookingTrip" required>${trips.map(t => `<option value="${t.slug}">${t.title}</option>`).join("")}</select></div><div class="col-md-6"><label class="form-label" for="bookingName">Full name</label><input class="form-control" id="bookingName" required autocomplete="name"></div><div class="col-md-6"><label class="form-label" for="bookingEmail">Email address</label><input class="form-control" id="bookingEmail" required type="email" autocomplete="email"></div><div class="col-md-6"><label class="form-label" for="bookingDate">Preferred departure</label><select class="form-select" id="bookingDate"><option>Nov 18, 2026</option><option>Dec 09, 2026</option><option>Jan 20, 2027</option><option>Flexible dates</option></select></div><div class="col-md-6"><label class="form-label" for="bookingGuests">Travellers</label><select class="form-select" id="bookingGuests"><option>1 traveller</option><option>2 travellers</option><option>3 travellers</option><option>4+ travellers</option></select></div><div class="col-12"><label class="form-label" for="bookingNotes">Anything we should know?</label><textarea class="form-control" id="bookingNotes" rows="3"></textarea></div><div class="col-12"><button class="btn btn-primary-navy" type="submit">Request to book <i class="bi bi-arrow-right ms-2"></i></button><p class="small mt-3 mb-0">Your request will be saved for the trip team. It is not confirmed until availability and payment terms are agreed.</p></div></div></form></div><aside class="col-lg-5"><div class="sidebar-card"><h3>What happens next?</h3><p>1. We check availability for your preferred departure.</p><p>2. We send confirmed trip details, inclusions and terms.</p><p>3. Your booking is final only after you confirm and complete the agreed payment.</p><a href="#/legal/cancellation">Read cancellation information <i class="bi bi-arrow-right"></i></a></div></aside></div></div></section>`;
}
function departuresPage() {
  return `${pageHero("Good days to get outside", "Find an upcoming group departure, or talk with us about dates that work better for you.", photo("photo-1464822759023-fed622ff2c3b"))}<section class="page-content"><div class="container"><div class="content-panel">${[["Sandakphu: the trail above the clouds","Nov 18 – Nov 24, 2026","7 days","₹18,500"],["Sikkim, slowly","Dec 09 – Dec 14, 2026","6 days","₹24,900"],["A little further into the hills","Jan 15 – Jan 17, 2027","3 days","₹6,400"],["Himachal beyond the postcards","Jan 20 – Jan 24, 2027","5 days","₹21,000"]].map((d,i)=>`<div class="departure-row"><div><strong>${d[0]}</strong><small>${d[1]}</small></div><div><small>Length</small>${d[2]}</div><div><small>From</small><span class="price">${d[3]}</span></div><div><span class="status-pill">${i === 0 ? "4 spots left" : "Open"}</span></div><a class="btn btn-outline-navy btn-sm" href="#/booking">Details</a></div>`).join("")}</div></div></section>`;
}
function reviewsPage() {
  return `${pageHero("Customer reviews", "Example reviews from a public trekking company profile. These are demo content and are not reviews of this website or its India journeys.", photo("photo-1500530855697-b586d89ba3ee"))}${customerReviewsSection(false)}`;
}
function galleryPage() {
  const gallery = ["photo-1464822759023-fed622ff2c3b","photo-1500530855697-b586d89ba3ee","photo-1470770841072-f978cf4d019e","photo-1500534623283-312aade485b7","photo-1472396961693-142e6e269027","photo-1551632811-561732d1e306","photo-1470252649378-9c29740c9fa8","photo-1500530855697-b586d89ba3ee","photo-1464822759023-fed622ff2c3b","photo-1470770841072-f978cf4d019e","photo-1500534623283-312aade485b7"];
  return `${pageHero("A little window to the mountains", "A collection of moments, landscapes and little pauses from the places we love.", photo("photo-1500530855697-b586d89ba3ee"))}<section class="page-content"><div class="container"><div class="photo-grid">${gallery.map((p,i)=>image(photo(p,800), `Mountain travel moment ${i+1}`)).join("")}</div><p class="small text-muted mt-3">Photography shown for design preview. Add your own licensed trip photography before launch.</p></div></section>`;
}
function aboutPage() {
  return `${pageHero("Travel should feel like something.", "We're a small team of curious people who believe the best journeys start with listening — to a place, to its people, and to what you need from a little time away.", photo("photo-1470770841072-f978cf4d019e"))}<section class="section"><div class="container"><div class="feature-split"><div class="feature-image">${image(photo("photo-1500530855697-b586d89ba3ee", 1000), "A sunrise in the hills")}${image(photo("photo-1551632811-561732d1e306", 500), "Walking together", "image-inset")}</div><div class="feature-copy"><span class="eyebrow">A different kind of journey</span><h2>Less checklist.<br>More connection.</h2><p>TREKKING began with a simple idea: travel can bring you closer to the places you visit when the people who know them best help show the way.</p><p>Today, we work with local trip leaders and small community partners to create unhurried journeys through the Himalayas. We sweat the details so there's room for the moments that can't be planned.</p><div class="feature-list"><div><i class="bi bi-person-heart"></i> People before itineraries</div><div><i class="bi bi-signpost-split"></i> Curiosity over checklists</div><div><i class="bi bi-tree"></i> Respect for local places</div><div><i class="bi bi-chat-heart"></i> Thoughtful from hello to home</div></div><a class="btn btn-primary-navy" href="#/packages">Come find your journey</a></div></div></div></section><section class="section section-soft"><div class="container">${sectionHeading("What matters to us", "Good travel is a relationship", "A place is never a backdrop. We're guests in somebody else's home, and we want every journey to feel mindful of that.", true)}<div class="row g-4"><div class="col-md-4"><div class="content-panel h-100"><i class="bi bi-people fs-3 text-primary"></i><h3 class="h5 mt-3">Go local</h3><p class="small mb-0">Work with local guides and hosts who bring real knowledge and warmth to every journey.</p></div></div><div class="col-md-4"><div class="content-panel h-100"><i class="bi bi-hourglass-split fs-3 text-primary"></i><h3 class="h5 mt-3">Make room</h3><p class="small mb-0">Keep groups small and days unhurried, with the space to listen, wander and be present.</p></div></div><div class="col-md-4"><div class="content-panel h-100"><i class="bi bi-heart fs-3 text-primary"></i><h3 class="h5 mt-3">Travel thoughtfully</h3><p class="small mb-0">Ask better questions about impact and keep learning how to show up well in the places we visit.</p></div></div></div></div></section>`;
}
function customerReviewsSection(home = false) {
  const visibleReviews = home ? customerReviews.slice(0, 3) : customerReviews;
  const cards = visibleReviews.map(review => {
    const avatar = image(review.image, "Illustrated sample profile avatar", "review-avatar-image");
    return `<div class="col-md-6 col-lg-4"><article class="review-card">${ratingStars(review.rating, 5, "Sample rating") }<p class="review-summary">${review.summary}</p><div class="review-person">${avatar}<div><strong>${review.name}</strong><small>${review.journey}</small></div></div><a class="review-source" href="${review.source}" target="_blank" rel="noopener noreferrer">Read on Trustpilot <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i></a></article></div>`;
  }).join("");
  const demoNotice = `<p class="reviews-demo-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Demo content: paraphrased reviews from <a href="https://www.trustpilot.com/review/trekking-alps.com" target="_blank" rel="noopener noreferrer">Trekking Alps on Trustpilot</a>. These sample avatars and scores are illustrative, not the reviewers’ photos or ratings. They are not customers or reviews of this website.</p>`;
  const heading = home
    ? `<div class="section-heading-row">${sectionHeading("Example content", "Customer reviews", "A preview of how traveller feedback can appear on the site.")}<a class="btn btn-outline-navy" href="customer-reviews.html">View more reviews <i class="bi bi-arrow-right ms-2" aria-hidden="true"></i></a></div>`
    : sectionHeading("Example content", "Public trekking reviews", "These reviews belong to Trekking Alps in Italy, not to this India-travel website.", true);
  return `<section class="${home ? "section section-soft" : "page-content"}"><div class="container">${heading}${demoNotice}<div class="row g-4">${cards}</div></div></section>`;
}
function homepageApproachSection() {
  return customerReviewsSection(true);
}
function aboutFieldNotesSection() {
  const notes = [
    { title: "Read the place", copy: "Check local guidance, cultural expectations, and seasonal access before setting out.", image: photo("photo-1501785888041-af3ef285b470", 900), alt: "A mountain lake beneath surrounding peaks" },
    { title: "Choose a fitting pace", copy: "Match the route to your experience, energy, and the time you want to spend along the way.", image: photo("photo-1500534314209-a25ddb2bd429", 900), alt: "A winding trail through open hills" },
    { title: "Leave room for discovery", copy: "A thoughtful itinerary balances preparation with time to notice the small details of a place.", image: photo("photo-1486870591958-9b9d0d1dda99", 900), alt: "A mountain valley viewed from a high trail" }
  ];
  return `<section class="section"><div class="container">${sectionHeading("A field guide to travelling well", "Before, during, and beyond the route", "A few practical principles for making a journey more considered, wherever you go.", true)}<div class="row g-4">${notes.map(note => `<div class="col-md-4"><article class="about-note-card"><img src="${note.image}" alt="${note.alt}" loading="lazy"><div class="about-note-copy"><h3>${note.title}</h3><p>${note.copy}</p></div></article></div>`).join("")}</div></div></section><section class="section section-soft"><div class="container"><div class="about-commitment content-panel"><span class="eyebrow">A clear next step</span><h2 class="h3">Ask questions before you commit.</h2><p class="mb-4">Use the trip planner to describe the route, pace, and dates you have in mind. Confirm current conditions, inclusions, and pricing directly before making arrangements.</p><a class="btn btn-primary-navy" href="trip-planner.html">Plan a journey <i class="bi bi-arrow-right ms-2"></i></a></div></div></section>`;
}
function aboutNotFound() {
  return `${pageHero("A quieter kind of adventure", "Thoughtfully planned journeys through mountain places, made better by the people who call them home.", photo("photo-1464822759023-fed622ff2c3b"))}<section class="page-content"><div class="container"><div class="row g-4">${trips.slice(0,3).map(t=>`<div class="col-md-4">${tripCard(t)}</div>`).join("")}</div></div></section>`;
}
function honestStatusPage(kind) {
  const isPayment = kind === "payment-success" || kind === "payment-failed";
  const heading = kind === "confirmation" ? "Your request is not confirmed" : isPayment ? "Checking payment status…" : "Your message has not been sent";
  const copy = kind === "confirmation"
    ? "A booking request must be submitted from the booking form. Requests are not confirmed until the trip team confirms availability and next steps."
    : isPayment
      ? "We’re checking the payment record with the booking service. This page will only show a successful payment after the server verifies it."
      : "A contact message must be submitted from the contact form.";
  return `<section class="section section-soft"><div class="container text-center py-5"><div class="display-1 text-warning" id="paymentStatusIcon"><i class="bi ${isPayment ? "bi-hourglass-split" : "bi-info-circle"}" aria-hidden="true"></i></div><h1 class="h2 mt-4" id="paymentStatusHeading">${heading}</h1><p class="mx-auto my-3" style="max-width:640px" id="paymentStatusCopy">${copy}</p><p class="small" id="paymentStatusReference" hidden></p><a class="btn btn-primary-navy mt-3" href="index.html">Return home</a> <a class="btn btn-outline-navy mt-3" href="contact.html">View contact options</a></div></section>`;
}
function passwordResetPage() {
  return `<section class="section section-soft"><div class="container py-5"><div class="content-panel mx-auto password-reset-panel"><span class="eyebrow">Account security</span><h1 class="h2 mt-2">Choose a new password</h1><p>Use at least 12 characters. This reset link can only be used once.</p><form id="passwordResetForm"><label class="form-label" for="passwordResetNew">New password</label><input class="form-control" id="passwordResetNew" type="password" autocomplete="new-password" minlength="12" maxlength="128" required><label class="form-label mt-3" for="passwordResetConfirm">Confirm new password</label><input class="form-control" id="passwordResetConfirm" type="password" autocomplete="new-password" minlength="12" maxlength="128" required><button class="btn btn-primary-navy w-100 mt-4" type="submit">Update password</button></form><p class="auth-form-status" id="passwordResetStatus" role="status" aria-live="polite"></p><a class="btn btn-outline-navy mt-2" href="index.html">Return to TREKKING</a></div></div></section>`;
}
function setupPasswordResetForm() {
  const form = document.querySelector("#passwordResetForm");
  if (!form) return;
  enhancePasswordFields(form);
  const status = document.querySelector("#passwordResetStatus");
  const token = new URLSearchParams(location.hash.slice(1)).get("token") || "";
  if (!token) {
    form.hidden = true;
    status.textContent = "This reset link is incomplete. Request a new password reset from the sign-in window.";
    return;
  }
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const password = form.querySelector("#passwordResetNew").value;
    const confirm = form.querySelector("#passwordResetConfirm").value;
    if (password !== confirm) {
      status.textContent = "Those passwords don’t match. Please check them and try again.";
      form.querySelector("#passwordResetConfirm").focus();
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = "Updating your password…";
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your password could not be updated.");
      form.hidden = true;
      status.textContent = result.message;
      history.replaceState(null, "", location.pathname);
    } catch (error) {
      status.textContent = error.message || "Your password could not be updated.";
    } finally {
      button.disabled = false;
    }
  });
}
async function resolvePaymentStatus(kind) {
  const reference = new URLSearchParams(location.search).get("ref");
  const heading = document.querySelector("#paymentStatusHeading");
  const copy = document.querySelector("#paymentStatusCopy");
  const icon = document.querySelector("#paymentStatusIcon");
  const referenceLine = document.querySelector("#paymentStatusReference");
  if (!heading || !copy || !icon) return;
  if (!reference) {
    heading.textContent = "Payment not verified";
    copy.textContent = "No booking reference was provided, so the site cannot confirm a payment. Check your booking email or contact the trip team.";
    icon.innerHTML = '<i class="bi bi-exclamation-circle" aria-hidden="true"></i>';
    return;
  }
  try {
    const response = await fetch(`/api/bookings/${encodeURIComponent(reference)}`, { cache: "no-store" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Booking not found.");
    referenceLine.hidden = false;
    referenceLine.textContent = `Booking reference: ${result.reference}`;
    if (result.paymentStatus === "paid") {
      heading.textContent = "Deposit received";
      copy.textContent = `Your payment has been verified for ${result.trip}. The trip request still needs availability and itinerary confirmation from the TREKKING team.`;
      icon.className = "display-1 text-success";
      icon.innerHTML = '<i class="bi bi-check-circle" aria-hidden="true"></i>';
    } else {
      heading.textContent = kind === "payment-failed" ? "Payment not completed" : "Payment not verified";
      copy.textContent = "No successful payment is recorded for this booking request. You can return to booking or contact the trip team for help.";
      icon.className = "display-1 text-warning";
      icon.innerHTML = '<i class="bi bi-exclamation-circle" aria-hidden="true"></i>';
    }
  } catch {
    heading.textContent = "Payment not verified";
    copy.textContent = "We could not find a verified payment for this reference. Please contact the trip team before trying again.";
    icon.className = "display-1 text-warning";
    icon.innerHTML = '<i class="bi bi-exclamation-circle" aria-hidden="true"></i>';
  }
}
function currentDeparturesPage() {
  return `${pageHero("Explore current journey options", "Live departure dates and availability are not published here. Review the routes below, then confirm dates, conditions, inclusions, and pricing before booking.", photo("photo-1483728642387-6c3bdd6c93e5"))}<section class="page-content"><div class="container"><div class="content-panel mb-4"><h2 class="h4">Availability is confirmed by enquiry</h2><p class="mb-0">Mountain access and travel arrangements can change with conditions. Ask for a current itinerary and written quote for the dates you have in mind.</p></div><div class="row g-4">${trips.map(trip => `<div class="col-md-6 col-lg-4">${tripCard(trip)}</div>`).join("")}</div></div></section>`;
}
function journeyFeedbackPage() {
  const topics = [
    ["Route and pace", "Describe the route you chose, how the walking effort felt, and what you would tell someone considering it."],
    ["Planning information", "Share which details were clear before departure and what you needed to confirm with the trip team."],
    ["Local context", "Reflect on the places, conversations, and customs that shaped your understanding of the region."]
  ];
  return `${pageHero("A thoughtful guide to sharing trip feedback", "Useful reviews help future travellers ask better questions. Keep feedback specific, fair, and grounded in your own experience.", photo("photo-1470071459604-3b5ec3a7fe05"))}<section class="page-content"><div class="container"><div class="row g-4">${topics.map(([title, copy]) => `<div class="col-md-4"><article class="content-panel h-100"><span class="eyebrow">A useful review</span><h2 class="h4 mt-3">${title}</h2><p class="mb-0">${copy}</p></article></div>`).join("")}</div><div class="content-panel mt-4"><h2 class="h4">Sharing feedback</h2><p class="mb-0">There is no review submission service connected to this page. Do not enter personal or booking information here.</p></div></div></section>`;
}
function distinctGalleryPage() {
  const images = [
    ["images/sandakphu-ridge.jpg", "Mountain ridge at Sandakphu, West Bengal"],
    ["images/sandakphu-snow.jpg", "Snow at Sandakphu in the Singalila range"],
    ["images/sandakphu-tonglu-hut.jpg", "Trekker hut at Tonglu on the Sandakphu route"],
    ["images/darjeeling-teascape.jpg", "Tea covered hills in Darjeeling"],
    ["images/darjeeling-tea-garden.jpg", "Darjeeling tea plantation"],
    ["images/darjeeling-kanchenjunga.jpg", "Kanchenjunga viewed from Darjeeling"],
    ["images/sikkim-tsomgo-mist.jpg", "Tsomgo Lake in Sikkim"],
    ["images/sikkim-tsomgo.jpg", "Tsomgo Lake in East Sikkim"],
    ["images/sikkim-enchey-monastery.jpg", "Enchey Monastery in Gangtok, Sikkim"],
    ["images/sikkim-rumtek-monastery.jpg", "Rumtek Monastery in Sikkim"],
    ["images/kashmir-dal-lake.jpg", "Dal Lake in Srinagar, Kashmir"],
    ["images/kashmir-baisaran.jpg", "Baisaran Valley near Pahalgam, Kashmir"],
    ["images/kashmir-pahalgam-trail.jpg", "Walking trail in Pahalgam, Kashmir"],
    ["images/himachal-barshaini.jpg", "Parvati Valley near Barshaini, Himachal Pradesh"],
    ["images/himachal-baspa-valley.jpg", "Baspa Valley in Sangla, Himachal Pradesh"],
    ["images/himachal-spiti-river.jpg", "Spiti River in Himachal Pradesh"],
    ["images/himachal-key-monastery.jpg", "Key Monastery in Spiti Valley"],
    ["images/himachal-manali-mountains.jpg", "Mountains near Manali, Himachal Pradesh"]
  ];
  return `${pageHero("Landscapes along the way", "A visual field guide to ridgelines, forest paths, water, and the changing light of the hills.", photo("photo-1494783367193-149034c05e8f"))}<section class="page-content"><div class="container"><div class="photo-grid">${images.map(([src, alt], index) => {
    return `<button class="gallery-photo" type="button" data-gallery-index="${index}" aria-label="View image ${index + 1}: ${alt}" ${index >= 11 ? "hidden" : ""}>${image(photo(src), alt)}</button>`;
  }).join("")}</div><div class="gallery-load-more-wrap"><button class="btn btn-outline-navy" type="button" data-gallery-load-more>Load more photos <i class="bi bi-arrow-down ms-2" aria-hidden="true"></i></button></div></div></section><div class="gallery-lightbox" id="galleryLightbox" hidden aria-hidden="true"><div class="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Image viewer" tabindex="-1"><button class="gallery-lightbox-close" type="button" data-gallery-close aria-label="Close image viewer"><i class="bi bi-x-lg" aria-hidden="true"></i></button><button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" data-gallery-prev aria-label="Previous image"><i class="bi bi-chevron-left" aria-hidden="true"></i></button><figure class="gallery-lightbox-figure"><img data-gallery-image alt=""><figcaption><span data-gallery-caption></span><small data-gallery-count></small></figcaption></figure><button class="gallery-lightbox-nav gallery-lightbox-next" type="button" data-gallery-next aria-label="Next image"><i class="bi bi-chevron-right" aria-hidden="true"></i></button></div></div>`;
}
function setupGalleryLightbox(root) {
  const modal = root.querySelector("#galleryLightbox");
  const thumbs = [...root.querySelectorAll("[data-gallery-index]")];
  if (!modal || !thumbs.length) return;
  const loadMore = root.querySelector("[data-gallery-load-more]");
  loadMore?.addEventListener("click", () => {
    const hiddenThumbs = thumbs.filter(thumb => thumb.hidden);
    hiddenThumbs.slice(0, 6).forEach(thumb => { thumb.hidden = false; });
    if (!thumbs.some(thumb => thumb.hidden)) loadMore.hidden = true;
  });
  const imageEl = modal.querySelector("[data-gallery-image]");
  const caption = modal.querySelector("[data-gallery-caption]");
  const count = modal.querySelector("[data-gallery-count]");
  let current = 0;
  let returnFocus = null;
  const show = index => {
    current = (index + thumbs.length) % thumbs.length;
    const thumb = thumbs[current].querySelector("img");
    imageEl.src = thumb.src.replace(/w=800/, "w=1800");
    imageEl.alt = thumb.alt;
    caption.textContent = thumb.alt;
    count.textContent = `${current + 1} / ${thumbs.length}`;
  };
  const close = () => {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gallery-lightbox-open");
    returnFocus?.focus();
  };
  thumbs.forEach((button, index) => button.addEventListener("click", () => {
    returnFocus = button;
    show(index);
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-lightbox-open");
    modal.querySelector("[data-gallery-close]").focus();
  }));
  modal.addEventListener("click", event => {
    if (event.target === modal || event.target.closest("[data-gallery-close]")) close();
    else if (event.target.closest("[data-gallery-prev]")) show(current - 1);
    else if (event.target.closest("[data-gallery-next]")) show(current + 1);
  });
  modal.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
    if (event.key === "Tab") {
      const focusable = [...modal.querySelectorAll("button:not([disabled])")];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
}
function route() {
  const path = main.dataset.staticPage || (location.hash === "#tripSearch" ? "" : location.hash.replace(/^#\/?/, "").split("?")[0].replace(/\/$/, ""));
  const parts = path.split("/");
  let html;
  let title = "TREKKING — Explore More. Experience Life.";
  let description = "Thoughtful journeys and mountain adventures across India.";
  if (!path) html = homePage();
  else if (["destinations", "packages", "trekking", "weekend-trips"].includes(path)) html = collectionPage(path);
  else if (path === "trip-results") html = tripSearchResultsPage();
  else if (path === "trip-detail") {
    const selectedTrip = trips.find(trip => trip.slug === new URLSearchParams(location.search).get("trip"));
    html = selectedTrip ? tripDetail(selectedTrip.slug) : `${pageHero("Trip not found", "This journey is no longer available. Browse our current trips to find another route.")}<section class="page-content"><div class="container">${noResultsMarkup("Browse the current trip collection to find a journey that suits you.")}<div class="text-center mt-3"><a class="btn btn-primary-navy" href="tour-packages.html">Browse all journeys</a></div></div></section>`;
  }
  else if (parts[0] === "destination") html = destinationDetail(parts[1]);
  else if (parts[0] === "trip") html = tripDetail(parts[1]);
  else if (path === "about") html = aboutPage();
  else if (path === "contact") html = contactPage();
  else if (path === "planner") html = plannerPage();
  else if (path === "booking") html = bookingPage();
  else if (path === "confirmation" || path === "payment-success" || path === "payment-failed" || path === "payment") html = honestStatusPage(path === "payment" ? "confirmation" : path);
  else if (path === "reset-password") html = passwordResetPage();
  else if (path === "departures") html = currentDeparturesPage();
  else if (path === "reviews") html = reviewsPage();
  else if (path === "gallery") html = distinctGalleryPage();
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
  if (path === "payment-success" || path === "payment-failed") resolvePaymentStatus(path);
  const detailTripSlug = path.startsWith("trip/") ? parts[1] : path === "trip-detail" ? new URLSearchParams(location.search).get("trip") : "";
  const detailTrip = trips.find(trip => trip.slug === detailTripSlug);
  if (detailTrip) finalizeTripDetail(main, detailTrip);
  if (!path) {
    const heroVideo = main.querySelector(".hero-video");
    if (heroVideo && matchMedia("(prefers-reduced-motion: reduce)").matches) heroVideo.pause();
    const heroNote = main.querySelector(".hero-note");
    if (heroNote) heroNote.innerHTML = `<span class="hero-note-icon"><i class="bi bi-compass" aria-hidden="true"></i></span><span><strong>Start with a place.</strong><br>Then shape a route that fits you.</span>`;
    const featureImages = main.querySelectorAll(".feature-image > img");
    if (featureImages[0]) featureImages[0].src = photo("photo-1500530855697-b586d89ba3ee", 1000);
    if (featureImages[1]) featureImages[1].src = photo("photo-1470252649378-9c29740c9fa8", 500);
    const firstTripImage = main.querySelector(".journey-card-image img");
    if (firstTripImage) firstTripImage.src = photo("photo-1470071459604-3b5ec3a7fe05", 900);
    const approachSection = main.querySelector(".reviews-swiper")?.closest("section");
    if (approachSection) approachSection.outerHTML = homepageApproachSection();
  }
  if (path === "about") main.insertAdjacentHTML("beforeend", aboutFieldNotesSection());
  if (path === "about") {
    const heroCopy = main.querySelector(".page-hero p");
    if (heroCopy) heroCopy.textContent = "A practical guide to exploring the Himalayas with curiosity, preparation, and respect for the places and people along the way.";
    const featureCopy = main.querySelector(".feature-copy");
    if (featureCopy) {
      const paragraphs = featureCopy.querySelectorAll("p");
      if (paragraphs[0]) paragraphs[0].textContent = "A journey begins with questions: what kind of landscape draws you in, how do you like to travel, and what would make the route feel worthwhile?";
      if (paragraphs[1]) paragraphs[1].textContent = "This site brings together routes, planning prompts, and regional context so you can compare options before asking for current details.";
      const featureImage = featureCopy.previousElementSibling?.querySelector("img");
      if (featureImage) featureImage.alt = "Hikers following a mountain trail";
      const principles = featureCopy.querySelector(".feature-list");
      if (principles) principles.innerHTML = `<div><i class="bi bi-signpost-split"></i> Choose routes thoughtfully</div><div><i class="bi bi-chat-dots"></i> Ask clear questions</div><div><i class="bi bi-tree"></i> Respect local places</div><div><i class="bi bi-list-check"></i> Confirm details in writing</div>`;
    }
    const valuesSection = main.querySelector(".section.section-soft");
    if (valuesSection) {
      const values = [
        ["Learn local context", "Read about local customs and ask how visits are arranged before you arrive."],
        ["Choose your pace", "Compare the walking effort with your experience and leave room for rest."],
        ["Travel with care", "Follow local guidance, respect shared spaces, and reduce waste along the route."]
      ];
      valuesSection.querySelector(".section-heading .eyebrow").textContent = "A practical approach";
      valuesSection.querySelector(".section-heading h2").textContent = "Small choices shape a journey";
      valuesSection.querySelector(".section-heading p").textContent = "Use these principles to make better decisions before and during a visit.";
      valuesSection.querySelectorAll(".content-panel h3").forEach((heading, index) => {
        if (values[index]) heading.textContent = values[index][0];
      });
      valuesSection.querySelectorAll(".content-panel p").forEach((copy, index) => {
        if (values[index]) copy.textContent = values[index][1];
      });
    }
  }
  if (path.startsWith("destination/")) {
    const destination = destinations.find(item => item.slug === parts[1]);
    const featureImages = main.querySelectorAll(".feature-image > img");
    if (destination && featureImages[0]) featureImages[0].src = destination.aboutImage;
    if (destination && featureImages[1]) featureImages[1].src = destination.image;
  }
  if (path === "blog") {
    const featuredTitle = main.querySelector(".featured-article h2")?.textContent.trim();
    const duplicateFeature = [...main.querySelectorAll(".article-result")].find(card => card.querySelector("h3")?.textContent.trim() === featuredTitle);
    duplicateFeature?.remove();
  }
  if (path === "blog/article") {
    main.querySelectorAll(".author-card img").forEach(img => img.remove());
    const authors = main.querySelectorAll(".author-card strong");
    if (authors[0]) authors[0].textContent = "TREKKING Journal";
    if (authors[1]) authors[1].textContent = "A note from the editorial desk";
    const authorMeta = main.querySelector(".author-card small");
    if (authorMeta) authorMeta.textContent = articles[0].read;
    const shareUrl = encodeURIComponent(location.href.split("#")[0]);
    const shareLinks = main.querySelectorAll(".share-buttons a");
    if (shareLinks[0]) shareLinks[0].href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    if (shareLinks[1]) shareLinks[1].href = `https://twitter.com/intent/tweet?url=${shareUrl}`;
  }
  if (path === "contact") {
    const intro = main.querySelector(".page-hero p");
    if (intro) intro.textContent = "Send a trip question or planning request. Your message will be saved securely so the team can follow up.";
    const contactPanel = main.querySelector(".sidebar-card");
    if (contactPanel) contactPanel.innerHTML = `<h3>Helpful enquiry details</h3><p>Include the destination you have in mind, your preferred travel window, walking experience, and any access or dietary requirements you want to discuss.</p><p class="mb-0">No email address, phone number, or office location has been provided for this site.</p>`;
  }
  if (path === "faq") {
    const faqIntro = main.querySelector(".page-hero p");
    if (faqIntro) faqIntro.textContent = "Use these planning notes to prepare questions about routes, bookings, payments, and changing mountain conditions.";
    const faqSidebar = main.querySelector(".sidebar-card");
    if (faqSidebar) faqSidebar.innerHTML = `<h3>Need more detail?</h3><p>Use the contact form to draft a question. The form does not send or save messages until a service is connected.</p><a class="btn btn-primary-navy w-100" href="contact.html">Open contact form</a>`;
  }
  if (path === "booking") {
    const bookingIntro = main.querySelector(".page-hero p");
    if (bookingIntro) bookingIntro.textContent = "Send a booking request for the journey and departure you prefer. Your request is saved for follow-up; it is not confirmed until availability and terms are agreed.";
    const dateSelect = main.querySelector("#bookingDate");
    if (dateSelect) {
      const monthInput = document.createElement("input");
      monthInput.className = "form-control";
      monthInput.type = "month";
      monthInput.id = "bookingDate";
      monthInput.setAttribute("aria-label", "Preferred travel month");
      dateSelect.replaceWith(monthInput);
      main.querySelector('label[for="bookingDate"]').textContent = "Preferred travel month";
    }
    const note = main.querySelector("#bookingForm .small");
    if (note) note.textContent = "Your booking request will be stored with a reference number. No trip is confirmed until availability and price are agreed.";
    const submit = main.querySelector('#bookingForm button[type="submit"]');
    if (submit) submit.innerHTML = `Review enquiry <i class="bi bi-arrow-right ms-2"></i>`;
  }
  if (path === "planner") {
    const previewNote = main.querySelector("#plannerForm .alert");
    if (previewNote) previewNote.textContent = "Your trip preferences will be saved securely as an enquiry. Submitting does not confirm a booking.";
  }
  if (path.startsWith("legal/")) {
    main.querySelector(".legal-updated")?.remove();
    const legalContact = main.querySelector("#legal-contact p");
    if (legalContact) legalContact.innerHTML = `Use the <a href="contact.html">contact form</a> to prepare a policy question. This static website has no verified business email or phone number configured.`;
  }
  if (path === "planner") setupPlannerWizard();
  if (path === "gallery") setupGalleryLightbox(main);
  if (!path) {
    main.insertAdjacentHTML("beforeend", storyFilmTemplate());
    storyFilmCleanup = setupStoryFilm();
  }
  const homepageStats = main.querySelector(".stats-strip");
  if (homepageStats) homepageStats.outerHTML = statsMarkup();
  animateStats(main);
  rewritePageLinks(main);
  setupSectionNavigation(main);
  if (path === "blog") blogPaginationCleanup = setupBlogPagination(main);
  if (path === "faq") main.querySelector(".page-content")?.classList.add("faq-page");
  const cookieForm = document.querySelector("#cookiePreferences");
  if (cookieForm) {
    cookieForm.querySelector("#cookieAnalytics").checked = localStorage.getItem("trekking-cookie-analytics") === "true";
    cookieForm.querySelector("#cookieMarketing").checked = localStorage.getItem("trekking-cookie-marketing") === "true";
  }
  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
  document.querySelector('link[rel="canonical"]').setAttribute("href", new URL(pageFile(path), location.href).href);
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
  footer.querySelector(".footer-socials")?.remove();
  const footerHelp = [...footer.querySelectorAll(".footer-column")].at(-1);
  if (footerHelp) footerHelp.innerHTML = `<h3>Plan with confidence</h3><p>Use the contact form to prepare a question about routes, travel style, or trip planning.</p><a href="#/contact">Open the contact form</a><a href="#/faq">Read the trip planning guide</a><button class="auth-open-button" type="button" data-open-auth>Sign in or create an account</button>`;
  rewritePageLinks(footer);
  updateActiveNavigation(path);
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
  if (!path && location.hash === "#tripSearch") {
    const searchForm = main.querySelector("#tripSearch");
    const searchParams = new URLSearchParams(location.search);
    ["destination", "season", "style"].forEach(name => {
      const field = searchForm?.elements.namedItem(name);
      if (field && searchParams.has(name)) field.value = searchParams.get(name);
    });
    requestAnimationFrame(() => searchForm?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }
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
    author: { "@type": "Person", name: articles[0].author },
    publisher: { "@type": "Organization", name: "TREKKING" },
    mainEntityOfPage: location.href.split("#")[0]
  });
  document.head.append(script);
  const crumb = document.createElement("script");
  crumb.type = "application/ld+json";
  crumb.id = "breadcrumb-structured-data";
  crumb.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: new URL("index.html", location.href).href }, { "@type": "ListItem", position: 2, name: "Journal", item: new URL("blog.html", location.href).href }, { "@type": "ListItem", position: 3, name: articles[0].title, item: location.href.split("#")[0] }] });
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
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#fd6003");
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
authPopupController = setupAuthPopup();
setupPasswordResetForm();
document.querySelector(".back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => document.querySelector(".back-to-top").classList.toggle("is-visible", window.scrollY > 500));
async function postLocalRequest(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "The request could not be saved.");
  return result;
}
let razorpayScriptPromise;
async function startRazorpayCheckout(reference) {
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  }
  await razorpayScriptPromise;
  const order = await postLocalRequest("/api/payments/create-order", { reference });
  const checkout = new Razorpay({
    key: order.key,
    amount: order.amount,
    currency: order.currency,
    name: "TREKKING",
    description: `Booking deposit · ${order.trip}`,
    order_id: order.orderId,
    prefill: { name: order.name, email: order.email },
    notes: { booking_reference: reference },
    theme: { color: "#fd6003" },
    handler: async payment => {
      try {
        await postLocalRequest("/api/payments/verify", {
          reference,
          orderId: payment.razorpay_order_id,
          paymentId: payment.razorpay_payment_id,
          signature: payment.razorpay_signature
        });
        location.assign(`payment-success.html?ref=${encodeURIComponent(reference)}`);
      } catch (error) {
        showToast(error.message || "Payment verification is pending. Contact the trip team with your booking reference.");
      }
    },
    modal: { ondismiss: () => showToast("Checkout closed. Your booking request is still saved.") }
  });
  checkout.open();
}
document.addEventListener("submit", async event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.id === "tripSearch") {
    event.preventDefault();
    const params = new URLSearchParams(new FormData(form));
    const search = params.toString();
    location.href = `trip-results.html${search ? `?${search}` : ""}`;
    return;
  }
  if (form.id === "plannerForm") {
    event.preventDefault();
    if (Number(form.dataset.currentStep) < 2) {
      form.querySelector("[data-planner-next]").click();
      return;
    }
    if (!form.reportValidity()) return;
    const submitButton = form.querySelector('button[type="submit"]');
    const message = form.querySelector(".alert");
    submitButton.disabled = true;
    try {
      const result = await postLocalRequest("/api/inquiries/planner", {
        name: form.querySelector("#plannerName").value,
        email: form.querySelector("#plannerEmail").value,
        place: form.querySelector("#plannerPlace").value,
        style: form.querySelector("#plannerStyle").value,
        dates: form.querySelector("#plannerDates").value,
        people: form.querySelector("#plannerPeople").value,
        message: form.querySelector("#plannerDream").value
      });
      if (message) { message.className = "alert alert-success border small mb-3"; message.textContent = `Your trip enquiry is saved. Reference: ${result.reference}. This is not a booking confirmation.`; }
      submitButton.textContent = "Enquiry saved";
    } catch (error) {
      if (message) message.textContent = error.message;
      submitButton.disabled = false;
    }
    return;
  }
  if (form.id === "bookingForm") {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submitButton = form.querySelector('button[type="submit"]');
    const note = form.querySelector(".small");
    submitButton.disabled = true;
    try {
      const result = await postLocalRequest("/api/bookings", {
        name: form.querySelector("#bookingName").value,
        email: form.querySelector("#bookingEmail").value,
        trip: form.querySelector("#bookingTrip").value,
        date: form.querySelector("#bookingDate").value,
        guests: form.querySelector("#bookingGuests").value,
        message: form.querySelector("#bookingNotes").value
      });
      if (note) note.textContent = `Request saved · Reference ${result.reference}. This is not a confirmed booking.`;
      submitButton.textContent = "Request saved";
      const paymentConfig = await fetch(`/api/payments/config?trip=${encodeURIComponent(form.querySelector("#bookingTrip").value)}`).then(response => response.json());
      if (paymentConfig.enabled && note) {
        const payButton = document.createElement("button");
        payButton.className = "btn btn-primary-navy mt-3";
        payButton.type = "button";
        payButton.textContent = `Pay booking deposit · ₹${paymentConfig.amountInr.toLocaleString("en-IN")}`;
        payButton.addEventListener("click", async () => {
          payButton.disabled = true;
          try { await startRazorpayCheckout(result.reference); }
          catch (error) { showToast(error.message || "Checkout could not be started. Your request is still saved."); }
          finally { payButton.disabled = false; }
        });
        note.insertAdjacentElement("afterend", payButton);
      }
    } catch (error) {
      if (note) note.textContent = error.message;
      submitButton.disabled = false;
    }
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
    if (form.querySelector("#contactName")) {
      const submitButton = form.querySelector('button[type="submit"]');
      const note = form.querySelector(".form-hint");
      submitButton.disabled = true;
      try {
        const result = await postLocalRequest("/api/inquiries/contact", {
          name: form.querySelector("#contactName").value,
          email: form.querySelector("#contactEmail").value,
          phone: form.querySelector("#contactPhone").value,
          interest: form.querySelector("#contactInterest").value,
          message: form.querySelector("#contactMessage").value
        });
        if (note) note.textContent = `Your message is saved. Reference: ${result.reference}. Your message is saved in the local enquiries file for team review; no email notification is sent.`;
        submitButton.textContent = "Message saved";
      } catch (error) {
        if (note) note.textContent = error.message;
        submitButton.disabled = false;
      }
    } else {
      showToast("Email signup delivery is not configured yet; your address was not added.");
    }
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
function resetDestinationPreview(menu) {
  if (!menu) return;
  const currentFile = location.pathname.split("/").at(-1);
  const currentDestination = [...menu.querySelectorAll("[data-feature-image]")].find(item =>
    new URL(item.href, location.href).pathname.split("/").at(-1) === currentFile
  ) || menu.querySelector("[data-feature-image].active");
  if (currentDestination) {
    const image = menu.querySelector("[data-destination-feature]");
    const title = menu.querySelector("[data-destination-feature-title]");
    const featureLink = menu.querySelector("[data-destination-feature-link]");
    if (image) {
      image.src = currentDestination.dataset.featureImage;
      image.alt = `${currentDestination.dataset.featureTitle} landscape`;
    }
    if (title) {
      title.replaceChildren(document.createTextNode(currentDestination.dataset.featureTitle));
      const icon = document.createElement("i");
      icon.className = "bi bi-arrow-up-right";
      title.append(icon);
    }
    if (featureLink) featureLink.href = currentDestination.href;
    return;
  }
  const image = menu.querySelector("[data-destination-feature]");
  const title = menu.querySelector("[data-destination-feature-title]");
  const featureLink = menu.querySelector("[data-destination-feature-link]");
  if (image) {
    image.src = image.dataset.defaultImage;
    image.alt = `${title?.dataset.defaultTitle || "Mountain"} landscape`;
  }
  if (title) {
    title.replaceChildren(document.createTextNode(title.dataset.defaultTitle));
    const icon = document.createElement("i");
    icon.className = "bi bi-arrow-up-right";
    title.append(icon);
  }
  if (featureLink) featureLink.href = featureLink.dataset.defaultHref;
}
document.addEventListener("pointerover", updateDestinationPreview);
document.addEventListener("focusin", updateDestinationPreview);
document.addEventListener("pointerout", event => {
  const menu = event.target.closest?.(".mega-menu");
  if (!menu || !event.target.closest("[data-feature-image]")) return;
  if (!event.relatedTarget?.closest?.("[data-feature-image]")) resetDestinationPreview(menu);
});
document.addEventListener("focusout", event => {
  const menu = event.target.closest?.(".mega-menu");
  if (menu && !menu.contains(event.relatedTarget)) resetDestinationPreview(menu);
});
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
    const cards = [...grid.querySelectorAll("[data-level]")];
    cards.forEach(card => card.classList.toggle("d-none", tripFilter.dataset.tripFilter !== "all" && card.dataset.level !== tripFilter.dataset.tripFilter));
    const emptyState = grid.parentElement.querySelector(".no-results-message");
    if (emptyState) emptyState.hidden = cards.some(card => !card.classList.contains("d-none"));
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
    [...grid.children].sort((a, b) => event.target.value === "name" ? a.dataset.title.localeCompare(b.dataset.title) : trips.findIndex(trip => a.textContent.includes(trip.title)) - trips.findIndex(trip => b.textContent.includes(trip.title))).forEach(card => grid.append(card));
  }
});

function initializeAiChat() {
  if (document.querySelector("#aiChatWidget")) return;
  document.body.classList.add("has-ai-chat");
  document.body.insertAdjacentHTML("beforeend", `<div class="ai-chat-widget" id="aiChatWidget"><section class="ai-chat-panel" id="aiChatPanel" role="dialog" aria-label="Ask our AI assistant" aria-modal="false" hidden><header class="ai-chat-header"><span class="ai-chat-avatar"><i class="bi bi-stars" aria-hidden="true"></i></span><div><strong>Ask anything</strong><small>AI travel assistant</small></div><button class="ai-chat-close" type="button" data-ai-chat-close aria-label="Close assistant"><i class="bi bi-x-lg" aria-hidden="true"></i></button></header><div class="ai-chat-messages" data-ai-chat-messages role="log" aria-live="polite" aria-relevant="additions text"><div class="ai-chat-message ai-chat-reply">Hi! Ask me anything. I can help with Himalayan trips, planning, packing, or general questions.</div></div><div class="ai-chat-suggestions" data-ai-chat-suggestions><button type="button" data-ai-prompt="Help me choose a trip">Help me choose a trip</button><button type="button" data-ai-prompt="What should I pack for a Himalayan trek?">Packing tips</button></div><form class="ai-chat-form" data-ai-chat-form><label class="visually-hidden" for="aiChatInput">Your question</label><textarea id="aiChatInput" name="message" rows="1" maxlength="2000" placeholder="Ask me anything…" required></textarea><button type="submit" aria-label="Send message"><i class="bi bi-arrow-up" aria-hidden="true"></i></button></form><p class="ai-chat-status" data-ai-chat-status aria-live="polite"></p></section><button class="ai-chat-toggle" type="button" aria-expanded="false" aria-controls="aiChatPanel" aria-label="Open AI assistant"><i class="bi bi-chat-dots-fill" aria-hidden="true"></i><span>Ask AI</span></button></div>`);

  const widget = document.querySelector("#aiChatWidget");
  const panel = widget.querySelector("#aiChatPanel");
  const toggle = widget.querySelector(".ai-chat-toggle");
  const close = widget.querySelector("[data-ai-chat-close]");
  const form = widget.querySelector("[data-ai-chat-form]");
  const input = widget.querySelector("#aiChatInput");
  const messagesEl = widget.querySelector("[data-ai-chat-messages]");
  const status = widget.querySelector("[data-ai-chat-status]");
  const history = [];

  function setOpen(isOpen) {
    panel.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close AI assistant" : "Open AI assistant");
    if (isOpen) input.focus();
    else toggle.focus();
  }
  function addMessage(role, text, extraClass = "") {
    const bubble = document.createElement("div");
    bubble.className = `ai-chat-message ${role === "user" ? "ai-chat-question" : "ai-chat-reply"} ${extraClass}`.trim();
    bubble.textContent = text;
    messagesEl.append(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  async function ask(question) {
    const text = question.trim();
    if (!text || form.dataset.sending === "true") return;
    history.push({ role: "user", content: text });
    addMessage("user", text);
    widget.querySelector("[data-ai-chat-suggestions]").hidden = true;
    input.value = "";
    input.style.height = "auto";
    form.dataset.sending = "true";
    form.querySelector("button[type=submit]").disabled = true;
    status.textContent = "Thinking…";
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });
      let result;
      try { result = await response.json(); } catch { throw new Error("Chat server not found. Run npm start and open http://localhost:3000 instead of a static preview."); }
      if (!response.ok) throw new Error(result.error || "The assistant is unavailable right now.");
      history.push({ role: "assistant", content: result.answer });
      addMessage("assistant", result.answer);
      status.textContent = "";
    } catch (error) {
      history.pop();
      const errorMessage = error.message || "I couldn’t reach the assistant. Please try again.";
      addMessage("assistant", errorMessage, "ai-chat-error");
      status.textContent = errorMessage;
    } finally {
      form.dataset.sending = "false";
      form.querySelector("button[type=submit]").disabled = false;
      input.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));
  form.addEventListener("submit", event => {
    event.preventDefault();
    ask(input.value);
  });
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
    if (event.key === "Escape") setOpen(false);
  });
  widget.querySelectorAll("[data-ai-prompt]").forEach(button => button.addEventListener("click", () => ask(button.dataset.aiPrompt)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });
}
initializeAiChat();
