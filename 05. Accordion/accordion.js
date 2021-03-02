async function solution() {
    let main = document.querySelector('#main');

    const firstUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

    let secondUrl = 'http://localhost:3030/jsonstore/advanced/articles/details/';


    let data = await fetch(firstUrl)
        .then(response => response.json());

    Object.entries(data)
        .forEach(line => {
            let object = {};
            object.title = line[1].title;
            object._id = line[1]._id;

            let divAccordion = createEl('div', 'accordion', undefined, undefined);

            let divHead = createEl('div', 'head', undefined, undefined);
            let span = createEl('span', object.title, undefined, undefined);
            let buttonBtn = createEl('button', 'button', {id: object._id}, 'More');
            buttonBtn.addEventListener('click', getContentById);

            divHead.appendChild(span);
            divHead.appendChild(buttonBtn);
            divAccordion.appendChild(divHead);
            main.appendChild(divAccordion);
            divAccordion.appendChild(divHead);


        })


    async function getContentById(ev) {
        if (ev.target.textContent === 'More') {
            ev.target.textContent = 'Less';
        } else {
            ev.target.textContent = 'More';
        }

        let id = ev.target.getAttribute('id');
        let divAccordion = ev.target.parentNode.parentNode;

        if (!divAccordion.querySelector('.extra')) {

            let data = await fetch(secondUrl + id)
                .then(response => response.json());

            let object = {};

            Object.entries(data)
                .forEach(([key, value]) => {
                    if (key === 'content') {

                        let divExtra = createEl('div', 'extra', undefined, undefined);
                        divExtra.style.display = 'block';
                        let pContent = createEl('p', undefined, undefined, value);

                        divExtra.appendChild(pContent);

                        divAccordion.appendChild(divExtra);


                    }

                })

        } else {
            let divExtra = divAccordion.querySelector('.extra')
            if (divExtra.style.display !== 'block') {

                divExtra.style.display = 'block';

            } else {

                divExtra.style.display = 'none';

            }

        }
    }


    function createEl(type, className, object, name) {
        let result = undefined;
        switch (type) {
            case 'div':
                result = document.createElement(type);
                if (className !== undefined) {
                    result.className = className;
                }
                break;
            case 'p':
                result = document.createElement(type);
                if (name !== undefined) {
                    result.textContent = name;
                }
                break;
            case 'button':
                result = document.createElement(type);
                if (name !== undefined) {
                    result.textContent = name;
                }
                // result.textContent = 'More';
                if (className !== undefined) {
                    result.className = className;
                }
                if (object !== undefined) {
                    Object.entries(object)
                        .forEach(([key, value]) => {
                            result.setAttribute(key, value);
                        })
                }
                break;
            case 'span':
                result = document.createElement(type);
                result.textContent = className;
        }

        return result;
    }


}

solution();

