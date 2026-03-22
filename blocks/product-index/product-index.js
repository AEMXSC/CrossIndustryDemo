import { readBlockConfig } from '../../scripts/aem.js';

const DEFAULT_PUBLISH_ORIGIN = 'https://publish-p153659-e1796191.adobeaemcloud.com';
const DEFAULT_API_PATH = '/graphql/execute.json/global/product-index-component';

async function fetchData() {
  const publishOrigin = window.location.origin.includes('localhost') ? DEFAULT_PUBLISH_ORIGIN : window.location.origin;
  const apiUrl = `${publishOrigin}${DEFAULT_API_PATH}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const item = data?.data?.productIndexModelList?.items?.[0];
        return item;
    } catch (error) {
        console.error('Error fetching product index data:', error);
        return null;
    }
}