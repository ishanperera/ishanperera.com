# Hero Brain Animation Upgrade — Design Spec

## Overview

Upgrade the homepage ParticleBrain from a simple rotating particle cloud to a sophisticated, interactive neural network visualization. The brain should feel alive — electrical impulses cascading along synaptic connections, responding to mouse interaction, with bloom postprocessing for an electric aesthetic.

## Goals

1. **More dynamic animation** — neural connections with traveling impulses, not just rotation + breathing
2. **Higher visual polish** — custom shaders, bloom postprocessing, soft particle glow
3. **Larger scale** — brain fills ~70-75% of viewport height (currently much smaller)
4. **Mouse interactivity** — hovering triggers neural firing cascades from cursor position

## Technical Approach: Hybrid R3F + Custom ShaderMaterial

Keep React Three Fiber for scene management, camera, resize handling, pointer events, and postprocessing pipeline. Write custom ShaderMaterial for particles (GPU-driven glow, pulsing, activation). Use InstancedMesh for connections. Bloom via `@react-three/postprocessing`.

## Architecture

### Files Modified

- `src/components/landing/ParticleBrain.tsx` — major rewrite (particles, connections, impulses, shaders, postprocessing). Must change Canvas `pointerEvents` from `"none"` to `"auto"` for mouse interactivity. Canvas relies on DOM order (no explicit z-index) to sit below vignette (`z-[5]`) and hero content (`z-10`). The vignette's `pointer-events-none` class is load-bearing — it allows pointer events to pass through to the canvas.
- `src/components/landing/ParticleBrainWrapper.tsx` — no changes expected (SSR/theme/reduced-motion handling stays)
- `src/components/landing/HeroSection.tsx` — no changes expected (layout/z-index/vignette stays)

### Dependencies

- Existing: `@react-three/fiber`, `three`, `@react-three/drei`
- New: `@react-three/postprocessing`, `postprocessing` (peer dep)

### Setup

```bash
npm install @react-three/postprocessing postprocessing
```

## Detailed Design

### 1. Scale & Composition

- **Particle count:** ~5,000 (up from 3,500) — denser surface coverage at larger size
- **Camera position:** Pull closer, roughly `[1.2, 0.5, 2.0]` (from `[1.5, 0.8, 2.8]`), tuned so brain fills ~70-75% of viewport height
- **FOV:** Keep at 50°
- **View angle:** Keep 3/4 angle with slight downward tilt — most recognizable brain profile
- **DPR:** `[1, 2]` (up from `[1, 1.5]`)
- **Vignette:** Unchanged — works with larger brain since text sits at center

### 2. Neural Connections

- **Algorithm:** K-nearest-neighbors — each particle connects to 2-3 closest neighbors within a distance threshold of ~0.15 units
- **Deduplication:** Connections are deduplicated (A↔B stored once). Expected count: ~6,000-7,500 connections
- **Rendering:** InstancedMesh with thin cylinder instances (radius ~0.001 units). Base geometry is a unit-height cylinder (height=1, centered at origin) so instance scale directly maps to connection length. Each instance matrix encodes position (midpoint of two particles), rotation (oriented between the two particles via lookAt), and scale (length = distance between particles)
- **Coloring:** Inherit cyan-purple gradient from connected particles
- **Base opacity:** Low (~0.15) — reads as subtle structure, not dense mesh
- **Surface bias:** Connections near the brain surface are more visible; interior connections fade out
- **Computed once** at initialization (brain geometry is static) — only opacity/glow animate

### 3. Synaptic Impulses

