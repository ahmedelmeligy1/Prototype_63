/* ====== إعدادات المتجر — عدّل الأرقام والروابط هنا ====== */
const CONFIG = {
  whatsapp: "201000000000",            // رقم واتساب بالصيغة الدولية بدون +
  facebook: "https://facebook.com/",   // رابط صفحة فيسبوك
  instagram: "https://instagram.com/",
  currency: "جنيه"
};

/* ====== المنتجات ====== */
const mk = (id, name, cat, price, tone, desc, extra = {}) => ({ id, name, cat, price, tone, desc, ...extra });
const PRODUCTS = [
  mk(1, "عطر كريد أفينتوس", "perfume", 4200, "silver", "عطر فاخر برائحة الفواكه المنعشة والمسك الدافئ، ثباته طويل ومناسب لكل المناسبات.", { best: 1 }),
  mk(2, "عطر عود وود", "perfume", 2500, "gold", "مزيج شرقي من العود الخشبي والتوابل الدافئة، يترك أثراً راقياً يدوم طوال اليوم.", { best: 1, old: 3000 }),
  mk(3, "عطر Bleu de Chanel", "perfume", 2000, "navy", "رائحة خشبية حمضية أنيقة تناسب الرجل العصري في الصباح والمساء.", { best: 1 }),
  mk(4, "عطر سوفاج", "perfume", 2500, "night", "انتعاش البرغموت مع لمسة من الفلفل والعنبر، حضور قوي وثبات عالٍ.", { best: 1, old: 2900 }),
  mk(5, "عطر عنبر ملكي", "perfume", 1800, "amber", "عنبر ناعم مع الفانيليا والمسك الأبيض، دافئ وفاخر.", { old: 2200 }),
  mk(6, "عطر ورد طائفي", "perfume", 1600, "rose", "ورد طائفي طبيعي مع لمسة من العود الخفيف، أنثوي وراقٍ."),
  mk(7, "عطر مسك الغزال", "perfume", 1300, "pearl", "مسك ناعم ونظيف برائحة هادئة تناسب الاستخدام اليومي."),
  mk(8, "عطر شيخ العود", "perfume", 3200, "gold", "عود كمبودي مركّز مع الزعفران والورد، لعشّاق العطور الشرقية الفاخرة.", { old: 3800 }),
  mk(9, "بخور عود كمبودي", "bakhoor", 650, "wood", "قطع عود كمبودي أصلي برائحة عميقة تملأ المكان.", { best: 1 }),
  mk(10, "مخمرية عود ملكية", "bakhoor", 900, "wood", "مخمرية محضّرة يدوياً من العود والعنبر والمسك.", { old: 1100 }),
  mk(11, "بخور مستكة", "bakhoor", 350, "pearl", "مستكة طبيعية بلمسة حلوة منعشة للمنزل والمجالس."),
  mk(12, "بخور مسك وعنبر", "bakhoor", 500, "amber", "خلطة دافئة من المسك والعنبر تدوم رائحتها لساعات."),
  mk(13, "دهن عود", "bakhoor", 1200, "night", "دهن عود مركّز، قطرة واحدة تكفي. تُباع بعبوات صغيرة."),
  mk(14, "مبخرة كهربائية", "bakhoor", 450, "gold", "مبخرة كهربائية عملية وآمنة لتبخير العود والبخور بسهولة.")
];
const TONES = { // [جسم الزجاجة, ظل, غطاء]
  silver: ["#e8e8ea", "#b9b9c0", "#4a4a52"], gold: ["#f3d58a", "#c99a3a", "#b8892c"], navy: ["#1b2547", "#0b1127", "#101010"],
  night: ["#2a2d3a", "#0f1118", "#1b1b1b"], amber: ["#e8a85a", "#b5651d", "#6b3d12"], rose: ["#f1c4c4", "#d08a8a", "#b8892c"],
  pearl: ["#fbf1da", "#e3cfa0", "#b8892c"], wood: ["#8a5a2b", "#4e3015", "#2e1c0b"]
};
const SIZES = { perfume: [["50 مل", .65], ["100 مل", 1]], bakhoor: [["50 جم", .6], ["100 جم", 1]] };

