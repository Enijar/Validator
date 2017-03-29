import Validators from '../Validators';

export default () => {
    return {
        method: Validators.Length,
        message: 'The :name field is required',
        options: {
            min: 1
        }
    };
};
