import { clearInputs } from "../util/misc_util";

export const mainfeed = (parent: HTMLElement) => {
    const feed: HTMLElement = document.createElement('div');
    feed.setAttribute('id', 'feed');
    const createPostBtn: HTMLElement = document.createElement('span');
    createPostBtn.classList.add('create-post-btn');
    createPostBtn.innerHTML = "&#x2795; Create Post";

    //create modal
    createPostModal(parent);

    //appends to parent
    feed.appendChild(createPostBtn);
    parent.appendChild(feed);

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
}