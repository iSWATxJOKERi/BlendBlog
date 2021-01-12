"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainfeed = void 0;
const favorite_api_util_1 = require("../util/favorite_api_util");
const misc_util_1 = require("../util/misc_util");
const post_api_util_1 = require("../util/post_api_util");
const mainfeed = (parent) => {
    const feed = document.createElement('div');
    feed.setAttribute('id', 'feed');
    const createPostBtn = document.createElement('span');
    createPostBtn.classList.add('create-post-btn');
    createPostBtn.innerHTML = "&#x2795; Create Post";
    const allPosts = document.createElement('div');
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
    submitPost.onclick = () => { submitThePost(); };
}
function submitThePost() {
    const ttl = document.getElementsByClassName('post-title')[0];
    const bdy = document.getElementsByClassName('post-body')[0];
    const b_id = misc_util_1.current_user();
    const post = {
        title: ttl.value,
        body: bdy.value,
        blogger_id: b_id.id,
        valid: true
    };
    post_api_util_1.createPost(post).then(message => {
        toggleModal('close');
        misc_util_1.notice(message);
        const feedOfPosts = document.getElementById('feed-of-posts');
        misc_util_1.removeChildren(feedOfPosts);
        displayPosts(feedOfPosts);
    });
}
function displayPosts(parent) {
    let cu = misc_util_1.current_user();
    post_api_util_1.getPosts(cu.id).then(posts => {
        for (let i = 0; i < posts.data.length; i++) {
            const postItem = document.createElement('div');
            postItem.classList.add('post-item');
            postItem.setAttribute('id', `postid-${posts.data[i].id}_creatorid-${posts.data[i].blogger.id}`);
            const postTitle = document.createElement('h1');
            postTitle.classList.add('posttitle');
            postTitle.innerHTML = `${posts.data[i].title}`;
            const postDetails = document.createElement('span');
            postDetails.classList.add('postdetails');
            postDetails.innerHTML = `by ${posts.data[i].blogger.username} on ${posts.data[i].created_at}`;
            const postBody = document.createElement('p');
            postBody.classList.add('postbody');
            postBody.innerHTML = `${posts.data[i].body}`;
            const favorite = document.createElement('span');
            favorite.classList.add('favorite-post');
            favorite.innerHTML = `<i class="far fa-heart"></i>`;
            if (posts.data[i].favorited) {
                let heart = favorite.getElementsByClassName('fa-heart')[0];
                heart.style.color = 'red';
            }
            postItem.appendChild(postTitle);
            postItem.appendChild(postDetails);
            postItem.appendChild(postBody);
            postItem.appendChild(favorite);
            parent.appendChild(postItem);
            postItem.onclick = () => { expandPost(postItem); };
            postTitle.onclick = (e) => { e.stopPropagation(); };
            postDetails.onclick = (e) => { e.stopPropagation(); };
            postBody.onclick = (e) => { e.stopPropagation(); };
            favorite.onclick = (e) => {
                if (posts.data[i].favorited) {
                    removeFavorite(e, postItem);
                }
                else {
                    makeFavorite(e, postItem);
                }
            };
        }
    });
}
function expandPost(item) {
    // console.log("in");
    const body = item.getElementsByClassName('postbody')[0];
    if (body.style.maxHeight === "none") {
        body.style.maxHeight = "150px";
        body.style.whiteSpace = "nowrap";
    }
    else {
        body.style.maxHeight = "none";
        body.style.whiteSpace = "normal";
    }
}
function makeFavorite(e, post) {
    e.stopPropagation();
    const post_id = post.id.split("_")[0].split("-")[1];
    const favoriter_id = misc_util_1.current_user();
    const favoritee_id = post.id.split("_")[1].split("-")[1];
    favorite_api_util_1.createFavorite(post_id, favoritee_id, favoriter_id.id).then(() => {
        const feedOfPosts = document.getElementById('feed-of-posts');
        misc_util_1.removeChildren(feedOfPosts);
        displayPosts(feedOfPosts);
    });
}
function removeFavorite(e, post) {
    e.stopPropagation();
    const post_id = post.id.split("_")[0].split("-")[1];
    const favoriter_id = misc_util_1.current_user();
    const favoritee_id = post.id.split("_")[1].split("-")[1];
    favorite_api_util_1.deleteFavorite(post_id, favoritee_id, favoriter_id.id).then(() => {
        const feedOfPosts = document.getElementById('feed-of-posts');
        misc_util_1.removeChildren(feedOfPosts);
        displayPosts(feedOfPosts);
    });
}
