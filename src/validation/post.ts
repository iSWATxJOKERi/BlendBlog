import validator from 'validator';
import validText from './validText';

export interface PostRequest {
    title: string,
    body: string,
    blogger_id: number,
    valid: boolean
}

export const validatePost = (post: PostRequest) => {
    const errors = {
        title: "",
        body: "",
        valid: true
    }

    post.title = validText(post.title) ? post.title : '';
    post.body = validText(post.body) ? post.body : '';

    if(validator.isEmpty(post.title)) {
        errors.title = 'Title field is required';
        errors.valid = false;
    }

    if(!validator.isLength(post.title, { min: 1, max: 32 })) {
        errors.title = "Name must be between 1 and 32 characters";
        errors.valid = false;
    }

    if(validator.isEmpty(post.body)) {
        errors.body = 'Body field is required';
        errors.valid = false;
    }

    return {
        errors,
        isValid: errors.valid
    }
}