export const BUYERS = [
  {
    id: 'local',
    name: 'Local Market',
    description: 'A standard community market. Offers average, stable prices for all crops.',
    multiplier: 1.0,
    color: 'bg-blue-100 text-blue-600 border-blue-200'
  },
  {
    id: 'coop',
    name: 'Cooperative Society',
    description: 'Farmer cooperative that buys in bulk. Slightly lower prices but very reliable.',
    multiplier: 0.9,
    color: 'bg-amber-100 text-amber-600 border-amber-200'
  },
  {
    id: 'organic',
    name: 'Organic Grocer',
    description: 'Premium buyer looking for high-quality sustainable crops. Pays extra.',
    multiplier: 1.25,
    color: 'bg-farm-green-light text-farm-green-dark border-farm-green'
  },
  {
    id: 'processing',
    name: 'Processing Unit',
    description: 'Factory buyer. Pays well but fluctuates wildly based on market shifts.',
    multiplier: 1.1, // This could be randomized, but we'll stick to a fixed mod for simplicity
    color: 'bg-purple-100 text-purple-600 border-purple-200'
  }
];

export const MARKET_INSIGHTS = [
  "Tomatoes are currently in high demand during summer because fresh produce consumption increases.",
  "Rice prices increase during rainy seasons due to higher global consumption patterns.",
  "Sustainable farming can improve long-term profits by securing the 'Organic Grocer' bonus.",
  "Crop rotation keeps soil healthy, leading to better yields and more items to sell at the market.",
  "Don't sell everything at once! Wait for a season where your crop is in high demand to maximize profits."
];

import { CROP_DATABASE } from './cropDatabase';

export const CROP_MARKET_DATA = {};

Object.values(CROP_DATABASE).forEach(crop => {
  // Generate some mock history data for the sparkline based on basePrice
  const base = crop.basePrice;
  const history = [
    base - 2, base - 1, base, base + 1, base + 2, base
  ].map(p => Math.max(1, p)); // ensure positive

  CROP_MARKET_DATA[crop.id] = {
    name: crop.name,
    icon: crop.icon,
    basePrice: crop.basePrice,
    seasonDemand: crop.seasonDemand,
    history: history
  };
});

export function calculateCurrentPrice(cropId, season) {
  const crop = CROP_MARKET_DATA[cropId];
  if (!crop) return 0;

  const demand = crop.seasonDemand[season].status;
  
  // Price modifiers based on demand
  let multiplier = 1.0;
  if (demand === 'high') multiplier = 1.3;
  if (demand === 'low') multiplier = 0.7;

  return Math.round(crop.basePrice * multiplier);
}
