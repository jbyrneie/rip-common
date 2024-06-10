export async function getRegions() {
  const regions = require(`../regions/${process.env.DEFAULT_LOCALE}.json`)
  return regions
}
