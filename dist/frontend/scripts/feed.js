"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainfeed = void 0;
const misc_util_1 = require("../util/misc_util");
const mainfeed = (parent) => {
    const feed = document.createElement('div');
    feed.setAttribute('id', 'feed');
    const createPostBtn = document.createElement('span');
    createPostBtn.classList.add('create-post-btn');
    createPostBtn.innerHTML = "&#x2795; Create Post";
    //create modal
    createPostModal(parent);
    //appends to parent
    feed.appendChild(createPostBtn);
    parent.appendChild(feed);
    //onclick to show modal and create post
    createPostBtn.onclick = () => { toggleModal('show'); };
};
exports.mainfeed = mainfeed;
function toggleModal(type) {
    const modal = document.getElementsByClassName('modal-background')[0];
    const b1 = document.getElementsByClassName('post-input');
    misc_util_1.clearInputs(b1);
    if (type === 'show') {
        modal.style.display = "flex";
    }
    else {
        modal.style.display = "none";
    }
}
function createPostModal(parent) {
    //create modal and child
    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal-background');
    const modalChild = document.createElement('div');
    modalChild.classList.add('modal-child');
    //create post form
    const postTitle = document.createElement('input');
    postTitle.classList.add('post-title', 'post-input');
    postTitle.setAttribute('placeholder', 'Title');
    const postBody = document.createElement('textarea');
    postBody.classList.add('post-body', 'post-input');
    postBody.setAttribute('placeholder', 'Body');
    const submitPost = document.createElement('span');
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
    modalBackground.onclick = () => { toggleModal('close'); };
    modalChild.onclick = (e) => { e.stopPropagation(); };
}
