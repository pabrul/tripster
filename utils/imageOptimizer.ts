// utils/imageOptimizer.ts
export const getOptimizedImageUrl = (url: string, width = 400) => {
  if (!url) return "";
  // Use um serviço como Cloudinary ou Imgix
  return `https://your-image-service.com/optimize?url=${encodeURIComponent(
    url
  )}&w=${width}&q=80`;
};
