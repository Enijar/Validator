import Length from './Validators/Length';
import Pattern from './Validators/Pattern';

class Validator {
    constructor() {
        this.rules = {
            regex: this.regex,
            email: this.email,
            required: this.required,
            min: this.min,
            max: this.max
        }
    }

    getMessage(message, placeholders) {
        for (let placeholder in placeholders) {
            if (!placeholders.hasOwnProperty(placeholder)) {
                continue;
            }

            message = message.split(placeholder).join(placeholders[placeholder]);
        }

        return message;
    }

    regex(expression) {
        return {
            method: Pattern,
            message: 'The :name field must follow the pattern :expression',
            placeholders: {
                ':expression': expression
            },
            options: {
                regex: expression
            }
        };
    }

    email() {
        return {
            method: Pattern,
            message: 'The :name field must be a valid email',
            options: {
                regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            }
        };
    }

    required() {
        return {
            method: Length,
            message: 'The :name field is required',
            options: {
                min: 1
            }
        };
    }

    min(length) {
        return {
            method: Length,
            message: 'The :name field must be min of :length characters',
            placeholders: {
                ':length': length
            },
            options: {
                min: length
            }
        };
    }

    max(length) {
        return {
            method: Length,
            message: 'The :name field must be max of :length characters',
            placeholders: {
                ':length': length
            },
            options: {
                max: length
            }
        };
    }

    validate(form) {
        const errors = [];

        for (let field in form) {
            if (!form.hasOwnProperty(field)) {
                continue;
            }

            const {value, rules, label} = form[field];

            for (let i = 0; i < rules.length; i++) {
                const rule = typeof rules[i] === 'function' ? rules[i]() : rules[i];
                const {method, message, options} = rule;
                const passed = method(value, options || null);
                const placeholders = rule.placeholders || {};
                placeholders[':name'] = label;

                if (passed === false) {
                    errors.push(this.getMessage(message, placeholders));
                }
            }
        }

        return {
            passed: errors.length === 0,
            errors: errors
        };
    }
}

export default Validator;
