const getMessage = (message, placeholders) => {
    for (let placeholder in placeholders) {
        if (!placeholders.hasOwnProperty(placeholder)) {
            continue;
        }

        message = message.split(placeholder).join(placeholders[placeholder]);
    }

    return message;
};

export {getMessage};
