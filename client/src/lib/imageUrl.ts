export const IMG_BASE = "https://image.tmdb.org/t/p"

export const backdropUrl = (path: string | null, size = "original") =>
  path ? `${IMG_BASE}/${size}${path}` : null

export const posterUrl = (path: string | null, size = "w500") =>
  path ? `${IMG_BASE}/${size}${path}` : null