# ⚡ J.A.R.V.I.S. Interactive Cyber-HUD Portfolio

An elite, high-fidelity personal portfolio website engineered with a premium **Iron Man / J.A.R.V.I.S. Holographic HUD** aesthetic. Driven by procedural canvas rendering, scroll-synced physics, interactive AI chat protocols, and dynamic digital overlays, this represents a state-of-the-art interactive web experience.

🚀 **Live Demo**: [jeevesh-portfolio-website-00.vercel.app](https://jeevesh-portfolio-website-00.vercel.app)

---

## 💎 Elite Cyber-HUD Features

### 1. 🌀 Scroll-Driven Neural Network Hologram (`AboutSection.tsx`)

A procedural HTML5 Canvas-rendered system centered perfectly on the screen that builds itself in real-time as the user scrolls down through your profile:

* **Phase 1 (0–25%)**: A central glowing core ignites alongside five domain nodes representing specialized skills.
* **Phase 2 (25–55%)**: Glowing circuit-style wires trace from the core outward to the nodes with traveling data-packet photons.
* **Phase 3 (55–80%)**: Node skill labels and statistic counters type themselves in character-by-character with blinking terminal cursors.
* **Phase 4 (80–100%)**: Full system ignition—the network pulses rhythmically, and a glowing `"SYSTEM INITIALIZED"` vector badge materializes.
* *Reverse Scrolling*: Scrolling back up reverses every stage of the animation smoothly and dynamically.

### 2. 🤖 Interactive J.A.R.V.I.S. AI Chatbot Terminal (`JARVISChatbot.tsx`)

A floating bottom-right **Arc Reactor FAB** opens a modular cybernetic chat console allowing users to query your skills, education, experience, or trigger active hardware simulation overrides:

* **Natural Language Queries**: Responds in real-time to questions about your profile (e.g., *"who is Jeevesh?"*, *"what are your skills?"*, *"tell me about your projects"*).
* **Modular Command Overrides**:
  * `/matrix` — Initializes **Matrix Digital Rain**—falling golden cyber-symbols flooding the screen for 6 seconds with a high-fidelity opacity fade-out overlay.
  * `/glitch` — Triggers a screen-shake signal disruption with RGB chromatic splits, horizontal noise bands, and high-frequency digital warnings (e.g. `SYSTEM_CORRUPT: DATA_STREAM_INTERRUPT`).
  * `/arc` — Swells the background Arc Reactor core glow to maximum power.
  * `/particles` — Launches an explosive coordinate-based visual particle burst.
  * `/system-check` — Prints diagnostic CPU, memory, and operational logs.
  * `/optimize` — Toggles active overdrive mode styles.
  * `/scan` — Simulates a vector-bracket security scan.

### 3. 🔋 Procedural Iron Man Arc Reactor Background (`ArcReactorHero.tsx`)

A fixed-viewport Iron Man Mark I style procedural Arc Reactor that continuously spins and breathes:

* **Interactive Clicking**: Clicking the center core of the reactor causes it to absorb energy and emit expanding circular shockwave shockwaves.
* **Scroll-Sync Shrink & Fade**: Shrinks smoothly to 28% size and fades to 10% opacity as the user scrolls, moving out of the way to bleed beautifully in the background behind layout cards.

### 4. 🎛️ Diagnostic HUD Boot Sequence Loader (`JARVISLoader.tsx`)

An authentic system-boot experience upon page loading:

* **0ms – 950ms**: Displays secure diagnostic system logs printing out at high speed.
* **950ms – 1450ms**: Pauses in complete darkness showing only the background glowing Arc Reactor core warming up.
* **1450ms – 2850ms**: Smoothly fades in the remaining holographic grid layout, navigation bar, and copy modules over `1400ms`.

---

## 🛠️ Technology Stack

* **Core**: React 19 (TypeScript)
* **Build Engine**: Vite (Fast HMR)
* **Styling**: Tailwind CSS & Vanilla CSS (Harmonious gold, cyan, magenta, and dark HSL values)
* **Motion**: Framer Motion & HTML5 Canvas API
* **Icons**: Lucide React

---

## ⚙️ Quick Start

### 1. Pre-requisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.

### 2. Installation

Clone this repository to your local directory:

```bash
git clone https://github.com/jeevesh2515/Jeevesh-Portfolio-Website.git
cd Jeevesh-Portfolio-Website
```

Install the dependencies:

```bash
npm install
```

### 3. Run Locally

Launch the high-speed Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the terminal port) to explore the system!

---

## 🎨 Generalization & Customization Guide

This template has been built with highly modular, clean files to allow other developers to quickly customize it as their own:

### 1. Update Personal Copy & Metrics

Navigate to `src/sections/` and easily modify your copy in the following files:

* **Hero Text**: Open `src/sections/HeroSection.tsx` and change the name (`h1`), subtitle (`h2`), Status Grid stats, and Metrics array values.
* **About Profile**: Open `src/sections/AboutSection.tsx` and change the text in `HighlightText` blocks, the `SPECIALIZATIONS` array, and the biography paragraph content.
* **Core Skill Modules**: Open `src/sections/SkillsSection.tsx` and modify the `CLUSTERS` array containing labels, icons, progress windows, and skill list tags.
* **Professional Experience**: Open `src/sections/ExperienceSection.tsx` and adjust the timeline steps.
* **Project Showcase**: Open `src/sections/ProjectsSection.tsx` to insert your project descriptions, tech tags, and repository links.
* **Education History**: Open `src/sections/EducationSection.tsx` to list your degrees and certifications.
* **Contact Details**: Open `src/sections/ContactSection.tsx` and update the email address, phone number, and social links.

### 2. Customize J.A.R.V.I.S. Chat Responses

To change the responses that the AI chatbot returns to users:

1. Open `src/components/JARVISChatbot.tsx`.
2. Locate the `BOT_RESPONSES` constant at the top of the file (lines 10–20).
3. Easily edit the text for keys: `'who'`, `'what'`, `'skills'`, `'experience'`, `'projects'`, `'education'`, and `'contact'`.
4. The natural language router will automatically feed your updated strings to the user!

---

## ⚡ Deployment on Vercel

Deploying your portfolio to Vercel takes less than a minute:

1. Push your customized branch to your GitHub account.
2. Sign in to your [Vercel Dashboard](https://vercel.com).
3. Click **Add New** ➔ **Project** and select your repository.
4. Vercel automatically detects the Vite + Tailwind setup.
5. Click **Deploy**! Your site is live on a global CDN.

---

## 📊 Analytics (PostHog)

The site loads the [PostHog](https://posthog.com) SDK in `src/main.tsx`. PostHog captures a
`$pageview` on load and autocaptures clicks, so web analytics, product analytics, and session
replay start to fill up without any manual event code.

The SDK falls back to the built-in project key and the EU host. To send data to a different
project, set these environment variables (for local runs, put them in a `.env` file; for Vercel,
add them under **Project Settings ➔ Environment Variables**):

```bash
VITE_PUBLIC_POSTHOG_KEY=phc_your_project_key
VITE_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

Both variables use the `VITE_PUBLIC_` prefix, so Vite makes them available in the browser build.

---

## 📄 License & Copyright

This project is proprietary. All rights reserved. You may view the source code for educational purposes, but you do not have permission to copy, modify, distribute, or host this website or any of its components under your own name.

Developed by **[Jeevesh Singale](https://github.com/jeevesh2515)**.
