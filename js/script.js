const countriesList = document.getElementById('countries-list');

const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3/all');
        if (!response.ok) {
            throw new Error('Ha surgido un problema', response.status);
        }
        const countries = await response.json();
        countriesData(countries);
        //countriesDataMap(countries);
    } catch (error) {
        console.error('No se ha podido procesar la solicitud', error);
    }
}


/**************** con map ********************************/

const countriesDataMap = async (countries) => {
    const orderedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    const countriesParsed = await countries.map(country => {
        return {
            name: country.name.common,
            capital: ('capital' in country) ? country.capital[0] : "",
            population: country.population,
            side: country.car.side,
            flag: country.flags[1],
        }
    });
    countriesParsed.forEach(country => {
        countriesList.innerHTML += `
        <div class="flagContainer">
            <div class="flags" onclick="showInfo(this)">
                <img src="${country.flag}">
                <p class="name">${country.name}</p>
            </div>
            <div class="infoCountry">
                <figure>
                    <img src="${country.flag}">
                    <figcaption>
                        <p class="name">${country.name}</p>
                        <p>Capital: ${country.capital}</p>
                        <p>Población: ${country.population}</p>
                        <p>Lado de la carretera: ${country.side}</p>
                    </figcaption>
                </figure>
                <input type="button" value="Cerrar" onclick="hideInfo(this)">
            </div>
        </div>
        `;
    });
}

/********************* con forEach **********************************/

const countriesData = async (countries) => {
    const orderedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    countries.forEach(country => {
        const {name, population, car } = country;
        const capital = ('capital' in country) ? country.capital[0] : "";
        const flag = country.flags[1];
        const {common: nameCountry} = name;
        const side = car.side;
        
        countriesList.innerHTML += `
        <div class="flagContainer">
            <div class="flags" onclick="showInfo(this)">
                <img src="${flag}">
                <p class="name">${nameCountry}</p>
            </div>
            <div class="infoCountry">
                <figure>
                    <img src="${flag}">
                    <figcaption>
                        <p class="name">${nameCountry}</p>
                        <p>Capital: ${capital}</p>
                        <p>Población: ${population}</p>
                        <p>Lado de la carretera: ${side}</p>
                    <figcaption>
                </figure>
                <input type="button" value="Cerrar" onclick="hideInfo(this)">
            </div>
        </div>
        `;
    });
}

const showInfo = (obj) => {
    const info = obj.closest('.flagContainer').querySelector('.infoCountry');
    info.style.display = 'block';
}

const hideInfo = (obj) => {
    const info = obj.closest('.infoCountry');
    info.removeAttribute('style');
}

fetchCountries();