/* ============================================================
   KRANCH — Fried Station · Motor de la web
   ============================================================ */

/* ----------------------------------------------------------------
   1) DATOS DEL NEGOCIO (verificados en Google Maps / carta)
   ---------------------------------------------------------------- */
window.SITE = {
  name: "KRANCH",
  phone: "+34624096447",
  phoneDisplay: "624 09 64 47",
  address: "Carrer del Comte d'Altea, 36, L'Eixample, 46005 València",
  mapsLink: "https://www.google.com/maps/place/KRANCH/@39.466467,-0.3665226,17z",
  mapEmbed: "https://www.google.com/maps?q=KRANCH+Carrer+del+Comte+d'Altea+36+Valencia&output=embed",
  reviewsLink: "https://www.google.com/maps/place/KRANCH/@39.466467,-0.3665226,17z",
  instagram: "https://www.instagram.com/kranch34/",
  whatsapp: "34624096447",

  /* Horario semanal. 0=Domingo … 6=Sábado. Minutos desde medianoche.
     [apertura, cierre]. Varios tramos por día. [] = cerrado. */
  schedule: {
    0: [[780, 960], [1200, 1380]],   // Domingo   13–16 · 20–23
    1: [],                           // Lunes     cerrado
    2: [[780, 960], [1200, 1380]],   // Martes    13–16 · 20–23
    3: [[780, 960], [1200, 1440]],   // Miércoles 13–16 · 20–24
    4: [[780, 960], [1200, 1380]],   // Jueves    13–16 · 20–23
    5: [[780, 960], [1200, 1380]],   // Viernes   13–16 · 20–23
    6: [[780, 960], [1200, 1380]]    // Sábado    13–16 · 20–23
  }
};

/* Platos destacados de la portada (imagen + nombre) */
window.FEATURED = [
  { img: "hero-burger.jpg", es: "The Original",        en: "The Original" },
  { img: "slowbeef.jpg",    es: "Slow Beef Fries",     en: "Slow Beef Fries" },
  { img: "truffle.jpg",     es: "Truffle & Parmesan",  en: "Truffle & Parmesan" },
  { img: "boxes.jpg",       es: "Cochinita Fries",     en: "Cochinita Fries" },
  { img: "original.jpg",    es: "Burger & Fries",      en: "Burger & Fries" }
];

/* ----------------------------------------------------------------
   2) IDIOMA / TRADUCCIÓN
   ---------------------------------------------------------------- */
function getLang() { return localStorage.getItem("kranch_lang") || "es"; }

function t(key, vars) {
  var dict = window.I18N[getLang()] || window.I18N.es;
  var str = (dict[key] !== undefined) ? dict[key] : key;
  if (vars) Object.keys(vars).forEach(function (k) { str = str.split("{" + k + "}").join(vars[k]); });
  return str;
}

function setLang(lang) { localStorage.setItem("kranch_lang", lang); applyLang(); }

function applyLang() {
  var lang = getLang();
  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });

  // Strings con variables (rating/reseñas)
  var meta = window.REVIEWS_META || { rating: "", count: "" };
  var ratingStr = String(meta.rating).replace(".", getLang() === "es" ? "," : ".");
  document.querySelectorAll("[data-i18n-meta]").forEach(function (el) {
    el.textContent = t(el.getAttribute("data-i18n-meta"), { rating: ratingStr, count: meta.count });
  });
  document.querySelectorAll(".rb-num").forEach(function (el) { el.textContent = ratingStr; });

  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-lang") === lang);
  });

  if (document.getElementById("menuTabs")) renderMenu();
  if (document.getElementById("featuredGrid")) renderFeatured();
  if (document.getElementById("galleryGrid")) renderGallery();
  if (document.getElementById("reviewsGrid")) renderReviews("reviewsGrid");
  if (document.getElementById("reviewsTeaser")) renderReviews("reviewsTeaser", 2);
  if (document.getElementById("hoursTable")) renderHours();
  updateStatus();
  refreshWhatsApp();
}

/* ----------------------------------------------------------------
   3) PRECIOS
   ---------------------------------------------------------------- */