- **Count:** ~20-30 active impulses at any time
- **Spawning:** Random particles fire impulses at random intervals
- **Travel:** Impulses move along connections between particles at varying speeds (randomized to avoid mechanical feel)
- **Trail:** Each impulse has 2-3 trailing points that fade in opacity — gives sense of motion
- **Cascade:** When an impulse reaches a particle, ~30% chance it triggers 1-2 new impulses down connected paths — creates chain reactions
- **Color:** Bright white-cyan core (#FFFFFF → #00E5FF) with softer cyan glow — pops against darker base particles
- **Data structure:** Array of impulse objects tracking: current connection, progress (0→1), speed, trail positions. Updated each frame.

### 4. Mouse Interactivity

- **Raycasting:** An invisible sphere mesh (roughly matching the brain's bounding volume, ~radius 1.2) acts as the raycast target. R3F pointer events (`onPointerMove`, `onPointerLeave`) on this mesh provide the 3D intersection point. The sphere uses a transparent material (`visible: false`) so it doesn't render but captures raycasts.
- **Interaction radius:** ~0.4 units around raycast intersection
- **Particle activation:** Particles within radius brighten and scale up ~1.5x
- **Connection activation:** Connections within radius increase opacity and glow
- **Impulse spawning:** 3-5 impulses immediately fire from closest particles to cursor, cascading outward along connections
- **Continuous firing:** As mouse moves across brain, new impulses continuously spawn from cursor area
- **Decay:** When mouse leaves, activity decays back to ambient levels over ~1.5 seconds
- **Parallax tilt:** Subtle rotation offset based on mouse position relative to viewport center — max ~5 degrees per axis

### 5. Custom ShaderMaterial (Particles)

**Vertex Shader:**
- Pass per-particle attributes to fragment: color, activation level, pulse phase
- Scale point size based on activation level and depth

**Fragment Shader:**
- Soft radial falloff from center of each point (no hard circles)
- Per-particle pulsing at different frequencies (seeded by world position)
- Additive brightness boost for activated particles (near mouse)
- Discard fragments beyond radial threshold for clean edges

**Uniforms:**
- `uTime` — elapsed time for animation
- `uMousePosition` — 3D world position of mouse intersection
- `uMouseActive` — float (0→1) for mouse presence, smoothly interpolated
- `uInteractionRadius` — radius of mouse influence

**Attributes (per-particle):**
- `aColor` — vec3 base color
- `aPulsePhase` — float, randomized phase offset for shimmer

**Activation (GPU-computed):** Mouse proximity activation is computed entirely in the vertex shader using `distance(position, uMousePosition)` and `uInteractionRadius` — no per-frame CPU attribute uploads needed. Impulse-triggered activation (brief flash when an impulse hits a particle) uses a separate small `aImpulseActivation` attribute updated only for affected particles (~30 per frame max).

### 6. Bloom Postprocessing & Antialiasing

Keep `antialias: false` on the Canvas — bloom's blur naturally softens edges, and the postprocessing pipeline handles final output quality.

- **Library:** `@react-three/postprocessing` with `EffectComposer` and `Bloom`
- **Intensity:** ~0.6
- **Threshold:** ~0.3 — only brightest elements bloom (impulses, activated particles)
- **Radius:** ~0.8
- **Resolution:** Half resolution for performance
- **Effect:** Impulses become light sources; activated regions glow; ambient particles stay crisp

### 7. Animation Refinements

- **Rotation:** Keep ~0.06 rad/s base, add subtle noise-driven micro-oscillations so it doesn't feel perfectly mechanical
- **Breathing:** Replace uniform scale pulse with per-region pulsing — different brain areas breathe at slightly offset rates
- **Depth sizing:** Closer particles render slightly larger, enhancing depth perception

### 8. Light Mode Adaptation

- Same structural approach as current: different opacity and blending mode
- Bloom intensity reduced in light mode
- Particle opacity increased (~0.7 vs 0.55)
- Normal blending instead of additive
- Impulse colors still pop against lighter background

### 9. Accessibility

- Existing `prefers-reduced-motion` check in ParticleBrainWrapper stays — returns `null` if enabled
- No changes to accessibility behavior

## Performance Considerations

- **Particles:** 5,000 points with custom ShaderMaterial — all GPU, very efficient
- **Connections:** InstancedMesh — single draw call for all connections
- **Impulses:** ~30 active at once, updated on CPU, rendered as a second `Points` object with custom ShaderMaterial (point sprites). Trails are additional points at previous positions with decreasing opacity/size, managed in the same Points buffer. Buffer pre-allocated at 150 points max (30 impulses x 4 points each including head + 3 trail), recycled as impulses expire
- **Bloom:** Half-resolution pass — manageable cost
- **Connection computation:** Done once at init, not per-frame
- **Mouse raycasting:** R3F handles this efficiently via its event system
- **No graceful degradation** — per user preference, prioritize visual richness

## Out of Scope

- Changes to hero text, typewriter, taglines, or scroll indicator
- Changes to GridBackground
- Changes to vignette overlay
- Mobile touch interaction (mouse-only for now)
- WebGL fallback / canvas 2D fallback
