/* ==========================================
   CREATORCALC - SHARED SITE SCRIPT
   (theme toggle, mobile menu, cookie notice)
========================================== */
(function () {
    "use strict";

    function get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
    function set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } }

    /* THEME */
    var themeButton = document.getElementById("themeButton");

    function applyTheme(light) {
        document.body.classList.toggle("light-mode", light);
        if (themeButton) themeButton.textContent = light ? "☀️" : "🌙";
    }

    applyTheme(get("creatorCalcTheme") === "light");

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            var light = !document.body.classList.contains("light-mode");
            applyTheme(light);
            set("creatorCalcTheme", light ? "light" : "dark");
        });
    }

    /* MOBILE MENU */
    var menuButton = document.getElementById("menuButton");
    var nav = document.getElementById("nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", function () {
            var open = nav.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", open ? "true" : "false");
            menuButton.textContent = open ? "✕" : "☰";
        });
        nav.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                nav.classList.remove("open");
                menuButton.textContent = "☰";
            }
        });
    }

    /* COOKIE / ADS NOTICE */
    if (!get("creatorCalcCookies")) {
        var bar = document.createElement("div");
        bar.className = "cookie";
        bar.setAttribute("role", "dialog");
        bar.setAttribute("aria-label", "Cookie notice");

        var text = document.createElement("span");
        text.innerHTML = 'We use cookies to remember your settings and to show ads through Google AdSense. See our <a href="privacy.html">Privacy Policy</a>.';

        var ok = document.createElement("button");
        ok.textContent = "Got it";
        ok.addEventListener("click", function () {
            set("creatorCalcCookies", "yes");
            bar.remove();
        });

        bar.appendChild(text);
        bar.appendChild(ok);
        document.body.appendChild(bar);
    }
})();