function formatPrice(item) {
  if (item.price === null || item.price === undefined) return "";
  var lang = getLang();
  var n = Number(item.price);
  var num = lang === "es" ? n.toFixed(2).replace(".", ",") + " €" : "€" + n.toFixed(2);
  if (item.note === "from") return (lang === "es" ? "desde " : "from ") + num;
  return num;
}

/* ----------------------------------------------------------------
   4) ABIERTO / CERRADO (tiempo real)
   ---------------------------------------------------------------- */
function fmtTime(min) {
  min = min % 1440;
  var h = Math.floor(min / 60), m = min % 60;
  return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
}

function computeStatus(now) {
  var sched = window.SITE.schedule;
  var day = now.getDay();
  var mins = now.getHours() * 60 + now.getMinutes();
  var today = sched[day] || [];
  for (var i = 0; i < today.length; i++) {
    if (mins >= today[i][0] && mins < today[i][1]) return { open: true, closeAt: today[i][1] };
  }
  for (var j = 0; j < today.length; j++) {
    if (today[j][0] > mins) return { open: false, dayIndex: day, openMin: today[j][0], daysAhead: 0 };
  }
  for (var d = 1; d <= 7; d++) {
    var idx = (day + d) % 7;
    var ranges = sched[idx] || [];
    if (ranges.length) return { open: false, dayIndex: idx, openMin: ranges[0][0], daysAhead: d };
  }
  return { open: false, dayIndex: null };
}

function statusLabel(s) {
  if (s.open) return { main: t("status.open"), sub: t("status.closesAt", { t: fmtTime(s.closeAt) }), open: true };
  var sub = "";
  if (s.dayIndex === null) sub = "";
  else if (s.daysAhead === 0) sub = t("status.opensToday", { t: fmtTime(s.openMin) });
  else if (s.daysAhead === 1) sub = t("status.opensTomorrow", { t: fmtTime(s.openMin) });
  else {
    var name = t("days." + s.dayIndex);
    if (getLang() === "es") name = name.toLowerCase();
    sub = t("status.opensOn", { day: name, t: fmtTime(s.openMin) });
  }
  return { main: t("status.closed"), sub: sub, open: false };
}

function updateStatus() {
  var el = document.getElementById("openStatus");
  if (!el) return;
  var lbl = statusLabel(computeStatus(new Date()));
  el.classList.toggle("is-open", lbl.open);
  el.classList.toggle("is-closed", !lbl.open);
  var m = el.querySelector(".st-main"), s = el.querySelector(".st-sub");
  if (m) m.textContent = lbl.main;
  if (s) s.textContent = lbl.sub;
}

/* ----------------------------------------------------------------
   5) CARTA POR CATEGORÍAS (pestañas)
   ---------------------------------------------------------------- */
function alBadges(item) {
  if (!item.al || !item.al.length) return "";
  return '<span class="dish-al" title="' + t("menu.allergens.title") + '">' + item.al.join(" · ") + "</span>";
}

function dishRow(it, lang) {
  var price = formatPrice(it);
  var desc = it[lang] && it[lang].desc ? '<p class="dish-desc">' + it[lang].desc + "</p>" : "";
  return '<div class="dish reveal">' +
    '<div class="dish-row">' +
      '<span class="dish-name">' + it[lang].name + alBadges(it) + "</span>" +
      '<span class="dish-dots"></span>' +
      (price ? '<span class="dish-price">' + price + "</span>" : "") +
    "</div>" + desc +
  "</div>";
}

