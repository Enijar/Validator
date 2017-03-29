import Validators from '../Validators';

export default () => {
    return {
        method: Validators.Pattern,
        message: 'The :name field must be a valid email',
        options: {
            regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        }
    };
};
