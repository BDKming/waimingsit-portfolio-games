const pages = Array.from(document.querySelectorAll("[data-page]"));
const pageLinks = Array.from(document.querySelectorAll("[data-page-link]"));
const projectCovers = document.querySelectorAll(".project-cover");
const lightbox = document.getElementById("project-lightbox");
const lightboxStage = lightbox?.querySelector(".lightbox-stage");
const lightboxTitle = lightbox?.querySelector(".lightbox-title");
const lightboxCount = lightbox?.querySelector(".lightbox-count");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const lightboxPrev = lightbox?.querySelector(".lightbox-nav.prev");
const lightboxNext = lightbox?.querySelector(".lightbox-nav.next");

const REMOTE_VIDEO_BASE_URL = "https://pub-df3be08b24ad41f39ed7da4bef2d8d8f.r2.dev";

const galleries = {
  pg: {
    title: "海外遊戲項目 / PG",
    items: [
      { type: "video", remotePath: "PG/pg-01.mp4" },
      { type: "video", remotePath: "PG/pg-02.mp4" },
      { type: "video", remotePath: "PG/pg-03.mp4" },
      { type: "video", remotePath: "PG/pg-04.mp4" },
      { type: "video", remotePath: "PG/pg-05.mp4" },
      { type: "video", remotePath: "PG/pg-06.mp4" },
      { type: "video", remotePath: "PG/pg-07.mp4" },
      { type: "video", remotePath: "PG/pg-08.mp4" },
      { type: "video", remotePath: "PG/pg-09.mp4" },
      { type: "video", remotePath: "PG/pg-10.mp4" },
      { type: "video", remotePath: "PG/pg-11.mp4" },
      { type: "video", remotePath: "PG/pg-12.mp4" },
      { type: "video", remotePath: "PG/pg-13.mp4" },
      { type: "video", remotePath: "PG/pg-14.mp4" },
      { type: "video", remotePath: "PG/pg-15.mp4" },
      { type: "video", remotePath: "PG/pg-16.mp4" },
      { type: "image", remotePath: "PG/pg-image-01.png" },
      { type: "image", remotePath: "PG/pg-image-02.png" },
      { type: "image", remotePath: "PG/pg-image-03.png" },
      { type: "image", remotePath: "PG/pg-image-04.png" }
    ]
  },
  hof: {
    title: "海外遊戲項目 / HOF",
    items: [
      { type: "video", remotePath: "HOF/hof-01.mp4" },
      { type: "video", remotePath: "HOF/hof-02.mp4" },
      { type: "video", remotePath: "HOF/hof-03.mp4" },
      { type: "video", remotePath: "HOF/hof-04.mp4" },
      { type: "video", remotePath: "HOF/hof-05.mp4" },
      { type: "video", remotePath: "HOF/hof-06.mp4" },
      { type: "video", remotePath: "HOF/hof-07.mp4" },
      { type: "image", remotePath: "HOF/hof.png" }
    ]
  },
  sas: {
    title: "海外遊戲項目 / SAS",
    items: [
      { type: "video", remotePath: "SAS/sas-01.mp4" },
      { type: "video", remotePath: "SAS/sas-02.mp4" },
      { type: "video", remotePath: "SAS/sas-03.mp4" },
      { type: "video", remotePath: "SAS/sas-04.mp4" },
      { type: "video", remotePath: "SAS/sas-05.mp4" },
      { type: "video", remotePath: "SAS/sas-06.mp4" }
    ]
  },
  kit: {
    title: "項目 3D 物料 / 3D Assets",
    items: [
      { type: "video", remotePath: "项目3D物料/asset-02.mp4" },
      { type: "video", remotePath: "项目3D物料/asset-03.mp4" },
      { type: "video", remotePath: "项目3D物料/asset-04.mp4" },
      { type: "video", remotePath: "项目3D物料/asset-05.mp4" },
      { type: "video", remotePath: "项目3D物料/asset-06.mp4" },
      { type: "video", remotePath: "项目3D物料/asset-07.mp4" },
      { type: "video", remotePath: "项目3D物料/asset-08.mp4" },
      { type: "video", remotePath: "项目3D物料/asset-09.mp4" }
    ]
  },
  ue: {
    title: "UE 場景視覺",
    items: [
      { type: "image", src: "assets/originals/ue/cover.jpg" },
      { type: "image", src: "assets/originals/ue/ue-01.png" },
      { type: "image", src: "assets/originals/ue/ue-02.png" },
      { type: "image", src: "assets/originals/ue/ue-03.jpg" },
      { type: "image", src: "assets/originals/ue/ue-04.jpg" },
      { type: "image", src: "assets/originals/ue/ue-05.jpg" },
      { type: "image", src: "assets/originals/ue/ue-06.jpg" },
      { type: "image", src: "assets/originals/ue/ue-07.jpg" }
    ]
  },
  brand: {
    title: "品牌視覺整合",
    items: [
      { type: "image", src: "assets/originals/brand/cover.png" },
      { type: "image", src: "assets/originals/brand/brand-02.png" },
      { type: "image", src: "assets/originals/brand/brand-03.png" },
      { type: "image", src: "assets/originals/brand/brand-04.png" },
      { type: "image", src: "assets/originals/brand/brand-05.png" },
      { type: "image", src: "assets/originals/brand/brand-06.png" }
    ]
  },
  character: {
    title: "角色造型 / 建模 / 視覺展示",
    items: [
      { type: "image", src: "assets/originals/character/cover.jpg" },
      { type: "image", src: "assets/originals/character/character-02.jpg" },
      { type: "image", src: "assets/originals/character/character-03.jpg" },
      { type: "image", src: "assets/originals/character/character-04.png" },
      { type: "image", src: "assets/originals/character/character-05.png" },
      { type: "image", src: "assets/originals/character/character-06.png" }
    ]
  }
};
let activeGallery = null;
let activeGalleryIndex = 0;
let activePage = pages.findIndex((page) => page.classList.contains("active"));
let isPageAnimating = false;
let wheelIntent = 0;
let wheelResetTimer;
let touchStartY = 0;
let touchLastY = 0;
let touchTracking = false;

