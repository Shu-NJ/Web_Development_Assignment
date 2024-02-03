const apiBaseUrl = 'https://api.mfapi.in/mf'; 
// const apiBaseUrl='./data.json'
const portfolio = []; 

function listMutualFunds() {
    const apiUrl =apiBaseUrl;
    console.log(apiUrl)
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayMutualFunds(data);
        })
        .catch(error => {
            console.error('Error fetching mutual funds:', error);
        });
}

// const url2=' https://api.mfapi.in/mf/search?q=sbi'
function searchMutualFund() {
    const searchQuery = document.getElementById('search-query').value;

    if (searchQuery.trim() !== '') {
        const apiUrl =apiBaseUrl;
        console.log(apiUrl)
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    } else {
        alert('Please enter a search query.');
    }
}

function addToPortfolio(schemeCode, schemeName) {
    const existingFund = portfolio.find(fund => fund.schemeCode === schemeCode);

    if (existingFund) {
        existingFund.units += 1;
    } else {
        portfolio.push({ schemeCode, schemeName, units: 1 });
    }

    updatePortfolioList();
}

function increaseUnits(schemeCode) {
    const fund = portfolio.find(fund => fund.schemeCode === schemeCode);

    if (fund) {
        fund.units += 1;
        updatePortfolioList();
    }
}

function decreaseUnits(schemeCode) {
    const fund = portfolio.find(fund => fund.schemeCode === schemeCode);

    if (fund && fund.units > 0) {
        fund.units -= 1;
        updatePortfolioList();
    }
}

function updatePortfolioList() {
    const portfolioList = document.getElementById('portfolio-list');
    portfolioList.innerHTML = '';

    portfolio.forEach(fund => {
        const li = document.createElement('li');
        li.textContent = `${fund.schemeName} (${fund.schemeCode}) - ${fund.units} units`;

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.onclick = function () {
            increaseUnits(fund.schemeCode);
        };

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.onclick = function () {
            decreaseUnits(fund.schemeCode);
        };

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';
        detailsButton.onclick = function () {
            showDetailsPopup(fund.schemeCode);
        };

        li.appendChild(increaseButton);
        li.appendChild(decreaseButton);
        li.appendChild(detailsButton);

        portfolioList.appendChild(li);
    });

    const totalUnitsElement = document.getElementById('total-units');
    const totalUnits = portfolio.reduce((total, fund) => total + fund.units, 0);
    totalUnitsElement.textContent = `Total Units in Portfolio: ${totalUnits}`;
}

function showDetailsPopup(schemeCode) {
    const detailsApiUrl = `${apiBaseUrl}${schemeCode}`;
    // console.log(detailsBaseUrl)
    fetch(detailsApiUrl)
        .then(response => response.json())
        .then(details => {
            const popupContent = `
                ${details.schemeName}
                ${details.fundHouse}
                ${details.schemeCategory}
                ${details.schemeType}
                ${details.latestNAV}
                ${details.latestNAVDate}
            `;

            alert(popupContent); 
        })
        .catch(error => {
            console.error('Error fetching scheme details:', error);
        });
}

function displayMutualFunds(data) {
    const mutualFundsList = document.getElementById('mutual-funds-list');
    mutualFundsList.innerHTML = '';

    data.forEach(fund => {
        const li = document.createElement('li');
        li.textContent = `${fund.schemeName} (${fund.schemeCode})`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Portfolio';
        addButton.onclick = function () {
            addToPortfolio(fund.chemeCode, fund.schemeName);
        };

        li.appendChild(addButton);
        mutualFundsList.appendChild(li);
    });
}

function displaySearchResults(data) {
    const searchResultsList = document.getElementById('search-results');
    searchResultsList.innerHTML = '';

    if (data && data.length > 0) {
        data.forEach(match => {
            const li = document.createElement('li');
            li.textContent = `${match.schemeName} (${match.schemeCode})`;

            const addButton = document.createElement('button');
            addButton.textContent = 'Add to Portfolio';
            addButton.onclick = function () {
                addToPortfolio(match.schemeCode, match.schemeName);
            };

            li.appendChild(addButton);
            searchResultsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No results found.';
        searchResultsList.appendChild(li);
    }
}


