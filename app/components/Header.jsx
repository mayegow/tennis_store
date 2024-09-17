import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink} from '@remix-run/react';
import {useAnalytics} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={`header-custom fixed-top ${scrolled ? 'bg-white shadow' : 'bg-transparent'}`}>
      <nav className={`container-fluid d-flex justify-content-between align-items-center py-3 ${!scrolled && 'mt-3'}`}>
        {/* Logo */}
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
          <strong className="ms-3">
          <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 964.89 964.89" height="32px" width="32px" >
            <path className={scrolled ? 'cls-2' : 'cls-1'}  d="M569.1,143.71c0-48.53-7.53-95.32-21.46-139.31-21.33-2.88-43.09-4.4-65.2-4.4C216,0,0,216,0,482.45c0,39.4,4.76,77.68,13.67,114.34,30.04,6.16,61.14,9.39,92.97,9.39,255,0,462.46-207.46,462.46-462.46Z"/>
            <path className={scrolled ? 'cls-2' : 'cls-1'}  d="M963.47,445.19c-221.29,8.58-398.68,191.25-398.68,414.6,0,33.03,3.9,65.17,11.23,95.99,221.65-43.57,388.86-238.92,388.86-473.34,0-12.54-.48-24.96-1.42-37.25Z"/>
            <path className={scrolled ? 'cls-2' : 'cls-1'}  d="M667.1,547.14c78.98-78.98,182.59-124.38,293.51-129.07-27.28-204.53-182.68-368.53-382.87-408.64,12.22,43.13,18.57,88.21,18.57,134.28,0,130.79-50.93,253.76-143.42,346.25-92.49,92.49-215.45,143.42-346.25,143.42-28.76,0-57.13-2.47-84.89-7.29,61.14,196.3,244.28,338.81,460.7,338.81,22.59,0,44.81-1.59,66.58-4.59-7.54-32.57-11.43-66.24-11.43-100.5,0-118.1,45.99-229.14,129.5-312.65Z"/>
          </svg>
          </strong>
        </NavLink>

        {/* Menu */}
        <HeaderMenu
          viewport="desktop"
          primaryDomainUrl={shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
          scroll={scrolled}
        />

        {/* Call to actions */}
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} scroll={scrolled} />
      </nav>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  scroll,
}) {
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        (FALLBACK_HEADER_MENU).items.map((item) => {
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
          className="text-black"
        >
          {item.title}
        </NavLink>
        }))}
      {(FALLBACK_HEADER_MENU).items.map((item, idx) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className={` ${ idx === 0  && 'active-link'} header-menu-item mx-4 text-decoration-none ${scroll || viewport === 'mobile' ? 'text-black':'text-white'} spacing-text`}
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, scroll, }) {
  const [viewport, setViewport] = useState(null); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setViewport(window.innerWidth);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = viewport !== null && viewport <= 768;
  
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle scroll={scroll} />
      <button className={`btn btn-trasnparent ${(isLoggedIn && 'fw-bold')} ${scroll ? 'text-black' : 'text-white'} spacing-text  ${isMobile && 'd-none'}`} >ES</button>
      <button className={`btn btn-trasnparent ${(!isLoggedIn && 'fw-bold')} ${scroll ? 'text-black' : 'text-white'} spacing-text ${isMobile && 'd-none'}`}>EN</button>
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="ES">
        </Suspense>
      </NavLink>
    </nav>
  );
}

function HeaderMenuMobileToggle({scroll}) {

  const {open} = useAside();
  return (
    <button
      className={`header-menu-mobile-toggle reset ${scroll ? 'text-black': 'text-white'}`}
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      Search
    </button>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'Inicio',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'Acerca de nosotros',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Historia',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Contacto',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : '#000',
    position: 'relative',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
