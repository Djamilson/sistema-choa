export function ensureHttp(url: string) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'http://' + url
  }

  return url
}
