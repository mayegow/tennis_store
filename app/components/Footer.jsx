import {Suspense} from 'react';
import {Await} from '@remix-run/react';


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
              <FooterMenu
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
function FooterMenu() {
  return (
    <>
      <footer className="footer-tennis">
          <div className="container">
              <div className="row">
                  <div className="col-md-6 row">
                    <div className="col-md-12">
                      <a href="#" className="fw-100">Inicio</a>
                      <a href="#" className="fw-light">Acerca de nosotros</a>
                      <a href="#" className="fw-light">Historia</a>
                      <a href="#" className="fw-light">Contacto</a>
                    </div>
                    <div className="col-md-12 mt-4">
                      <div className="">
                          <a href="#" className="circle-social text-light">
                            <div className="d-flex align-items-center justify-content-center">
                            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                width="24px" height="24px" viewBox="0 0 552.77 552.77"
                                className="text-white"
                                xml:space="preserve">
                              <g>
                                <g>
                                  <path d="M17.95,528.854h71.861c9.914,0,17.95-8.037,17.95-17.951V196.8c0-9.915-8.036-17.95-17.95-17.95H17.95
                                    C8.035,178.85,0,186.885,0,196.8v314.103C0,520.816,8.035,528.854,17.95,528.854z"/>
                                  <path d="M17.95,123.629h71.861c9.914,0,17.95-8.036,17.95-17.95V41.866c0-9.914-8.036-17.95-17.95-17.95H17.95
                                    C8.035,23.916,0,31.952,0,41.866v63.813C0,115.593,8.035,123.629,17.95,123.629z"/>
                                  <path d="M525.732,215.282c-10.098-13.292-24.988-24.223-44.676-32.791c-19.688-8.562-41.42-12.846-65.197-12.846
                                    c-48.268,0-89.168,18.421-122.699,55.27c-6.672,7.332-11.523,5.729-11.523-4.186V196.8c0-9.915-8.037-17.95-17.951-17.95h-64.192
                                    c-9.915,0-17.95,8.035-17.95,17.95v314.103c0,9.914,8.036,17.951,17.95,17.951h71.861c9.915,0,17.95-8.037,17.95-17.951V401.666
                                    c0-45.508,2.748-76.701,8.244-93.574c5.494-16.873,15.66-30.422,30.488-40.649c14.83-10.227,31.574-15.343,50.24-15.343
                                    c14.572,0,27.037,3.58,37.393,10.741c10.355,7.16,17.834,17.19,22.436,30.104c4.604,12.912,6.904,41.354,6.904,85.33v132.627
                                    c0,9.914,8.035,17.951,17.949,17.951h71.861c9.914,0,17.949-8.037,17.949-17.951V333.02c0-31.445-1.982-55.607-5.941-72.48
                                    S535.836,228.581,525.732,215.282z"/>
                                </g>
                              </g>
                              </svg>
                            </div>
                          </a>
                          <a href="#" className="circle-social text-light ">
                            <div className="d-flex align-items-center justify-content-center">
                            <svg width="24px" height="24px" viewBox="0 -1.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                                  <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7560.000000)" fill="#fff">
                                      <g id="icons" transform="translate(56.000000, 160.000000)">
                                          <path d="M23.99,7403.93262 C23.9,7405.8454 22.541,7408.46538 19.911,7411.79058 C17.192,7415.26353 14.891,7417 13.009,7417 C11.843,7417 10.857,7415.94019 10.051,7413.82155 L8.437,7407.99457 C7.839,7405.87495 7.197,7404.81514 6.51,7404.81514 C6.36,7404.81514 5.837,7405.12441 4.941,7405.74296 L4,7404.55117 C4.986,7403.69722 5.957,7402.84326 6.913,7401.99029 C8.228,7400.87138 9.214,7400.28337 9.871,7400.22427 C11.425,7400.07751 12.381,7401.12156 12.74,7403.35839 C13.128,7405.77251 13.397,7407.2726 13.547,7407.8616 C13.995,7409.86303 14.488,7410.86374 15.026,7410.86374 C15.444,7410.86374 16.072,7410.21662 16.908,7408.92141 C17.745,7407.6262 18.193,7406.64026 18.253,7405.96359 C18.372,7404.84469 17.924,7404.28622 16.908,7404.28622 C16.43,7404.28622 15.937,7404.38865 15.429,7404.59451 C16.415,7401.44561 18.298,7399.91499 21.077,7400.00364 C23.138,7400.06274 24.11,7401.37174 23.99,7403.93262 L23.99,7403.93262 Z" id="vimeo-[#144]">
                                          </path>
                                      </g>
                                  </g>
                              </g>
                              </svg>
                            </div>
                          </a>
                          <a href="#" className="circle-social text-light ">
                            <div className="d-flex align-items-center justify-content-center">
                            <svg width="24px" height="24px" className="text-white" viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10C8.88071 10 10 8.88071 10 7.5C10 6.11929 8.88071 5 7.5 5Z" fill="#FFF"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.5 0C2.01472 0 0 2.01472 0 4.5V10.5C0 12.9853 2.01472 15 4.5 15H10.5C12.9853 15 15 12.9853 15 10.5V4.5C15 2.01472 12.9853 0 10.5 0H4.5ZM4 7.5C4 5.567 5.567 4 7.5 4C9.433 4 11 5.567 11 7.5C11 9.433 9.433 11 7.5 11C5.567 11 4 9.433 4 7.5ZM11 4H12V3H11V4Z" fill="#FFF"/>
                            </svg>
                            </div>
                          </a>
                          <a href="#" className="circle-social text-light ">
                            <div className="d-flex align-items-center justify-content-center">
                            <svg width="24px" height="24px" viewBox="0 -2 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                                    <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7521.000000)" fill="#fff">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705" id="twitter-[#154]">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            </div>
                          </a>
                          <a href="#" className="circle-social text-light ">
                            <div className="d-flex align-items-center justify-content-center">
                            <svg width="24px" height="24px" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)" fill="#fff">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z" id="facebook-[#176]">
                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            </div>
                          </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end align-items-center">
                      <div className="footer-logo">
                      <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 964.89 964.89" height="32px" width="32px" >
                        <path className='cls-1'  d="M569.1,143.71c0-48.53-7.53-95.32-21.46-139.31-21.33-2.88-43.09-4.4-65.2-4.4C216,0,0,216,0,482.45c0,39.4,4.76,77.68,13.67,114.34,30.04,6.16,61.14,9.39,92.97,9.39,255,0,462.46-207.46,462.46-462.46Z"/>
                        <path className='cls-1'  d="M963.47,445.19c-221.29,8.58-398.68,191.25-398.68,414.6,0,33.03,3.9,65.17,11.23,95.99,221.65-43.57,388.86-238.92,388.86-473.34,0-12.54-.48-24.96-1.42-37.25Z"/>
                        <path className='cls-1'  d="M667.1,547.14c78.98-78.98,182.59-124.38,293.51-129.07-27.28-204.53-182.68-368.53-382.87-408.64,12.22,43.13,18.57,88.21,18.57,134.28,0,130.79-50.93,253.76-143.42,346.25-92.49,92.49-215.45,143.42-346.25,143.42-28.76,0-57.13-2.47-84.89-7.29,61.14,196.3,244.28,338.81,460.7,338.81,22.59,0,44.81-1.59,66.58-4.59-7.54-32.57-11.43-66.24-11.43-100.5,0-118.1,45.99-229.14,129.5-312.65Z"/>
                      </svg>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
    </>
  );
}


