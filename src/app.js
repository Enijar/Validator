import Validator from './Validator';

const validator = new Validator();

const schema = {
    email: {
        label: 'Email',
        value: '',
        rules: [validator.rules.required, validator.rules.email, validator.rules.max(255)]
    },
    firstName: {
        label: 'First Name',
        value: '',
        rules: [validator.rules.required, validator.rules.max(20)]
    },
    lastName: {
        label: 'Last Name',
        value: '',
        rules: [validator.rules.required, validator.rules.max(20)]
    },
    pin: {
        label: 'PIN',
        value: '',
        rules: [validator.rules.required, validator.rules.min(4), validator.rules.max(4)]
    }
};

const form = document.querySelector('#form');
const errors = document.querySelector('#errors');

form.addEventListener('submit', event => {
    event.preventDefault();

    for (let element in form.elements) {
        if (!form.elements.hasOwnProperty(element)) {
            continue;
        }

        const field = form.elements[element];

        if (field.name) {
            schema[field.name].value = field.value;
        }
    }

    const validation = validator.validate(schema);

    if (!validation.passed) {
        errors.innerHTML = validation.errors.map(error => `<li>${error}</li>`).join('');
    } else {
        errors.innerHTML = '';
    }
});
