const app = document.getElementById('app');

function getOutfitIdFromQuery() {
  if (!window || !window.location || !window.location.search) {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const outfitId = params.get('outfit');
  return outfitId ? outfitId.trim() : null;
}

function getProductIndexFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const productIndex = params.get('product');

  if (productIndex === null) {
    return null;
  }

  if (!/^(0|[1-9]\d*)$/.test(productIndex)) {
    return Number.NaN;
  }

  return Number(productIndex);
}

function findOutfit(outfitId) {
  if (Object.prototype.hasOwnProperty.call(outfits, outfitId)) {
    return outfits[outfitId];
  }

  const numericId = Number(outfitId);
  if (Number.isInteger(numericId) && numericId >= 0) {
    const normalizedId = String(numericId);
    if (Object.prototype.hasOwnProperty.call(outfits, normalizedId)) {
      return outfits[normalizedId];
    }
  }

  return null;
}

function renderHomePage() {
  const outfitEntries = Object.entries(outfits);

  app.innerHTML = `
    <section class="hero-home">
      <div class="container hero-home-inner">
        <div class="copy-block">
          <p class="eyebrow">Curated Looks</p>
          <h1>Shop the outfit that matches your mood.</h1>
          <p class="lede">
            Discover elevated wardrobe essentials hand-picked for an easy, polished lifestyle.
          </p>
        </div>
      </div>
    </section>

    <section class="collection-index">
      <div class="container">
        <div class="section-heading-wrap">
          <p class="eyebrow">Featured Collections</p>
          <h2>Browse our latest outfit edits</h2>
        </div>

        <div class="outfit-grid">
          ${outfitEntries
            .map(
              ([id, outfit]) => `
                <article class="outfit-card">
                  <img src="${outfit.heroImage}" alt="${outfit.title}" loading="lazy" />
                  <div class="outfit-card-body">
                    <span class="collection-number">Outfit ${outfit.id}</span>
                    <h3>${outfit.title}</h3>
                    <p>${outfit.description}</p>
                    <a href="index.html?outfit=${outfit.id}" class="primary-btn">View Collection</a>
                  </div>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderOutfitPage(outfitId) {
  const outfit = findOutfit(outfitId);

  if (!outfit) {
    renderNotFound();
    return;
  }

  const productsMarkup = outfit.products
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-card-body">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="primary-btn">See Details</a>
          </div>
        </article>
      `
    )
    .join('');

  app.innerHTML = `
    <section class="outfit-hero">
      <div class="container outfit-hero-inner">
        <img src="${outfit.heroImage}" alt="${outfit.title}" class="outfit-hero-image" />
        <div class="outfit-copy">
          <p class="eyebrow">Outfit ${outfit.id}</p>
          <h1>${outfit.title}</h1>
          <p>${outfit.description}</p>
          <h2>Shop This Outfit</h2>
        </div>
      </div>
    </section>

    <section class="product-section">
      <div class="container">
        <div class="product-grid">
          ${productsMarkup}
        </div>
      </div>
    </section>

    <section class="disclosure-box" aria-label="Affiliate disclosure section">
      <div class="container disclosure-content">
        <p><strong>As an Amazon Associate I earn from qualifying purchases.</strong></p>
        <p>Some links on this page are affiliate links. I may earn a commission if you purchase through them, at no extra cost to you.</p>
      </div>
    </section>
  `;
}

function renderProductPage(outfit, productIndex, requestedOutfitId) {
  const product = outfit.products[productIndex];

  if (!product) {
    renderProductNotFound(outfit, requestedOutfitId);
    return;
  }

  const description =
    product.description || `A featured piece from the ${outfit.title} collection.`;

  app.innerHTML = `
    <section class="product-section product-detail">
      <div class="container">
        <a href="index.html?outfit=${encodeURIComponent(requestedOutfitId)}" class="back-link">
          &larr; Back to Full Outfit
        </a>
        <div class="product-grid product-grid-single">
          <article class="product-card">
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-card-body">
              <p class="eyebrow">Outfit ${outfit.id}</p>
              <h1>${product.name}</h1>
              <p>${description}</p>
              <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="primary-btn">See Details</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="disclosure-box" aria-label="Affiliate disclosure section">
      <div class="container disclosure-content">
        <p><strong>As an Amazon Associate I earn from qualifying purchases.</strong></p>
        <p>Some links on this page are affiliate links. I may earn a commission if you purchase through them, at no extra cost to you.</p>
      </div>
    </section>
  `;
}

function renderProductNotFound(outfit, requestedOutfitId) {
  const returnOutfitId = requestedOutfitId || outfit.id;

  app.innerHTML = `
    <section class="not-found">
      <div class="container not-found-inner">
        <p class="eyebrow">Product Not Found</p>
        <h1>Product Not Found</h1>
        <p>The product you are looking for is not available in this outfit.</p>
        <a href="index.html?outfit=${encodeURIComponent(returnOutfitId)}" class="primary-btn">Back to Full Outfit</a>
      </div>
    </section>

    <section class="disclosure-box" aria-label="Affiliate disclosure section">
      <div class="container disclosure-content">
        <p><strong>As an Amazon Associate I earn from qualifying purchases.</strong></p>
        <p>Some links on this page are affiliate links. I may earn a commission if you purchase through them, at no extra cost to you.</p>
      </div>
    </section>
  `;
}

function renderNotFound() {
  app.innerHTML = `
    <section class="not-found">
      <div class="container not-found-inner">
        <p class="eyebrow">Collection Not Found</p>
        <h1>Outfit Not Found</h1>
        <p>The outfit you are looking for is not available.</p>
        <a href="index.html" class="primary-btn">Return to the Main Website</a>
      </div>
    </section>
  `;
}

function initializePage() {
  if (!app) {
    return;
  }

  const outfitId = getOutfitIdFromQuery();

  if (!outfitId) {
    renderHomePage();
    return;
  }

  const outfit = findOutfit(outfitId);
  if (!outfit) {
    renderNotFound();
    return;
  }

  const productIndex = getProductIndexFromQuery();
  if (productIndex === null) {
    renderOutfitPage(outfitId);
    return;
  }

  if (!Number.isInteger(productIndex) || productIndex < 0 || productIndex >= outfit.products.length) {
    renderProductNotFound(outfit, outfitId);
    return;
  }

  renderProductPage(outfit, productIndex, outfitId);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
