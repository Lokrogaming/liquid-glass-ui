/* ============================================================
   Liquid Glass UI Kit – JS
   Nutzung: <script src="src/liquid-glass.js"></script>
   Danach: LiquidGlass.init()  (läuft automatisch per DOMContentLoaded)
   ============================================================ */
(function () {
  const LG = {
    init() {
      this.initTheme();
      this.initSwitches();
      this.initSegmented();
      this.initTabs();
      this.initSliders();
      this.initToastDemo();
      this.initSheetModal();
      this.initCopyButtons();
      this.initPlayer();
      this.initTiles();
      this.initSearch();
    },

    /* ---------- Theme (hell/dunkel) ---------- */
    initTheme() {
      const root = document.documentElement;
      if (!root.getAttribute('data-theme')) root.setAttribute('data-theme', 'light');
      document.querySelectorAll('[data-lg-theme]').forEach(btn => {
        btn.addEventListener('click', () => {
          const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
          root.setAttribute('data-theme', next);
          document.querySelectorAll('[data-lg-theme-label]').forEach(el => {
            el.textContent = next === 'dark' ? '☀️ Hell' : '🌙 Dunkel';
          });
        });
      });
    },

    /* ---------- Switches ---------- */
    initSwitches() {
      document.querySelectorAll('.glass-switch').forEach(sw => {
        // Klick + Tastatur
        sw.setAttribute('tabindex', '0');
        sw.setAttribute('role', 'switch');
        const toggle = () => {
          sw.classList.toggle('on');
          sw.setAttribute('aria-checked', sw.classList.contains('on'));
          sw.dispatchEvent(new CustomEvent('glass:switch', { detail: { on: sw.classList.contains('on') } }));
        };
        sw.addEventListener('click', toggle);
        sw.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
      });
    },

    /* ---------- Segmented Control ---------- */
    initSegmented() {
      document.querySelectorAll('.glass-segmented').forEach(seg => {
        seg.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => {
            seg.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            seg.dispatchEvent(new CustomEvent('glass:segment', { detail: { value: btn.dataset.value || btn.textContent.trim() } }));
          });
        });
      });
    },

    /* ---------- Tab Bar ---------- */
    initTabs() {
      document.querySelectorAll('.glass-tabbar').forEach(bar => {
        bar.querySelectorAll('.glass-tab').forEach(tab => {
          tab.addEventListener('click', () => {
            bar.querySelectorAll('.glass-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
          });
        });
      });
    },

    /* ---------- Slider mit Wert-Anzeige ---------- */
    initSliders() {
      document.querySelectorAll('.glass-slider').forEach(sl => {
        const out = document.querySelector(`[data-slider-out="${sl.id}"]`);
        const update = () => { if (out) out.textContent = sl.value + (sl.dataset.suffix || ''); };
        sl.addEventListener('input', update); update();
      });
    },

    /* ---------- Toasts ---------- */
    toast(title, msg, icon = '🔔') {
      const stack = document.getElementById('lg-toast-stack');
      if (!stack) return;
      const el = document.createElement('div');
      el.className = 'glass-toast';
      el.innerHTML = `<div style="font-size:1.4rem">${icon}</div>
        <div><div style="font-weight:700;font-size:.9rem">${title}</div>
        <div style="font-size:.82rem;opacity:.75">${msg}</div></div>`;
      stack.appendChild(el);
      setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 3400);
    },

    initToastDemo() {
      document.querySelectorAll('[data-lg-toast]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.toast('Nachricht gesendet', 'Dein Liquid Glass Toast funktioniert. ✨', '💬');
        });
      });
    },

    /* ---------- Sheet & Modal ---------- */
    initSheetModal() {
      const overlay = document.getElementById('lg-overlay');
      const sheet = document.getElementById('lg-sheet');
      const modal = document.getElementById('lg-modal');
      const open = el => { overlay?.classList.add('open'); el?.classList.add('open'); };
      const closeAll = () => {
        overlay?.classList.remove('open');
        sheet?.classList.remove('open');
        modal?.classList.remove('open');
      };
      document.querySelectorAll('[data-lg-open="sheet"]').forEach(b => b.addEventListener('click', () => open(sheet)));
      document.querySelectorAll('[data-lg-open="modal"]').forEach(b => b.addEventListener('click', () => open(modal)));
      document.querySelectorAll('[data-lg-close]').forEach(b => b.addEventListener('click', closeAll));
      overlay?.addEventListener('click', closeAll);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
    },

    /* ---------- Copy-Buttons für Doku ---------- */
    initCopyButtons() {
      document.querySelectorAll('.code-block .copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const code = btn.parentElement.querySelector('code')?.innerText || '';
          try { await navigator.clipboard.writeText(code); }
          catch {
            const ta = document.createElement('textarea');
            ta.value = code; document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); ta.remove();
          }
          const old = btn.textContent;
          btn.textContent = '✓ Kopiert';
          setTimeout(() => btn.textContent = old, 1500);
        });
      });
    },

    /* ---------- Demo Player ---------- */
    initPlayer() {
      const btn = document.getElementById('lg-play');
      let playing = false, prog = 30, timer = null;
      const bar = document.getElementById('lg-progress');
      if (!btn) return;
      btn.addEventListener('click', () => {
        playing = !playing;
        btn.textContent = playing ? '⏸' : '▶';
        if (playing) {
          timer = setInterval(() => {
            prog = (prog + 1) % 101;
            if (bar) bar.style.width = prog + '%';
          }, 300);
        } else clearInterval(timer);
      });
    },

    /* ---------- Control-Center Tiles ---------- */
    initTiles() {
      document.querySelectorAll('.glass-tile[data-toggle]').forEach(t => {
        t.addEventListener('click', () => t.classList.toggle('active'));
      });
    },

    /* ---------- Search Filter Demo ---------- */
    initSearch() {
      const input = document.getElementById('lg-search');
      if (!input) return;
      input.addEventListener('input', () => {
        const q = input.value.toLowerCase();
        document.querySelectorAll('[data-filter-item]').forEach(item => {
          item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }
  };

  window.LiquidGlass = LG;
  document.addEventListener('DOMContentLoaded', () => LG.init());
})();
