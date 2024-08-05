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
export { loadGTM, pushPageViewEvent, pushViewItemEvent, pushViewCartEvent };
