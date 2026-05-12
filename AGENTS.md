# Lodgra - Design System & Project Guidelines

This project follows a custom "Lodgra" design system, heavily inspired by the Behance aesthetic (pills, white-space first, shallow elevation) but with a specific corporate branding for property management.

## Visual Identity (Lodgra Branding)

### Brand Color Palette
- **Lodgra Blue (`#1E3A8A`)**: Primary action color. Use for main CTAs, active states, and focus rings.
- **Lodgra Blue Hover (`#162c6a`)**: Hover state for primary buttons.
- **Lodgra Yellow (`#ffc000`)**: Highlight color for attention-grabbing metrics (like low occupancy alerts or accents).
- **Lodgra Green (`#059669`)**: Used for positive trends, "Online" statuses, and success indicators.
- **Lodgra Navy (`#030447`)**: Footer backgrounds, brand icons, and deep dark mode surfaces.

### Typography
- **Core UI Font**: `Inter` (sans-serif). Use for body text, lists, and secondary UI elements.
- **Display Font**: `Space Grotesk` (Weight 700). Use for headings, logos, and large numeric indicators (KPIs).

## Component Guidelines

### Buttons (`.be-button`)
- Default to **pill-shaped** (`rounded-pill`).
- Use `lodgra-blue` for primary buttons.
- Text weight should be `semibold`.
- Padding should be generous (asymmetric, preferring more horizontal space).

### Cards (`.be-card`)
- Use `.be-card` for all container elements.
- Standard border radius is `4px` (`rounded-be`).
- Background color should use `var(--surface-be)`.
- Use `.be-card-hover` for interactive tiles that should lift slightly on focus.

## Theming Architecture
The application supports dual-mode theme (`.light` and `.dark` classes on a root container).

### Dark Mode Tokens
- Background Primary: `#08090F`
- Background Secondary: `#0D0F17`
- Text Primary: `#f8fafc`
- Text Secondary: `slate-400` / `#94a3b8`

### Light Mode Tokens
- Background Primary: `#ffffff`
- Background Secondary: `#f9f9f9`
- Text Primary: `#191919` (Near-Black)
- Text Secondary: `#707070`

## Footer Style
Footers should always be technical and informative, using a monospace font at small sizes (9px) with generous letter spacing (tracking-widest). Use `lodgra-navy` or `bg-primary` with a top border.
