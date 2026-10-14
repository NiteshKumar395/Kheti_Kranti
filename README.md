# Kheti Kranti 🌾

**Kheti Kranti** is an online marketplace for farmers. Farmers can **buy**, **sell** and **rent** farm equipment and products. Every farmer account can do all three, so there is no separate "buyer" or "seller" signup.

**What it uses:**

| Part | Technology | What it does |
|---|---|---|
| Login & passwords | Firebase Authentication | Keeps passwords safe. Passwords are never saved in MySQL. |
| Data | MySQL | Stores profiles, listings, orders, categories, reviews. |
| Payments | Razorpay | Takes online payments and gives refunds. |
| Emails | SMTP (any email provider) | Sends OTP codes and order emails. |
| Maps (admin only) | Google Maps | Shows where listings are located. |
| Server | Node.js | Runs the website and the API. |

---

## Table of contents

1. [Quick start](#1-quick-start)
2. [The `.env` settings](#2-the-env-settings)
3. [Firebase setup](#3-firebase-setup)
4. [Accounts and login](#4-accounts-and-login)
5. [Selling and renting (listings)](#5-selling-and-renting-listings)
6. [Buying and checkout](#6-buying-and-checkout)
7. [Orders, cancellation and refunds](#7-orders-cancellation-and-refunds)
8. [Ratings and reviews](#8-ratings-and-reviews)
9. [Website pages and features](#9-website-pages-and-features)
10. [Admin panel](#10-admin-panel)
11. [Password recovery](#11-password-recovery)
12. [Email notifications](#12-email-notifications)
13. [Razorpay payments](#13-razorpay-payments)
14. [API list](#14-api-list)
15. [Security features](#15-security-features)
16. [Testing and going live](#16-testing-and-going-live)
17. [Troubleshooting](#17-troubleshooting)
18. [Known limits](#18-known-limits)
19. [Ideas for new features](#19-ideas-for-new-features)

---

## 1. Quick start

1. **Install** Node.js and start a MySQL server on your computer.
2. **Create your settings file.** Look for a file called `.env` in the project folder.
   - If it does not exist, copy `.env.example` and rename the copy to `.env`.
   - If it already exists, **do not overwrite it**.
3. **Fill in `.env`** (see [section 2](#2-the-env-settings)).
4. Run these commands:
   ```bash
   npm install
   npm start
   ```
5. Open **http://localhost:5000** in your browser.
6. Check that everything started well: open **http://localhost:5000/api/health**.

**What happens on first start:** the server creates the database `kheti_kranti` (if allowed) and all the tables it needs. It only *adds* missing tables and columns. It never deletes your existing data.

> **Using shared hosting (like cPanel)?** You usually cannot create databases from code. Create the database yourself in the control panel, then set `DB_CREATE_IF_MISSING=false`. The app will still create its own tables, so the database user needs permission to create tables.

---

## 2. The `.env` settings

All secret settings live in one file: `.env` in the project root. **Never upload this file to GitHub.**

| Setting | What it is for |
|---|---|
| MySQL values (host, user, password, database name) | Connect to your database. The user must be allowed to create tables. |
| `DB_CREATE_IF_MISSING` | `true` = app may create the database. `false` = database already exists (use on cPanel). |
| `FIREBASE_*` values | Firebase **Web app** settings (public, safe to show in the browser). |
| `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS` | Firebase **Admin** key. **Private. Server only.** |
| `SESSION_SECRET` | A long random secret (at least 32 characters). Protects sessions and OTP codes. **Never share it. Never change it after saving Razorpay keys.** |
| SMTP values (`SMTP_USER`, password, host, port) | Used to send OTP and order emails. |
| `SMTP_FROM_EMAIL` | Should be the same as `SMTP_USER`. If different, the app sends from `SMTP_USER` anyway. |
| `PRIMARY_ADMIN_EMAIL` | The email of the **one main administrator**. |
| `OTP_MAX_ATTEMPTS` | How many wrong OTP tries are allowed. Default: 5. |
| `OTP_RESEND_COOLDOWN_SECONDS` | Wait time before asking for a new OTP. Default: 60. |
| `COOKIE_SECURE` | Set to `true` when your site uses HTTPS. |
| `CORS_ORIGIN` | List of other websites allowed to call your API (comma-separated). Leave empty if the website and API are on the same address. **Never use `*`.** |
| `APP_NAME`, `APP_BRAND_LABEL` | The title and small label shown on the login page. |
| `GOOGLE_MAPS_API_KEY` | Browser key for the admin map. Optional. |
| Razorpay keys (optional here) | You can also set these from the admin panel instead. |

---

## 3. Firebase setup

1. In **Firebase Console → Authentication → Sign-in method**, turn on **Email/Password**.
2. In **Authentication → Settings → Authorized domains**, add your website domain. Also add `localhost` for local testing.
3. In **Project settings → Your apps**, copy the Web app settings into the `FIREBASE_*` values in `.env`. The app gives these to the browser through `/api/config/firebase`. The Web API key is **public**, so this is safe.
4. Give the server its **Admin credentials** privately. Use either:
   - Application Default Credentials, or
   - `FIREBASE_SERVICE_ACCOUNT_JSON` in `.env`.

   Never put Admin credentials in browser code or share them.
5. Restart the server.

**Health check:** `/api/health` tells you if the Admin SDK started. It cannot prove the credentials are valid, only that they were found.

---

## 4. Accounts and login

### Registering (new farmer)

1. The person enters their email.
2. The server sends a **6-digit OTP** by email.
3. The person enters the OTP to prove the email is theirs.
4. The person creates a password. The server saves it in **Firebase** (not MySQL).
5. The account is created with the role **farmer**.

Important rules:
- Registration **always** gives the `farmer` role. It is impossible to become an admin by registering.
- If an **unverified, non-admin** profile already exists for that email, the new person can claim it after OTP verification. It becomes a `farmer`, keeps its marketplace record, and all old sessions are logged out.
- **Verified** profiles and **admin** profiles can never be claimed this way.

### OTP rules (both registration and password reset)

- Expires after **1 minute**.
- Stored only as a **scrambled hash** (HMAC), never as plain text.
- Limited wrong attempts (default 5).
- Can be used **only once**.
- A new OTP can be requested only after the cooldown (default 60 seconds).

### Logging in

- The person logs in with email and password through Firebase.
- The server checks the Firebase token. It also requires either a verified email or a valid registration OTP.
- The server then creates a **session** stored in MySQL and gives the browser a secure **HTTP-only cookie**.

### Admin login (extra safe)

Admins need **two steps**: email + password, then a **6-digit email OTP**. This needs working SMTP and a `SESSION_SECRET` of 32+ characters. Admin sessions without OTP are never accepted.

### Roles

| Role | Can do |
|---|---|
| `farmer` | Buy, rent, sell, list equipment, manage own orders. |
| `admin` | Everything in the admin panel. |
| Primary admin | The single admin in `PRIMARY_ADMIN_EMAIL`. Only this person can invite, block or delete other admins. |

New admin accounts are never created from the website. A trusted database maintainer should provision them.

---

## 5. Selling and renting (listings)

Any signed-in farmer can create a listing. Signed-out visitors are sent to sign in, then returned to the listing form.

### Listing form

- Loads categories from `/api/categories`.
- Supports **Sale** and **Rental** listings.
- Captures the seller's location (only after the browser asks permission).
- Uploads a cover photo (JPG, PNG, WEBP, max 5 MB). The server checks the real file type, not just the name, and saves it with a safe generated name.

### Sale listings

- Have a price and an **available quantity**.

### Rental listings

- Have an **hourly or daily price**.
- Can include driver details. A rental can: require a driver, offer a driver as an option, or have no driver.
- The seller sets a separate **driver rate per hour/day**. Enter `0` if the driver is free.

### Payment choices (per listing)

The seller picks one: **online payment**, **cash on delivery (COD)**, or **both**. This can be changed when editing the listing.

### Managing listings (**My listings** page)

- **Activate / deactivate** a listing (hide it temporarily).
- **Remove** a listing. This is a "soft delete": it disappears from the marketplace but old order history stays safe.
- Edit a listing at any time.

---

## 6. Buying and checkout

### Delivery details

Before ordering, the buyer must give:

- Recipient name
- Indian phone number
- Street / house address
- Village or city
- State
- PIN code

Optional: landmark and delivery instructions.

**Privacy:** these details are shown only to the seller (in **My orders**) and in the seller's new-order email. They are **not** shown on the buyer's **My bookings** card, and the public tracking page never shows address or phone.

### Payment method rules

- Checkout shows only payment methods that **every item in the cart accepts**.
- If two items have no payment method in common, the buyer must order them separately.

### Rental price

```
Total = rental rate × duration × number of units  (+ driver fee if chosen)
```

- Duration: **1 to 720** hours or days.
- Driver fee = driver rate × duration × units (only if the buyer chooses a driver; no driver = no fee).
- The **server** calculates and checks the price. The driver fee is stored separately from the equipment price so invoices stay correct.

### What happens after payment

| Payment type | Result |
|---|---|
| Online (captured) | Order is **confirmed** automatically. |
| Cash on delivery | Order stays **pending** until the seller confirms. |

### Receipt

Paid orders have a **Download payment receipt** button. It saves a self-contained HTML file. Buyers can print it or save it as PDF from their browser.

---

## 7. Orders, cancellation and refunds

- **Sellers** manage orders in **My orders**. **Buyers** see their purchases in **My bookings**.
- Order status flow: `pending` → `confirmed` → `completed` (or `cancelled`).

### Who can do what

| Action | Who |
|---|---|
| Confirm a pending COD order | Seller |
| Cancel a pending COD order | Seller |
| Cancel a confirmed order | **Buyer only** |
| Mark order delivered (`completed`) | Seller |

### Cancelling

- A **reason is required**.
- For **online-paid** orders, the app asks Razorpay to refund the order amount to the **original payment method** *before* marking the order cancelled. Stock is then released.
- The screen shows **refund pending** or **refund initiated**. "Initiated" does **not** mean the bank has finished; the money may take time.
- If Razorpay gives an unclear answer, the order is **protected from double refunds**. The buyer should contact support with the order ID and payment ID. Support must check it in the Razorpay Dashboard.

---

## 8. Ratings and reviews

- A buyer can rate a product **once**, only after a **paid order is marked completed**. Ratings stay attached to that product.
- Buyers with a completed, paid order can also write **one review per account** about the whole site. Other users can mark reviews as helpful.
- The homepage's four feature cards are **descriptions of features**, not customer opinions. No fake names or fake ratings are shown. Real reviews come only from completed, paid orders.

---

## 9. Website pages and features

### Main pages

| Page | Address |
|---|---|
| Login (opens at root) | `/` |
| English homepage | `/en-index.html` |
| Hindi homepage | `/hi-index.html` |
| Profile | `/profile` |
| My orders / bookings | `/orders` |
| My listings | `/listings` |
| Admin panel | `/admin.html` or `/admin` |

`/dashboard` simply redirects to the marketplace. Old dashboard links redirect to the matching new page. Account pages need a signed-in session.

### Language

- One **English / हिन्दी** selector sits in the top-right and stays in the same place.
- The browser remembers your choice.
- English is the default.
- **Back to website** on the login page opens the public homepage. After login, the same homepage opens in your chosen language.

### Account menu

Direct links to: **My Profile**, **Orders / My orders**, **Track order**, **Saved Addresses**, and **My listings** (for sellers). No extra dashboard in between.

### Profile

- Shows saved details as read-only. If details are missing, an **Add profile details** button appears. After saving, use **Edit profile details**.
- Email is read-only because it is tied to the verified login.
- The profile photo is shown in the centre and can be uploaded (JPG, PNG, WEBP, max 5 MB). Only the owner can see it.
- **Live location card:** asks for browser location only after the user taps **Use my live location**. Shows approximate coordinates on that page only. It does **not** save or share them.

### Homepage

- Rentals come live from the database. If there are none, an empty message is shown (no fake sample listings).
- Location is requested only after the visitor taps **Use my location**.
- Public product data shows **distance only**, never exact coordinates.
- Four feature cards explain: equipment rental, listing your equipment, driver options, and order receipts. Photos are stored locally from Wikimedia Commons, with photographer and license links.

### Search

- **Live suggestions** appear while typing, showing image, name and category. Names that match rank above description-only matches.
- Typing does not reload the product list.
- Pressing **Enter** shows results in a focused view on the same page. Names, descriptions and category names are searched. **Show more search results** loads more.
- Clicking a suggestion opens that product.

### Distance filter

On the homepage and category page, choose **5, 10 or 20 km**, or a **custom 1–500 km** radius. The browser asks for location permission. Only active products with saved coordinates inside the radius are shown, nearest first.

### Help chatbot

- A bilingual (English/Hindi) assistant for common questions.
- Answers come from your own content. It uses **no outside AI service and no API key**.
- Admins can edit its questions and answers from the admin panel. The public chatbot checks for updates while open.

### Contact and footer

- **Contact us / संपर्क करें** button shows phone and email: **+91 96087 83010** and **vishal9608783010@gmail.com**.
- Footer links: Privacy Policy, Terms, Sitemap.

### Product tracking

Public tracking pages show the order status but **never** the delivery address or phone number.

---

## 10. Admin panel

Open it through the website after signing in as admin. **Do not open the HTML file directly** from your computer, because then it has no session or backend.

Every visit to `/admin` requires the administrator password and email OTP, even if that browser had signed in before. After OTP verification, a session-bound entry ticket lets the dashboard open; it expires after two minutes. Opening `/admin.html` directly without a current ticket starts sign-in again. A signed-in non-admin is denied. The server checks the admin role on the page **and** on every admin API. Admin pages are never cached.

### Layout

- App-style workspace: clicking a section shows only that section.
- Sign-out is in the navigation.
- On phones, a collapsible menu gives access to all tools.
- Admin sign-in has its own admin-style look. Customer sign-in is unchanged.

### Sections

| Section | What you can do |
|---|---|
| **Overview** | See counts: marketplace users (not counting admins), email-verified users, administrators, active categories, mapped listing locations, and listings without coordinates. Quick actions are here too. |
| **Users** | Search and page through accounts. **Block / unblock** users. Blocking keeps their listings and order history, ends their sessions, and stops sign-in and API access. Admins cannot be blocked here. |
| **Delete user** | Permanently deletes a marketplace account after you type its exact email. Removes the account, listings, reviews, orders, checkouts, sessions, uploaded photos and the Firebase login. **Cannot be undone. Does not refund Razorpay.** If another customer's order references the seller's listing, deletion is refused and the seller is blocked instead. |
| **Admin team** | The primary admin invites new admins. The system creates a Firebase account (random temporary password) and a MySQL admin profile, then emails verification and password-setup links. The invitee must verify email and choose their own password. Invitations are rate limited. |
| **Product map** | Google Maps view of listing locations. Marker details show product name, type, status and seller's location name. Shows only non-deleted listings that have coordinates. Never visible to normal users. |
| **Categories** | Add categories (English + Hindi names, display order), edit, hide/show, and upload a category photo (JPG/PNG/WEBP, max 5 MB). Categories are **hidden, not deleted**, so old products stay safe. Hidden categories can be turned back on. |
| **Brand / Logo** | Upload a PNG logo (max 5 MB). It appears in the admin header, sign-in page, account area, storefront headers, cart and tracking pages. Saved safely as `lobo.png`. |
| **Legal PDFs** | Upload, replace or delete the Privacy Policy, Terms and Sitemap PDFs (max 5 MB each). If you delete a PDF, the matching HTML page is shown again. Keep these in persistent storage: `uploads/legal-documents`. |
| **Help chatbot** | Edit the English/Hindi questions and answers. |
| **Payment gateway** | Save Razorpay keys (see [section 13](#13-razorpay-payments)). |

### Google Maps setup

- `GOOGLE_MAPS_API_KEY` is a **browser key** (not secret).
- In Google Cloud, **restrict** it to your site's HTTP referrers and to the **Maps JavaScript API**, and turn on billing.
- If Maps is not set up, the rest of the site still works.

---

## 11. Password recovery

Password reset uses a **6-digit OTP by email** (not Firebase's reset link).

1. User enters their email.
2. The server checks that the email has a Firebase account linked to a MySQL profile. It **never creates** a Firebase user here. Unknown emails get a clear "account not found" message.
3. OTP is emailed (same rules as registration: 1 minute expiry, 5 attempts, one use, 60 second resend wait).
4. After the user enters the right OTP and a new password, **Firebase** updates the password.

Notes:
- Success is shown only when the email provider accepts the recipient. The email may still land in spam or be delayed.
- If SMTP or Firebase Admin is not configured, the app shows the real problem instead of pretending the reset worked.
- Keep `SESSION_SECRET` strong and private, because it protects the stored OTP hashes.

---

## 12. Email notifications

All emails are in **English and Hindi** and use your SMTP settings.

| When | Who gets the email | What it contains |
|---|---|---|
| Seller confirms an order | Buyer | Status update |
| Seller marks order delivered (`completed`) | Buyer | Status update |
| Online payment verified, or COD order placed | Each seller | Order ID, tracking ID, items, quantity, total, delivery details, reminder to open **My orders** |

If the email fails:
- The order or status change is **still saved**.
- The seller sees a warning, and the server logs the error.
- "Accepted by the email provider" does not mean "reached the inbox".
- WhatsApp is **not** set up.

---

## 13. Razorpay payments

### Setting up

1. Sign in as admin → **Payment gateway**.
2. Enter a matching **Key ID** and **Key Secret** and save.
3. The app checks the key format and does a read-only test call to Razorpay. **No payment is made during setup.**
4. **Test keys** = demo mode. **Live keys** = real charges (the panel asks you to confirm).
5. The secret is **encrypted** in MySQL using a key made from `SESSION_SECRET`. It is never sent back to the browser.

Other rules:
- Keys saved in the admin panel **win** over keys in `.env`. The panel can also turn off an `.env` gateway.
- Each checkout saves an encrypted copy of its keys, so it can still be verified or refunded even if an admin changes keys later.
- Until valid keys exist, checkout says Razorpay is unavailable. **No fake payment or order is ever created.**
- Never paste the secret into HTML, JavaScript, screenshots, chats or Git.

### How a payment is processed

1. Customer must be signed in.
2. Server recalculates prices and stock from MySQL (never trusts the browser).
3. Stock is **reserved** during checkout.
4. After payment, the server checks the Razorpay signature and fetches the payment to confirm it was **captured**.
5. Seller-specific orders are created.
6. If the checkout expired or stock became invalid after payment, a **full refund** is requested automatically.
7. Repeating the confirmation is safe (no duplicate orders). An extra captured payment for an already-paid checkout gets a refund request.

### Testing

- Use **Razorpay test-mode** keys and test payment methods.
- Turn on **automatic capture** in your Razorpay payment settings.
- Try a very small amount first.

### Money to sellers

- All customer money goes to **your platform's Razorpay account**.
- **Seller payouts are manual.** The system does not split or transfer money automatically.
- Check settlements and refunds in the Razorpay Dashboard.

---

## 14. API list

### General

| Endpoint | Purpose |
|---|---|
| `GET /api/health` | Database and service status. Never shows secrets. |
| `GET /api/config/firebase` | Public Firebase Web settings. |
| `GET /api/config/public` | Brand name and label. |

### Accounts

| Endpoint | Purpose |
|---|---|
| `POST /api/auth/register/request-otp` | Send registration OTP. |
| `POST /api/auth/register/verify-otp` | Check registration OTP. |
| `POST /api/auth/register` | Finish registration. |
| `POST /api/auth/login` · `POST /api/auth/logout` | Log in / out. |
| `GET /api/auth/me` | Current user. |
| `GET /api/auth/session` | Check session (signed-out is not treated as an error). |
| `POST /api/auth/forgot-password` | Send reset OTP. |
| `POST /api/auth/verify-reset-otp` | Check reset OTP. |
| `POST /api/auth/reset-password` | Set new password. |
| `GET /api/profile` · `PUT /api/profile` | Read / save profile. |
| `POST /api/profile/photo` | Upload profile photo. |

### Products and categories

| Endpoint | Purpose |
|---|---|
| `GET /api/products` | Search, filter, distance sort. |
| `GET /api/products/:id` | One active product (no private coordinates). |
| `GET /api/products/mine` | Seller's own listings. |
| `POST /api/products` · `PUT /api/products/:id` | Create / edit listing. |
| `PATCH /api/products/:id/status` | Activate / deactivate. |
| `DELETE /api/products/:id` | Soft-remove listing. |
| `POST /api/products/upload-image` | Upload cover photo. |
| `GET /api/categories` | Active categories. |

### Orders and payments

| Endpoint | Purpose |
|---|---|
| `POST /api/payments/razorpay/order` | Start online checkout. |
| `POST /api/payments/razorpay/verify` | Confirm payment. |
| `POST /api/payments/razorpay/cancel` | Cancel a checkout. |
| `GET /api/orders` · `POST /api/orders` | List orders / place COD order. |
| `PATCH /api/orders/:id/status` | Change order status. |

### Ratings and reviews

| Endpoint | Purpose |
|---|---|
| `GET /api/ratings` · `POST /api/products/:id/ratings` | Product ratings. |
| `GET /api/site-reviews` · `GET /api/site-reviews/mine` | Read site reviews. |
| `POST/PUT /api/site-reviews` | Write / edit your review. |
| `PUT/DELETE /api/site-reviews/:id/helpful` | Mark a review helpful. |

### Admin only

| Endpoint | Purpose |
|---|---|
| `GET /api/admin/overview` | Counts and stats. |
| `GET /api/admin/users` · `PUT /api/admin/users/:userId/status` | List users / block / unblock. |
| `DELETE /api/admin/users/:userId` | Permanently delete (needs email confirmation). |
| `GET/POST /api/admin/categories` · `PUT /api/admin/categories/:slug` · `PATCH /api/admin/categories/:slug/status` | Manage categories. |
| `POST /api/admin/categories/:slug/image` | Category photo. |
| `GET /api/admin/members` · `POST /api/admin/members/invite` | Admin list / invite. |
| `GET /api/admin/legal-documents` · `POST/DELETE /api/admin/legal-documents/:documentId` | Legal PDFs. |
| `POST /api/admin/logo` | Upload logo. |

---

## 15. Security features

- Passwords live only in Firebase.
- Sessions are in MySQL; the cookie is HTTP-only. Use `COOKIE_SECURE=true` on HTTPS.
- OTPs are hashed, short-lived, limited and single-use.
- Admins need email OTP on every admin-panel visit. A short-lived entry ticket is bound to the verified session.
- Admin rights are checked on the server, never trusted from the browser.
- Prices and stock are always recalculated on the server.
- Uploaded images are checked by their real file signature.
- Database queries use parameters (protects against SQL injection).
- Exact product coordinates are never public.
- Delivery address and phone are shown only to the involved seller.
- Razorpay secrets are encrypted and never sent to the browser.
- Cross-origin access is blocked unless the origin is listed in `CORS_ORIGIN`.

### Rate limits (per IP, per 15 minutes)

| Action | Limit |
|---|---|
| Login | 20 |
| Registration / reset OTP requests | 5 |
| OTP verification and registration | 10 |
| Payment actions | 20 |

Too many requests get HTTP **429** with a `Retry-After` header. These limits are kept in the server's memory, so if you run **more than one server**, you need a shared store (such as Redis).

---

## 16. Testing and going live

### Quick syntax checks

```bash
node --check server.js
node --check Marketplace.js
node --check "static pages\machine.js"
node --check "static pages\rent-out.js"
```

There is currently **no** `npm test` or `npm run check` script.

### Before going live (checklist)

- [ ] Use **HTTPS** and set `COOKIE_SECURE=true`
- [ ] Strong, private `SESSION_SECRET`
- [ ] `CORS_ORIGIN` lists only your real website addresses
- [ ] MySQL user has access only to the needed database
- [ ] `.env`, Firebase Admin key, SMTP password and Razorpay secret are **not** in Git
- [ ] Live Razorpay keys saved only on the server
- [ ] Google Maps key restricted by referrer and API
- [ ] `uploads/` (including `uploads/legal-documents`) is on persistent storage
- [ ] Database and uploaded files are **backed up** before upgrades
- [ ] Refunds and settlements checked in the Razorpay Dashboard
- [ ] Webhook / reconciliation added (see ideas below)

> No real payment or refund has been tested as part of these code changes. Test with Razorpay test mode first.

---

## 17. Troubleshooting

| Problem | What to try |
|---|---|
| "Firebase Admin credentials unavailable" | Set `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS` on the server (or fix Application Default Credentials), then restart. |
| OTP email not arriving | Check SMTP details, make sure `SMTP_FROM_EMAIL` matches `SMTP_USER`, look in spam. |
| Admin login fails at OTP step | SMTP must work and `SESSION_SECRET` must be 32+ characters. |
| Cannot create database on hosting | Create it manually and set `DB_CREATE_IF_MISSING=false`. |
| Checkout says Razorpay unavailable | Save valid keys in **Payment gateway**. |
| Saved Razorpay keys stopped working | `SESSION_SECRET` was changed. Restore it, or re-enter the keys. |
| Admin page does not work when opened as a file | Open it through `http://localhost:5000/admin.html` after signing in. |
| Map is blank | Check `GOOGLE_MAPS_API_KEY`, referrer restrictions and billing. |
| Too many requests (429) | Wait for the `Retry-After` time. |

---

## 18. Known limits

- Seller payouts are manual.
- No Razorpay **webhook** yet. If the buyer closes the browser before payment is confirmed, the order may not be recovered automatically.
- Rate limits are in memory (single server only).
- WhatsApp notifications are not set up.
- Email delivery cannot be guaranteed after the provider accepts the message.
- An order refund "initiated" is not the same as "settled in the bank".
- Admin accounts cannot be created from the website; they must be provisioned safely or invited by the primary admin.

---

## 19. Ideas for new features

### 🔒 Must-have for production

1. **Razorpay webhooks + reconciliation job.** Recovers payments if the browser closes, and updates refund status automatically.
2. **Shared rate-limit store (Redis).** Needed if you run more than one server.
3. **Automated tests** (`npm test`) for checkout, refunds, OTP and role checks.
4. **Error monitoring and logs** (for example Sentry) and uptime alerts on `/api/health`.
5. **Automatic database and uploads backups.**
6. **Cloud image storage** (S3, Cloudinary or Firebase Storage) with a CDN, so uploads survive server changes.

### 💰 Money and orders

7. **Seller payouts** with Razorpay Route or RazorpayX, with a commission setting.
8. **Seller earnings dashboard**: sales, pending payouts, charts.
9. **Security deposit** for rentals, refunded after return.
10. **Rental availability calendar** to stop double booking of the same machine on the same dates.
11. **Coupons and discounts.**
12. **GST invoices** (PDF) with seller GSTIN.
13. **Delivery charges** by distance or by seller.
14. **UPI, wallet and EMI** options.
15. **Order dispute / return request** flow, with admin mediation.

### 📱 User experience

16. **More languages**: Bhojpuri, Marathi, Punjabi, Tamil, Telugu and others.
17. **Voice search and voice input** in Hindi (many farmers prefer speaking).
18. **Installable app (PWA)** with offline support for weak networks.
19. **SMS / WhatsApp / push notifications** for orders, OTP and reminders.
20. **Wishlist / favourites** and **recently viewed**.
21. **Compare equipment** side by side.
22. **Multiple photos and a short video** per listing.
23. **Multiple saved addresses** with a default (the menu already names "Saved Addresses").
24. **Seller public profile page** with ratings and all listings.
25. **Buyer–seller chat** (or call-masking) so phone numbers stay private.

### 🌾 Farming-specific

26. **Mandi (market) price tracker** for crops.
27. **Weather forecast** and sowing/harvest alerts by location.
28. **Crop and equipment guides**, and short how-to videos.
29. **Government scheme and subsidy information** (PM-KISAN, equipment subsidy and similar).
30. **Buy / sell crops and produce directly** (fresh produce, seeds, fertilizer), not only equipment.
31. **Farmer groups / cooperative (FPO) accounts** that share equipment.
32. **Operator / driver directory**, where drivers have their own profile, rates and ratings.
33. **Equipment maintenance reminders** and service-provider listings.
34. **AI crop help**, such as plant disease detection from a photo.

### 🛡️ Trust and safety

35. **Seller verification badge** (Aadhaar / ID check, GST, bank).
36. **Report listing / report user** button with an admin review queue.
37. **Admin audit log** (who blocked, deleted, or changed what and when).
38. **Two-factor authentication** for all users (optional).
39. **Photo moderation** (basic checks for inappropriate images).

### ⚙️ Admin and developer

40. **Reports and analytics**: sales per day, top categories, active users, refund rate.
41. **Export to CSV / Excel** for users, orders and payments.
42. **Role levels** such as support staff and finance, instead of only "admin".
43. **API documentation** (Swagger / OpenAPI).
44. **Docker setup** and a **GitHub Actions** pipeline for tests and deployment.
45. **Database migrations** (a tool such as Knex or Prisma) instead of automatic table changes on startup.
46. **SEO improvements**: sitemap generation, meta tags and structured data for products.

### Suggested order to build

1. Webhooks and tests
2. Cloud image storage and backups
3. Rental availability calendar
4. Seller payouts
5. Notifications (SMS / WhatsApp)
6. Hindi voice search and PWA
7. Farming tools (mandi prices, weather, schemes)

---

**Support:** +91 96087 83010 · vishal9608783010@gmail.com