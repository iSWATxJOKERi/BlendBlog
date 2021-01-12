import { clearInputs, current_user, notice, removeChildren } from "../util/misc_util";
import { createPost, getPosts } from "../util/post_api_util";

export const mainfeed = (parent: HTMLElement) => {
    const feed: HTMLElement = document.createElement('div');
    feed.setAttribute('id', 'feed');
    const createPostBtn: HTMLElement = document.createElement('span');
    createPostBtn.classList.add('create-post-btn');
    createPostBtn.innerHTML = "&#x2795; Create Post";
    const allPosts: HTMLElement = document.createElement('div');
    allPosts.setAttribute('id', 'feed-of-posts');

    //create modal
    createPostModal(parent);

    //appends to parent
    feed.appendChild(createPostBtn);
    feed.appendChild(allPosts);
    parent.appendChild(feed);

    //display posts
    displayPosts(allPosts);

    //onclick to show modal and create post
    createPostBtn.onclick = () => { toggleModal('show') };
}

function toggleModal(type: string) {
    const modal = document.getElementsByClassName('modal-background')[0] as HTMLElement;
    const b1: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName('post-input') as HTMLCollectionOf<HTMLInputElement>;
    clearInputs(b1);
    if(type === 'show') {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

function createPostModal(parent: HTMLElement) {
    //create modal and child
    const modalBackground: HTMLElement = document.createElement('div');
    modalBackground.classList.add('modal-background');
    const modalChild: HTMLElement = document.createElement('div');
    modalChild.classList.add('modal-child');

    //create post form
    const postTitle: HTMLInputElement = document.createElement('input');
    postTitle.classList.add('post-title', 'post-input');
    postTitle.setAttribute('placeholder', 'Title');
    const postBody: HTMLTextAreaElement = document.createElement('textarea');
    postBody.classList.add('post-body', 'post-input');
    postBody.setAttribute('placeholder', 'Body');
    const submitPost: HTMLElement = document.createElement('span');
    submitPost.classList.add('submit-post');
    submitPost.innerHTML = "Submit Post";

    //appends elements to parent to modal
    modalChild.appendChild(postTitle);
    modalChild.appendChild(postBody);
    modalChild.appendChild(submitPost);
    modalBackground.appendChild(modalChild);
    modalBackground.style.display = "none";
    parent.appendChild(modalBackground);

    //onclick to close modal
    modalBackground.onclick = () => { toggleModal('close') };
    modalChild.onclick = (e) => { e.stopPropagation() };
    submitPost.onclick = () => { submitThePost() };
}

function submitThePost() {
    const ttl = document.getElementsByClassName('post-title')[0] as HTMLInputElement;
    const bdy = document.getElementsByClassName('post-body')[0] as HTMLInputElement;
    const b_id = current_user() as any;
    const post = {
        title: ttl.value,
        body: bdy.value,
        blogger_id: b_id.id as number,
        valid: true
    }
    createPost(post).then(message => {
        toggleModal('close');
        notice(message);
        const feedOfPosts = document.getElementById('feed-of-posts')!;
        removeChildren(feedOfPosts);
        displayPosts(feedOfPosts);
    })
}

function displayPosts(parent: HTMLElement) {
    getPosts().then(posts => {
        for(let i: number = 0; i < posts.data.length; i++) {
            const postItem: HTMLElement = document.createElement('div');
            postItem.classList.add('post-item');
            const postTitle: HTMLElement = document.createElement('h1');
            postTitle.classList.add('posttitle');
            postTitle.innerHTML = `${ posts.data[i].title }`;
            const postDetails: HTMLElement = document.createElement('span');
            postDetails.classList.add('postdetails');
            postDetails.innerHTML = `by ${ posts.data[i].blogger.username } on ${ posts.data[i].created_at }`;
            const postBody: HTMLElement = document.createElement('p');
            postBody.classList.add('postbody');
            postBody.innerHTML = `${ posts.data[i].body }`;
            const favorite: HTMLElement = document.createElement('span');
            favorite.classList.add('favorite-post');
            favorite.innerHTML = `<i class="far fa-heart"></i>`;

            postItem.appendChild(postTitle);
            postItem.appendChild(postDetails);
            postItem.appendChild(postBody);
            postItem.appendChild(favorite);
            parent.appendChild(postItem);

            postItem.onclick = () => { expandPost(postItem) };
            postTitle.onclick = (e) => { e.stopPropagation() };
            postDetails.onclick = (e) => { e.stopPropagation() };
            postBody.onclick = (e) => { e.stopPropagation() };
            favorite.onclick = (e) => { e.stopPropagation() };
        }
    })
}

function expandPost(item: HTMLElement) {
    // console.log("in");
    const body = item.getElementsByClassName('postbody')[0] as HTMLElement;
    console.log(body);
    if(body.style.maxHeight === "none") {
        body.style.maxHeight = "150px";
        body.style.whiteSpace = "nowrap";
    } else {
        body.style.maxHeight = "none";
        body.style.whiteSpace = "normal";
    }
}