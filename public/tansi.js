(function () {
  var existingButton = document.getElementById("_wabtn");
  var existingPopup = document.getElementById("_wapop");
  var existingStyle = document.getElementById("_wastyle");

  if (existingButton) existingButton.remove();
  if (existingPopup) existingPopup.remove();
  if (existingStyle) existingStyle.remove();

  var BIGWING_URLS = [
    "/bigwing-en-in.htm",
    "/toolkit/honda-cb350-en-in.htm",
    "/toolkit/honda-cb350rs-en-in.htm",
    "/bigwing.html",
    "/bigwing"
  ];
  var GA_MEASUREMENT_ID = "G-1T027NK97N";
  var WA_OUTER_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  function ensureGa4() {
    window.dataLayer = window.dataLayer || [];

    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    var gaSrc = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    var existingScript =
      document.querySelector('script[data-wa-ga-id="' + GA_MEASUREMENT_ID + '"]') ||
      document.querySelector('script[src*="gtag/js?id=' + GA_MEASUREMENT_ID + '"]');

    if (!existingScript) {
      var gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = gaSrc;
      gaScript.setAttribute("data-wa-ga-id", GA_MEASUREMENT_ID);
      (document.head || document.documentElement).appendChild(gaScript);
    }

    window.__wa_ga_targets = window.__wa_ga_targets || {};
    if (!window.__wa_ga_targets[GA_MEASUREMENT_ID]) {
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
      window.__wa_ga_targets[GA_MEASUREMENT_ID] = true;
    }
  }

  function gaEvent(name, params) {
    if (typeof window.gtag !== "function") return;
    var payload = params || {};
    payload.send_to = GA_MEASUREMENT_ID;
    window.gtag("event", name, payload);
  }

  function safeGet(storage, key) {
    try {
      return storage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeSet(storage, key, value) {
    try {
      storage.setItem(key, value);
    } catch (error) {}
  }

  function randomId() {
    return "id_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function getOrCreateId(storage, key) {
    var existing = safeGet(storage, key);
    if (existing) return existing;
    var created = randomId();
    safeSet(storage, key, created);
    return created;
  }

  function hashString(input) {
    var hash = 5381;
    for (var i = 0; i < input.length; i++) {
      hash = (hash << 5) + hash + input.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
  }

  function browserFingerprint() {
    var parts = [
      navigator.userAgent || "",
      navigator.language || "",
      navigator.platform || "",
      String(screen.width || 0) + "x" + String(screen.height || 0),
      Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    ];
    return hashString(parts.join("|"));
  }

  function currentTime24() {
    return new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }

  ensureGa4();

  var currentScript = document.currentScript;
  var scriptConfig = ((currentScript && currentScript.getAttribute("data-config")) || "").toLowerCase();
  var path = (window.location.pathname || "").toLowerCase().replace(/\/+$/, "");
  var isBigWingPath =
    BIGWING_URLS.some(function (url) {
      return path.indexOf(url.toLowerCase().replace(/\/+$/, "")) !== -1;
    }) || /\/bigwing(?:\.html?)?$/.test(path);
  var isBigWing = scriptConfig === "bigwing" || isBigWingPath;

  var PHONE = isBigWing ? "919071071116" : "917259586977";
  var NAME = isBigWing ? "Honda BigWing" : "Tansi Honda";
  var WIDGET_KEY = isBigWing ? "bigwing_whitefield" : "tansi_honda";
  var IMG = isBigWing
    ? "https://tansihonda.t3.tigrisfiles.io/bigwing.webp"
    : "https://tansihonda.t3.tigrisfiles.io/redwing.webp";
  var MESSAGE = "Hi there! Welcome to " + NAME + ". How can we help you today?";
  var LABEL = "Hi, how can I help you?";
  var VISITOR_ID = getOrCreateId(localStorage, "wa_visitor_id");
  var SESSION_ID = getOrCreateId(sessionStorage, "wa_session_id");
  var FP_HASH = browserFingerprint();
  var OPEN_COUNT = 0;

  var isBlack = isBigWing;
  var REDWING_BG = "#095e54";
  var BIGWING_BG = "#111";
  var BRAND_GREEN = REDWING_BG;
  var BTN_BG = isBlack ? BIGWING_BG : REDWING_BG;
  var BTN_BORD = isBlack ? "2px solid #25D366" : "none";
  var BTN_PAD = isBlack ? "3px 18px 3px 3px" : "4px 18px 4px 4px";
  var BTN_W = isBlack ? "48px" : "46px";
  var BTN_WX = isBlack ? "230px" : "228px";
  var HDR_BG = isBlack ? BIGWING_BG : REDWING_BG;
  var HDR_BORD = isBlack ? "border-bottom:1px solid #25D366;" : "";
  var CHAT_BG = isBlack ? "#1a1a1a" : "#E5DDD5";
  var CHAT_BG_IMG = isBlack
    ? "https://tansihonda.t3.tigrisfiles.io/bw.png"
    : "https://tansihonda.t3.tigrisfiles.io/rw.png";
  var BUBBLE_BG = isBlack ? "#2a2a2a" : "#fff";
  var BUBBLE_TX = isBlack ? "#eee" : "#111";
  var TYPING_BG = isBlack ? "#262626" : "#fff";
  var TYPING_DOT = isBlack ? "#9a9a9a" : "#9c9c9c";
  var FOOT_BG = isBlack ? "#111" : "#fff";
  var FOOT_BORD = isBlack ? "border-top:1px solid #222;" : "";
  var TIME_CLR = isBlack ? "#888" : "#aaa";
  var SHADOW = isBlack ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.15)";
  var BTN_SHAD = isBlack ? "" : "box-shadow:0 4px 14px rgba(9,94,84,0.28);";
  var PAV_BG = isBlack ? BIGWING_BG : REDWING_BG;
  var ICON_BG = isBlack ? "#2a2a2a" : "#fff";
  var ICON_CLR = isBlack ? "#fff" : BRAND_GREEN;
  var TXT_GAP = isBlack ? "12px" : "12px";

  var css = [
    "button#_wabtn, button#_wabtn:hover, button#_wabtn:focus, button#_wabtn:active {-webkit-appearance:none !important;appearance:none !important;outline:none !important;}",
    "#_wabtn{position:fixed;bottom:24px;left:24px;z-index:9999;display:flex;align-items:center;",
    "background-color:" + BTN_BG + " !important;border:" + BTN_BORD + " !important;",
    "border-radius:50px !important;padding:" + BTN_PAD + ";cursor:pointer;min-width:" + BTN_W + ";max-width:" + BTN_W + ";overflow:visible;",
    "transition:max-width 0.4s ease,box-shadow 0.2s;white-space:nowrap;font-family:Arial,sans-serif;justify-content:flex-start;" + BTN_SHAD + "}",
    "#_wabtn:hover{box-shadow:0 0 18px rgba(9,94,84,0.4);}",
    "#_wabtn.x{max-width:" + BTN_WX + ";}",
    '#_wabtn::after{content:"";position:absolute;top:0;right:4px;width:9px;height:9px;border-radius:50% !important;background:#ef4444;box-shadow:0 0 0 2px #fff,0 1px 3px rgba(0,0,0,0.25);pointer-events:none;z-index:10;opacity:0;transform:scale(0.7);transition:opacity 0.16s ease,transform 0.16s ease;}',
    "#_wabtn.x::after{opacity:1;transform:scale(1);transition-delay:0.42s;animation:_wadotpulse 1.1s ease-in-out 0.42s infinite;}",
    "@keyframes _wadotpulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(0.9);opacity:1}}",
    "#_waico{width:38px;height:38px;border-radius:50% !important;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:" + ICON_BG + ";color:" + ICON_CLR + ";}",
    "#_watxt{color:#fff !important;font-size:13px;font-weight:600;margin-left:0;margin-right:0;opacity:0;max-width:0;",
    "transition:opacity 0.2s ease 0.15s,max-width 0.4s ease,margin-left 0.4s ease;overflow:hidden;flex:0 1 auto;text-align:left;line-height:1.2;}",
    "#_wabtn.x #_watxt{opacity:1;max-width:160px;margin-left:" + TXT_GAP + ";}",
    "#_wapop{display:none;position:fixed;bottom:86px;left:24px;z-index:9999;width:300px;border-radius:16px !important;overflow:hidden;font-family:Arial,sans-serif;box-shadow:" + SHADOW + ";}",
    "#_wapop.v{display:block;animation:_waup 0.2s ease;}",
    "@keyframes _waup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}",
    "#_wapop .ph{background:" + HDR_BG + ";" + HDR_BORD + "padding:12px 46px 12px 14px;display:flex;align-items:center;gap:10px;position:relative;}",
    "#_wapop .pav{width:44px;height:44px;border-radius:50% !important;overflow:hidden;flex-shrink:0;background:" + PAV_BG + ";}",
    "#_wapop .pav img{width:100%;height:100%;object-fit:cover;display:block;}",
    "#_wapop .pnm{color:#fff;font-weight:700;font-size:14px;}",
    "#_wapop .pst{color:rgba(255,255,255,0.7);font-size:11px;margin-top:2px;display:flex;align-items:center;gap:4px;}",
    "#_wapop .pdot{width:7px;height:7px;border-radius:50% !important;background:#4ADE80;display:inline-block;}",
    "#_wapop .pcl{position:absolute;right:8px;top:8px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);width:26px;height:26px;border-radius:50% !important;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;margin:0;box-sizing:border-box;transition:background 0.15s ease,color 0.15s ease,border-color 0.15s ease;}",
    "#_wapop .pcl:hover{background:rgba(229,57,53,0.22);border-color:rgba(229,57,53,0.65);color:#fff;backdrop-filter:blur(6px);}",
    "#_wapop .pb{background-color:" + CHAT_BG + ";background-image:url('" + CHAT_BG_IMG + "');background-position:center;background-size:cover;background-repeat:no-repeat;padding:16px;min-height:180px;}",
    "#_wapop .pm{display:flex;flex-direction:column;gap:8px;min-height:148px;}",
    "#_wapop .pnow{font-size:11px;color:" + TIME_CLR + ";text-align:center;min-height:14px;}",
    "#_wapop .pty{display:none;align-self:flex-start;background:" + TYPING_BG + ";border-radius:0 10px 10px 10px !important;padding:10px 12px;}",
    "#_wapop .pty.show{display:inline-flex;gap:5px;}",
    "#_wapop .pty i{display:block;width:6px;height:6px;border-radius:50% !important;background:" + TYPING_DOT + ";}",
    "#_wapop .pbl{background:" + BUBBLE_BG + ";border-radius:0 10px 10px 10px !important;padding:11px 14px;font-size:13px;color:" + BUBBLE_TX + ";line-height:1.5;position:relative;display:none;margin-right:14px;}",
    "#_wapop .pbl.show{display:block;}",
    "#_wapop .ptm{font-size:11px;color:" + TIME_CLR + ";text-align:right;margin-top:5px;}",
    "#_wapop .pf{background:" + FOOT_BG + ";" + FOOT_BORD + "padding:12px 14px;}",
    "#_wacta{width:100% !important;background:" + BRAND_GREEN + " !important;color:#fff !important;border:none !important;border-radius:10px !important;padding:11px 16px !important;font-size:13px !important;font-weight:700 !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;gap:8px !important;}"
  ].join("");

  var styleTag = document.createElement("style");
  styleTag.id = "_wastyle";
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  var popup = document.createElement("div");
  popup.id = "_wapop";
  popup.innerHTML =
    '<div class="ph">' +
    '<div class="pav"><img src="' + IMG + '" alt="' + NAME + '"></div>' +
    '<div><div class="pnm">' + NAME + '</div><div class="pst"><span class="pdot"></span> Online</div></div>' +
    '<button class="pcl" id="_wacl" type="button" aria-label="Close">x</button>' +
    "</div>" +
    '<div class="pb"><div class="pm"><div class="pnow" id="_wanow"></div><div class="pty" id="_waty"><i></i><i></i><i></i></div><div class="pbl" id="_wamsg">' + MESSAGE + '<div class="ptm">Just now</div></div></div></div>' +
    '<div class="pf"><button id="_wacta" type="button">Chat on WhatsApp</button></div>';

  var button = document.createElement("button");
  button.id = "_wabtn";
  button.type = "button";
  button.innerHTML = '<div id="_waico">' + WA_OUTER_SVG + '</div><span id="_watxt">' + LABEL + "</span>";

  document.body.appendChild(popup);
  document.body.appendChild(button);

  var typingEl = document.getElementById("_waty");
  var messageEl = document.getElementById("_wamsg");
  var nowEl = document.getElementById("_wanow");
  var sequenceTimer = null;
  var typingSeenKey = "wa_typing_seen_" + WIDGET_KEY;
  var hasSeenTyping = safeGet(sessionStorage, typingSeenKey) === "1";

  function startMessageSequence() {
    if (!typingEl || !messageEl) return;
    if (sequenceTimer) clearTimeout(sequenceTimer);
    if (nowEl) nowEl.textContent = currentTime24();

    if (hasSeenTyping) {
      typingEl.classList.remove("show");
      messageEl.classList.add("show");
      return;
    }

    typingEl.classList.add("show");
    messageEl.classList.remove("show");
    sequenceTimer = setTimeout(function () {
      typingEl.classList.remove("show");
      messageEl.classList.add("show");
      hasSeenTyping = true;
      safeSet(sessionStorage, typingSeenKey, "1");
      sequenceTimer = null;
    }, 950);
  }

  setTimeout(function () {
    button.classList.add("x");
  }, 600);

  var pageKey = window.location.pathname + window.location.search;
  var uniqueViewKey = "wa_unique_view_" + WIDGET_KEY + "_" + pageKey;

  gaEvent("total_views", {
    widget: WIDGET_KEY,
    page: pageKey,
    visitor_id: VISITOR_ID,
    session_id: SESSION_ID,
    fp_hash: FP_HASH
  });

  if (safeGet(localStorage, uniqueViewKey) !== "1") {
    gaEvent("unique_views", {
      widget: WIDGET_KEY,
      page: pageKey,
      visitor_id: VISITOR_ID,
      session_id: SESSION_ID,
      fp_hash: FP_HASH
    });
    safeSet(localStorage, uniqueViewKey, "1");
  }

  var open = false;
  button.addEventListener("click", function () {
    open = !open;
    if (open) {
      popup.classList.add("v");
      startMessageSequence();
      OPEN_COUNT += 1;
      gaEvent("popup_clicks", {
        widget: WIDGET_KEY,
        page: pageKey,
        visitor_id: VISITOR_ID,
        session_id: SESSION_ID,
        fp_hash: FP_HASH,
        open_count: OPEN_COUNT
      });
    } else {
      if (sequenceTimer) clearTimeout(sequenceTimer);
      if (typingEl) typingEl.classList.remove("show");
      if (messageEl) messageEl.classList.remove("show");
      popup.classList.remove("v");
    }
  });

  document.getElementById("_wacl").addEventListener("click", function (event) {
    event.stopPropagation();
    open = false;
    if (sequenceTimer) clearTimeout(sequenceTimer);
    if (typingEl) typingEl.classList.remove("show");
    if (messageEl) messageEl.classList.remove("show");
    popup.classList.remove("v");
  });

  document.getElementById("_wacta").addEventListener("click", function () {
    gaEvent("redirect_clicks", {
      widget: WIDGET_KEY,
      page: pageKey,
      phone: PHONE,
      visitor_id: VISITOR_ID,
      session_id: SESSION_ID,
      fp_hash: FP_HASH,
      open_count: OPEN_COUNT
    });
    window.open("https://wa.me/" + PHONE, "_blank");
  });
})();
