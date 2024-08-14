import { loadScript } from '../../../scripts/aem.js';
import addSkeleton from '../../../scripts/components/skeleton/skeleton.js';
import { getConfigValue } from '../../../scripts/configs.js';

async function renderReviewsOnVisible(element) {
  const apiKey = await getConfigValue('yotpo-api-key');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !window?.yotpo?.initialized) {
        loadScript(`//staticw2.yotpo.com/${apiKey}/widget.js`, { id: 'yotpo-script-loader', async: true, defer: true });
        obs.unobserve(entry.target);
      }
    });
  });

  observer.observe(element);
}

export default function Content(ctx) {
  const wrapper = document.createElement('div');
  wrapper.className = 'yotpo yotpo-main-widget';
  wrapper.setAttribute('data-name', 'Endeavor Daytrip Backpack');
  wrapper.setAttribute('data-product-id', '2250');
  wrapper.setAttribute('data-product-id', '2250');
  wrapper.setAttribute('data-url', 'spacedye-hi-lo-tank-updated');
  wrapper.setAttribute('data-description', '');
  wrapper.setAttribute('data-yotpo-element-id', '1');
  wrapper.setAttribute('data-image-url', 'http://integration-5ojmyuq-7yvbzwvtkgerq.us-4.magentosite.cloud/media/catalog/product/w/b/wb06-red-0.jpg?auto=webp&quality=80&crop=false&fit=cover&width=960');
  addSkeleton(wrapper, {
    height: 400,
    width: '100%',
  });
  ctx.appendChild(wrapper);
  renderReviewsOnVisible(wrapper);
}