/* ====== أدوات ====== */
const hashQuery = () => { const h = location.hash, i = h.indexOf("?"); return i < 0 ? "" : h.slice(i + 1); };
const $ = (s, r = document) => r.querySelector(s);
const fmt = n => Math.round(n).toLocaleString("en-US");
const byId = id => PRODUCTS.find(p => p.id === +id);
const sizesOf = p => p.cat === "bakhoor" && p.id === 13 ? [["3 مل", .5], ["6 مل", 1]] : SIZES[p.cat].map(([l, m]) => [l, Math.round(p.price * m)]);
const I = (n, s = "solid") => `<i class="fa-${s} fa-${n}" aria-hidden="true"></i>`;
const img = (p, w) => `<img src="images/products/p${p.id}.jpg" alt="${p.name}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{innerHTML:bottle('${p.tone}',${w || 90})}))">`;
let gid = 0;
function bottle(tone = "gold", w = 100) {
  const [a, b, c] = TONES[tone] || TONES.gold, g = "g" + ++gid;
  return `<svg viewBox="0 0 100 150" width="${w}" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${b}"/><stop offset=".35" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect x="34" y="6" width="32" height="28" rx="3" fill="${c}"/><rect x="43" y="34" width="14" height="9" fill="${b}"/><rect x="16" y="43" width="68" height="100" rx="10" fill="url(#${g})" stroke="${b}" stroke-width="1.5"/><rect x="34" y="82" width="32" height="26" rx="2" fill="#fff" opacity=".55"/><rect x="40" y="90" width="20" height="3" fill="${c}" opacity=".6"/><rect x="44" y="98" width="12" height="3" fill="${c}" opacity=".4"/></svg>`;
}
const toast = msg => { const t = $("#toast"); t.innerHTML = I("circle-check") + " " + msg; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 2000); };
const wa = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

/* ====== السلة (localStorage) ====== */
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem("abeer_cart")) || []; } catch { return []; } },
  save(c) { try { localStorage.setItem("abeer_cart", JSON.stringify(c)); } catch {} Cart.badge(); },
  add(id, size, qty = 1) {
    const c = Cart.get(), p = byId(id), s = size || sizesOf(p)[sizesOf(p).length - 1][0];
    const it = c.find(x => x.id === id && x.size === s);
    it ? it.qty += qty : c.push({ id, size: s, qty }); Cart.save(c); toast("تمت الإضافة إلى السلة");
  },
  price(it) { const p = byId(it.id); return sizesOf(p).find(s => s[0] === it.size)?.[1] ?? p.price; },
  total() { return Cart.get().reduce((t, i) => t + Cart.price(i) * i.qty, 0); },
  count() { return Cart.get().reduce((t, i) => t + i.qty, 0); },
  badge() { const b = $("#cartCount"); if (b) b.textContent = Cart.count(); }
};
const Favs = {
  get() { try { return JSON.parse(localStorage.getItem("abeer_fav")) || []; } catch { return []; } },
  toggle(id) { let f = Favs.get(); f = f.includes(id) ? f.filter(x => x !== id) : [...f, id]; try { localStorage.setItem("abeer_fav", JSON.stringify(f)); } catch {} return f.includes(id); }
};

