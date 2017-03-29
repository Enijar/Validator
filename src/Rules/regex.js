import Validators from '../Validators';

export default expression => {
    return {
        method: Validators.Pattern,
        message: 'The :name field must follow the pattern :expression',
        placeholders: {
            ':expression': expression
        },
        options: {
            regex: expression
        }
    };
};
