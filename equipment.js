(() => {
  "use strict";

  const language = document.documentElement.lang === "hi" ? "hi" : "en";
  const isHindi = language === "hi";
  const messages = isHindi ? {
    title: "मेरे उपकरण",
    detail: "उपकरण की जानकारी",
    back: "वापस",
    empty: "आपने अभी तक कोई उपकरण किराये पर नहीं दिया है।",
    add: "उपकरण किराये पर दें",
    loading: "लोड हो रहा है…",
    retry: "लोड नहीं हो सका। फिर कोशिश करने के लिए दबाएँ।",
    out: "स्टॉक में नहीं",
    available: "फिर से उपलब्ध करें",
    availableLabel: "उपलब्ध",
    save: "बदलाव सेव करें",
    saved: "बदलाव सेव हो गए",
    markedOut: "उपकरण अब किराये के लिए उपलब्ध नहीं है।",
    markedAvailable: "उपकरण फिर से उपलब्ध है।",
    photos: "फोटो",
    photoHint: "फोटो देखने, जोड़ने या हटाने के लिए दबाएँ",
    view: "फोटो देखें",
    category: "श्रेणी",
    otherCategory: "श्रेणी का नाम",
    name: "उपकरण / कंपनी का नाम",
    single: "एक उपकरण",
    set: "पूरे मौसम का सेट",
    season: "मौसम",
    setName: "सेट का नाम",
    included: "सेट में शामिल उपकरण (कम से कम 2)",
    pricePer: "किराया प्रति",
    hour: "घंटा",
    day: "दिन",
    price: "राशि (₹ में)",
    model: "मॉडल",
    modelRequired: "मॉडल (इस मशीन के लिए ज़रूरी)",
    more: "और जानकारी",
    driver: "किराये पर लेने वाले के लिए चालक",
    withoutDriver: "बिना चालक",
    withoutDriverHint: "मेरे पास देने के लिए चालक नहीं है",
    withDriver: "चालक के साथ",
    withDriverHint: "मशीन सिर्फ़ मेरे चालक के साथ दी जाएगी",
    eitherDriver: "चालक के साथ या बिना",
    eitherDriverHint: "लेने वाले की ज़रूरत पर निर्भर",
    driverIncluded: "चालक शामिल हो तो अतिरिक्त किराये में 0 लिखें।",
    driverExtra: "चुने हुए किराया घंटे/दिन के हिसाब से चालक का अतिरिक्त किराया (₹; शामिल हो तो 0)",
    paymentMethods: "स्वीकार किए जाने वाले भुगतान",
    onlineOnly: "केवल ऑनलाइन",
    cashOnly: "केवल डिलीवरी पर नकद",
    bothPaymentMethods: "ऑनलाइन और डिलीवरी पर नकद",
    phone: "मोबाइल नंबर",
    location: "स्थान (गाँव, जिला)",
    delete: "हटाएँ",
    camera: "कैमरा",
    gallery: "गैलरी",
    close: "बंद करें",
    lastPhoto: "कम से कम 1 फोटो ज़रूरी है।",
    invalidPhoto: "JPG, PNG या WEBP फोटो चुनें जो 5 MB से छोटी हो।",
    photoLimit: "अधिकतम 12 फोटो रख सकते हैं।",
    emptyCategory: "श्रेणी का नाम लिखें।",
    emptyName: "उपकरण या कंपनी का नाम लिखें।",
    emptySeason: "मौसम चुनें।",
    emptySet: "सेट का नाम लिखें।",
    emptyItems: "कम से कम 2 उपकरण चुनें।",
    emptyUnit: "घंटा या दिन चुनें।",
    emptyPrice: "सही राशि लिखें।",
    emptyModel: "इस मशीन के लिए मॉडल ज़रूरी है।",
    emptyDriver: "चालक का विकल्प चुनें।",
    emptyDriverExtra: "चालक की अतिरिक्त राशि लिखें।",
    emptyPhone: "सही 10 अंकों का मोबाइल नंबर लिखें।",
    emptyLocation: "अपना स्थान लिखें।",
    error: "कुछ गड़बड़ हुई। फिर कोशिश करें।",
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    pending: "जाँच में",
    rejected: "अस्वीकृत",
    seasons: [["kharif", "खरीफ (जून–अक्टूबर)"], ["rabi", "रबी (नवंबर–मार्च)"], ["zaid", "जायद (अप्रैल–जून)"]],
    units: { hour: "घंटा", day: "दिन" },
    confirmDelete: "क्या आप यह उपकरण अपनी लिस्टिंग और मार्केटप्लेस से हटाना चाहते हैं?"
  } : {
    title: "My equipment",
    detail: "Equipment details",
    back: "Back",
    empty: "You have not rented out any equipment yet.",
    add: "Rent out equipment",
    loading: "Loading…",
    retry: "Could not load. Tap to retry.",
    out: "Out of stock",
    available: "Mark available",
    availableLabel: "Available",
    save: "Save changes",
    saved: "Changes saved",
    markedOut: "This equipment is no longer available for rent.",
    markedAvailable: "This equipment is available again.",
    photos: "Photos",
    photoHint: "Tap to view, add or delete photos",
    view: "View photos",
    category: "Category",
    otherCategory: "Category name",
    name: "Item name / company",
    single: "Single equipment",
    set: "Full season set",
    season: "Season",
    setName: "Set name",
    included: "Equipment in the set (at least 2)",
    pricePer: "Rent price per",
    hour: "Hour",
    day: "Day",
    price: "Amount in ₹",
    model: "Model",
    modelRequired: "Model (required for this machine)",
    more: "More details",
    driver: "Driver for the hirer",
    withoutDriver: "Without driver",
    withoutDriverHint: "I have no driver to give",
    withDriver: "With driver",
    withDriverHint: "Machine is given only with my driver",
    eitherDriver: "With or without driver",
    eitherDriverHint: "Depends on the hirer's need",
    driverIncluded: "Enter 0 if the driver is included at no extra charge.",
    driverExtra: "Additional driver rate per rental hour/day (₹; enter 0 if included)",
    paymentMethods: "Accepted payment methods",
    onlineOnly: "Online only",
    cashOnly: "Cash on delivery only",
    bothPaymentMethods: "Online and cash on delivery",
    phone: "Mobile number",
    location: "Location (village, district)",
    delete: "Delete",
    camera: "Camera",
    gallery: "Gallery",
    close: "Close",
    lastPhoto: "At least 1 photo is required.",
    invalidPhoto: "Choose a JPG, PNG, or WEBP photo smaller than 5 MB.",
    photoLimit: "You can keep up to 12 photos.",
    emptyCategory: "Write the category name.",
    emptyName: "Write the item or company name.",
    emptySeason: "Select a season.",
    emptySet: "Write the set name.",
    emptyItems: "Select at least 2 equipment items.",
    emptyUnit: "Select hour or day.",
    emptyPrice: "Enter a valid amount.",
    emptyModel: "A model is required for this machine.",
    emptyDriver: "Select a driver option.",
    emptyDriverExtra: "Enter the extra driver amount.",
    emptyPhone: "Enter a valid 10-digit mobile number.",
    emptyLocation: "Enter your location.",
    error: "Something went wrong. Please try again.",
    active: "Active",
    inactive: "Inactive",
    pending: "Pending review",
    rejected: "Rejected",
    seasons: [["kharif", "Kharif (Jun–Oct)"], ["rabi", "Rabi (Nov–Mar)"], ["zaid", "Zaid (Apr–Jun)"]],
    units: { hour: "hour", day: "day" },
    confirmDelete: "Remove this equipment from your listings and the marketplace?"
  };
  const categories = [
    ["tractor", "Tractor", "ट्रैक्टर", "🚜"], ["thresher", "Thresher", "थ्रेशर", "🌾"],
    ["harvester", "Harvester", "हार्वेस्टर", "🌽"], ["sprayer", "Sprayer", "स्प्रेयर", "💧"],
    ["rotavator", "Rotavator", "रोटावेटर", "⚙️"], ["seeddrill", "Seed drill", "सीड ड्रिल", "🌱"],
    ["pump", "Water pump", "पानी पंप", "🚰"], ["plough", "Plough", "हल", "🪓"],
    ["trolley", "Trolley", "ट्रॉली", "🛒"], ["cultivator", "Cultivator", "कल्टीवेटर", "🔧"],
    ["baler", "Baler", "बेलर", "📦"], ["leveller", "Land leveller", "लेवलर", "📐"],
    ["other", "Others", "अन्य", "🧰"]
  ];
  const complexCategories = new Set(["tractor", "thresher", "harvester"]);
  const root = document.getElementById("r");
  let products = [];
  let editing = null;
  let editingId = null;
  let toastTimer;

  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const labelFor = slug => {
    const category = categories.find(item => item[0] === slug);
    return category ? (isHindi ? category[2] : category[1]) : String(slug || "");
  };
  const categoryEmoji = slug => categories.find(item => item[0] === slug)?.[3] || "🧰";
  const categoryFromName = value => {
    const category = categories.find(item =>
      item[0] === value || item[1].toLowerCase() === String(value).toLowerCase() ||
      item[2] === value
    );
    return category ? category[0] : "other";
  };

  function toast(message) {
    const element = document.getElementById("toast");
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove("show"), 2800);
  }

  async function requestJson(url, options = {}) {
    const response = await fetch(url, {
      credentials: "same-origin",
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers
      }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(result.message || messages.error);
      error.status = response.status;
      throw error;
    }
    return result;
  }

  function parseLegacyDetails(description) {
    const text = String(description || "");
    const read = labels => {
      for (const label of labels) {
        const match = text.match(new RegExp(`(?:^|\\n)${label}\\s*:\\s*([^\\n]+)`, "i"));
        if (match) return match[1].trim();
      }
      return "";
    };
    const driverText = read(["Driver option", "चालक का विकल्प"]);
    const driver = /with|साथ/i.test(driverText)
      ? (/either|without|या बिना|ज़रूरत/i.test(driverText) ? "either" : "with")
      : "none";
    return {
      mode: read(["Set name", "सेट का नाम"]) ? "set" : "single",
      equipmentCategory: read(["Category", "श्रेणी"]),
      company: read(["Item \\/ company", "उपकरण \\/ कंपनी", "उपकरण"]),
      season: read(["Season", "मौसम"]),
      setName: read(["Set name", "सेट का नाम"]),
      items: [],
      model: read(["Model", "मॉडल"]),
      details: text,
      driver,
      driverExtra: Number((read([
        "Separate driver rent per selected rental hour/day \\(₹\\)",
        "Additional driver rent per selected rental hour/day \\(₹\\)",
        "Extra amount for driver \\(₹\\) per selected rental hour/day",
        "Additional driver rent",
        "चुने हुए किराया घंटे/दिन के हिसाब से चालक का अतिरिक्त किराया \\(₹\\)",
        "चालक के लिए अतिरिक्त राशि \\(₹\\)",
        "चालक का अतिरिक्त किराया"
      ]).match(/[\\d.]+/) || [0])[0])
    };
  }

  function listingFromProduct(product) {
    const meta = product.equipmentDetails || parseLegacyDetails(product.description);
    const rawCategory = meta.equipmentCategory || product.categoryName || product.category;
    const categorySlug = categoryFromName(rawCategory);
    const images = Array.isArray(product.imageUrls) && product.imageUrls.length
      ? product.imageUrls
      : product.imageUrl ? [product.imageUrl] : [];
    return {
      id: String(product.id),
      product,
      mode: meta.mode === "set" ? "set" : "single",
      category: categorySlug,
      categoryName: categorySlug === "other" && rawCategory ? rawCategory : labelFor(categorySlug),
      company: meta.company || product.name,
      season: meta.season || "",
      setName: meta.setName || "",
      items: Array.isArray(meta.items) ? meta.items : [],
      unit: product.unit,
      price: Number(product.price),
      model: meta.model || "",
      details: meta.details || product.description || "",
      paymentMethod: ["online", "cash", "both"].includes(product.paymentMethod)
        ? product.paymentMethod : "online",
      driver: ["none", "with", "either"].includes(meta.driver) ? meta.driver : "none",
      driverExtra: Number(meta.driverExtra) || 0,
      mobile: product.whatsappPhone || "",
      location: product.locationName || "",
      latitude: product.latitude,
      longitude: product.longitude,
      images,
      inStock: product.status === "active" && Number(product.stock) > 0,
      status: product.status,
      createdAt: product.createdAt
    };
  }

  const nameOf = item => item.mode === "set" ? item.setName : item.company;
  const categoryOf = item => item.mode === "set" ? messages.set : item.categoryName;
  const isEquipmentListing = item =>
    item.product.listingType === "rent" &&
    (item.product.category === "Equipment" ||
      ["single", "set"].includes(item.product.equipmentDetails?.mode));
  const imageMarkup = (src, alt = "") => {
    if (src) return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy">`;
    return `<span class="ph" aria-hidden="true">${categoryEmoji(editing?.category || "other")}</span>`;
  };
  const tilesMarkup = (images, tag, itemIndex, count) => {
    const visible = images.slice(0, 4);
    return visible.map((image, index) =>
      `<${tag} class="qc"${tag === "button"
        ? ` type="button" data-gallery="${itemIndex}:${index}" aria-label="${messages.view}"`
        : ""}>${imageMarkup(image)}${index === 3 && count > 4
          ? `<span class="more">+${count - 4}</span>` : ""}</${tag}>`
    ).join("");
  };
  const header = detail => `
    <div class="rtop eqtop">
      ${detail
        ? `<button type="button" class="bk" data-back aria-label="${messages.back}">←</button>`
        : '<span class="sp44"></span>'}
      <b>${detail ? messages.detail : messages.title}</b><span class="sp44"></span>
    </div>`;

  function renderList() {
    editingId = null;
    const listings = products.filter(isEquipmentListing);
    root.innerHTML = `${header(false)}<div class="eqlist">${
      listings.length ? listings.map((item, index) => `
        <article class="eqc${item.inStock ? "" : " off"}">
          <div class="q q${Math.max(1, Math.min(item.images.length, 4))}">
            ${tilesMarkup(item.images.length ? item.images : [""], "button", index, item.images.length || 1)}
          </div>
          <button type="button" class="info" data-open="${escapeHtml(item.id)}">
            <span class="cl">${escapeHtml(categoryOf(item))}</span>
            <b>${escapeHtml(nameOf(item))}</b>
            <span class="pr">₹${escapeHtml(item.price)} / ${escapeHtml(messages.units[item.unit] || item.unit)}</span>
            <span class="lo">📍 ${escapeHtml(item.location)}</span>
            ${item.inStock ? "" : `<em class="oos">${messages.out}</em>`}
            ${item.status === "pending" ? `<em class="oos">${messages.pending}</em>` : ""}
            ${item.status === "rejected" ? `<em class="oos">${messages.rejected}</em>` : ""}
          </button>
        </article>`).join("")
        : `<div class="empty"><p>${messages.empty}</p><a class="btn" href="${language}-rent-out.html">${messages.add}</a></div>`
    }</div>`;
  }

  function itemToggle(key, value, text) {
    return `<button type="button" data-toggle="${key}:${value}" aria-pressed="${editing[key] === value}">${text}</button>`;
  }

  function inputField(key, label, type = "text", value = editing[key]) {
    return `<label class="lb">${label}<input class="f" data-field="${key}" type="${type}" value="${escapeHtml(value)}"></label>`;
  }

  function renderDetail(item) {
    if (editingId !== item.id) {
      editingId = item.id;
      editing = {
        ...item,
        images: item.images.map(src => ({ src })),
        items: [...item.items]
      };
    }
    const photoTiles = tilesMarkup(editing.images.map(photo => photo.src), "span", "", editing.images.length);
    const driverOption = (value, title, description) =>
      `<button type="button" class="drv" data-toggle="driver:${value}" aria-pressed="${editing.driver === value}">${title}<small>${description}</small></button>`;
    const detailsForm = `
      <button type="button" class="dimgb" data-edit-gallery aria-label="${messages.photos}">
        <span class="q q${Math.max(1, Math.min(editing.images.length, 4))}">${photoTiles}</span>
      </button>
      <p class="hint">${messages.photoHint} (${editing.images.length})</p>
      <div class="err" data-error="images" role="alert"></div>
      <h3>${messages.category} *</h3>
      <div class="seg2">
        ${itemToggle("mode", "single", messages.single)}
        ${itemToggle("mode", "set", messages.set)}
      </div>
      ${editing.mode === "single" ? `
        <label class="lb">${messages.category} *
          <select class="f" data-field="category">
            ${categories.map(category =>
              `<option value="${category[0]}"${category[0] === editing.category ? " selected" : ""}>${isHindi ? category[2] : category[1]}</option>`
            ).join("")}
          </select>
        </label>
        ${editing.category === "other" ? inputField("categoryName", messages.otherCategory, "text", editing.categoryName) : ""}
        ${inputField("company", messages.name)}
      ` : `
        <h3>${messages.season} *</h3>
        <div class="chips">${messages.seasons.map(([value, label]) => itemToggle("season", value, label)).join("")}</div>
        ${inputField("setName", messages.setName)}
        <h3>${messages.included} *</h3>
        <div class="chips">${categories.slice(0, 12).map(category =>
          `<button type="button" data-item="${category[0]}" aria-pressed="${editing.items.includes(category[0])}">${isHindi ? category[2] : category[1]}</button>`
        ).join("")}</div>
        <div class="err" data-error="items" role="alert"></div>
      `}
      <h3>${messages.pricePer} *</h3>
      <div class="seg2">${itemToggle("unit", "hour", messages.hour)}${itemToggle("unit", "day", messages.day)}</div>
      ${inputField("price", messages.price, "number")}
      <label class="lb">${messages.paymentMethods}
        <select class="f" data-field="paymentMethod">
          <option value="online"${editing.paymentMethod === "online" ? " selected" : ""}>${messages.onlineOnly}</option>
          <option value="cash"${editing.paymentMethod === "cash" ? " selected" : ""}>${messages.cashOnly}</option>
          <option value="both"${editing.paymentMethod === "both" ? " selected" : ""}>${messages.bothPaymentMethods}</option>
        </select>
      </label>
      ${inputField("model", complexCategories.has(editing.category) && editing.mode === "single" ? messages.modelRequired : messages.model)}
      <h3>${messages.more}</h3>
      <textarea class="f" data-field="details">${escapeHtml(editing.details)}</textarea>
      <h3>${messages.driver} *</h3>
      ${driverOption("none", messages.withoutDriver, messages.withoutDriverHint)}
      ${driverOption("with", messages.withDriver, messages.withDriverHint)}
      ${driverOption("either", messages.eitherDriver, messages.eitherDriverHint)}
      ${["with", "either"].includes(editing.driver)
        ? `<div class="note">${messages.driverIncluded}</div>
          <label class="lb">${messages.driverExtra}
            <input class="f" data-field="driverExtra" type="number" min="0" step="0.01" value="${escapeHtml(editing.driverExtra)}" required>
          </label>`
        : ""}
      ${inputField("mobile", messages.phone, "tel")}
      ${inputField("location", messages.location)}
      <div class="err" data-error="form" role="alert"></div>
      <div class="acts">
        ${item.status === "active" || item.status === "inactive"
          ? `<button type="button" class="big red" data-stock>${item.inStock ? messages.out : messages.available}</button>`
          : ""}
        <button type="button" class="big" data-save>${messages.save}</button>
      </div>`;
    root.innerHTML = `${header(true)}<div class="dwrap">${detailsForm}</div>`;
  }

  function render(keepScroll = false) {
    const scrollTop = window.scrollY;
    const requestedId = new URLSearchParams(location.search).get("id");
    const item = requestedId && products.find(product => product.id === requestedId);
    if (item) renderDetail(item);
    else renderList();
    window.scrollTo({ top: keepScroll ? scrollTop : 0, behavior: "auto" });
  }

  async function loadListings() {
    root.innerHTML = `${header(false)}<div class="empty">${messages.loading}</div>`;
    try {
      const result = await requestJson("/api/products/mine");
      products = (result.products || []).map(listingFromProduct);
      render();
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        location.replace(`/login?lang=${language}&returnTo=%2F${language}-equipment.html`);
        return;
      }
      root.innerHTML = `${header(false)}<div class="empty"><p>${escapeHtml(error.message || messages.error)}</p><button class="btn" type="button" data-retry>${messages.retry}</button></div>`;
    }
  }

  function validate() {
    const errors = [];
    if (!editing.images.length) errors.push(["images", messages.lastPhoto]);
    if (editing.mode === "single") {
      if (!editing.categoryName && editing.category === "other") errors.push(["form", messages.emptyCategory]);
      if (!editing.company.trim()) errors.push(["form", messages.emptyName]);
    } else {
      if (!editing.season) errors.push(["form", messages.emptySeason]);
      if (!editing.setName.trim()) errors.push(["form", messages.emptySet]);
      if (editing.items.length < 2) errors.push(["items", messages.emptyItems]);
    }
    if (!(Number(editing.price) > 0)) errors.push(["form", messages.emptyPrice]);
    if (editing.mode === "single" && complexCategories.has(editing.category) && !editing.model.trim()) {
      errors.push(["form", messages.emptyModel]);
    }
    if (!editing.driver) errors.push(["form", messages.emptyDriver]);
    if (["with", "either"].includes(editing.driver) &&
        (editing.driverExtra === "" || !Number.isFinite(Number(editing.driverExtra)) ||
         Number(editing.driverExtra) < 0)) {
      errors.push(["form", messages.emptyDriverExtra]);
    }
    if (!/^[6-9]\d{9}$/.test(editing.mobile.trim())) errors.push(["form", messages.emptyPhone]);
    if (!editing.location.trim()) errors.push(["form", messages.emptyLocation]);
    root.querySelectorAll("[data-error]").forEach(element => { element.textContent = ""; });
    errors.forEach(([key, message]) => {
      const target = root.querySelector(`[data-error="${key}"]`);
      if (target) target.textContent = message;
    });
    if (errors.length) {
      root.querySelector(`[data-error="${errors[0][0]}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  async function uploadPhoto(file) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      throw new Error(messages.invalidPhoto);
    }
    const result = await fetch("/api/products/upload-image", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/octet-stream" },
      body: file
    });
    const body = await result.json().catch(() => ({}));
    if (!result.ok || !body.imageUrl) throw new Error(body.message || messages.error);
    return body.imageUrl;
  }

  function formatDescription(data) {
    const driverText = data.driver === "with"
      ? messages.withDriver : data.driver === "either" ? messages.eitherDriver : messages.withoutDriver;
    return [
      data.details.trim(),
      `${messages.driver}: ${driverText}`,
      ["with", "either"].includes(data.driver)
        ? `${messages.driverExtra}: ₹${data.driverExtra}` : ""
    ].filter(Boolean).join("\n");
  }

  async function saveListing() {
    if (!validate()) return;
    const button = root.querySelector("[data-save]");
    button.disabled = true;
    try {
      const imageUrls = [];
      for (const image of editing.images) {
        imageUrls.push(image.file ? await uploadPhoto(image.file) : image.src);
      }
      const meta = {
        mode: editing.mode,
        equipmentCategory: editing.category === "other" ? editing.categoryName.trim() : labelFor(editing.category),
        company: editing.mode === "single" ? editing.company.trim() : "",
        season: editing.season,
        setName: editing.setName.trim(),
        items: editing.items,
        model: editing.model.trim(),
        details: editing.details.trim(),
        driver: editing.driver,
        driverExtra: ["with", "either"].includes(editing.driver)
          ? Number(editing.driverExtra) : 0
      };
      const name = (editing.mode === "set"
        ? editing.setName.trim()
        : [editing.company.trim(), meta.equipmentCategory, editing.model.trim()].filter(Boolean).join(" ")
      ).slice(0, 140);
      await requestJson(`/api/products/${encodeURIComponent(editing.id)}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          description: formatDescription(meta) || messages.name,
          category: "Equipment",
          listingType: "rent",
          paymentMethod: editing.paymentMethod || "online",
          price: Number(editing.price),
          unit: editing.unit,
          stock: Math.max(1, Number(editing.product.stock) || 1),
          imageUrls,
          equipmentDetails: meta,
          whatsappPhone: editing.mobile.trim(),
          locationName: editing.location.trim()
        })
      });
      await loadListings();
      toast(messages.saved);
    } catch (error) {
      button.disabled = false;
      const target = root.querySelector('[data-error="form"]');
      if (target) target.textContent = error.message || messages.error;
      else toast(error.message || messages.error);
    }
  }

  async function toggleAvailability() {
    const item = products.find(product => product.id === editingId);
    if (!item) return;
    const button = root.querySelector("[data-stock]");
    button.disabled = true;
    try {
      const status = item.inStock ? "inactive" : "active";
      await requestJson(`/api/products/${encodeURIComponent(item.id)}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      await loadListings();
      toast(item.inStock ? messages.markedOut : messages.markedAvailable);
    } catch (error) {
      button.disabled = false;
      toast(error.message || messages.error);
    }
  }

  async function removeListing(item) {
    if (!window.confirm(messages.confirmDelete)) return;
    try {
      await requestJson(`/api/products/${encodeURIComponent(item.id)}`, { method: "DELETE" });
      products = products.filter(product => product.id !== item.id);
      history.replaceState(null, "", location.pathname);
      render();
    } catch (error) {
      toast(error.message || messages.error);
    }
  }

  function openGallery(getImages, startIndex, editable) {
    let index = startIndex;
    const modal = document.createElement("div");
    modal.className = "gm";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    const close = () => {
      modal.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      if (editable) render(true);
    };
    const draw = () => {
      const images = getImages();
      if (!images.length) return close();
      index = (index + images.length) % images.length;
      modal.innerHTML = `
        <button class="gx" data-action="close" aria-label="${messages.close}">✕</button>
        <div class="gbig">
          ${images.length > 1 ? '<button class="gp" data-action="previous" aria-label="Previous">‹</button><button class="gn" data-action="next" aria-label="Next">›</button>' : ""}
          ${imageMarkup(images[index].src || images[index])}
        </div>
        <div class="gc">${index + 1} / ${images.length}</div>
        <div class="gth">${images.map((image, imageIndex) =>
          `<button data-index="${imageIndex}" aria-label="${imageIndex + 1}"${imageIndex === index ? ' aria-current="true"' : ""}>${imageMarkup(image.src || image)}</button>`
        ).join("")}</div>
        ${editable ? `
          <div class="gbar">
            <button class="big red" data-action="delete">🗑 ${messages.delete}</button>
            <button class="big" data-action="camera">📷 ${messages.camera}</button>
            <button class="big" data-action="files">🖼 ${messages.gallery}</button>
          </div>
          <input type="file" data-picker="camera" accept="image/jpeg,image/png,image/webp" capture="environment" hidden>
          <input type="file" data-picker="gallery" accept="image/jpeg,image/png,image/webp" multiple hidden>` : ""}`;
    };
    const onKey = event => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") { index--; draw(); }
      if (event.key === "ArrowRight") { index++; draw(); }
    };
    modal.addEventListener("click", event => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.dataset.index !== undefined) {
        index = Number(button.dataset.index);
        draw();
        return;
      }
      if (button.dataset.action === "close") close();
      if (button.dataset.action === "previous") { index--; draw(); }
      if (button.dataset.action === "next") { index++; draw(); }
      if (button.dataset.action === "delete") {
        if (editing.images.length <= 1) return toast(messages.lastPhoto);
        editing.images.splice(index, 1);
        draw();
      }
      if (button.dataset.action === "camera") modal.querySelector('[data-picker="camera"]').click();
      if (button.dataset.action === "files") modal.querySelector('[data-picker="gallery"]').click();
    });
    modal.addEventListener("change", event => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;
      for (const file of files) {
        if (editing.images.length >= 12) {
          toast(messages.photoLimit);
          break;
        }
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
          toast(messages.invalidPhoto);
          continue;
        }
        editing.images.push({ src: URL.createObjectURL(file), file });
      }
      index = editing.images.length - 1;
      draw();
    });
    document.addEventListener("keydown", onKey);
    draw();
  }

  root.addEventListener("click", event => {
    const button = event.target.closest("button,[data-open]");
    if (!button) return;
    if (button.matches("[data-retry]")) return loadListings();
    if (button.matches("[data-open]")) {
      const item = products.find(product => product.id === button.dataset.open);
      if (!item) return;
      history.pushState({ equipmentDetail: true }, "", `?id=${encodeURIComponent(item.id)}`);
      return render();
    }
    if (button.matches("[data-gallery]")) {
      const [itemIndex, imageIndex] = button.dataset.gallery.split(":").map(Number);
      return openGallery(() => products.filter(isEquipmentListing)[itemIndex].images, imageIndex, false);
    }
    if (button.matches("[data-back]")) {
      if (history.state?.equipmentDetail) history.back();
      else {
        history.replaceState(null, "", location.pathname);
        render();
      }
      return;
    }
    if (button.matches("[data-edit-gallery]")) {
      return openGallery(() => editing.images, 0, true);
    }
    if (button.matches("[data-save]")) return saveListing();
    if (button.matches("[data-stock]")) return toggleAvailability();
    if (button.matches("[data-remove]")) {
      const item = products.find(product => product.id === editingId);
      if (item) removeListing(item);
      return;
    }
    if (button.matches("[data-toggle]")) {
      const [key, value] = button.dataset.toggle.split(":");
      editing[key] = value;
      return render(true);
    }
    if (button.matches("[data-item]")) {
      const key = button.dataset.item;
      const index = editing.items.indexOf(key);
      if (index < 0) editing.items.push(key);
      else editing.items.splice(index, 1);
      return render(true);
    }
  });

  root.addEventListener("input", event => {
    const field = event.target.closest("[data-field]");
    if (field && editing) editing[field.dataset.field] = field.value;
  });
  root.addEventListener("change", event => {
    const field = event.target.closest("[data-field]");
    if (!field || !editing) return;
    editing[field.dataset.field] = field.type === "number" ? Number(field.value) : field.value;
    if (field.dataset.field === "category" && editing.mode === "single") {
      editing.category = field.value;
      editing.categoryName = field.value === "other" ? editing.categoryName : labelFor(field.value);
      render(true);
    }
  });
  window.addEventListener("popstate", () => render());
  loadListings();
})();
