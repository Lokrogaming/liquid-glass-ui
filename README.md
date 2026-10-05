# Liquid Glass UI Kit – iOS Style für Websites

Transluzente UI-Elemente im iOS-26-Look. HTML + Tailwind + CSS + JS. Kein Build nötig.

## Vorschau

Öffne `index.html` im Browser (am besten via lokalem Server):

```bash
python3 -m http.server 8000
# -> http://localhost:8000
```

Die Seite enthält **Live-Demos + Dokumentation + Copy-Buttons** für jedes Element.

## Einfügen in dein Projekt (2 Min)

1. Kopiere `src/liquid-glass.css` und `src/liquid-glass.js` in dein Projekt.
2. Im `<head>` einbinden:

```html
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="src/liquid-glass.css" />
<script src="src/liquid-glass.js" defer></script>
```

3. Klasse verwenden:

```html
<div class="glass glass-card hoverable">
  <h3 class="glass-card-title">Hallo Glas 👋</h3>
  <p class="glass-card-sub">Fertig.</p>
</div>
```

## Elemente

| Datei-Klasse | Wofür |
|---|---|
| `.glass` + `.glass-strong` / `.glass-clear` | Basis + Dichte |
| `.glass-btn` (+ `-primary`, `-destructive`, `-ghost`, `-sm`, `-lg`) | Buttons |
| `.glass-icon-btn(.active)` | Runde Icon-Buttons |
| `.glass-card(.hoverable)` | Karten |
| `.glass-tabbar` / `.glass-tab(.active)` | iOS Tab Bar |
| `.glass-navbar` | Sticky Top-Bar |
| `.glass-segmented` | Segment-Umschalter |
| `.glass-input` / `.glass-search` | Felder |
| `.glass-switch(.on)` | Toggle (klick + Enter/Space) |
| `.glass-slider` | Range-Slider |
| `.glass-chip` / `.glass-dot` | Pillen & Status |
| `.glass-tile[data-toggle](.active)` | Control Center |
| `.glass-toast-stack` / `.glass-toast` | Toasts via `LiquidGlass.toast(titel, text, icon)` |
| `.glass-overlay` / `.glass-sheet` / `.glass-modal` | Sheet & Modal via `data-lg-open`, `data-lg-close` |
| `.glass-artwork` / `.glass-progress` | Player |
| `.ios-wallpaper` | Fixierter Hintergrund |

Dark Mode: `<html data-theme="dark">` + Button mit `data-lg-theme`.

## JS-API

```js
LiquidGlass.toast('Titel', 'Nachricht', '🔔');
document.querySelector('.glass-switch')
  .addEventListener('glass:switch', e => console.log(e.detail.on));
document.querySelector('.glass-segmented')
  .addEventListener('glass:segment', e => console.log(e.detail.value));
```

## Anpassen

```css
:root {
  --glass-bg: rgba(255,255,255,0.22);
  --glass-blue: #0a84ff;
  --glass-radius: 24px;
}
```

## Hinweis

Glas wirkt nur mit Inhalt dahinter (Wallpaper/Bild/Farbe). `backdrop-filter` braucht moderne Browser.
