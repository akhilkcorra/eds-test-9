import { getConfigValue } from './configs.js';

async function addGTM() {
  const gtmId = await getConfigValue('gtm-id');
  if (!gtmId) return;
  const script = document.createElement('script');
  script.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtmId}');`;
  document.head.prepend(script);
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.insertAdjacentElement('afterbegin', noscript);
}

function pushPageViewEvent() {
  window.dataLayer = window.dataLayer || [];
  // testing page view event
  if (window?.location?.href) {
    window.dataLayer.push({
      event: 'pageview',
      pagePath: window.location.href,
      pageTitle: document?.title ?? 'Adobe Commerce Storefornt',
      visitorType: 'customer',
    });
  }
}

function pushViewItemEvent(productDetail) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'view_item',
    ecommerce: {
      currency: productDetail?.price?.final?.amount?.currency,
      value: productDetail?.price?.final?.amount?.value,
      items: [
        {
          item_id: productDetail?.sku,
          item_name: productDetail?.name,
          item_brand: 'Test brand',
          price: productDetail.price?.final?.amount?.value,
          quantity: 1,
        },
      ],
    },
  });
}
function pushViewCartEvent() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window.dataLayer.push({
    event: 'view_cart',
    ecommerce: {
      currency: 'USD',
      value: 30.03,
      items: [
        {
          item_id: '24-WB06',
          item_name: 'Endeavor Daytrip Backpack',
          affiliation: 'Google Merchandise Store',
          coupon: 'SUMMER_FUN',
          discount: 2.22,
          index: 0,
          item_brand: 'Test brand',
          item_category: 'Apparel',
          item_category2: 'Adult',
          item_category3: 'Shirts',
          item_category4: 'Crew',
          item_category5: 'Short sleeve',
          item_list_id: 'related_products',
          item_list_name: 'Related Products',
          item_variant: 'green',
          location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
          price: 10.01,
          quantity: 3,
        },
      ],
    },
  });
}

// eslint-disable-next-line import/prefer-default-export
export { addGTM, pushPageViewEvent, pushViewItemEvent, pushViewCartEvent };
