import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useRef} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import ball from '../assets/pelota.png'
import racketPic from '../assets/card.png'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Tennis | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home">
      <FeaturedCollection collection={data.featuredCollection} />
      <TennisSection />
      <CarouselsSection  />
      <TennisPersonSection />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <>
      <section className="racket-background d-flex justify-content-start align-items-center">
        <div className="vertical-line"></div>
          <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-12"></div>
            <div className="col-lg-8 col-md-8 col-sm-12 row">
              <div className="col-3 col-sm-3 "></div>
              <div className="col-9 col-sm-9 col-md-12 col-lg-12">
                <div className="justify-content-lg-start">
                  <h1 className="text-white">Las mejores raquetas para 
                    jugar <span className="text-lime">Tennis</span>
                  </h1>
                </div>
                <div className="mt-5">
                  <a href="#acerca" className="custom-btn text-decoration-none">
                    <span className="text-uppercase">Acerca de Nosotros</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" fill="currentColor" className="bi bi-arrow-right ms-2" viewBox="0 0 24 16">
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h19.793l-2.073-2.073a.5.5 0 1 1 .708-.708l2.8 2.8a.5.5 0 0 1 0 .708l-2.8 2.8a.5.5 0 1 1-.708-.708L20.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          <div className="col-lg-2 col-md-2 col-sm-12"></div>
        </div>
      </section>
    </>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

/**
 * @param {{
 *   products: Promise<TennisSectionQuery | null>;
 * }}
 */
function TennisSection() {
  return (
    <>
    <section className="section-tennis">
        <div className="container">
            <div className="row ">
                <div className="col-md-3 d-flex justify-content-start justify-content-md-end mb-5">
                    <div className="tennis-label mt-3 me-3">
                        TENNIS
                    </div>
                </div>
                <div className="col-md-5">
                    <h1 className="main-heading ">
                        <span>Raquetas.</span><span>Accesorios.</span><span>Pelotas.</span>
                    </h1>
                    <p className="subheading mt-5">
                        Conoce nuestras raquetas y aprende a jugar<br/> Tennis como un profesional.
                    </p>
                </div>
                <div className="col-md-4 d-flex align-items-end justify-content-start justify-content-md-center">
                  <a href="#acerca" className="btn-outline-custom text-decoration-none dynamic-margin mt-4">
                    <span className="me-5">HISTORIA</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" fill="currentColor" className="bi bi-arrow-right ms-2" viewBox="0 0 24 16">
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h19.793l-2.073-2.073a.5.5 0 1 1 .708-.708l2.8 2.8a.5.5 0 0 1 0 .708l-2.8 2.8a.5.5 0 1 1-.708-.708L20.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                  </a>
                </div>
            </div>
        </div>
    </section>
    </>
  );
}

function CarouselsSection() {

  const rackets = [
    { id: 1, img: racketPic, alt: 'Raqueta 1', className: 'card-racket' },
    { id: 2, img: racketPic, alt: 'Raqueta 2', className: 'card-racket' },
    { id: 3, img: racketPic, alt: 'Raqueta 3', className: 'card-racket' },
    { id: 4, img: racketPic, alt: 'Raqueta 4', className: 'card-racket' },
    { id: 5, img: racketPic, alt: 'Raqueta 5', className: 'card-racket' }
  ]
  const balls = [
    { id: 1, img: '../assets/pelota.png', alt: 'Raqueta 1', className: 'card-ball' },
    { id: 2, img: '../assets/pelota.png', alt: 'Raqueta 2', className: 'card-ball' },
    { id: 3, img: '../assets/pelota.png', alt: 'Raqueta 3', className: 'card-ball' },
    { id: 4, img: '../assets/pelota.png', alt: 'Raqueta 4', className: 'card-ball' }
  ]

  return (
    <>
     <section className="p-0 height-section d-flex align-items-center row">
      <div className="col-12 col-sm-12 col-md-4">
      <Swiper
        modules={[Navigation, Pagination]}
          effect="card"
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}

        >
          {balls.map((ball) => (
          <SwiperSlide key={ball.id}>
            <div  className={`custom-carousel-item ${ball.className} height-ball row p-5`}>
              <div className="col-4"></div>
              <div className="col-8 mt-2">
                <h2 className="text-white">Nuestras</h2>
                <h2 style={{fontWeight: 'bold', color: 'white'}}>Raquetas</h2>
                <p className="text-white" style={{fontSize: '16px'}}>Conoce nuestras raquetas y aprende a jugar tennis cómo un profesional.</p>
              </div>
            </div>
            </SwiperSlide>
            ))}
            <div className="swiper-button-container">
              <div className="swiper-button-prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-play-fill text-white" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
              </div>
              <div className="swiper-button-next">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-play-fill text-white" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
              </div>
            </div>   
          </Swiper>
      </div>
      <div className="col-12 col-sm-12 col-md-8">
      <Swiper
      spaceBetween={10} 
      centeredSlides={false} 
      loop={false} 
      breakpoints={{
        320: {
          slidesPerView: 1, 
        },
        430: {
          slidesPerView: 1, 
        },
        630: {
          slidesPerView: 2, 
        },
        768: {
          slidesPerView: 2, 
        },
        1024: {
          slidesPerView: 3, 
        },
      }}
    >
      {rackets.map(x => (
        <SwiperSlide key={x.id}>
        <div className="slide-content ">
          <span className="slide-number card-rackets-swiper">{x.id}</span>
          <img src={x.img} alt={x.alt} />
        </div>
      </SwiperSlide>
      ))}
    </Swiper>
        
        </div>
      
      </section>
    </>
  );
}
function TennisPersonSection() {
  return (
    <>
    <section className="tennis-section">
        
    </section>
    </>
  );
}


const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
