const URL_CACHED = [/posts\/voted/];

export function getURLCached(req) {
  const { url } = req;

  const urlMapped = URL_CACHED.map((pattern) => {
    const patternRegexp = new RegExp(pattern);
    return patternRegexp.test(url);
  });
  const shouldCached = urlMapped.includes(true);
  return !shouldCached;
}
