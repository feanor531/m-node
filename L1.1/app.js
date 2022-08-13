function Product (id, name, description, price, brand, sizes, activeSize, quantity, date, images) { 
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = [];
    this.images = images;

    this.getID = () => this.id; 
    this.setID = function(id) {
        if(typeof(id) == 'string') {
            this.id = id;
        }        
    }

    this.getName = () => this.name; 
    this.setName = function(name) {
        if(typeof(name) == 'string') {
            this.name = name;
        } 
    } 

    this.getDescription = () => this.description; 
    this.setDescription = function(description) {
        if(typeof(description) == 'string') {
            this.description = description;
        } 
    }

    this.getPrice = () => this.price; 
    this.setPrice = function(price) {
        if(typeof(price) == 'number') {
            this.price = price;
        } 
    }

    this.getBrand = () => this.brand; 
    this.setBrand = function(brand) {
        if(typeof(brand) == 'string') {
            this.brand = brand;
        } 
    }

    this.getSizes = () => this.sizes; 
    this.setSizes = function(sizes) {
        if(Array.isArray(sizes)) {
            this.sizes = sizes.map(item => item.toUpperCase?.() ?? item);
        }
    } 

    this.getActiveSize = () => this.activeSize; 
    this.setActiveSize = function(activeSize) {
        activeSize = activeSize.toUpperCase?.() ?? activeSize;
        if(Array.isArray(this.sizes) && this.sizes.includes(activeSize)) {
            this.activeSize = activeSize;
        } 
    }

    this.getQuantity = () => this.quantity; 
    this.setQuantity = function(quantity) {
        if(typeof(quantity) == 'number') {
            this.quantity = quantity > 0 ? quantity : 0;
        } 
    }

    this.getDate = () => this.date; 
    this.setDate = (date) => this.date = new Date(Date.parse(date));

    this.getReviews = () => this.reviews;
    this.setReviews = (reviews) => this.reviews = reviews;

    this.getImages = () => this.images;
    this.setImages = function(images) {
        if(Array.isArray(images)) {
            this.images = images;
        } 
    }
    

    /**
     * Find the "review" object by the given key
     * @param {*} id given key
     * @returns the "review" object by the given key
     */
    this.getReviewByID = function(id) {
        return this.reviews.find(item => item.id === id);
    }

    /**
     * Adds a "review" object to the "reviews" array
     * @param {*} review 
     */
    this.addReview = function(review) {
        this.reviews.push(review);
    }

    /**
     * Removes the "review" object from the "reviews" array by the given key (ID)
     * @param {*} reviewID 
     */
    this.deleteReview = function(reviewID)  {
        let position = this.reviews.findIndex(item => item.id == reviewID);
        if (position >= 0)  {
            this.reviews.splice(position, 1);
        }
    }

    /**
     * Get the image by the passed parameter
     * @param {*} image desired picture
     * @returns the image by the passed parameter, if the parameter was not passed then the first image from the array
     */
    this.getImage = function(image) {
        let position = this.images.indexOf(image);
        return position >= 0 ? this.images[position] : this.images[0];
    }

    /**
     * Adds a new value to the "sizes" array
     * @param {*} size new value
     */
    this.addSize = function(size)  {
        size = size.toUpperCase();
        if(!this.sizes.includes(size)) {
             this.sizes.push(size);
        }
    }

    /**
     * Removes a value from the "sizes" array with the given key
     * @param {*} size Remove value
     */
    this.deleteSize = function(size)  {
        let position = this.sizes.indexOf(size.toUpperCase());
        if (position >= 0)  {
            this.sizes.splice(position, 1);
        }
    }

    /**
     * Calculate the average rating of a product
     * @returns average rating of a product
     */
    this.getAverageRating = function()  {
        let sum = 0;
        for (const review of this.reviews) {
            sum += Object.values(review.rating).reduce((sumRating, currentReating) => (sumRating += currentReating), 0);
        }

        return sum / this.reviews.length;
    }

} 

function Reviews(id, author, date, comment, rating) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;

    this.getID = () => this.id; 
    this.setID = function(id) {
        if(typeof(id) == 'string') {
            this.id = id;
        }        
    }

    this.getAuthor = () => this.author; 
    this.setAuthor = function(author) {
        if(typeof(author) == 'string') {
            this.author = author;
        } 
    } 

    this.getDate = () => this.date; 
    this.setDate = (date) => this.date = new Date(Date.parse(date));

    this.getComment = () => this.comment; 
    this.setComment = function(comment) {
        if(typeof(comment) == 'string') {
            this.comment = comment;
        }        
    }

    this.getRating = () => this.rating; 
    this.setRating = (rating) => this.rating = rating;

}

