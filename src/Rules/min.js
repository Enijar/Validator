import Validators from '../Validators';

export default length => {
    return {
        method: Validators.Length,
        message: 'The :name field must be min of :length characters',
        placeholders: {
            ':length': length
        },
        options: {
            min: length
        }
    };
};
