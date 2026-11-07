# FreshCart — Next.js + Tailwind CSS

A **from-scratch** e-commerce coursework implementation using Next.js App Router, Tailwind v4 and the Route E-commerce API.

## Run

1. Install Node.js 20+.
2. Open this folder in VS Code.
3. Run `npm install`, then `npm run dev`.
4. Visit http://localhost:3000.

You can copy `.env.example` to `.env.local` to change the public API base.

## Pages

Home `/`, Shop `/products`, Product `/products/[id]`, Categories `/categories`, Category `/categories/[id]`, Brands `/brands`, Brand `/brands/[id]`, Wishlist `/wishlist`, Cart `/cart`, Checkout `/checkout`, Orders `/orders`, Account `/profile`, Login `/login`, Register `/register`, Forgot Password `/forgot-password`, Verify `/verify-code`, Reset `/reset-password`.

## Important implementation notes

- API: `https://ecommerce.routemisr.com/api/v1` (Route API), see the linked Postman documentation.
- Products, brands and categories are loaded live from the API.
- Cart and wishlist require an authenticated Route account. Changes persist via its API.
- Cash and online checkout call different order endpoints; online redirects to the payment provider.
- Tokens are stored in `localStorage` for this coursework implementation. For production, use a backend-authenticated secure HTTP-only cookie rather than browser storage.
- Search and category/brand filters operate on the products currently loaded on the active pagination page. For a complete production catalog use API-level search/filter queries.
- Newsletter is informational only, not a functioning subscription.
- This is a working-source deliverable, **not** a verified pixel-perfect copy of the Figma file: direct Figma design access was blocked, so styling follows the public FreshCart demo references.
- Requires local `npm install` and full browser testing against the API. Do not assume the payment service can be tested without a live account and valid checkout session.
