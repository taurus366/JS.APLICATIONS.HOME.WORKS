async function getInfo() {
    let inputText = document.getElementById('stopId');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputText.value}`;

    let div = document.querySelector('#result');

    let stopName = div.querySelector('#stopName');
    let buses = div.querySelector('#buses');


    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            while (buses.hasChildNodes()) {
                buses.removeChild(buses.firstChild);
            }
            stopName.textContent = data.name;
            Object.entries(data.buses)
                .forEach(([key, value]) => {
                    let li = document.createElement('li');
                    li.textContent = `Bus ${key} arrives in ${value} minutes`;
                    buses.appendChild(li);
                })
        })
        .catch(error => {
            stopName.textContent = 'Error'
            while (buses.hasChildNodes()) {
                buses.removeChild(buses.firstChild);
            }

        });


}
