function attachEvents() {

    let divRequest = document.getElementById('request');
    let textInput = divRequest.querySelector('#location');
    let getWeatherBtn = divRequest.querySelector('#submit');
    getWeatherBtn.addEventListener('click', btnWeather);
    let cityCode = 'null';
    let forecast = document.getElementById('forecast');


    async function btnWeather() {


        async function getLocation() {

            let url = 'http://localhost:3030/jsonstore/forecaster/locations';

            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    //  forecastInfo.push(data);
                    let filtered = Object.entries(data)
                        .filter(([key, value]) => {
                            return value.name === textInput.value;
                        });

                    if (filtered.length > 0) {
                        filtered
                            .forEach(([key, value]) => {

                                cityCode = value.code;


                            })
                    } else {
                        cityCode = 'null';
                    }


                })
                // .catch(e => e.message);


        }


        async function todayWeather() {
            let urlCode = `http://localhost:3030/jsonstore/forecaster/today/${cityCode}`;

            let fromSwitch = undefined;

            await fetch(urlCode)
                .then(response => response.json())
                .then(data => {
                    let divForecast = document.createElement('div');
                    divForecast.className = 'forecasts';
                    let spanConditionSymbol = document.createElement('span');
                    spanConditionSymbol.className = 'condition symbol';

                    let spanCondition = document.createElement('span');
                    spanCondition.className = 'condition';


                    Object.entries(data)
                        .forEach(([key, value]) => {
                            console.log('1')
                            if (key === 'forecast') {

                                fromSwitch = returnSymbol(value);

                                spanConditionSymbol.innerHTML = fromSwitch.codeWeather;


                            } else if (key === 'name') {
                                fromSwitch['weatherName'] = value;
                            }

                        })
                    divForecast.appendChild(spanConditionSymbol);

                    let spanName = document.createElement('span');
                    spanName.textContent = fromSwitch.weatherName;
                    spanName.className = 'forecast-data';

                    let spanTemperatures = document.createElement('span');
                    spanTemperatures.innerHTML = `${fromSwitch.lowTemp}&#176;/${fromSwitch.highTemp}&#176;`;
                    spanTemperatures.className = 'forecast-data';

                    let spanWeatherType = document.createElement('span');
                    spanWeatherType.textContent = fromSwitch.weatherType;
                    spanWeatherType.className = 'forecast-data';

                    spanCondition.appendChild(spanName);
                    spanCondition.appendChild(spanTemperatures);
                    spanCondition.appendChild(spanWeatherType);
                    divForecast.appendChild(spanCondition);

                    forecast.querySelector('#current').appendChild(divForecast);
                    forecast.style.display = 'block';

                })


        }


        async function getUpcomingForeCast() {
            let urlCode = `http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`;
            let upcoming = forecast.querySelector('#upcoming');
            let divForecastInfo = document.createElement('div');
            divForecastInfo.className = 'forecast-info';

            let promise = await fetch(urlCode);
            let data = await promise.json();
            console.log(data)
            Object.entries(data)
                .forEach(([key, value]) => {
                    if (key === 'forecast') {
                        value.forEach(info => {
                            let fromSwitchWeatherType = returnSymbol(info);

                            let span = document.createElement('span');
                            span.className = 'upcoming';

                            let spanSymbol = document.createElement('span');
                            spanSymbol.className = 'symbol';
                            spanSymbol.innerHTML = fromSwitchWeatherType.codeWeather;

                            let spanTemp = document.createElement('span');
                            spanTemp.className = 'forecast-data';
                            spanTemp.innerHTML = `${fromSwitchWeatherType.lowTemp}&#176;/${fromSwitchWeatherType.highTemp}&#176;`;

                            let spanWeatherType = document.createElement('span');
                            spanWeatherType.className = 'forecast-data';
                            spanWeatherType.textContent = fromSwitchWeatherType.weatherType;

                            span.appendChild(spanSymbol);
                            span.appendChild(spanTemp);
                            span.appendChild(spanWeatherType);

                            divForecastInfo.appendChild(span);

                            upcoming.appendChild(divForecastInfo);

                        })

                    }

                })


            let spanUpcoming = document.createElement('span');
            spanUpcoming.className = 'upcoming';


        }


        if (textInput.value.length > 0) {

           try{
               await getLocation();
               if (cityCode !== 'null') {

                   await todayWeather()
                   await getUpcomingForeCast();
               }
           }catch (e) {
               forecast.style.display = 'block';

               forecast.innerHTML = '<span>Error</span>';
           }
        }


    }

    function returnSymbol(line) {
        let codeWeather = '';
        let weatherType = '';
        let lowTemp = line.low;
        let highTemp = line.high;


        switch (line.condition) {
            case 'Sunny':
                codeWeather = '&#x2600;';
                weatherType = 'Sunny';
                break;
            case 'Partly sunny':
                codeWeather = '&#x26C5;';
                weatherType = 'Partly sunny';
                break;
            case 'Overcast':
                codeWeather = '&#x2601;';
                weatherType = 'Overcast';
                break;
            case 'Rain':
                codeWeather = '&#x2614;';
                weatherType = 'Rain';
                break;
            case 'Degrees':
                codeWeather = '&#176;';
                weatherType = 'Degrees';
                break;
        }
        return {
            codeWeather,
            weatherType,
            lowTemp,
            highTemp
        }
    }
}


attachEvents();