function renderMenu() {
  var lang = getLang();
  var tabs = document.getElementById("menuTabs");
  var panels = document.getElementById("menuPanels");
  if (!tabs || !panels) return;

  var active = panels.getAttribute("data-active") || window.MENU[0].id;

  tabs.innerHTML = window.MENU.map(function (c) {
    return '<button class="cat-tab' + (c.id === active ? " active" : "") + '" data-cat="' + c.id + '">' + c.name[lang] + "</button>";
  }).join("");

  panels.innerHTML = window.MENU.map(function (c) {
    var note = c.note ? '<p class="cat-note">' + c.note[lang] + "</p>" : "";
    var body = "";
    if (c.groups) {
      body = c.groups.map(function (g) {
        var rows = g.items.map(function (it) { return dishRow(it, lang); }).join("");
        return '<div class="menu-group"><h3 class="group-title">' + g.name[lang] + "</h3>" +
          '<div class="dish-list">' + rows + "</div></div>";
      }).join("");
    } else {
      body = '<div class="dish-list">' + c.items.map(function (it) { return dishRow(it, lang); }).join("") + "</div>";
    }
    var chips = "";
    if (c.chips) {
      chips = '<div class="sauce-chips reveal">' + c.chips[lang].map(function (s) {
        return '<span class="sauce-chip">' + s + "</span>";
      }).join("") + "</div>";
    }
    return '<div class="cat-panel' + (c.id === active ? " active" : "") + '" data-panel="' + c.id + '">' +
      '<h2 class="cat-title">' + c.name[lang] + "</h2>" + note + chips + body + "</div>";
  }).join("");

  tabs.querySelectorAll(".cat-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-cat");
      panels.setAttribute("data-active", id);
      tabs.querySelectorAll(".cat-tab").forEach(function (b) { b.classList.toggle("active", b === btn); });
      panels.querySelectorAll(".cat-panel").forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-panel") === id); });
      // centra la pestaña activa
      btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      revealNow(panels);
      var top = document.getElementById("menuTop");
      if (top) window.scrollTo({ top: top.offsetTop - 60, behavior: "smooth" });
    });
  });
  revealNow(panels);
}

/* ----------------------------------------------------------------
   6) DESTACADOS (home) · GALERÍA · RESEÑAS
   ---------------------------------------------------------------- */
function renderFeatured() {
  var grid = document.getElementById("featuredGrid");
  if (!grid) return;
  var lang = getLang();
  grid.innerHTML = window.FEATURED.map(function (it) {
    return '<figure class="fcard">' +
      '<div class="fcard-img" style="background-image:url(assets/' + it.img + ')"></div>' +
      '<figcaption>' + it[lang] + "</figcaption></figure>";
  }).join("");
}

function renderGallery() {
  var grid = document.getElementById("galleryGrid");
  if (!grid) return;
  // Galería: solo imágenes, sin texto sobre ellas.
  grid.innerHTML = window.GALLERY.map(function (img, i) {
    return '<figure class="gal-item reveal" style="--i:' + (i % 3) + '">' +
      '<img src="assets/' + img + '" alt="KRANCH" loading="lazy"></figure>';
  }).join("");
  revealNow(grid);
}

function starRow(n) {
  var s = "";
  for (var i = 0; i < 5; i++) s += '<span class="star' + (i < n ? " on" : "") + '">★</span>';
  return '<span class="stars">' + s + "</span>";
}

function renderReviews(targetId, limit) {
  var grid = document.getElementById(targetId);
  if (!grid || !window.REVIEWS) return;
  var lang = getLang();
  var list = limit ? window.REVIEWS.slice(0, limit) : window.REVIEWS;
  grid.innerHTML = list.map(function (r) {
    var initial = r.author.charAt(0).toUpperCase();
    return '<figure class="rev-card reveal">' +
      '<div class="rev-head">' +
        '<span class="rev-avatar">' + initial + "</span>" +
        '<div><span class="rev-author">' + r.author + "</span>" +
        '<span class="rev-when">' + (r.when[lang] || "") + "</span></div>" +
      "</div>" +
      starRow(r.stars) +
      '<blockquote class="rev-text">' + r.text[lang] + "</blockquote>" +
    "</figure>";
  }).join("");
  revealNow(grid);
}

/* ----------------------------------------------------------------
   7) HORARIO (contacto)
   ---------------------------------------------------------------- */
