# My Fashion Finds

This is a lightweight static fashion affiliate website built with HTML, CSS, and vanilla JavaScript.

## How it works

- The website uses a single page: `index.html`
- Outfit data is stored in `data.js`
- The JavaScript reads the `outfit` query parameter from the URL, such as `?outfit=001`
- If the outfit exists, it displays only that outfit and its related products
- If no outfit is supplied, it shows an index of all outfit collections
- If the outfit ID is invalid, it shows a clean not-found message

## Add a new outfit

Open `data.js` and add a new object inside the `outfits` collection:

```js
"004": {
  id: "004",
  title: "New Outfit Title",
  description: "Description of the outfit.",
  heroImage: "https://images.unsplash.com/...",
  products: [
    {
      name: "Product Name",
      image: "https://images.unsplash.com/...",
      description: "Short product description.",
      affiliateUrl: "https://www.amazon.com/s?k=your+affiliate+keyword"
    }
  ]
}
```

### Tips

- Keep outfit IDs as strings like `"001"`, `"002"`, `"003"`
- Put your own affiliate links in each `affiliateUrl`
- Use high-quality image URLs or local files in an `assets` folder
- You do not need to create a new HTML page for every outfit

## Run locally

From the project folder, start a local static server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Example URLs

- `http://localhost:8000/?outfit=001`
- `http://localhost:8000/?outfit=002`
- `http://localhost:8000/`

## Affiliate disclosure

The disclosure is included on every collection page and in the footer.

## Customize branding

You can quickly change the site name and text in:

- `index.html`
- `styles.css`
- `app.js`

## Image suggestions

For a simple setup, use reliable image URLs from Unsplash or upload your own images into an `assets/` folder and update the paths.
