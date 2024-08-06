import getYotpoBottomLine from '../../../scripts/yotpo/getYotpoBottomLine.js';

const getStar = (average, pos) => (pos > average ? '☆' : '★');

export default function Title(ctx) {
  const reviewsWrapper = document.createElement('div');
  reviewsWrapper.className = 'yotpo-display-wrapper';
  ctx.appendSibling(reviewsWrapper);
  getYotpoBottomLine('2250').then((payload) => {
    reviewsWrapper.innerHTML = `
      <span class="yotpo-stars">
        <span>${getStar(payload.average, 1)}</span>
        <span>${getStar(payload.average, 2)}</span>
        <span>${getStar(payload.average, 3)}</span>
        <span>${getStar(payload.average, 4)}</span>
        <span>${getStar(payload.average, 5)}</span>
      </span>
      <a href="javascript:void(0)" class="text-m">${payload.total} Review</a>
      `;
  });
  reviewsWrapper.style.cursor = 'pointer';
  reviewsWrapper.addEventListener('click', () => {
    setTimeout(() => {
      const reviewsSection = document.querySelector('.yotpo.yotpo-main-widget');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
