import { readBlockConfig } from '../../scripts/aem.js';

const DEFAULT_PUBLISH_ORIGIN = 'https://publish-p153659-e1796191.adobeaemcloud.com';
const DEFAULT_API_PATH = '/graphql/execute.json/global/hi-tech-component';

async function fetchData() {
    const publishOrigin = window.location.origin.includes('localhost')
        ? DEFAULT_PUBLISH_ORIGIN
        : window.location.origin;

    const apiUrl = `${publishOrigin}${DEFAULT_API_PATH}`;

    console.log('Fetching data from:', apiUrl);

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();

        // log full response
        const alphabetData = json?.data?.searchOnAlphabetList?.items?.[0]?.searchdata;

        // return only useful data
        return alphabetData;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default async function decorate(block) {
    const alphabetData = await fetchData();

    if (!alphabetData) return;

    // Clear block
    // block.innerHTML = '';

    //  Create alphabet nav
    const nav = document.createElement('div');
    nav.className = 'alphabet-nav';

    //  Create cards container
    const cardContainer = document.createElement('div');
    cardContainer.className = 'alphabet-cards';

    //  Render cards function
    function renderCards(letter) {
        cardContainer.innerHTML = '';

        const items = alphabetData[letter] || [];

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <div class="title">${item.value}</div>
                <div class="subtitle">${item.value2}</div>
            `;

            cardContainer.appendChild(card);
        });
    }

    //  Render alphabet letters
    alphabetData.alphabet.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.className = 'alphabet-letter';

        if (index === 0) span.classList.add('active');

        span.addEventListener('click', () => {
            // remove active
            nav.querySelectorAll('.alphabet-letter')
                .forEach(el => el.classList.remove('active'));

            span.classList.add('active');

            renderCards(letter);
        });

        nav.appendChild(span);
    });

    //  Default load = A
    renderCards('A');

    //  View All (optional)
    const viewAll = document.createElement('div');
    viewAll.className = 'view-all';
    viewAll.innerHTML = `View All →`;

    //  Append everything
    block.appendChild(nav);
    block.appendChild(cardContainer);
    block.appendChild(viewAll);
}