import { getConfigValue } from '../configs.js';

export default async function getYotpoBottomLine(id) {
  const apiKey = await getConfigValue('yotpo-api-key');
  if (!apiKey || !id) return null;
  try {
    const response = await fetch(
      `https://api.yotpo.com/products/${apiKey}/${id}/bottomline`,
    );
    const body = await response.json();
    const { average_score: average, total_reviews: total } = body?.response?.bottomline || {};
    return { average, total };
  } catch (e) {
    console.warn(e);
    return { average: 0, total: 0 };
  }
}