if (activePage < 0) activePage = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function resolveMediaSrc(item) {
  if (item.remoteSrc) return item.remoteSrc;
  if (item.remotePath && REMOTE_VIDEO_BASE_URL) {
    return `${REMOTE_VIDEO_BASE_URL.replace(/\/$/, "")}/${item.remotePath.replace(/^\//, "")}`;
  }
  return item.src;
}

function fitLightboxMedia(media) {
  if (!lightboxStage || !media) return;

  const stageRect = lightboxStage.getBoundingClientRect();
  const maxWidth = Math.max(1, stageRect.width);
  const maxHeight = Math.max(1, stageRect.height);
  const intrinsicWidth = media.videoWidth || media.naturalWidth;
  const intrinsicHeight = media.videoHeight || media.naturalHeight;

  if (!intrinsicWidth || !intrinsicHeight) return;

  const aspectRatio = intrinsicWidth / intrinsicHeight;
  let width = maxWidth;
  let height = width / aspectRatio;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  media.style.width = `${Math.floor(width)}px`;
  media.style.height = `${Math.floor(height)}px`;
}

function getPageScrollState(page) {
  const canScrollDown = page.scrollTop + page.clientHeight < page.scrollHeight - 8;
  const canScrollUp = page.scrollTop > 8;
  return { canScrollDown, canScrollUp };
}

function stepPage(direction) {
  if (isPageAnimating) return;
  const nextIndex = clamp(activePage + direction, 0, pages.length - 1);
  if (nextIndex !== activePage) {
    showPage(pages[nextIndex].dataset.page);
  }
}

