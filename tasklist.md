# ✅ SurvivorConnect.org Task List

## 1. Global & Core Setup
- [x] Configure **Next.js 15.5+** app with TypeScript, Tailwind v4, shadcn UI
- [x] Add **i18n** (Hindi + English, scalable for more)
- [x] Implement **Theme Provider** (light/dark mode)
- [x] Setup **ReactLenis** for smooth scrolling
- [ ] Setup **NextAuth/Auth.js v5** for authentication (admin + survivor) ❌ //dropped
- [ ] Integrate **MongoDB** (encrypted testimonies)
- [ ] Integrate **Cloudinary** for media storage (images/audio/video)
- [x] Create **Providers wrapper** (Intl, Theme, Lenis)
- [ ] Add **Safe Exit button** (redirects to neutral page quickly)
- [ ] Implement **Mobile-first responsive layout**
- [ ] Apply **Accessibility (WCAG)**: screen reader labels, ARIA roles, alt text, audio/video support

---

## 2. Homepage
- [ ] Build **Hero banner** with tagline
- [ ] Section: Short intro about SurvivorConnect & JMN
- [ ] Quick links (Get Help | Share Testimony | Join Community)
- [ ] News/Updates carousel (events, blogs, survivor stories)

---

## 3. About Page
- [ ] Section: Who We Are (JMN, PVCHR, project background)
- [ ] Section: Vision & Mission (survivor-centric support)
- [ ] Section: Partners (IRCT, Gwangju HR Peace Foundation, etc.)
- [ ] Section: Team (Shruti, Lenin, advisors, trustees)

---

## 4. Support Services
- [ ] **Connect+ Platform** (peer groups, community learning, survivor forums)
- [ ] **Psychosocial Care** (counseling, testimonial therapy info, family support)
- [ ] **Legal Aid & Advocacy** (filing complaints, judicial help, compensation)
- [ ] **Capacity Building** (trainings, workshops, resources for HR defenders)

---

## 5. Survivor Voices
- [ ] Section: Testimonies (written/audio/video)
- [ ] Section: Reintegration stories
- [ ] Section: Success stories (compensation, healing journeys)
- [ ] Build **“Submit Your Story”** feature with:
  - [ ] Anonymity toggle
  - [ ] Encryption of testimonies
  - [ ] Media uploads (Cloudinary)
  - [ ] 2FA security for survivors

---

## 6. Research & Publications
- [ ] Section: Research reports & evaluations (IRCT + global)
- [ ] Section: Blogs & articles
- [ ] Section: Policy briefs, advocacy papers
- [ ] Section: Training manuals, toolkits

---

## 7. Events & Activities
- [ ] Section: Workshops & Webinars (digital literacy, trauma care, survivor rights)
- [ ] Section: Reintegration ceremonies
- [ ] Section: Campaigns & Advocacy events
- [ ] Section: Media coverage, awards, recognitions

---

## 8. Resources
- [ ] Legal rights & survivor schemes
- [ ] Helpline numbers (mental health, women’s rights, NHRC, etc.)
- [ ] Downloadable guides (trauma care, self-help tools)
- [ ] FAQs (survivor + defenders)

---

## 9. Get Involved
- [ ] Volunteer / Internship opportunities page
- [ ] Partner with us (CSOs, networks, legal experts)
- [ ] Survivor leadership programs
- [ ] Internship/Youth ambassador programs

---

## 10. News & Media
- [ ] Latest blogs
- [ ] Press releases
- [ ] Social media feed integration (Twitter/X, FB, Insta)
- [ ] Photo/video gallery (testimonial therapy, workshops, field visits)

---

## 11. Donate & Support
- [ ] Secure donation page (integrate with Razorpay/Stripe/PayPal + FCRA compliant)
- [ ] “Support a Survivor” campaign banners
- [ ] Transparency reports (audited financials)

---

## 12. Contact Us
- [ ] Office details (Varanasi + Jharkhand)
- [ ] Contact form with email forwarding
- [ ] **Emergency Help Button** (direct dial to helplines)

---

## 🔒 Security & Privacy Must-Haves
- [ ] Implement **2FA** for survivor & admin accounts
- [ ] Encrypt testimonies before storing in MongoDB (AES-256-GCM)
- [ ] Use JWT for auth sessions
- [ ] Add **rate-limiting** on testimony submissions
- [ ] **Admin Dashboard**:
  - [ ] Add blogs, update rules/regulations, upload learning materials
  - [ ] Receive & view testimonies (with decryption tools)
  - [ ] Audit logs for all admin actions
- [ ] Add **Safe Exit button** (instant redirect + clears session)
- [ ] Ensure **CSP, HSTS, Secure cookies**
