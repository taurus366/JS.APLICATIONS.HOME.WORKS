 function solve() {
    let currentStop = '';
    let nextStop = 'depot';
    let nextStopName = '';

    let infoId = document.getElementById('info');
    let btnDepart = document.querySelector('#depart');
    let btnArrive = document.querySelector('#arrive');


    async function depart() {
        let startUrl = `http://localhost:3030/jsonstore/bus/schedule/${nextStop}`;
        await fetch(startUrl)
            .then(response => response.json())
            .then(data => {
              //  console.log(data)
                nextStopName = data.name;
                nextStop = data.next;
            });
        infoId.textContent = `Next stop ${nextStopName}`;

       btnArrive.removeAttribute('disabled');
       btnDepart.setAttribute('disabled','true');

    }

    function arrive() {
        infoId.textContent = `Arriving at ${nextStopName}`;
        btnArrive.setAttribute('disabled','true');
        btnDepart.removeAttribute('disabled');

    }

    return {
        depart,
        arrive
    };
}

let result = solve();