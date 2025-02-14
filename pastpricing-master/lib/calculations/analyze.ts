export const priceAnalyzer = (priceHistory: any, crntPrice: any) => {
  // 70% weight to minimum difference
  // 30% weight to average difference
  // TODO tune recommendation weights
  const weight_avg = 0.3;
  const weight_min = 0.7;

  try {
    const validPrices = priceHistory.filter((entry:any) => !isNaN(entry.price));
    const old_prices = validPrices
      .map((entry: any) => parseInt(entry.price))
      .slice(0, -1);
  const currentPrice = parseInt(crntPrice);

  const averagePrice =
    old_prices.reduce((partialSum: number, a: number) => partialSum + a, 0) /
    old_prices.length;
  const minimumPrice = Math.min(...old_prices);
  const maximumPrice = Math.max(...old_prices);

  const DifferencefromAverage =
    ((currentPrice - averagePrice) / averagePrice) * 100;
  const DifferencefromMinimum =
    ((currentPrice - minimumPrice) / minimumPrice) * 100;

  let single_percentage =
    weight_avg * DifferencefromAverage + weight_min * DifferencefromMinimum;
  // clipping to a percentage value.
  single_percentage = Math.min(Math.max(single_percentage, 0), 100);
  return { 
    averagePrice: Math.trunc(averagePrice),
    minimumPrice: minimumPrice,
    maximumPrice: maximumPrice,
    buyPercentage: Math.trunc(100 - single_percentage)};
  } catch (error) {
    return {}
  }
}