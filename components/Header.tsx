
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ShoppingCart, Search, Heart, UserRound, Menu, X, LogOut, Headphones, Truck, ChevronDown, Gift, Mail, UserPlus,
} from 'lucide-react';
import { useStore } from './StoreContext';

export default function Header() {
  const { cart, wishlist, user, logout } = useStore();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const router = useRouter();
  const pathname = usePathname();

  const links: [string, string][] = [
    ['/', 'Home'],
    ['/products', 'Shop'],
    ['/categories', 'Categories'],
    ['/brands', 'Brands'],
  ];

  const close = () => setOpen(false);

  const signOut = () => {
    logout();
    close();
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    close();
    router.push('/products?q=' + encodeURIComponent(query));
  };

  return (
    <header className="relative z-30 bg-white">

      {/* TOP HEADER */}
      <div className="border-b border-[#eef1ee] bg-[#f8faf8] text-[11px] text-[#66776d]">
        <div className="wrap flex min-h-[36px] items-center justify-between gap-3">

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="flex items-center gap-1.5">
              <Truck size={13} className="text-[#08a44e]" />
              Free Shipping on Orders Over 500 EGP
            </span>

            <span className="hidden items-center gap-1.5 sm:flex">
              <Gift size={12} className="text-[#08a44e]" />
              New Arrivals Daily
            </span>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="inline-flex items-center gap-1">
              <Headphones size={12} />
              +1 (800) 123-4567
            </span>

            <span className="inline-flex items-center gap-1">
              <Mail size={12} />
              support@freshcart.com
            </span>

            <span className="text-[#ced8d1]">|</span>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-1 hover:text-green-600"
                >
                  <UserRound size={12} />
                  {user.name}
                </Link>

                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center gap-1 hover:text-red-600"
                >
                  <LogOut size={12} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 hover:text-green-600"
                >
                  <UserRound size={12} />
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-1 hover:text-green-600"
                >
                  <UserPlus size={12} />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b border-[#edf0ed]">
        <div className="wrap flex min-h-[66px] items-center gap-3 lg:gap-5">

          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1 text-[21px] font-extrabold tracking-[-.8px] text-[#192b25]"
          >
            <ShoppingCart
              size={25}
              strokeWidth={1.8}
              className="text-[#08af59]"
            />

            <span>
              Fresh
              <span className="text-[#0aa65a]">Cart</span>
            </span>
          </Link>

          {/* DESKTOP SEARCH */}
          <form
            role="search"
            onSubmit={handleSearch}
            className="catalog-search hidden max-w-[390px] flex-1 items-center rounded-full border border-[#dfe8e3] bg-white md:flex"
          >
            <input
              aria-label="Search products"
              className="min-w-0 w-full flex-1 border-0 bg-transparent px-4 py-[11px] text-xs outline-none"
              placeholder="Search for products, brands and more..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              type="submit"
              className="mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#08a75d] text-white transition hover:bg-[#067e43]"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          {/* DESKTOP NAVIGATION */}
          <nav className="ml-auto hidden items-center gap-4 text-xs font-semibold text-[#42534a] lg:flex">

            {links.map(([url, label]) =>
              url === '/categories' ? (
                <div key={url} className="group relative">

                  <Link
                    href={url}
                    className={`inline-flex items-center gap-1 py-3 ${
                      pathname === url
                        ? 'text-[#08a85b]'
                        : 'hover:text-[#08a85b]'
                    }`}
                  >
                    {label}
                    <ChevronDown size={12} />
                  </Link>

                  <div className="invisible absolute left-0 top-full z-50 min-w-[165px] translate-y-1 rounded-xl border border-[#e8eee9] bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">

                    <Link
                      href="/categories"
                      className="block rounded-md px-3 py-2 hover:bg-green-50"
                    >
                      All Categories
                    </Link>

                    <Link
                      href="/products"
                      className="block rounded-md px-3 py-2 hover:bg-green-50"
                    >
                      Browse Products
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={url}
                  href={url}
                  className={
                    pathname === url
                      ? 'text-[#08a85b]'
                      : 'hover:text-[#08a85b]'
                  }
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* HEADER ICONS */}
          <div className="ml-auto flex shrink-0 items-center gap-2 text-[#34473b] lg:ml-0 lg:gap-3">

            {/* SUPPORT */}
            <Link
              href="mailto:support@freshcart.com"
              aria-label="24/7 Help"
              className="header-icon hidden items-center gap-1.5 xl:inline-flex"
            >
              <span className="rounded-full bg-[#e9faf0] p-2 text-[#0aa65a]">
                <Headphones size={14} />
              </span>

              <span className="text-[10px] leading-tight text-[#63776b]">
                Support
                <br />
                <strong className="text-[#223329]">
                  24/7 Help
                </strong>
              </span>
            </Link>

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative header-icon"
            >
              <Heart size={19} />

              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-[#08ab5e] px-1 text-[9px] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative header-icon"
            >
              <ShoppingCart size={19} />

              {!!cart?.products?.length && (
                <span className="absolute -right-1 -top-1 rounded-full bg-[#08ab5e] px-1 text-[9px] text-white">
                  {cart.products.length}
                </span>
              )}
            </Link>

            {/* PROFILE */}
            <Link
              href={user ? '/profile' : '/login'}
              aria-label="My account"
              className="header-icon hidden sm:inline-flex"
            >
              <UserRound size={19} />
            </Link>

            {/* SIGN IN */}
            {!user && (
              <Link
                href="/login"
                className="hidden rounded-full bg-[#13a04c] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0c813b] xl:inline-flex"
              >
                Sign In
              </Link>
            )}

            {/* MOBILE + TABLET MENU - FIXED */}
            <div className="lg:hidden">
              <button
                type="button"
                className="header-icon"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label="Toggle menu"
              >
                {open ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE + TABLET NAVIGATION */}
      {open && (
        <nav
          id="mobile-navigation"
          className="wrap flex flex-col gap-1 border-b border-[#e9eee9] py-3 text-sm font-medium lg:hidden"
        >

          {/* MOBILE SEARCH */}
          <form
            role="search"
            onSubmit={handleSearch}
            className="catalog-search mb-2 flex items-center rounded-lg border border-[#dde9df] md:hidden"
          >
            <input
              aria-label="Search products"
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2 outline-none"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              type="submit"
              className="mr-2 text-green-600"
              aria-label="Search"
            >
              <Search size={19} />
            </button>
          </form>

          {/* NAV LINKS */}
          {links.map(([url, label]) => (
            <Link
              key={url}
              onClick={close}
              href={url}
              className="rounded-lg px-3 py-2 hover:bg-green-50"
            >
              {label}
            </Link>
          ))}

          <Link
            onClick={close}
            href="/wishlist"
            className="rounded-lg px-3 py-2"
          >
            Wishlist
          </Link>

          <Link
            onClick={close}
            href="/cart"
            className="rounded-lg px-3 py-2"
          >
            Cart
          </Link>

          {/* ACCOUNT LINKS */}
          {user ? (
            <>
              <Link
                onClick={close}
                href="/profile"
                className="rounded-lg px-3 py-2"
              >
                My Account
              </Link>

              <Link
                onClick={close}
                href="/orders"
                className="rounded-lg px-3 py-2"
              >
                My Orders
              </Link>

              <button
                type="button"
                onClick={signOut}
                className="px-3 py-2 text-left text-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-2 px-3 pt-2">

              <Link
                onClick={close}
                href="/login"
                className="rounded-lg bg-green-600 px-5 py-2 text-white"
              >
                Sign In
              </Link>

              <Link
                onClick={close}
                href="/register"
                className="rounded-lg border border-green-600 px-5 py-2 text-green-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
