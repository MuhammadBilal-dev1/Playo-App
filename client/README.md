# 🏟️ PlaySpace Client · Frontend Engineering & Mobile Architecture

## 🏗️ Technical Architecture

---

- **Hybrid Rendering Strategy:** The client leverages the Expo Web ecosystem to bridge the gap between native mobile components and standard DOM elements. This allows the application to maintain a 60FPS native feel on mobile while providing a responsive, SEO-friendly experience on the web.
- **Logic-UI Decoupling (Custom Hooks):** To keep components "lean" and focused solely on rendering, all core business logic—including Slot Availability Algorithms, Time-Clash Detection, and Dynamic Pricing Calculations—is abstracted into a dedicated Custom Hook Layer (`/src/hooks`).
- **State & Session Management:** \* **React Context API:** Used for lightweight, global session tracking and user authentication states.
  - **Optimistic UI Updates:** The booking flow uses localized state management to ensure instant feedback before the server confirmation arrives.

## 🎨 UI/UX System

---

- **⚛️ Atomic Design Pattern:** The interface follows an atomic structure:
  - **Atoms:** Buttons, Inputs, Badges.
  - **Molecules:** Slot Cards, Venue Headers.
  - **Organisms:** Booking Modals, Search Filters.
- **📍 Geo-Spatial Features:** Integrated with `react-native-maps` for visual venue discovery and Reverse Geocoding for coordinate-to-address conversion.
- **📱 Responsive Layouts:** Platform-agnostic StyleSheet system that handles layout transitions between mobile portrait and desktop views.

## 📂 Modular Structure

---

```
client/
├─ src/
│  ├─ hooks/            # Core Engine: Logic for slots & bookings
│  ├─ services/         # Network: Axios interceptors & API definitions
│  ├─ navigation/       # Routing: Stack, Tab, and Drawer configs
│  ├─ screens/          # Views: High-fidelity UI layouts
│  ├─ components/       # UI Atoms: Reusable interface elements
│  └─ utils/            # Helpers: Date manipulation & Geo-logic
├─ app.json             # PWA Manifest & Native Build configs
└─ config.js            # Environment-aware API URL management
```

## ⚡ Performance Highlights

---

- Memoization: Extensive use of React.memo and useMemo for heavy slot-grids to prevent unnecessary re-renders.
- Asset Optimization: Splash screens and icons are pre-scaled for multiple densities (hdpi, xhdpi, xxhdpi).
- Bundle Efficiency: Modular imports to ensure the PWA remains lightweight for low-bandwidth users.

---

Developed by Muhammad Bilal | Full-Stack Software Architect.
