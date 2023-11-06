export const validateData = (dataValidate) => {
    let failMessages = [];

    // name: '',
    //         rating: '',
    //         price: '',
    //         image: '',
    //         color: '',
    //         origin: '',
    //         category: ''
    if (dataValidate.name == '') {
        failMessages.push('Flower name can not empty.');
    }

    if (dataValidate.rating == '') {
        failMessages.push('Flower rating can not empty.');
    }

    if (dataValidate.price == '') {
        failMessages.push('Flower price can not empty.');
    }

    if (dataValidate.origin <= 0) {
        failMessages.push('Flower origin can not less or equal than 0.');
    }

    if (dataValidate.category <= 0) {
        failMessages.push('Flower category can not less or equal than 0.');
    }

    if (dataValidate.image == '') {
        failMessages.push('Flower avatar link can not empty.');
    }

    if (!((new RegExp('https?://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?')).test(dataValidate.image))) {
        failMessages.push('Flower image must be a link, ex: https://<url>.');
    }

    return failMessages;
}