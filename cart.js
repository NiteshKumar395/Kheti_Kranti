(() => {
  const storageKey = "kk-marketplace-cart-v1";
  const params = new URLSearchParams(location.search);
  const requestedLanguage = params.get("lang");
  const savedLanguage = localStorage.getItem("khetiKrantiLanguage") || localStorage.getItem("kk-lang");
  const language = requestedLanguage === "hi" || requestedLanguage === "en"
    ? requestedLanguage
    : savedLanguage === "hi" ? "hi" : "en";
  const isHindi = language === "hi";
  document.documentElement.lang = language;
  const copy = isHindi ? {
    title: "आपका कार्ट",
    intro: "सामान देखें, किराये की अवधि बदलें या न चाहिए तो हटाएँ।",
    home: "खरीदारी जारी रखें",
    track: "ऑर्डर ट्रैक करें",
    empty: "कार्ट खाली है। सामान जोड़ने के लिए मार्केटप्लेस देखें।",
    deliveryTitle: "डिलीवरी की जानकारी",
    deliveryIntro: "डिलीवरी के लिए प्राप्तकर्ता और पूरा पता भरें।",
    recipientName: "प्राप्तकर्ता का नाम",
    recipientPhone: "फोन नंबर",
    address: "मकान, सड़क और इलाका",
    city: "गाँव / शहर",
    state: "राज्य",
    postalCode: "पिन कोड",
    landmark: "पहचान की जगह (वैकल्पिक)",
    instructions: "डिलीवरी निर्देश (वैकल्पिक)",
    total: "कुल राशि",
    checkout: "सुरक्षित भुगतान करें",
    choosePaymentMethod: "भुगतान का तरीका",
    onlinePayment: "ऑनलाइन भुगतान",
    cashOnDelivery: "डिलीवरी पर नकद",
    cashSuccess: "डिलीवरी पर नकद ऑर्डर हो गया। विक्रेता इसकी पुष्टि करेगा।",
    paymentConflict: "इन सामानों के लिए एक जैसा भुगतान तरीका नहीं है। अलग-अलग ऑर्डर करें।",
    duration: "अवधि",
    driverChoice: "चालक का विकल्प",
    withDriver: "चालक के साथ",
    withoutDriver: "बिना चालक",
    driverIncluded: "चालक का अतिरिक्त किराया",
    driverFree: "चालक बिना अतिरिक्त किराये के शामिल है।",
    driverExtra: "चालक का अतिरिक्त किराया",
    rental: "किराया",
    sale: "खरीद",
    remove: "हटाएँ",
    removeOne: "एक कम करें",
    addOne: "एक बढ़ाएँ",
    invalidDuration: "किराये की अवधि 1 से 720 घंटे या दिन के बीच चुनें।",
    stock: "मात्रा उपलब्ध नहीं है।",
    savingError: "कार्ट इस ब्राउज़र टैब में सहेजा नहीं जा सका।",
    login: "ऑर्डर करने के लिए पहले लॉग इन करें।",
    loading: "आपका ऑर्डर तैयार हो रहा है…",
    payMessage: "Razorpay विंडो में भुगतान पूरा करें।",
    verify: "भुगतान की पुष्टि की जा रही है…",
    failed: "भुगतान की पुष्टि नहीं हो सकी। दोबारा भुगतान करने से पहले अपने भुगतान का स्टेटस जाँचें।",
    success: "भुगतान सफल! आपका ऑर्डर दर्ज हो गया है।",
    tracking: "आपका ट्रैकिंग ID",
    trackOrder: "यह ऑर्डर ट्रैक करें",
    noOrders: "भुगतान की पुष्टि हुई, लेकिन ऑर्डर का विवरण नहीं मिला। My bookings में जाँचें।",
    unavailable: "भुगतान अभी उपलब्ध नहीं है। कुछ देर बाद फिर कोशिश करें।"
  } : {
    title: "Your cart",
    intro: "Review items, change rental duration or remove anything you no longer need.",
    home: "Continue shopping",
    track: "Track an order",
    empty: "Your cart is empty. Browse the marketplace to add items.",
    deliveryTitle: "Delivery details",
    deliveryIntro: "Enter the recipient and complete address for delivery.",
    recipientName: "Recipient name",
    recipientPhone: "Phone number",
    address: "House, street and area",
    city: "Village / city",
    state: "State",
    postalCode: "PIN code",
    landmark: "Landmark (optional)",
    instructions: "Delivery instructions (optional)",
    total: "Order total",
    checkout: "Continue to secure payment",
    choosePaymentMethod: "Payment method",
    onlinePayment: "Online payment",
    cashOnDelivery: "Cash on delivery",
    cashSuccess: "Cash-on-delivery order placed. The seller will confirm it.",
    paymentConflict: "These items do not share a payment method. Place separate orders.",
    duration: "Duration",
    driverChoice: "Driver option",
    withDriver: "With driver",
    withoutDriver: "Without driver",
    driverIncluded: "Additional driver rent",
    driverFree: "Driver is included at no extra charge.",
    driverExtra: "Additional driver rent",
    rental: "Rental",
    sale: "For sale",
    remove: "Remove",
    removeOne: "Remove one",
    addOne: "Add one",
    invalidDuration: "Choose a rental duration from 1 to 720 hours or days.",
    stock: "Requested quantity is unavailable.",
    savingError: "Your cart could not be saved in this browser tab.",
    login: "Sign in to place your order.",
    loading: "Preparing your order…",
    payMessage: "Complete payment in the secure Razorpay window.",
    verify: "Verifying your payment…",
    failed: "Payment confirmation failed. Check your payment status before trying to pay again.",
    success: "Payment successful. Your order has been placed.",
    tracking: "Your tracking ID",
    trackOrder: "Track this order",
    noOrders: "Payment was verified, but order details were not returned. Check My bookings.",
    unavailable: "Payment is unavailable right now. Please try again shortly."
  };
  document.title = `${copy.title} | Kheti Kranti`;
  document.getElementById("title").textContent = copy.title;
  document.getElementById("intro").textContent = copy.intro;
  document.getElementById("homeLink").textContent = copy.home;
  document.getElementById("trackLink").textContent = copy.track;
  document.getElementById("brand").href = `/${language}-index.html`;
  document.getElementById("brandName").textContent = "Kheti Kranti";
  document.getElementById("homeLink").href = `/${language}-index.html`;
  document.getElementById("trackLink").href = `/track?lang=${language}`;
  document.getElementById("deliveryTitle").textContent = copy.deliveryTitle;
  document.getElementById("deliveryIntro").textContent = copy.deliveryIntro;
  document.getElementById("recipientNameLabel").textContent = copy.recipientName;
  document.getElementById("recipientPhoneLabel").textContent = copy.recipientPhone;
  document.getElementById("addressLabel").textContent = copy.address;
  document.getElementById("cityLabel").textContent = copy.city;
  document.getElementById("stateLabel").textContent = copy.state;
  document.getElementById("postalCodeLabel").textContent = copy.postalCode;
  document.getElementById("landmarkLabel").textContent = copy.landmark;
  document.getElementById("instructionsLabel").textContent = copy.instructions;
  const list = document.getElementById("cartItems");
  const summary = document.getElementById("summary");
  const totalNode = document.getElementById("total");
  const messageNode = document.getElementById("message");
  const checkoutButton = document.getElementById("checkout");
  const deliveryForm = document.getElementById("deliveryForm");
  const paymentMethodSelect = document.getElementById("paymentMethod");
  document.getElementById("paymentChoiceText").textContent = copy.choosePaymentMethod;
  checkoutButton.textContent = copy.checkout;
  let items = [];
  let paymentMethod = sessionStorage.getItem("kk-cart-payment-method") || "online";
  let pendingVerification = null;
  let razorpayPromise;

  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const money = value => new Intl.NumberFormat(isHindi ? "hi-IN" : "en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 2
  }).format(Number(value) || 0);
  const showMessage = (text, success = false) => {
    messageNode.textContent = text;
    messageNode.classList.toggle("success", success);
  };
  const persist = () => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(items));
      return true;
    } catch (error) {
      console.error("Cart could not be saved:", error);
      showMessage(copy.savingError);
      return false;
    }
  };
  const driverChoices = product => {
    const mode = product.rentalOptions?.driver;
    return mode === "with" ? ["with"] : mode === "either" ? ["none", "with"] : ["none"];
  };
  const readCart = () => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(saved)) throw new Error("Saved cart format is invalid.");
      return saved.filter(entry => {
        const id = Number(entry && entry.productId);
        const product = entry && entry.product;
        const quantity = Number(entry && entry.quantity);
        return Number.isSafeInteger(id) && id > 0 && product && Number(product.id) === id &&
          ["rent", "sale"].includes(product.listingType) && Number.isSafeInteger(quantity) &&
          quantity > 0 && quantity <= Number(product.stock);
      }).map(entry => ({
        productId: Number(entry.productId),
        product: entry.product,
        quantity: Number(entry.quantity),
        rentalDuration: entry.product.listingType === "rent" ? Number(entry.rentalDuration) : null,
        driverChoice: entry.product.listingType === "rent" &&
          driverChoices(entry.product).includes(entry.driverChoice)
          ? entry.driverChoice
          : entry.product.listingType === "rent" && entry.product.rentalOptions?.driver === "with"
            ? "with" : "none"
      }));
    } catch (error) {
      console.error("Saved cart could not be loaded:", error);
      showMessage(copy.savingError);
      return [];
    }
  };
  const driverCharge = entry => entry.product.listingType === "rent" &&
    ["with", "either"].includes(entry.product.rentalOptions?.driver) && entry.driverChoice === "with"
    ? Number(entry.product.rentalOptions.driverExtra) || 0 : 0;
  const total = () => items.reduce((sum, entry) =>
    sum + (Number(entry.product.price) + driverCharge(entry)) * entry.quantity *
      (entry.product.listingType === "rent" ? entry.rentalDuration : 1), 0);

  const render = () => {
    if (!items.length) {
      list.innerHTML = `<div class="empty">${escapeHtml(copy.empty)}</div>`;
      summary.hidden = true;
      totalNode.textContent = "";
      checkoutButton.disabled = true;
      return;
    }
    summary.hidden = false;
    const availableMethods = ["online", "cash"].filter(method => items.every(entry =>
      method === "online"
        ? ["online", "both"].includes(entry.product.paymentMethod || "online")
        : ["cash", "both"].includes(entry.product.paymentMethod || "online")));
    if (!availableMethods.includes(paymentMethod)) paymentMethod = availableMethods[0] || "online";
    paymentMethodSelect.innerHTML = availableMethods.map(method =>
      `<option value="${method}"${method === paymentMethod ? " selected" : ""}>${escapeHtml(copy[method === "online" ? "onlinePayment" : "cashOnDelivery"])}</option>`
    ).join("");
    paymentMethodSelect.disabled = availableMethods.length < 2;
    checkoutButton.disabled = availableMethods.length === 0;
    checkoutButton.textContent = paymentMethod === "cash" ? copy.cashOnDelivery : copy.checkout;
    list.innerHTML = items.map(entry => {
      const product = entry.product;
      const image = product.imageUrl
        ? `<img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}">`
        : `<div class="placeholder" aria-hidden="true">🌾</div>`;
      const isRent = product.listingType === "rent";
      return `<article class="cart-line" data-id="${entry.productId}">
        ${image}
        <div>
          <h2>${escapeHtml(product.name)}</h2>
          <div class="muted">${money(product.price)} / ${escapeHtml(product.unit)} · ${isRent ? copy.rental : copy.sale}</div>
          ${isRent ? `<label class="duration">${escapeHtml(copy.duration)}
            <input type="number" min="1" max="720" step="1" value="${entry.rentalDuration}"
              data-duration="${entry.productId}" aria-label="${escapeHtml(copy.duration)}">
            ${escapeHtml(product.unit)}</label>` : ""}
          ${isRent ? `<label class="duration">${escapeHtml(copy.driverChoice)}
            <select data-driver-choice="${entry.productId}" aria-label="${escapeHtml(copy.driverChoice)}"
              ${driverChoices(product).length === 1 ? "disabled" : ""}>
              ${driverChoices(product).map(choice => `<option value="${choice}"${entry.driverChoice === choice ? " selected" : ""}>${escapeHtml(choice === "with" ? copy.withDriver : copy.withoutDriver)}</option>`).join("")}
            </select>
          </label>
          ${["with", "either"].includes(product.rentalOptions?.driver)
            ? Number(product.rentalOptions.driverExtra) > 0
              ? `<div class="muted">${escapeHtml(copy.driverIncluded)}: ${money(product.rentalOptions.driverExtra)} / ${escapeHtml(product.unit)}</div>`
              : `<div class="muted">${escapeHtml(copy.driverFree)}</div>`
            : ""}
          ` : ""}
          <button class="remove" type="button" data-remove="${entry.productId}">${escapeHtml(copy.remove)}</button>
        </div>
        <div class="qty">
          <button type="button" data-adjust="-1" data-id="${entry.productId}" aria-label="${escapeHtml(copy.removeOne)}">−</button>
          <strong>${entry.quantity}</strong>
          <button type="button" data-adjust="1" data-id="${entry.productId}" aria-label="${escapeHtml(copy.addOne)}">+</button>
        </div>
      </article>`;
    }).join("");
    totalNode.textContent = `${copy.total}: ${money(total())}`;
    if (!availableMethods.length) showMessage(copy.paymentConflict);
  };
  const api = async (url, options = {}) => {
    const response = await fetch(url, {
      credentials: "same-origin",
      ...options,
      headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(result.message || copy.unavailable);
      error.status = response.status;
      error.retryable = result.retryable;
      throw error;
    }
    return result;
  };
  const refreshRentalProducts = async () => {
    await Promise.all(items.filter(entry => entry.product.listingType === "rent").map(async entry => {
      const result = await api(`/api/products/${entry.productId}`);
      const updatedProduct = result.product;
      if (!updatedProduct || Number(updatedProduct.id) !== entry.productId ||
          updatedProduct.listingType !== "rent" || !updatedProduct.rentalOptions) {
        throw new Error(copy.unavailable);
      }
      entry.product = updatedProduct;
      if (!driverChoices(updatedProduct).includes(entry.driverChoice)) {
        entry.driverChoice = updatedProduct.rentalOptions.driver === "with" ? "with" : "none";
      }
    }));
  };
  const loadRazorpay = () => {
    if (window.Razorpay) return Promise.resolve();
    if (!razorpayPromise) {
      razorpayPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = () => {
          razorpayPromise = null;
          reject(new Error(copy.unavailable));
        };
        document.head.append(script);
      });
    }
    return razorpayPromise;
  };
  const verifyPayment = async details => {
    checkoutButton.disabled = true;
    showMessage(copy.verify);
    try {
      const result = await api("/api/payments/razorpay/verify", {
        method: "POST", body: JSON.stringify(details)
      });
      pendingVerification = null;
      sessionStorage.removeItem(storageKey);
      items = [];
      render();
      const orders = Array.isArray(result.orders) ? result.orders : [];
      const receipt = document.getElementById("receipt");
      if (orders.length) {
        receipt.innerHTML = `<h2>${escapeHtml(copy.success)}</h2><ul>${orders.map(order =>
          `<li><strong>${escapeHtml(copy.tracking)}: ${escapeHtml(order.trackingCode)}</strong>
            <br><a href="/track?code=${encodeURIComponent(order.trackingCode)}&lang=${language}">${escapeHtml(copy.trackOrder)}</a></li>`
        ).join("")}</ul>`;
        receipt.hidden = false;
        showMessage("", true);
      } else {
        receipt.hidden = true;
        showMessage(copy.noOrders, true);
      }
      return true;
    } catch (error) {
      pendingVerification = error.retryable === false ? null : details;
      showMessage(error.retryable === false ? error.message : `${error.message} ${copy.failed}`);
      checkoutButton.textContent = pendingVerification
        ? (isHindi ? "भुगतान की पुष्टि दोबारा करें" : "Retry payment confirmation")
        : copy.checkout;
      checkoutButton.disabled = !pendingVerification;
      return false;
    }
  };
  const checkout = async () => {
    if (!items.length) return;
    checkoutButton.disabled = true;
    showMessage(copy.loading);
    try {
      await refreshRentalProducts();
      if (!persist()) return;
      render();
      const session = await api("/api/auth/session");
      if (!session.authenticated) {
        location.assign(`/login?lang=${language}&returnTo=${encodeURIComponent("/cart?checkout=1&lang=" + language)}`);
        return;
      }
      if (!deliveryForm.reportValidity()) {
        checkoutButton.disabled = false;
        return;
      }
      const deliveryDetails = Object.fromEntries(new FormData(deliveryForm));
      const checkoutItems = items.map(entry => ({
        productId: entry.productId,
        quantity: entry.quantity,
        ...(entry.product.listingType === "rent"
          ? { rentalDuration: entry.rentalDuration, driverChoice: entry.driverChoice }
          : {})
      }));
      if (paymentMethod === "cash") {
        const result = await api("/api/orders", {
          method: "POST",
          body: JSON.stringify({ items: checkoutItems, deliveryDetails })
        });
        sessionStorage.removeItem(storageKey);
        items = [];
        render();
        const receipt = document.getElementById("receipt");
        receipt.innerHTML = `<h2>${escapeHtml(copy.cashSuccess)}</h2><ul>${result.orders.map(order =>
          `<li><strong>${escapeHtml(copy.tracking)}: ${escapeHtml(order.trackingCode)}</strong>
            <br><a href="/track?code=${encodeURIComponent(order.trackingCode)}&lang=${language}">${escapeHtml(copy.trackOrder)}</a></li>`
        ).join("")}</ul>`;
        receipt.hidden = false;
        showMessage("", true);
        return;
      }
      const result = await api("/api/payments/razorpay/order", {
        method: "POST",
        body: JSON.stringify({
          paymentMethod: "online",
          items: checkoutItems,
          deliveryDetails
        })
      });
      await loadRazorpay();
      let handlerStarted = false;
      const checkoutModal = new window.Razorpay({
        key: result.keyId,
        order_id: result.orderId,
        amount: result.amount,
        currency: result.currency,
        name: result.name,
        description: result.description,
        prefill: result.customer,
        theme: { color: "#176b38" },
        modal: {
          ondismiss: () => {
            if (handlerStarted) return;
            checkoutButton.disabled = false;
            api("/api/payments/razorpay/cancel", {
              method: "POST", body: JSON.stringify({ orderId: result.orderId })
            }).catch(error => console.error("Unpaid checkout reservation could not be released:", error));
            showMessage(isHindi ? "भुगतान रद्द हुआ। कार्ट में सामान सुरक्षित है।" : "Payment cancelled. Your cart is unchanged.");
          }
        },
        handler: response => {
          handlerStarted = true;
          verifyPayment({
            checkoutId: result.orderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          }).then(verified => {
            if (verified) checkoutButton.disabled = true;
          });
        }
      });
      checkoutModal.on("payment.failed", response => {
        showMessage(response.error && response.error.description || copy.unavailable);
        checkoutButton.disabled = false;
      });
      checkoutModal.open();
      showMessage(copy.payMessage);
    } catch (error) {
      showMessage(error.message);
      checkoutButton.disabled = false;
    }
  };

  list.addEventListener("click", event => {
    const remove = event.target.closest("[data-remove]");
    if (remove) {
      items = items.filter(entry => entry.productId !== Number(remove.dataset.remove));
      persist();
      render();
      return;
    }
    const adjust = event.target.closest("[data-adjust]");
    if (adjust) {
      const entry = items.find(item => item.productId === Number(adjust.dataset.id));
      if (!entry) return;
      const quantity = entry.quantity + Number(adjust.dataset.adjust);
      if (quantity <= 0) items = items.filter(item => item.productId !== entry.productId);
      else if (quantity <= Number(entry.product.stock)) entry.quantity = quantity;
      else showMessage(copy.stock);
      if (persist()) render();
    }
  });
  list.addEventListener("change", event => {
    const input = event.target.closest("[data-duration]");
    if (input) {
      const entry = items.find(item => item.productId === Number(input.dataset.duration));
      const duration = Number(input.value);
      if (!entry) return;
      if (!Number.isSafeInteger(duration) || duration < 1 || duration > 720) {
        input.value = String(entry.rentalDuration);
        showMessage(copy.invalidDuration);
        return;
      }
      entry.rentalDuration = duration;
      if (persist()) render();
      return;
    }
    const driverSelect = event.target.closest("[data-driver-choice]");
    if (!driverSelect) return;
    const entry = items.find(item => item.productId === Number(driverSelect.dataset.driverChoice));
    if (!entry || !driverChoices(entry.product).includes(driverSelect.value)) return;
    entry.driverChoice = driverSelect.value;
    if (persist()) render();
  });
  checkoutButton.addEventListener("click", () => {
    if (pendingVerification) verifyPayment(pendingVerification);
    else checkout();
  });
  paymentMethodSelect.addEventListener("change", () => {
    paymentMethod = paymentMethodSelect.value;
    sessionStorage.setItem("kk-cart-payment-method", paymentMethod);
    render();
  });

  items = readCart();
  render();
  api("/api/auth/session").then(result => {
    if (!result.authenticated || !result.user) return;
    const nameInput = deliveryForm.elements.namedItem("recipientName");
    const addressInput = deliveryForm.elements.namedItem("address");
    if (nameInput && !nameInput.value) nameInput.value = result.user.name || "";
    if (addressInput && !addressInput.value) addressInput.value = (result.user.address || "").slice(0, 300);
  }).catch(error => console.error("Could not load saved delivery defaults:", error));
  refreshRentalProducts().then(() => {
    if (persist()) render();
  }).catch(error => {
    showMessage(error.message);
  });
  if (params.get("checkout") === "1" && items.length) checkout();
})();
