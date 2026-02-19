export function getEmbedUrlV2(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmedUrl = url.trim();
  const shortsMatch = trimmedUrl.match(/(?:youtube\.com\/shorts\/|youtu\.be\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  const ytWatchMatch = trimmedUrl.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (ytWatchMatch) return `https://www.youtube.com/embed/${ytWatchMatch[1]}`;
  const ytShortMatch = trimmedUrl.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytShortMatch) return `https://www.youtube.com/embed/${ytShortMatch[1]}`;
  if (trimmedUrl.includes('youtube.com/embed/')) return trimmedUrl;
  const vimeoMatch = trimmedUrl.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  if (trimmedUrl.includes('player.vimeo.com/video/')) return trimmedUrl;
  return '';
}