function showPage(pageId, updateHash = true) {
  const nextIndex = pages.findIndex((page) => page.dataset.page === pageId);
  if (nextIndex === -1 || nextIndex === activePage || isPageAnimating) return;

  const nextPage = pages[nextIndex];
  const currentPage = pages[activePage];

  isPageAnimating = true;
  wheelIntent = 0;
  currentPage.classList.remove("active");
  nextPage.classList.add("active");
  nextPage.scrollTop = 0;
  activePage = nextIndex;

  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === pageId);
  });

  if (updateHash) {
    history.replaceState(null, "", `#${pageId}`);
  }

  window.setTimeout(() => {
    isPageAnimating = false;
  }, 1050);
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageId = link.dataset.pageLink;
    if (!pageId) return;
    showPage(pageId);
  });
});

function renderLightbox() {
  if (!activeGallery || !lightboxStage) return;

  const gallery = galleries[activeGallery];
  const item = gallery.items[activeGalleryIndex];

  lightboxStage.innerHTML = "";

  const media = document.createElement(item.type === "video" ? "video" : "img");
  media.src = resolveMediaSrc(item);

  if (item.type === "video") {
    media.controls = true;
    media.autoplay = true;
    media.preload = "metadata";
    media.playsInline = true;
    media.addEventListener("loadedmetadata", () => fitLightboxMedia(media));
  } else {
    media.alt = gallery.title;
    media.addEventListener("load", () => fitLightboxMedia(media));
  }

  lightboxStage.appendChild(media);
  requestAnimationFrame(() => fitLightboxMedia(media));
  lightboxTitle.textContent = gallery.title;
  lightboxCount.textContent = `${activeGalleryIndex + 1} / ${gallery.items.length}`;
}

function openGallery(galleryId) {
  if (!galleries[galleryId] || !lightbox) return;
  activeGallery = galleryId;
  activeGalleryIndex = 0;
  renderLightbox();
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeGallery() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  activeGallery = null;
  activeGalleryIndex = 0;
  if (lightboxStage) lightboxStage.innerHTML = "";
}

function stepGallery(direction) {
  if (!activeGallery) return;
  const total = galleries[activeGallery].items.length;
  activeGalleryIndex = (activeGalleryIndex + direction + total) % total;
  renderLightbox();
}

window.addEventListener("resize", () => {
  if (!lightbox?.classList.contains("active")) return;
  fitLightboxMedia(lightboxStage?.querySelector("img, video"));
});

projectCovers.forEach((cover) => {
  cover.addEventListener("click", () => {
    const galleryId = cover.dataset.gallery;
    if (!galleryId) return;
    openGallery(galleryId);
  });
});

lightboxClose?.addEventListener("click", closeGallery);
lightboxPrev?.addEventListener("click", () => stepGallery(-1));
lightboxNext?.addEventListener("click", () => stepGallery(1));
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeGallery();
});

function setupScrollFloatText() {
  const headings = document.querySelectorAll(".section-heading h2, .contact-grid h2");

  headings.forEach((heading) => {
    if (heading.dataset.floatReady) return;
    const text = heading.textContent;
    heading.textContent = "";
    heading.classList.add("scroll-float");
    heading.dataset.floatReady = "true";

    Array.from(text).forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "char";
      span.style.setProperty("--char-index", index);
      span.textContent = char === " " ? "\u00a0" : char;
      heading.appendChild(span);
    });
  });
}

