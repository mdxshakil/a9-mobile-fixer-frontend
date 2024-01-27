import { IRating } from "../interface";

export const calculateAvgRating = (ratings: [IRating]) => {
  const totalRating = ratings?.reduce((sum, obj) => sum + obj.ratingValue, 0);
  const averageRating = (totalRating as number) / (ratings?.length || 1);
  const roundedAverageRating = Math.round(averageRating);
  return roundedAverageRating;
};
