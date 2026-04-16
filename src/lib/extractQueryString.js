export function extractQueryString(url) {
    const parsedURL = new URL(url);

    // console.log("extractQueryString:: parsedURL:", parsedURL);

    const params = new URLSearchParams(parsedURL.searchParams);

    return params;
}