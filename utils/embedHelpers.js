function truncate(str, max) {
  if (!str) return 'N/A';
  return str.length > max ? str.slice(0, max - 3) + '...' : str;
}

function getValidUrl(url, fallback = null) {
  if (!url) return fallback;
  try {
    new URL(url);
    return url;
  } catch {
    return fallback;
  }
}

module.exports = { truncate, getValidUrl };