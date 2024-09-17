import {Suspense, useRef} from 'react';
import ball from '../assets/pelota.png'
import racketPic from '../assets/card.png'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <CarouselBalls
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function CarouselBalls({balls}) {
  return (
    <>
        <Swiper
            modules={[Navigation, Pagination]}
            effect="card"
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
                nextEl: '.swiper-button-next', // Selector para el botón "Siguiente"
                prevEl: '.swiper-button-prev', // Selector para el botón "Anterior"
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
      
    </>
  );
}

