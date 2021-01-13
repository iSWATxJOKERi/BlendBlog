import { current_user, removeChildren, removeParentAndChildren } from "../util/misc_util";
import { deliverPosts, getPost } from "../util/post_api_util";
import { makeFavorite, removeFavorite } from "./feed";

export const searchContainer = (parent: HTMLElement) => {
    //creates container
    const search: HTMLElement = document.createElement('div');
    search.setAttribute('id', 'search');

    //creates search input box and appends to container
    const searchContainer: HTMLElement = document.createElement('div');
    searchContainer.classList.add('search-container');
    const searchHeader: HTMLElement = document.createElement('h2');
    searchHeader.classList.add('search-header');
    searchHeader.innerHTML = "Search";
    const searchInput: HTMLInputElement = document.createElement('input');
    searchInput.classList.add('search-input');
    searchInput.setAttribute('placeholder', 'Search for posts by date, title, etc...');
    const searchBtn: HTMLElement = document.createElement('span');
    searchBtn.classList.add('search-btn');
    searchBtn.innerHTML = "Search";
    search.appendChild(searchHeader);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);

    //create modal
    const mB: HTMLElement = document.createElement('div');
    mB.classList.add('search-modal-background');
    const mC: HTMLElement = document.createElement('div');
    mC.classList.add('search-modal-child');
    mB.appendChild(mC);
    mB.style.display = "none";

    //search input onchange fetch results
    searchInput.oninput = displaySearchResults;

    //appends to parent
    search.appendChild(searchContainer);
    const app: HTMLElement = document.getElementById('application')!;
    app.appendChild(mB);
    parent.appendChild(search);

    //modal onclicks
    mB.onclick = () => { toggleSearchModal(0) };
    mC.onclick = (e) => { e.stopPropagation() };
}

export const displaySearchResults = (e: Event) => {
    let stepParent = document.getElementsByClassName('search-posts-container')[0]! as HTMLElement;
    if(stepParent) {
        removeParentAndChildren(stepParent);
    }
    let cu = current_user() as any;
    let parent = document.getElementById('search') as HTMLElement;
    if((e.target as HTMLInputElement).value.length >= 1) {
        deliverPosts((e.target as HTMLInputElement).value, cu.id).then(res => {
            const searchPostsContainer: HTMLElement = document.createElement('div');
            searchPostsContainer.classList.add('search-posts-container');
            for(let i: number = 0; i < res.data.length; i++) {
                const postItem: HTMLElement = document.createElement('div');
                postItem.classList.add('search-post-item');
                postItem.setAttribute('id', `searchid-${ res.data[i].id }`);
                const postTitle: HTMLElement = document.createElement('h1');
                postTitle.classList.add('searchposttitle');
                postTitle.innerHTML = `${ res.data[i].title }`;
                const postDetails: HTMLElement = document.createElement('span');
                postDetails.classList.add('searchpostdetails');
                postDetails.innerHTML = `by ${ res.data[i].blogger.username } on ${ res.data[i].date }`;

                postItem.appendChild(postTitle);
                postItem.appendChild(postDetails);
                searchPostsContainer.appendChild(postItem);
                parent.appendChild(searchPostsContainer);
                let p_id = postItem.id.split("-")[1];

                postItem.onclick = () => { toggleSearchModal(parseInt(p_id)) };
            }
        })
    }
}

function toggleSearchModal(id: number) {
    let mb = document.getElementsByClassName('search-modal-background')[0] as HTMLElement;
    let mc = document.getElementsByClassName('search-modal-child')[0] as HTMLElement;
    if(mb.style.display === "none") {
        searchShowModal(id, mb, mc);
    } else {
        removeChildren(mc);
        mb.style.display = "none";
    }
}

export const searchShowModal = (id: number, modalBackground: HTMLElement, modalChild: HTMLElement) => {
    let cu = current_user() as any;
    getPost(id, cu.id).then(post => {
        const postTitle: HTMLElement = document.createElement('h1');
        postTitle.classList.add('search-modaltitle');
        postTitle.setAttribute('id', `searchid-${ post.data.id }_creatorid-${ post.data.blogger.id }`);
        postTitle.innerHTML = `${ post.data.title }`;
        const postDetails: HTMLElement = document.createElement('span');
        postDetails.classList.add('search-modaldetails');
        postDetails.innerHTML = `by ${ post.data.blogger.username } on ${ post.data.date }`;
        const postBody: HTMLElement = document.createElement('p');
        postBody.classList.add('search-modalbody');
        postBody.innerHTML = `${ post.data.body }`;
        const favorite: HTMLElement = document.createElement('span');
        favorite.classList.add('search-modal-favorite-post');
        favorite.innerHTML = `<i class="search-modal-heart far fa-heart"></i>`;
        if(post.data.favorited) {
            let heart = favorite.getElementsByClassName('search-modal-heart')[0] as HTMLElement;
            heart.style.color = 'red';
        }

        modalChild.appendChild(favorite);
        modalChild.appendChild(postTitle);
        modalChild.appendChild(postDetails);
        modalChild.appendChild(postBody);
        modalBackground.appendChild(modalChild);
        modalBackground.style.display = "flex";
        favorite.onclick = (e) => { 
            toggleSearchModal(0);
            if(post.data.favorited) {
                removeFavorite(e, postTitle);
            } else {
                makeFavorite(e, postTitle);
            }
        };
    })
}