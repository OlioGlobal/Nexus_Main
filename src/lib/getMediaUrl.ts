/**
 * Get the best available URL for a media object.
 * Prefers Cloudinary secure_url over the Payload proxy URL.
 */
export function getMediaUrl(media: any): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  return media?.cloudinary?.secure_url || media?.url || ''
}