/**
 * sort function
 * @param {*} products array of products
 * @param {*} sortRule attribute to sort by (price, name and ID.)
 */
function sortProducts(products, sortRule) {
    switch (sortRule) {
        case "id":
            products.sort((a, b) => {
                if(a.id.length === b.id.length) {
                    return a.id.localeCompare(b.id);
                } else 
                    return a.id.length - b.id.length;
            });
            break;
    
        case "name":
            products.sort((a, b) => a.name.localeCompare(b.name));  
            break;

        case "price":
            products.sort((a, b) => a.price - b.price); 
            break;
            
        default:
            break;
    }
}

/**
 * Search for a product by name or description
 * @param {*} products array of products
 * @param {*} search text of search
 * @returns 
 */
function searchProducts(products, search) {
    return products.filter(product => (product.name.includes(search) || product.description.includes(search)));
}


/**
 * Test of funktion
 */

console.log("Create array products and fill out reviews");

let products = [];

products.push(new Product("120", "T-shirt", "T-shirt", 2300, "Adidas",["S", "L", "XL"], "L", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]));
products.push(new Product("11", "shirt", "shirt", 200, "Nike",["S", "L", "XL", "XXL"], "L", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]));
products.push(new Product("100", "dress", "cool dress", 932, "Zara",["S", "L", "XL", "XXL"], "L", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]));
products.push(new Product("103", "underpants", "new style", 12300, "Tico",["XXXXXL", "xL", "XXL", "XXL"], "L", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]));

for (const product of products) {
    product.addReview(new Reviews("1", "Vasya", Date.now(), "Wow", {'service': 5, 'price': 5, 'value': 5, 'quality': 4}));
    product.addReview(new Reviews("2", "Peter", Date.now(), "Ok", {'service': 4, 'price': 4, 'value': 3, 'quality': 4}));
    product.addReview(new Reviews("3", "Olga", Date.now(), "Wery bed", {'service': 1, 'price': 2, 'value': 1, 'quality': 1}));
}

//print products
products.forEach(product => console.log(product));

console.log("\n##############################################################\n");
console.log("Find the \"review\" object by the given key \"2\"");
products.forEach(product => console.log(product.getReviewByID('2')));

console.log("\n##############################################################\n");
console.log("Search for an image by the passed parameter (Picture2)");
console.log(products[1].getImage("Picture2"));
console.log("image search parameter not set");
console.log(products[0].getImage());

console.log("\n##############################################################\n");
console.log("Adds a new value to the \"sizes\" array");
console.log("Before");
console.log("ID " + products[0].id + " : " + products[0].sizes);

products[0].addSize('xxxxxxL');
console.log("After");
console.log("ID " + products[0].id + " : " + products[0].sizes);

console.log("\n##############################################################\n");
console.log("Removes a value from the \"sizes\" array with the given key");
console.log("Before");
console.log("ID " + products[0].id + " : " + products[0].sizes);

products[0].deleteSize("xxxxxxL");
console.log("After");
console.log("ID " + products[0].id + " : " + products[0].sizes);

console.log("\n##############################################################\n");
console.log("Adds a \"review\" object to the \"reviews\" array");
console.log("Before");
console.log("ID " + products[0].id + " : ");
products[0].reviews.forEach(review => console.log(review));

products[0].addReview(new Reviews("50", "Bartolomeo", Date.now(), "So-So", {'service': 4, 'price': 3, 'value': 3, 'quality': 4}));
console.log("After");
console.log("ID " + products[0].id + " : ");
products[0].reviews.forEach(review => console.log(review));

console.log("\n##############################################################\n");
console.log("Removes the \"review\" object from the \"reviews\" array by the given key (ID)");
console.log("Before");
console.log("ID " + products[0].id + " : ");
products[0].reviews.forEach(review => console.log(review));

products[0].deleteReview("1");
console.log("ID " + products[0].id + " : ");
products[0].reviews.forEach(review => console.log(review));

console.log("\n##############################################################\n");
console.log("Average rating of a product");
products.forEach(product => console.log("ID " + product.id + " : " + product.getAverageRating()));

console.log("\n##############################################################\n");
console.log("Search product \"sh\"");

let foundProducts = searchProducts(products, "sh");
foundProducts.forEach(product => console.log(product));

console.log("\n##############################################################\n");
console.log("Sort by name");
sortProducts(products, 'name');
products.forEach(product => console.log(product));

console.log("\n##############################################################\n");
console.log("Sort by id");
sortProducts(products, 'id');
products.forEach(product => console.log(product));

console.log("\n##############################################################\n");
console.log("Sort by price");
sortProducts(products, 'price');
products.forEach(product => console.log(product));



