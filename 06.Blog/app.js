function attachEvents() {
    const postUrl = 'http://localhost:3030/jsonstore/blog/posts/';
    let commentUrl = 'http://localhost:3030/jsonstore/blog/comments/';

    let selectPosts = document.querySelector('#posts');

    let buttons = document.querySelectorAll('button');
    let bntLoadPost = buttons[0];
    let btnViewPost = buttons[1];

    bntLoadPost.addEventListener('click', getPosts);
    btnViewPost.addEventListener('click', viewComments);


    async function getPosts(ev) {


        let data = await fetch(postUrl)
            .then(response => response.json());

        Object.entries(data)
            .forEach(([key, value]) => {
                let optionEl = document.createElement('option');
                optionEl.setAttribute('value', key);
                optionEl.textContent = value.title;
                selectPosts.appendChild(optionEl);

            })


    }

    async function viewComments(ev) {
        let id = selectPosts.value;
        let postTitle = document.querySelector('#post-title');

        let ulPostComments = document.querySelector('#post-comments');
        while (ulPostComments.hasChildNodes()) {
            ulPostComments.firstChild.remove();
        }

        let postBody = document.querySelector('#post-body');
        while (postBody.hasChildNodes()) {
            postBody.firstChild.remove();
        }

        let dataPost = await fetch(postUrl + selectPosts.value)
            .then(response => response.json());

        postTitle.textContent = dataPost.title;
        let liPostBody = document.createElement('li');
        liPostBody.textContent = dataPost.body;
        postBody.appendChild(liPostBody);


        let data = await fetch(commentUrl)
            .then(response => response.json());

        Object.values(data)
            .forEach(value => {
                if (value.postId === id) {
                    let liEl = document.createElement('li');
                    liEl.setAttribute('id', value.id);
                    liEl.textContent = value.text;

                    ulPostComments.appendChild(liEl);
                }
            })

    }

    //url: "http://localhost:3030/jsonstore/blog/comments/-MSbzSdzWBvBHJN7gdRw"


}

attachEvents();