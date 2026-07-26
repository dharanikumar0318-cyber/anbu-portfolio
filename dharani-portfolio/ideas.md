# Dharani Kumar Subban - Mechanical Engineer Portfolio Design

## Three Design Approaches

### Approach 1: Industrial Minimalism
**Theme Name:** Steel & Precision  
**Very Brief Intro:** Clean, geometric, and austere—inspired by technical blueprints and industrial design. Monochromatic with steel grays, sharp angles, and minimal ornamentation.  
**Probability:** 0.08

### Approach 2: Modern Engineering
**Theme Name:** Kinetic Engineering  
**Very Brief Intro:** Dynamic and forward-looking with subtle motion, layered depth, and a modern color palette blending slate blue with warm accents. Emphasizes the bridge between rigorous engineering and operational excellence.  
**Probability:** 0.75

### Approach 3: Warm Technical
**Theme Name:** Copper & Circuits  
**Very Brief Intro:** Approachable yet technical, combining warm copper/bronze tones with dark navy backgrounds and geometric patterns. Conveys both technical expertise and human-centered problem-solving.  
**Probability:** 0.17

---

## CHOSEN APPROACH: Kinetic Engineering

### Design Movement
**Bauhaus meets Contemporary Tech**—structured, purposeful design with a modern sensibility. Inspired by technical documentation, contemporary SaaS interfaces, and the precision of mechanical engineering itself.

### Core Principles
1. **Geometric Clarity:** Use clean lines, precise spacing, and structured grids to reflect engineering rigor
2. **Purposeful Motion:** Subtle animations that guide the eye and reinforce hierarchy without distraction
3. **Technical Authenticity:** Leverage engineering terminology and visual language (schematics, technical tags, data visualization)
4. **Depth Through Layering:** Create visual hierarchy using shadow, scale, and strategic color shifts rather than borders

### Color Philosophy
- **Primary:** Deep slate blue (`#1a2332`) — professional, technical, trustworthy
- **Accent:** Vibrant teal (`#00d4d4`) — energy, innovation, forward momentum
- **Secondary:** Warm gray (`#8b92a9`) — balance, neutrality, readability
- **Background:** Off-white to dark slate gradient zones — breathable, non-fatiguing
- **Emotional Intent:** The teal accent represents the spark of engineering innovation against a grounded, professional foundation

### Layout Paradigm
**Asymmetric, flow-based layout** with strategic use of whitespace:
- Hero section with diagonal accent elements
- Staggered project cards with hover elevation
- Timeline with alternating left-right positioning
- Skills displayed as interactive badges with subtle hover states
- Avoid rigid centered grids; prefer organic flow that guides the eye naturally

### Signature Elements
1. **Geometric Accent Shapes:** Subtle diagonal lines, circles, and angular shapes that appear throughout (hero, section dividers, project cards)
2. **Technical Tags:** Styled badges with engineering terminology (Fluid Mechanics, CAD, Thermodynamics, etc.)
3. **Depth Layers:** Layered card designs with shadow and scale to create visual depth

### Interaction Philosophy
- **Smooth Transitions:** All interactions (hover, scroll, navigation) use fluid easing (ease-out: 200-250ms)
- **Hover Elevation:** Cards and buttons lift slightly on hover with shadow expansion
- **Scroll Reveal:** Project cards and timeline items fade in as they enter the viewport
- **Micro-interactions:** Subtle scale and color shifts on interactive elements to confirm user intent

### Animation
- **Entrance Animations:** Elements fade in and scale up (0.95 → 1) as they enter viewport (300ms ease-out)
- **Hover States:** Cards scale to 1.02 with shadow expansion (200ms ease-out)
- **Scroll Parallax:** Subtle background shifts on hero and section backgrounds (low intensity, 0.3-0.5 parallax factor)
- **Button Feedback:** Active state uses scale(0.97) with 150ms ease-out for tactile feedback
- **Respect Motion:** All animations gated behind `@media (prefers-reduced-motion: no-preference)`

### Typography System
- **Display Font:** "Space Grotesk" (bold, geometric, technical feel) — for headings and hero text
- **Body Font:** "Inter" (clean, readable, modern) — for body copy and descriptions
- **Hierarchy:**
  - H1: Space Grotesk, 48-56px, bold (hero title)
  - H2: Space Grotesk, 32-40px, semibold (section titles)
  - H3: Space Grotesk, 24-28px, semibold (subsections)
  - Body: Inter, 16px, regular (default text)
  - Caption: Inter, 14px, regular (metadata, tags)

### Brand Essence
**One-liner:** A mechanical engineer who bridges rigorous analytical expertise with real-world operational excellence—delivering precision-engineered solutions in fast-paced environments.

**Personality Adjectives:** Precise, Adaptive, Driven

### Brand Voice
- **Headlines:** Direct, energetic, action-oriented. No fluff.
- **CTAs:** Command-driven, clear value proposition.
- **Microcopy:** Technical but accessible; explain the "why" behind projects.

**Example Lines:**
- "Engineering Solutions. Operational Excellence."
- "From Design to Delivery—Precision at Every Stage"

### Wordmark & Logo
A bold geometric symbol: **An interlocking gear and circuit pattern** forming a stylized "D" shape on a transparent background. Modern, technical, unmistakably engineering-focused. No text, just the mark.

### Signature Brand Color
**Vibrant Teal (`#00d4d4`)** — represents innovation, precision, and forward momentum. This color appears as accent highlights, button states, and emphasis elements throughout the site.

---

## Style Decisions (Applied During Build)
- All project cards use consistent shadow depth (0 2px 8px rgba(0,0,0,0.1) on light, rgba(0,0,0,0.3) on dark)
- Timeline uses alternating left-right layout with connecting line and teal accent dots
- Skills displayed as interactive badges with teal border on hover
- Contact form uses teal accent for focus states and submit button
- All section transitions use diagonal SVG dividers with geometric patterns