function renderHours() {
  var box = document.getElementById("hoursTable");
  if (!box) return;
  var order = [1, 2, 3, 4, 5, 6, 0];
  var todayIdx = new Date().getDay();
  box.innerHTML = order.map(function (d) {
    var ranges = window.SITE.schedule[d] || [];
    var val = ranges.length
      ? ranges.map(function (r) { return fmtTime(r[0]) + "–" + fmtTime(r[1]); }).join(" · ")
      : '<span class="hclosed">' + t("common.closed") + "</span>";
    return '<div class="hrow' + (d === todayIdx ? " htoday" : "") + '">' +
      '<span class="hday">' + t("days." + d) + (d === todayIdx ? ' <em>· ' + t("contact.today") + "</em>" : "") + "</span>" +
      '<span class="hval">' + val + "</span></div>";
  }).join("");
}

/* ----------------------------------------------------------------
   8) CONTACTO / WHATSAPP
   ---------------------------------------------------------------- */
function fillContact() {
  var S = window.SITE;
  ["cPhone", "footPhone", "callBtn"].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = S.phoneDisplay;
    el.setAttribute("href", "tel:" + S.phone);
  });
  var addr = document.getElementById("cAddress");
  if (addr) { addr.textContent = S.address; addr.setAttribute("href", S.mapsLink); }
  var ig = document.getElementById("soc-ig");
  if (ig) { if (S.instagram) { ig.style.display = ""; ig.setAttribute("href", S.instagram); } else ig.style.display = "none"; }
  var rl = document.getElementById("reviewsLink");
  if (rl) rl.setAttribute("href", S.reviewsLink);
  var rl2 = document.getElementById("reviewsLink2");
  if (rl2) rl2.setAttribute("href", S.reviewsLink);
  refreshWhatsApp();
}

function refreshWhatsApp() {
  var wa = document.getElementById("waFab");
  if (!wa) return;
  if (window.SITE.whatsapp) {
    var msg = getLang() === "en"
      ? "Hi! I'd like some info about KRANCH."
      : "¡Hola! Me gustaría información sobre KRANCH.";
    wa.setAttribute("href", "https://wa.me/" + window.SITE.whatsapp + "?text=" + encodeURIComponent(msg));
    wa.setAttribute("target", "_blank");
  }
}

/* ----------------------------------------------------------------
   9) HERO SLIDESHOW (crossfade, sin vídeo)
   ---------------------------------------------------------------- */
function initHeroSlideshow() {
  var box = document.getElementById("heroSlides");
  if (!box || !window.HERO_SLIDES) return;
  var slides = window.HERO_SLIDES;
  box.innerHTML = slides.map(function (img, i) {
    return '<div class="hero-slide' + (i === 0 ? " active" : "") + '" style="background-image:url(assets/' + img + ')"></div>';
  }).join("");
  if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var els = box.querySelectorAll(".hero-slide");
  var cur = 0;
  setInterval(function () {
    els[cur].classList.remove("active");
    cur = (cur + 1) % els.length;
    els[cur].classList.add("active");
  }, 5500);
}

/* ----------------------------------------------------------------
   10) EFECTOS: reveal, nav, parallax, form
   ---------------------------------------------------------------- */
var revealObserver = null;
function initReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    return;
  }
  revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealNow(document);
}
function revealNow(scope) {
  if (!revealObserver) { (scope || document).querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); }); return; }
  (scope || document).querySelectorAll(".reveal:not(.in)").forEach(function (el) { revealObserver.observe(el); });
}

function initNav() {
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 30); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("no-scroll", open);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open"); burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });
  }
}

function initParallax() {
  var els = document.querySelectorAll("[data-parallax]");
  if (!els.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var run = function () {
    var y = window.scrollY;
    els.forEach(function (el) {
      var sp = parseFloat(el.getAttribute("data-parallax")) || 0.2;
      el.style.transform = "translate3d(0," + (y * sp) + "px,0)";
    });
  };
  run(); window.addEventListener("scroll", run, { passive: true });
}

function initForm() {
  var form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var ok = document.getElementById("formSuccess");
    if (ok) { ok.hidden = false; ok.textContent = t("form.success"); }
    form.reset();
  });
}

/* ----------------------------------------------------------------
   11) ARRANQUE
   ---------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });
  initHeroSlideshow();
  applyLang();
  fillContact();
  initReveal();
  initNav();
  initParallax();
  initForm();
  updateStatus();
  setInterval(updateStatus, 30000);
});
