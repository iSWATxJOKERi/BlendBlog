import { getFavoritePosts } from "../util/favorite_api_util";
import { current_user } from "../util/misc_util";
import { getPost } from "../util/post_api_util";

export const favorites = (parent: HTMLElement) => {
    const favoritesContainer: HTMLElement = document.createElement('div');
    favoritesContainer.setAttribute('id', 'favorites-container');

    const favoritesHeader: HTMLElement = document.createElement('h2');
    favoritesHeader.classList.add('favorites-header');
    favoritesHeader.innerHTML = "Favorites &#x2764;";

    //appends to parent
    favoritesContainer.appendChild(favoritesHeader);
    displayFavorites(favoritesContainer);
    parent.appendChild(favoritesContainer);
}

export const displayFavorites = (parent: HTMLElement) => {
    let cu = current_user() as any;
    getFavoritePosts(cu.id).then(posts => {
        if(posts.data === "Favorite some posts to see them here!") {
            const message: HTMLElement = document.createElement('span');
            message.classList.add('favorites-message');
            message.innerHTML = "Favorite some posts to see them here!"
            parent.appendChild(message);
        } else {
            const favoritePostsContainer: HTMLElement = document.createElement('div');
            favoritePostsContainer.classList.add('favorite-posts-container');
            for(let i: number = 0; i < posts.data.length; i++) {
                const postItem: HTMLElement = document.createElement('div');
                postItem.classList.add('favorite-post-item');
                postItem.setAttribute('id', `postid-${ posts.data[i].id }`);
                const postTitle: HTMLElement = document.createElement('h1');
                postTitle.classList.add('favoriteposttitle');
                postTitle.innerHTML = `${ posts.data[i].title }`;
                const postDetails: HTMLElement = document.createElement('span');
                postDetails.classList.add('favoritepostdetails');
                postDetails.innerHTML = `by ${ posts.data[i].blogger.username } on ${ posts.data[i].created_at }`;

                postItem.appendChild(postTitle);
                postItem.appendChild(postDetails);
                parent.appendChild(postItem);
                let p_id = postItem.id.split("-")[1];

                postItem.onclick = () => { openPostShowModal(parseInt(p_id)) };
            }
        }
    })
}

export const openPostShowModal = (id: number) => {
    //create modal
    const modalBackground: HTMLElement = document.createElement('div');
    modalBackground.classList.add('post-modal-background');
    const modalChild: HTMLElement = document.createElement('div');
    modalChild.classList.add('post-modal-child');

    getPost(id).then(post => {
        const postTitle: HTMLElement = document.createElement('h1');
        postTitle.classList.add('modaltitle');
        postTitle.innerHTML = `${ post.data[0].title }`;
        const postDetails: HTMLElement = document.createElement('span');
        postDetails.classList.add('modaldetails');
        postDetails.innerHTML = `by ${ post.data[0].blogger.username } on ${ post.data[0].created_at }`;
        const postBody: HTMLElement = document.createElement('p');
        postBody.classList.add('modalbody');
        postBody.innerHTML = `${ post.data[0].body }`;

        modalChild.appendChild(postTitle);
        modalChild.appendChild(postDetails);
        modalChild.appendChild(postBody);
        modalBackground.appendChild(modalChild);
        modalBackground.style.display = "none";

        const app: HTMLElement = document.getElementById('application')!;
        app.appendChild(modalBackground);
    })
}