/* ====== الهيدر والفوتر ====== */
const NAV = [["#/", "الرئيسية", "home"], ["#/perfumes", "العطور", "perfumes"], ["#/bakhoor", "المخمريات", "bakhoor"], ["#/about", "من نحن", "about"], ["#/policy", "سياسة التوصيل", "policy"], ["#/contact", "تواصل معنا", "contact"]];
function renderChrome(page) {
  const act = page === "product" ? "" : page;
  $("#header").innerHTML = `
  <div class="topbar"><div class="wrap">
    <div class="info"><span>${I("truck-fast")} التوصيل لجميع محافظات مصر</span><span><a href="#/policy">${I("rotate-left")} سياسة الاسترجاع</a></span><span><a href="#/contact">${I("headset")} تواصل معنا</a></span></div>
    <div class="soc"><a href="${CONFIG.whatsapp ? wa("مرحباً") : "#"}" aria-label="واتساب" target="_blank" rel="noopener">${I("whatsapp","brands")}</a><a href="${CONFIG.instagram}" aria-label="انستجرام" target="_blank" rel="noopener">${I("instagram","brands")}</a><a href="${CONFIG.facebook}" aria-label="فيسبوك" target="_blank" rel="noopener">${I("facebook-f","brands")}</a></div>
  </div></div>
  <header class="main"><div class="wrap">
    <a class="logo" href="#/"><i>ع</i>عبير الجمال</a>
    <button class="burger" aria-label="القائمة" id="burger">${I("bars")}</button>
    <nav class="menu" id="menu">${NAV.map(n => `<a href="${n[0]}" class="${n[2] === act ? "on" : ""}">${n[1]}</a>`).join("")}</nav>
    <div class="tools">
      <form class="search" id="sf" role="search"><input type="search" id="q" placeholder="ابحث عن منتج..." aria-label="بحث"><button aria-label="بحث">${I("magnifying-glass")}</button></form>
      <a class="ico" href="#/cart" aria-label="السلة">${I("cart-shopping")}<span class="badge" id="cartCount">0</span></a>
    </div>
  </div></header>`;
  $("#footer").innerHTML = `
  <footer><div class="wrap">
    <div><div class="logo"><i>ع</i>عبير الجمال</div><p>عطور شرقية وغربية فاخرة ومخمريات.<br>لأنك تستحق الأفضل.</p></div>
    <div>${NAV.slice(1).map(n => `<a href="${n[0]}">${n[1]}</a>`).join("")}</div>
    <div><a target="_blank" rel="noopener" href="${CONFIG.facebook}">${I("facebook-f","brands")} فيسبوك</a><a target="_blank" rel="noopener" href="${CONFIG.instagram}">${I("instagram","brands")} انستجرام</a><a target="_blank" rel="noopener" href="${wa("مرحباً عبير الجمال")}">${I("whatsapp","brands")} واتساب</a></div>
    <div class="cp">© ${new Date().getFullYear()} عبير الجمال — جميع الحقوق محفوظة</div>
  </div></footer>
  <div class="float"><a href="${wa("مرحباً عبير الجمال، عندي استفسار")}" target="_blank" rel="noopener" style="background:#26994a" aria-label="واتساب">${I("whatsapp","brands")}</a><a href="${CONFIG.facebook}" target="_blank" rel="noopener" style="background:#1877f2" aria-label="تسوق الآن عبر فيسبوك">${I("facebook-f","brands")}</a></div>`;
  $("#burger").onclick = () => $("#menu").classList.toggle("open");
  $("#sf").onsubmit = e => { e.preventDefault(); const v = $("#q").value.trim(); if (v) location.href = "#/perfumes?q=" + encodeURIComponent(v); };
  Cart.badge();
}

/* ====== مكونات ====== */
function card(p) {
  const f = Favs.get().includes(p.id);
  return `<article class="card">
    <button class="fav ${f ? "on" : ""}" data-fav="${p.id}" aria-label="أضف للمفضلة">${I("heart", f ? "solid" : "regular")}</button>${p.old ? '<span class="tag">خصم</span>' : ""}
    <a class="im" href="#/product?id=${p.id}" aria-label="${p.name}">${img(p, 90)}</a>
    <div class="bd"><h3><a href="#/product?id=${p.id}">${p.name}</a></h3>
    <div class="price">${fmt(p.price)} ${CONFIG.currency}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</div>
    <button class="btn sm" data-add="${p.id}">${I("cart-plus")} أضف للسلة</button></div></article>`;
}
const head = (t, btn) => `<div class="sh-wrap">${btn || ""}<div class="sh"><h2>${t}</h2></div></div>`;
const pageHead = t => `<div class="wrap"><div class="ph"><h1>${t}</h1></div></div>`;

