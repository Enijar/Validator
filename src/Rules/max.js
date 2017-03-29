import Validators from '../Validators';

export default length => {
    return {
        method: Validators.Length,
        message: 'The :name field must be max of :length characters',
        placeholders: {
            ':length': length
        },
        options: {
            max: length
        }
    };
};
