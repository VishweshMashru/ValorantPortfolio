# VISHWESH // PORTFOLIO

> Cyberpunk / Akira-aesthetic developer portfolio. Built with Next.js 15, React Three Fiber, Framer Motion, and too much neon red.

## Stack

- **Framework**: Next.js 15 (App Router)
- **3D**: React Three Fiber + Three.js + @react-three/drei
- **Animations**: Framer Motion + GSAP
- **Smooth scroll**: Lenis
- **Styling**: Tailwind CSS
- **Fonts**: Bebas Neue (display) · Share Tech Mono (mono) · Rajdhani (body)

## Setup

```bash
# Clone and install
cd vishwesh-portfolio
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customization

### Update your links
Edit `src/components/sections/ContactSection.tsx` — update the `links` array with your real GitHub/LinkedIn/email.

### Add projects
Edit `src/components/sections/ProjectsSection.tsx` — the `projects` array. Each entry:
```ts
{
  id: '007',
  name: 'YOUR PROJECT',
  subtitle: 'Short descriptor',
  desc: 'What it is and why it matters.',
  tags: ['Tech', 'Stack'],
  status: 'LIVE',
  statusColor: '#00FF88',
  accent: '#00F5FF',
  link: 'https://...',
}
```

### 3D assets (optional enhancement)

Add a downloaded `.glb` file to `/public/models/` and load it in the hero scene using `@react-three/drei`'s `useGLTF`:

```tsx
// In src/components/3d/CyberpunkScene.tsx
import { useGLTF } from '@react-three/drei'

function CyberpunkMech() {
  const { scene } = useGLTF('/models/cyberpunk_mech.glb')
  return <primitive object={scene} scale={0.5} position={[2, -1, 0]} />
}
```

**Recommended free sources:**
- [Sketchfab — Cyberpunk tag](https://sketchfab.com/tags/cyberpunk) (filter: Free, Downloadable)
- [Market by Kenney](https://kenney.nl/assets) — low poly packs
- [Quaternius](https://quaternius.com) — free animated character packs
- [Poly Pizza](https://poly.pizza) — CC0 models

### Colors (in `tailwind.config.js`)
```js
'cyber-red': '#FF0040',   // primary accent
'cyber-cyan': '#00F5FF',  // secondary
'cyber-yellow': '#FFD700', // gold
'neon-green': '#00FF88',  // status/online
```

### Akira-specific touches already in
- Concentric rotating rings in the agent card monogram
- Glitch animation on hero name
- Diagonal slash stripe pattern on card visual area
- Japanese kana decoration (ヴィシュウェシュ)
- HUD corner brackets throughout
- Terminal boot sequence on page load
- Red/cyan particle field via Three.js

## Deploy to Vercel

```bash
# Already connected lybytex.com to Vercel — just push to main
git push origin main
```

Or deploy a new project:
```bash
npx vercel
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Main page assembly
├── components/
│   ├── 3d/
│   │   └── CyberpunkScene.tsx   # Three.js particle + grid bg
│   ├── ui/
│   │   ├── Nav.tsx              # Navigation bar
│   │   ├── AgentCard.tsx        # Valorant-style agent card
│   │   └── CustomCursor.tsx     # Diamond cursor
│   └── sections/
│       ├── HeroSection.tsx      # Full-screen hero + boot sequence
│       ├── SkillsSection.tsx    # Tech stack grid
│       ├── ProjectsSection.tsx  # Project archive cards
│       └── ContactSection.tsx   # Terminal + links
└── styles/
    └── globals.css              # Fonts, custom cursor, glitch, scanline
```