/* ====== الصفحات ====== */
const Pages = {
  home() {
    const slides = [["عطور شرقية وغربية فاخرة", "لأنك تستحق الأفضل", "#/perfumes"], ["مخمريات وعود أصلي", "رائحة تملأ مكانك", "#/bakhoor"], ["توصيل لجميع المحافظات", "اطلب الآن عبر واتساب", "#/perfumes"]];
    const bt = "";
    const best = PRODUCTS.filter(p => p.best).slice(0, 4);
    return `<div class="wrap">
    <section class="hero" id="hero" aria-label="العروض">${slides.map((s, i) => `<div class="slide ${i ? "" : "on"}" style="background-image:url(images/hero/hero${i + 1}.jpg)">${bt}<div class="txt"><small>${s[0]}</small><h1>${s[1]}</h1><a class="btn" href="${s[2]}">تسوق الآن ${I("arrow-left-long")}</a></div></div>`).join("")}
      <button class="arrow nx" id="nx" aria-label="التالي">${I("chevron-left")}</button><button class="arrow pv" id="pv" aria-label="السابق">${I("chevron-right")}</button>
      <div class="dots">${slides.map((_, i) => `<button aria-label="شريحة ${i + 1}" class="${i ? "" : "on"}"></button>`).join("")}</div></section>
    <section class="tiles">
      <a class="tile" href="#/perfumes"><div><b>العطور</b><span>اكتشف المزيد ${I("arrow-left-long")}</span></div><img class="tt" src="images/products/p7.jpg" alt="" loading="lazy"></a>
      <a class="tile" href="#/bakhoor"><div><b>المخمريات</b><span>اكتشف المزيد ${I("arrow-left-long")}</span></div><img class="tt" src="images/products/p9.jpg" alt="" loading="lazy"></a>
      <a class="tile" href="#/perfumes?offer=1"><div><b>عروض مميزة</b><span>اكتشف المزيد ${I("arrow-left-long")}</span></div><span class="tic">${I("gift")}</span></a>
      <a class="tile" href="#/best"><div><b>الأكثر مبيعاً</b><span>اكتشف المزيد ${I("arrow-left-long")}</span></div><img class="tt" src="images/products/p5.jpg" alt="" loading="lazy"></a>
    </section>
    <section id="best" class="home-grid">
      <div>${head("الأكثر مبيعاً", `<a class="btn sm" href="#/perfumes">عرض الكل ${I("arrow-left-long")}</a>`)}<div class="grid">${best.map(card).join("")}</div></div>
      <aside class="promo"><h2>خصومات خاصة</h2><p>لفترة محدودة</p><a class="btn" href="#/perfumes?offer=1">تسوق الآن ${I("arrow-left-long")}</a><div class="bt"><img src="images/products/p8.jpg" alt="" loading="lazy"></div></aside>
    </section>
    <section class="feats">
      <div class="feat"><span class="fi">${I("truck-fast")}</span><div><b>شحن سريع</b><small>لجميع أنحاء مصر</small></div></div>
      <div class="feat"><span class="fi">${I("shield-halved")}</span><div><b>دفع آمن</b><small>الدفع عند الاستلام</small></div></div>
      <div class="feat"><span class="fi">${I("headset")}</span><div><b>دعم فني</b><small>على مدار الساعة</small></div></div>
      <div class="feat news"><h3>اشترك في نشرتنا البريدية</h3><small>ليصلك كل جديد من العروض والمنتجات</small>
        <form id="nf"><input type="email" required placeholder="أدخل بريدك الإلكتروني" aria-label="البريد الإلكتروني"><button class="btn sm">${I("envelope")} اشتراك</button></form></div>
    </section></div>`;
  },
  shop(cat, title) {
    const u = new URLSearchParams(hashQuery()), q = (u.get("q") || "").trim(), offer = u.get("offer");
    let list = q ? PRODUCTS.filter(p => p.name.includes(q) || p.desc.includes(q)) : PRODUCTS.filter(p => (offer || p.cat === cat));
    if (offer) list = list.filter(p => p.old);
    if (q) title = `نتائج البحث عن «${q}»`; if (offer) title = "عروض مميزة";
    return pageHead(title) + `<div class="wrap"><div class="bar">
      <a class="chip ${!q && !offer && cat === "perfume" ? "on" : ""}" href="#/perfumes">العطور</a><a class="chip ${!q && !offer && cat === "bakhoor" ? "on" : ""}" href="#/bakhoor">المخمريات</a><a class="chip ${offer ? "on" : ""}" href="#/perfumes?offer=1">العروض</a>
      <select id="sort" aria-label="ترتيب"><option value="">الترتيب الافتراضي</option><option value="a">السعر: من الأقل</option><option value="d">السعر: من الأعلى</option></select></div>
      <div id="list" class="grid" data-ids="${list.map(p => p.id)}">${list.map(card).join("") || '<p class="empty" style="grid-column:1/-1">لا توجد منتجات مطابقة.</p>'}</div><div style="height:40px"></div></div>`;
  },
  product() {
    const p = byId(new URLSearchParams(hashQuery()).get("id"));
    if (!p) return `<div class="wrap"><p class="empty">المنتج غير موجود. <a href="#/perfumes" style="color:var(--gold-d)">تصفح العطور</a></p></div>`;
    const sz = sizesOf(p), rel = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
    return `<div class="wrap"><div class="pd">
      <div class="big">${img(p, 220)}</div>
      <div><small style="color:var(--gold-d)">${p.cat === "perfume" ? "العطور" : "المخمريات"}</small><h1>${p.name}</h1>
        <div class="price" id="pp">${fmt(sz[sz.length - 1][1])} ${CONFIG.currency}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</div><p>${p.desc}</p>
        <b>الحجم المتاح</b><div class="opts" id="opts">${sz.map((s, i) => `<button class="chip ${i === sz.length - 1 ? "on" : ""}" data-size="${s[0]}" data-p="${s[1]}">${s[0]}</button>`).join("")}</div>
        <b>الكمية</b><div class="row"><div class="qty"><button id="m" aria-label="أنقص">${I("minus")}</button><span id="n">1</span><button id="pl" aria-label="زِد">${I("plus")}</button></div></div>
        <div class="row"><button class="btn" id="addp">${I("cart-plus")} أضف للسلة</button><button class="btn wa" id="buy">${I("whatsapp","brands")} اطلب الآن عبر واتساب</button></div>
      </div></div>${head("منتجات مشابهة")}<div class="grid">${rel.map(card).join("")}</div><div style="height:40px"></div></div>`;
  },
  cart() {
    const c = Cart.get();
    if (!c.length) return pageHead("سلة المشتريات") + `<div class="wrap"><p class="empty">السلة فارغة. <a class="btn sm" href="#/perfumes">ابدأ التسوق</a></p></div>`;
    return pageHead("سلة المشتريات") + `<div class="wrap"><div class="cart"><div>${c.map((it, i) => { const p = byId(it.id), pr = Cart.price(it); return `<div class="item">
      <div class="t">${img(p, 44)}</div><div><b>${p.name}</b><br><small>${it.size} — ${fmt(pr)} ${CONFIG.currency}</small></div>
      <div class="qty"><button data-q="${i}" data-d="-1" aria-label="أنقص">${I("minus")}</button><span>${it.qty}</span><button data-q="${i}" data-d="1" aria-label="زِد">${I("plus")}</button></div>
      <div><b>${fmt(pr * it.qty)}</b> <button class="rm" data-rm="${i}" aria-label="حذف">${I("trash-can")}</button></div></div>`; }).join("")}</div>
      <aside class="sum"><h3 style="margin-bottom:8px">ملخص الطلب</h3><div><span>عدد المنتجات</span><span>${Cart.count()}</span></div>
        <div><span>الشحن</span><span>يُحدد عند التأكيد</span></div><div class="tot"><span>الإجمالي</span><span>${fmt(Cart.total())} ${CONFIG.currency}</span></div>
        <a class="btn wa block" id="order" href="#">${I("whatsapp","brands")} اطلب الآن عبر واتساب</a><p style="font-size:.8rem;color:var(--mute);margin-top:10px">سيتم تحويلك إلى واتساب برسالة جاهزة لاستكمال بيانات التوصيل وتأكيد الطلب.</p></aside></div></div>`;
  },
  about() {
    return pageHead("من نحن") + `<div class="wrap"><div class="text"><p>«عبير الجمال» براند مصري متخصص في العطور والمخمريات، نختار منتجاتنا بعناية لنقدّم لك رائحة تعبّر عنك وتدوم معك.</p>
    <h2>رؤيتنا</h2><p>أن تصل العطور الفاخرة إلى كل بيت في مصر بأسعار عادلة وتجربة شراء بسيطة.</p>
    <h2>لماذا عبير الجمال؟</h2><ul><li>تشكيلة من العطور الشرقية والغربية والمخمريات.</li><li>منتجات مختارة بعناية وبجودة وثبات عالٍ.</li><li>طلب سهل عبر واتساب وتوصيل لجميع المحافظات.</li><li>دعم ومتابعة مع كل عميل.</li></ul></div></div>`;
  },
  policy() {
    return pageHead("سياسة التوصيل والاسترجاع") + `<div class="wrap"><div class="text"><h2>التوصيل</h2><ul><li>نوصّل لجميع محافظات مصر.</li><li>مدة التوصيل المعتادة من 2 إلى 5 أيام عمل حسب المحافظة.</li><li>تُحدد تكلفة الشحن عند تأكيد الطلب عبر واتساب.</li><li>الدفع عند الاستلام.</li></ul>
    <h2>الاسترجاع والاستبدال</h2><ul><li>يمكنك طلب الاسترجاع أو الاستبدال خلال 14 يوماً من الاستلام.</li><li>يجب أن يكون المنتج غير مستخدم وفي عبوته الأصلية.</li><li>في حال وصول منتج تالف أو مختلف عن طلبك، نستبدله على مسؤوليتنا.</li><li>للاسترجاع تواصل معنا عبر واتساب مع رقم الطلب.</li></ul></div></div>`;
  },
  contact() {
    return pageHead("تواصل معنا") + `<div class="wrap"><div class="cgrid">
      <div class="cbox"><div class="fi">${I("whatsapp","brands")}</div><h3>واتساب</h3><p>أسرع طريقة لطلبك واستفساراتك</p><a class="btn wa sm" target="_blank" rel="noopener" href="${wa("مرحباً عبير الجمال")}">ابدأ المحادثة</a></div>
      <div class="cbox"><div class="fi">${I("facebook-f","brands")}</div><h3>فيسبوك</h3><p>تابع صفحتنا وتسوق مباشرة</p><a class="btn sm" target="_blank" rel="noopener" href="${CONFIG.facebook}">تسوق الآن</a></div>
      <div class="cbox"><div class="fi">${I("instagram","brands")}</div><h3>انستجرام</h3><p>شاهد أحدث المنتجات</p><a class="btn sm" target="_blank" rel="noopener" href="${CONFIG.instagram}">تابعنا</a></div></div>
      <form class="cform" id="cf"><input required id="cn" placeholder="الاسم" aria-label="الاسم"><textarea required id="cm" rows="4" placeholder="رسالتك" aria-label="رسالتك"></textarea><button class="btn">${I("paper-plane")} إرسال عبر واتساب</button></form></div>`;
  }
};