function setupPressureText() {
  const textElements = Array.from(document.querySelectorAll("[data-pressure-text]"));
  if (!textElements.length) return;

  function getPressureAttr(distance, maxDist, minVal, maxVal) {
    const value = maxVal - Math.abs((maxVal * distance) / maxDist);
    return Math.max(minVal, value + minVal);
  }

  const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const eased = { x: cursor.x, y: cursor.y };
  let pressureEnabled = false;
  let pressureDirty = true;

  function updateCursor(event) {
    const point = event.touches ? event.touches[0] : event;
    cursor.x = point.clientX;
    cursor.y = point.clientY;
    pressureDirty = true;
  }

  function setStyleIfChanged(element, property, value) {
    if (element.style[property] !== value) {
      element.style[property] = value;
    }
  }

  const pressureItems = textElements.map((textElement) => {
    const chars = textElement.dataset.pressureText.split("");
    textElement.textContent = "";
    textElement.style.setProperty("--pressure-count", chars.length);

    chars.forEach((char, index) => {
      const slot = document.createElement("span");
      const glyph = document.createElement("span");
      slot.className = "pressure-slot";
      glyph.className = "pressure-char";
      slot.style.setProperty("--pressure-index", index);
      glyph.textContent = char === " " ? "\u00a0" : char;
      slot.appendChild(glyph);
      textElement.appendChild(slot);
    });

    const item = {
      element: textElement,
      slots: Array.from(textElement.querySelectorAll(".pressure-slot")),
      spans: Array.from(textElement.querySelectorAll(".pressure-char")),
      centers: [],
      restColor: textElement.dataset.pressureRestColor || "#f7fbff",
      activeColor: textElement.dataset.pressureActiveColor || "#ff2f9e",
      mode: textElement.dataset.pressureMode || "default"
    };

    return item;
  });

  function measurePressureItems() {
    pressureItems.forEach((item) => {
      const titleRect = item.element.getBoundingClientRect();
      item.titleRect = titleRect;
      item.maxDist = Math.max(240, titleRect.width * (item.mode === "compressa" ? 0.5 : 0.48));
      item.centers = item.slots.map((slot) => {
        const rect = slot.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      });
    });
  }

  window.addEventListener("mousemove", updateCursor);
  window.addEventListener("touchmove", updateCursor, { passive: true });
  window.addEventListener("resize", () => {
    measurePressureItems();
    pressureDirty = true;
  });

  function animate() {
    const deltaX = cursor.x - eased.x;
    const deltaY = cursor.y - eased.y;
    const isMoving = Math.abs(deltaX) > 0.05 || Math.abs(deltaY) > 0.05;

    eased.x += (cursor.x - eased.x) / 12;
    eased.y += (cursor.y - eased.y) / 12;

    if (pressureEnabled && (pressureDirty || isMoving)) {
      pressureItems.forEach((item) => {
        if (!item.centers.length) measurePressureItems();

        item.spans.forEach((span, index) => {
          const center = item.centers[index];
          if (!center) return;
          const distance = Math.hypot(eased.x - center.x, eased.y - center.y);
          const force = clamp(1 - distance / item.maxDist, 0, 1);

          if (item.mode === "compressa") {
            const lift = (force * -12).toFixed(2);
            const skew = (force * -2.2).toFixed(2);
            const scale = (1 + force * 0.045).toFixed(3);

            setStyleIfChanged(
              span,
              "transform",
              `translate3d(0, ${lift}px, 0) skewX(${skew}deg) scale(${scale})`
            );
          } else if (item.mode === "title") {
            const weight = Math.round(700 + force * 250);
            const lift = (force * -18).toFixed(2);
            const scale = (1 + force * 0.075).toFixed(3);

            setStyleIfChanged(span, "fontWeight", String(weight));
            setStyleIfChanged(span, "fontVariationSettings", `"wght" ${weight}`);
            setStyleIfChanged(span, "transform", `translate3d(0, ${lift}px, 0) scale(${scale})`);
          } else {
            const weight = Math.round(210 + force * 690);
            const width = Math.round(72 + force * 128);
            const skew = (force * 7).toFixed(2);
            const lift = (force * -18).toFixed(2);
            const scaleY = (1 + force * 0.18).toFixed(3);

            setStyleIfChanged(span, "fontVariationSettings", `"wght" ${weight}, "wdth" ${width}, "ital" ${force.toFixed(2)}`);
            setStyleIfChanged(span, "transform", `translate3d(0, ${lift}px, 0) skewX(${-skew}deg) scaleY(${scaleY})`);
          }

          setStyleIfChanged(span, "color", force > 0.38 ? item.activeColor : item.restColor);
          const opacity = item.mode === "title" ? 0.82 + force * 0.18 : 0.78 + force * 0.18;
          setStyleIfChanged(span, "opacity", opacity.toFixed(3));
        });
      });

      pressureDirty = isMoving;
    }

    requestAnimationFrame(animate);
  }

  window.setTimeout(() => {
    measurePressureItems();
    pressureEnabled = true;
  }, 1700);

  animate();
}

