import { getFavoritePosts } from "../util/favorite_api_util";
import { current_user, removeChildren } from "../util/misc_util";
import { getPost } from "../util/post_api_util";
import { removeFavorite } from './feed';

export const favorites = (parent: HTMLElement) => {
    const favoritesContainer: HTMLElement = document.createElement('div');
    favoritesContainer.setAttribute('id', 'favorites-container');

    const favoritesHeader: HTMLElement = document.createElement('h2');
    favoritesHeader.classList.add('favorites-header');
    favoritesHeader.innerHTML = "Favorites &#x2764;";

    //create modal
    const mB: HTMLElement = document.createElement('div');
    mB.classList.add('post-modal-background');
    const mC: HTMLElement = document.createElement('div');
    mC.classList.add('post-modal-child');
    mB.appendChild(mC);
    mB.style.display = "none";

    //appends to parent
    favoritesContainer.appendChild(favoritesHeader);
    displayFavorites(favoritesContainer);
    parent.appendChild(favoritesContainer);
    const app: HTMLElement = document.getElementById('application')!;
    app.appendChild(mB);

    //modal onclicks
    mB.onclick = () => { toggleShowModal(0) };
    mC.onclick = (e) => { e.stopPropagation() };
}

export const displayFavorites = (parent: HTMLElement) => {
    let cu = current_user() as any;
    getFavoritePosts(cu.id).then(posts => {
        const favoritePostsContainer: HTMLElement = document.createElement('div');
        favoritePostsContainer.classList.add('favorite-posts-container');
        if(posts.data === "Favorite some posts to see them here!") {
            const message: HTMLElement = document.createElement('span');
            message.classList.add('favorites-message');
            message.innerHTML = "Favorite some posts to see them here!"
            favoritePostsContainer.appendChild(message);
            parent.appendChild(favoritePostsContainer);
        } else {
            for(let i: number = 0; i < posts.data.length; i++) {
                const postItem: HTMLElement = document.createElement('div');
                postItem.classList.add('favorite-post-item');
                postItem.setAttribute('id', `postid-${ posts.data[i].post_id }`);
                const postTitle: HTMLElement = document.createElement('h1');
                postTitle.classList.add('favoriteposttitle');
                postTitle.innerHTML = `${ posts.data[i].title }`;
                const postDetails: HTMLElement = document.createElement('span');
                postDetails.classList.add('favoritepostdetails');
                postDetails.innerHTML = `by ${ posts.data[i].blogger.username } on ${ posts.data[i].date }`;

                postItem.appendChild(postTitle);
                postItem.appendChild(postDetails);
                favoritePostsContainer.appendChild(postItem);
                parent.appendChild(favoritePostsContainer);
                let p_id = postItem.id.split("-")[1];

                postItem.onclick = () => { toggleShowModal(parseInt(p_id)) };
            }
        }
    })
}

function toggleShowModal(id: number) {
    let mb = document.getElementsByClassName('post-modal-background')[0] as HTMLElement;
    let mc = document.getElementsByClassName('post-modal-child')[0] as HTMLElement;
    if(mb.style.display === "none") {
        postShowModal(id, mb, mc);
    } else {
        removeChildren(mc);
        mb.style.display = "none";
    }
}

export const postShowModal = (id: number, modalBackground: HTMLElement, modalChild: HTMLElement) => {
    let cu = current_user() as any;
    getPost(id, cu.id).then(post => {
        const postTitle: HTMLElement = document.createElement('h1');
        postTitle.classList.add('modaltitle');
        postTitle.setAttribute('id', `postid-${ post.data.id }_creatorid-${ post.data.blogger.id }`);
        postTitle.innerHTML = `${ post.data.title }`;
        const postDetails: HTMLElement = document.createElement('span');
        postDetails.classList.add('modaldetails');
        postDetails.innerHTML = `by ${ post.data.blogger.username } on ${ post.data.date }`;
        const postBody: HTMLElement = document.createElement('p');
        postBody.classList.add('modalbody');
        postBody.innerHTML = `${ post.data.body }`;
        const favorite: HTMLElement = document.createElement('span');
        favorite.classList.add('modal-favorite-post');
        favorite.innerHTML = `<i class="modal-heart far fa-heart"></i>`;
        if(post.data.favorited) {
            let heart = favorite.getElementsByClassName('modal-heart')[0] as HTMLElement;
            heart.style.color = 'red';
        }

        modalChild.appendChild(favorite);
        modalChild.appendChild(postTitle);
        modalChild.appendChild(postDetails);
        modalChild.appendChild(postBody);
        modalBackground.appendChild(modalChild);
        modalBackground.style.display = "flex";
        favorite.onclick = (e) => { 
            toggleShowModal(0);
            removeFavorite(e, postTitle);
        };
    })
}