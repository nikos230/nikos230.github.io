// Theme toggle with persistence
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

function syncButtonLabel() {
  const isDark = root.getAttribute("data-theme") === "dark";
  toggle.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
}

toggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  const nextTheme = isDark ? "light" : "dark";
  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  syncButtonLabel();
});

syncButtonLabel();

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Simple HTML includes (loads sections from separate files)
async function loadIncludes() {
  const nodes = document.querySelectorAll("[data-include]");
  const tasks = Array.from(nodes).map(async (node) => {
    const url = node.getAttribute("data-include");
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      node.outerHTML = html; // replace placeholder with section markup
    } catch (err) {
      node.outerHTML = `<section><h2>Section failed to load</h2><p class="item-meta">${url}</p></section>`;
      // Optional: console error for debugging
      console.error("Failed to load include:", url, err);
    }
  });

  await Promise.all(tasks);
}

loadIncludes();
