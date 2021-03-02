function lockedProfile() {

    let main = document.querySelector('#main');
    main.querySelector('.profile').remove();

    async function fillInfoUsers() {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles';
        let data = await fetch(url)
            .then(response => response.json());

        Object.entries(data)
            .forEach(line => {
                // console.log(line)
                let userInfo = {};

                userInfo['username'] = line[1].username;
                userInfo['email'] = line[1].email;
                userInfo['age'] = line[1].age;

                createElements(userInfo);


            })


    }

    fillInfoUsers();

    function createElements(userInfo) {


        let divProfile = returnElement('div', 'profile');

        let img = returnElement('img', 'userIcon');
        let labelLock = returnElement('label', undefined, 'Lock', undefined);
        let inputLock = returnElement('input', undefined, undefined, {
            type: 'radio',
            name: 'user1Locked',
            value: 'lock'
        })
        let labelUnlock = returnElement('label', undefined, 'Unlock', undefined);
        let inputUnlock = returnElement('input', undefined, undefined, {
            type: 'radio',
            name: 'user1Locked',
            value: 'unlock'
        })

        divProfile.appendChild(img)
        divProfile.appendChild(labelLock)
        divProfile.appendChild(inputLock)
        divProfile.appendChild(labelUnlock)
        divProfile.appendChild(inputUnlock)

        let hr = document.createElement('hr');
        divProfile.appendChild(hr);

        let labelUsername = returnElement('label', undefined, 'Username');
        let inputUsername = returnElement('input', undefined, undefined, {
            type: 'text',
            name: 'user1Username',
            value: userInfo.username,
            readonly: 'true',
            disabled: 'true'
        })


        divProfile.appendChild(labelUsername)
        divProfile.appendChild(inputUsername)

        let divUser1HiddenFields = document.createElement('div');
        divUser1HiddenFields.setAttribute('id', 'user1HiddenFields');

        divUser1HiddenFields.appendChild(hr);


        let labelEmail = returnElement('label', undefined, 'Email:');
        let inputEmail = returnElement('input', undefined, undefined, {
            type: 'email',
            name: 'user1Email',
            value: userInfo.email,
            disabled: 'true',
            readonly: 'true'
        });

        let labelAge = returnElement('label', undefined, 'Age:');
        let inputAge = returnElement('input', undefined, undefined, {
            type: 'email',
            name: 'user1Age',
            value: userInfo.age,
            disabled: 'true',
            readonly: 'true'
        });

        divUser1HiddenFields.appendChild(labelEmail)
        divUser1HiddenFields.appendChild(inputEmail)
        divUser1HiddenFields.appendChild(labelAge)
        divUser1HiddenFields.appendChild(inputAge)

        divProfile.appendChild(divUser1HiddenFields);

        let button = document.createElement('button');
        button.textContent = 'Show more';
        button.addEventListener('click', clicked);

        divProfile.appendChild(button);
        main.appendChild(divProfile);

    }

    function clicked(ev) {
        let evDivProfile = ev.target.parentNode;
        let unlock = evDivProfile.querySelectorAll('input')[1];

        let hiddenFields = evDivProfile.querySelector('#user1HiddenFields');

        if (unlock.checked) {
            if (hiddenFields.style.display !== 'block') {
                ev.target.textContent = 'Hide it';
                hiddenFields.style.display = 'block';

            } else {
                ev.target.textContent = 'Show more';
                hiddenFields.style.display = 'none';
            }
        }


    }

    function returnElement(type, className, labelName, type1) {
        let result = undefined;

        switch (type) {
            case 'div':
                result = document.createElement(type);
                break;
            case 'img':
                result = document.createElement(type);
                result.src = './iconProfile2.png';
                break;
            case 'label':
                result = document.createElement(type);
                result.textContent = labelName;
                break;
            case 'input':
                result = document.createElement(type);
                Object.entries(type1)
                    .forEach(([key, value]) => {
                        result.setAttribute(key, value);
                    })
                break;
        }

        if (className !== undefined) {
            result.className = className;
        }
        return result;
    }


}