export function buildUrl(
  url: string,
  queryParams: { [key: string]: unknown }
): string {
  let queryString = "";

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      queryString += `${key}=${queryParams[key]}&`;
    }
  }

  if (queryString) {
    // remove the last '&' character
    queryString = queryString.slice(0, -1);
    url += `?${queryString}`;
  }

  return url;
}

const PAGE_MAP = {
  "/about": "About",
  "/writing": "Writing",
  "/learning": "Learning",
};

export function getPageTitle(pathName: string) {
  return PAGE_MAP[pathName] ?? null;
}