/* ====== التفاعلات ====== */
let _g = 0, _gc = 0;
function bind(page) {
  if (!_g) { _g = 1; document.addEventListener("click", e => {
    const a = e.target.closest("[data-add]"), f = e.target.closest("[data-fav]");
    if (a) Cart.add(+a.dataset.add);
    if (f) { const on = Favs.toggle(+f.dataset.fav); f.classList.toggle("on", on); f.innerHTML = I("heart", on ? "solid" : "regular"); }
  }); }
  if (page === "home") {
    const s = document.querySelectorAll(".slide"), d = document.querySelectorAll(".dots button"); let i = 0, t;
    const go = n => { i = (n + s.length) % s.length; s.forEach((x, k) => x.classList.toggle("on", k === i)); d.forEach((x, k) => x.classList.toggle("on", k === i)); };
    const auto = () => { clearInterval(t); if (!matchMedia("(prefers-reduced-motion:reduce)").matches) t = window._st = setInterval(() => go(i + 1), 5500); };
    $("#nx").onclick = () => { go(i + 1); auto(); }; $("#pv").onclick = () => { go(i - 1); auto(); };
    d.forEach((x, k) => x.onclick = () => { go(k); auto(); }); auto();
    $("#nf").onsubmit = e => { e.preventDefault(); e.target.reset(); toast("تم الاشتراك بنجاح"); };
  }
  const so = $("#sort");
  if (so) so.onchange = () => { const l = $("#list"), c = [...l.children]; const pr = el => parseInt(el.querySelector(".price").textContent.replace(/,/g, "")); if (so.value) c.sort((x, y) => so.value === "a" ? pr(x) - pr(y) : pr(y) - pr(x)); else c.sort((x, y) => l.dataset.ids.split(",").indexOf(x.querySelector("[data-add]").dataset.add) - l.dataset.ids.split(",").indexOf(y.querySelector("[data-add]").dataset.add)); c.forEach(x => l.appendChild(x)); };
  if (page === "product") {
    const p = byId(new URLSearchParams(hashQuery()).get("id")); if (!p) return;
    let qty = 1, size = sizesOf(p).slice(-1)[0];
    $("#opts").onclick = e => { const b = e.target.closest("[data-size]"); if (!b) return; size = [b.dataset.size, +b.dataset.p]; document.querySelectorAll("#opts .chip").forEach(x => x.classList.toggle("on", x === b)); $("#pp").firstChild.textContent = fmt(size[1]) + " " + CONFIG.currency; };
    $("#m").onclick = () => $("#n").textContent = qty = Math.max(1, qty - 1);
    $("#pl").onclick = () => $("#n").textContent = ++qty;
    $("#addp").onclick = () => Cart.add(p.id, size[0], qty);
    $("#buy").onclick = () => window.open(wa(`مرحباً عبير الجمال 👋\nأود طلب:\n• ${p.name} (${size[0]}) × ${qty} = ${fmt(size[1] * qty)} ${CONFIG.currency}\n\nالإجمالي: ${fmt(size[1] * qty)} ${CONFIG.currency}`), "_blank");
  }
  if (page === "cart") {
    if (!_gc) { _gc = 1; document.addEventListener("click", e => {
      const q = e.target.closest("[data-q]"), r = e.target.closest("[data-rm]"); if (!q && !r) return;
      const c = Cart.get(); if (q) { c[+q.dataset.q].qty = Math.max(1, c[+q.dataset.q].qty + +q.dataset.d); } else c.splice(+r.dataset.rm, 1);
      Cart.save(c); render("cart");
    }); }
    const o = $("#order"); if (o) o.onclick = e => { e.preventDefault(); const c = Cart.get(); if (!c.length) return;
      const lines = c.map((it, i) => `${i + 1}) ${byId(it.id).name} (${it.size}) × ${it.qty} = ${fmt(Cart.price(it) * it.qty)} ${CONFIG.currency}`).join("\n");
      window.open(wa(`مرحباً عبير الجمال 👋\nأود تأكيد الطلب التالي:\n\n${lines}\n\nالإجمالي: ${fmt(Cart.total())} ${CONFIG.currency}\n\nسأرسل بيانات التوصيل (الاسم / العنوان / رقم الهاتف) لاستكمال الطلب.`), "_blank"); };
  }
  if (page === "contact") $("#cf").onsubmit = e => { e.preventDefault(); window.open(wa(`الاسم: ${$("#cn").value}\n${$("#cm").value}`), "_blank"); };
}

