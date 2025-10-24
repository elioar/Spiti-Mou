# 🏠 Homely - Luxury Real Estate Website

Ένας σύγχρονος και εντυπωσιακός ιστότοπος για την προβολή πολυτελών ακινήτων, δημιουργημένος με Next.js και σύγχρονα web technologies.

## ✨ Χαρακτηριστικά

- 🎨 **Σύγχρονος UI/UX Design** - Εντυπωσιακός hero section με background image
- 📱 **Responsive Design** - Προσαρμόζεται σε όλες τις συσκευές
- ⚡ **High Performance** - Χρησιμοποιεί Next.js 16 με τα πιο σύγχρονα features
- 🎯 **TypeScript** - Type-safe development για καλύτερη ποιότητα κώδικα
- 🎨 **Tailwind CSS 4** - Utility-first styling με τα πιο σύγχρονα CSS features
- 🔍 **SEO Optimized** - Βελτιστοποιημένο για search engines

## 🛠️ Τεχνολογίες

- **Next.js 16.0.0** - React framework με App Router
- **React 19.2.0** - Πιο σύγχρονη έκδοση του React
- **TypeScript 5** - Type-safe JavaScript development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful & consistent icon toolkit
- **ESLint** - Code quality και consistency

## 🚀 Γρήγορη Εκκίνηση

### Προαπαιτούμενα
- Node.js 18+ 
- npm ή yarn

### Εγκατάσταση
```bash
# Clone το repository
git clone <repository-url>
cd spitimou

# Εγκατάσταση dependencies
npm install
```

### Development
```bash
# Εκκίνηση development server
npm run dev

# Εναλλακτικά με webpack (αν υπάρχουν προβλήματα με turbo)
npm run dev:webpack
```

Ανοίξτε [http://localhost:3000](http://localhost:3000) για να δείτε το αποτέλεσμα.

### Production Build
```bash
# Build για production
npm run build

# Εκκίνηση production server
npm start
```

### Code Quality
```bash
# ESLint check
npm run lint
```

## 📁 Δομή Project

```
spitimou/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout με metadata
│       ├── page.tsx        # Home page με hero section
│       ├── globals.css     # Global styles & Tailwind imports
│       └── favicon.ico     # Website icon
├── public/
│   ├── hero_background.avif # Hero background image
│   ├── hero_img.png        # Additional hero image
│   └── ...                 # Άλλα static assets
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── eslint.config.mjs      # ESLint configuration
```

## 🎨 Design Features

### Hero Section
- Εντυπωσιακό background image με overlay
- Responsive typography με custom fonts
- Call-to-action buttons με hover effects
- Pagination dots για navigation

### Header
- Fixed navigation με logo
- Contact information display
- Responsive menu button

### Property Info Bar
- Property details (bedrooms, bathrooms, parking)
- Price display με professional styling
- Responsive layout για mobile devices

## 🔧 Configuration

### Fonts
- **Geist** - Για UI elements και navigation
- **Bricolage Grotesque** - Για headings και buttons

### Colors
- Primary: White/Gray palette
- Accent: Custom gray tones
- Background: High-quality AVIF images

## 📚 Χρήσιμοι Σύνδεσμοι

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev/)

## 🚀 Επόμενα Βήματα

- [ ] Προσθήκη περισσότερων property listings
- [ ] Implementation του contact form
- [ ] Προσθήκη property search functionality
- [ ] Integration με real estate API
- [ ] Προσθήκη user authentication
- [ ] SEO optimization improvements
- [ ] Performance monitoring

## 🤝 Contributing

1. Fork το project
2. Δημιουργήστε feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit τις αλλαγές σας (`git commit -m 'Add some AmazingFeature'`)
4. Push στο branch (`git push origin feature/AmazingFeature`)
5. Ανοίξτε Pull Request

## 📄 License

Αυτό το project είναι private και προστατεύεται από copyright.

---

**Δημιουργήθηκε με ❤️ χρησιμοποιώντας Next.js και σύγχρονα web technologies**