window.addEventListener(
  "wheel",
  (event) => {
    if (isPageAnimating) {
      event.preventDefault();
      return;
    }

    const active = pages[activePage];
    if (!active) return;

    const forcePaged = active.classList.contains("cover-page");
    const { canScrollDown, canScrollUp } = getPageScrollState(active);

    if ((event.deltaY > 0 && !forcePaged && canScrollDown) || (event.deltaY < 0 && !forcePaged && canScrollUp)) {
      return;
    }

    wheelIntent += event.deltaY;
    clearTimeout(wheelResetTimer);
    wheelResetTimer = window.setTimeout(() => {
      wheelIntent = 0;
    }, 180);

    if (Math.abs(wheelIntent) < 150) {
      event.preventDefault();
      return;
    }

    const direction = wheelIntent > 0 ? 1 : -1;
    event.preventDefault();
    stepPage(direction);
  },
  { passive: false }
);

window.addEventListener(
  "touchstart",
  (event) => {
    if (lightbox?.classList.contains("active") || event.touches.length !== 1) return;
    touchStartY = event.touches[0].clientY;
    touchLastY = touchStartY;
    touchTracking = true;
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  (event) => {
    if (!touchTracking || isPageAnimating || event.touches.length !== 1) return;
    touchLastY = event.touches[0].clientY;

    const active = pages[activePage];
    if (!active) return;

    const deltaY = touchStartY - touchLastY;
    const direction = deltaY > 0 ? 1 : -1;
    const forcePaged = active.classList.contains("cover-page");
    const { canScrollDown, canScrollUp } = getPageScrollState(active);
    const canScrollInDirection = !forcePaged && ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp));

    if (Math.abs(deltaY) > 18 && !canScrollInDirection) {
      event.preventDefault();
    }
  },
  { passive: false }
);

window.addEventListener(
  "touchend",
  () => {
    if (!touchTracking || isPageAnimating) return;
    touchTracking = false;

    const active = pages[activePage];
    if (!active) return;

    const deltaY = touchStartY - touchLastY;
    if (Math.abs(deltaY) < 72) return;

    const direction = deltaY > 0 ? 1 : -1;
    const forcePaged = active.classList.contains("cover-page");
    const { canScrollDown, canScrollUp } = getPageScrollState(active);
    const canScrollInDirection = !forcePaged && ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp));

    if (!canScrollInDirection) {
      stepPage(direction);
    }
  },
  { passive: true }
);

window.addEventListener("touchcancel", () => {
  touchTracking = false;
});

window.addEventListener("keydown", (event) => {
  if (lightbox?.classList.contains("active")) {
    if (event.key === "Escape") closeGallery();
    if (event.key === "ArrowLeft") stepGallery(-1);
    if (event.key === "ArrowRight") stepGallery(1);
    return;
  }

  const downKeys = ["ArrowDown", "PageDown", " "];
  const upKeys = ["ArrowUp", "PageUp"];
  if (![...downKeys, ...upKeys].includes(event.key)) return;

  event.preventDefault();

  const direction = downKeys.includes(event.key) ? 1 : -1;
  stepPage(direction);
});

let initialPage = window.location.hash.replace("#", "");
if (initialPage && pages.some((page) => page.dataset.page === initialPage)) {
  showPage(initialPage, false);
} else if (!initialPage) {
  history.replaceState(null, "", "#welcome");
}

setupScrollFloatText();
setupPressureText();