function render(page) {
  const app = $("#app");
  app.innerHTML = { home: Pages.home, perfumes: () => Pages.shop("perfume", "العطور"), bakhoor: () => Pages.shop("bakhoor", "المخمريات"), product: Pages.product, cart: Pages.cart, about: Pages.about, policy: Pages.policy, contact: Pages.contact }[page]();
  if (page === "cart") { const o = $("#order"); if (o) { o.onclick = e => { e.preventDefault(); const c = Cart.get(); const lines = c.map((it, i) => `${i + 1}) ${byId(it.id).name} (${it.size}) × ${it.qty} = ${fmt(Cart.price(it) * it.qty)} ${CONFIG.currency}`).join("\n"); window.open(wa(`مرحباً عبير الجمال 👋\nأود تأكيد الطلب التالي:\n\n${lines}\n\nالإجمالي: ${fmt(Cart.total())} ${CONFIG.currency}\n\nسأرسل بيانات التوصيل (الاسم / العنوان / رقم الهاتف) لاستكمال الطلب.`), "_blank"); }; } }
  Cart.badge();
}
const ROUTES = ["home", "perfumes", "bakhoor", "product", "cart", "about", "policy", "contact"];
function router() {
  clearInterval(window._st);
  const raw = location.hash.replace(/^#\/?/, "").split("?")[0];
  const page = raw === "best" ? "home" : ROUTES.includes(raw) ? raw : "home";
  renderChrome(page); render(page); bind(page);
  if (raw === "best") { const b = $("#best"); if (b) b.scrollIntoView(); } else window.scrollTo(0, 0);
}
window.addEventListener("hashchange", router);
router();
