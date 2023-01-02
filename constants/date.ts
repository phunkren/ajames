// This is actually one second shy of one hour.
// The reason is that Notion images have an expiry time of one hour.
// We revalidate the ISR cache just before the images can expire.
export const ONE_HOUR_IN_SECONDS = 3599;
