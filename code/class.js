class StoreElementCRM {
    constructor(productName = "", porductPrice = 0, productImage = "/img/error.png", productDescription = "", productQuantity = 0, keywords = [], dateNow = () => { }, id = () => { }) {
        this.id = id()
        this.date = dateNow()
        this.productName = productName;
        this.porductPrice = porductPrice;
        this.productImage = productImage;
        this.productDescription = productDescription;
        this.productQuantity = productQuantity;
        this.keywords = keywords.split(",");
        this.status = false;
    }
}

class videoElementCrm {
    constructor(videoName = '', poster = '', url = '', description = '', keywords = [], dateNow = () => { }, id = () => { }) {
        this.id = id();
        this.date = dateNow();
        this.videoName = videoName;
        this.poster = poster;
        this.url = url;
        this.description = description;
        this.keywords = keywords.split(',');
        this.status = false;
    }
}

class restoranElementCrm {
    constructor(productName = '', productWeight = 0, ingridients = '', description = '', price = 0, productimageUrl = '', keywords = [], dateNow = () => { }, id = () => { }) {
        this.id = id();
        this.date = dateNow();
        this.productName = productName;
        this.productWeigth = productWeight;
        this.ingridients = ingridients;
        this.description = description;
        this.price = price;
        this.productimageUrl = productimageUrl;
        this.keywords = keywords.split(',');
        this.status = false;
    }
}

export { StoreElementCRM, videoElementCrm, restoranElementCrm }

