
function Product (name, description, price, brand, quantity, date, images) {     
    this._id = ++Product.count;
    this._name = name;
    this._description = description;
    this._price = price;
    this._brand = brand;
    this._quantity = quantity;
    this._date = date;
    this._reviews = [];
    this._images = images;
}

Product.count = 0;

Object.assign(Product.prototype, {
    getID() {
        return this._id;
    },

    name(name){
        if(!arguments.length) {
            return this._name;
        } else {
            if(typeof(name) == 'string') {
                this._name = name;
            } 
        }
    },

    description(description) {
        if(!arguments.length) {
            return this._description;
        } else {
            if(typeof(description) == 'string') {
                this.description = description;
            } 
        }        
    },
    
    price(price) {
        if(!arguments.length) {
            return this._price;
        } else {
            if(typeof(price) == 'number') {
                this._price = price;
            } 
        }  
    },

    brand(brand) {
        if(!arguments.length) {
            return this._brand;
        } else {
            if(typeof(brand) == 'string') {
                this._brand = brand;
            } 
        }   
    },
    
    quantity(quantity) {
        if(!arguments.length) {
            return this._quantity;
        } else {
            if(typeof(quantity) == 'number') {
                this._quantity = quantity > 0 ? quantity : 0;
            } 
        } 
    },

    date(date) {
        if(!arguments.length) {
            return this._date;
        } else {
            this._date = new Date(Date.parse(date));
        } 
    },
    
    /**
     * Find the "review" object by the given key
     * @param {*} id given key
     * @returns the "review" object by the given key
     */
     getReviewByID(id) {
        return this._reviews.find(item => item.id === id);
    },

    /**
     * Adds a "review" object to the "reviews" array
     * @param {*} review 
     */
    addReview(review) {
        this._reviews.push(review);
    },

    /**
     * Removes the "review" object from the "reviews" array by the given key (ID)
     * @param {*} reviewID 
     */
    deleteReview(reviewID)  {
        let position = this._reviews.findIndex(item => item.id == reviewID);
        if (position >= 0)  {
            this._reviews.splice(position, 1);
        }
    },

    /**
     * Get the image by the passed parameter
     * @param {*} image desired picture
     * @returns the image by the passed parameter, if the parameter was not passed then the first image from the array
     */
    getImage(image) {
        let position = this._images.indexOf(image);
        return position >= 0 ? this._images[position] : this._images[0];
    },

    /**
     * Calculate the average rating of a product
     * @returns average rating of a product
     */
    getAverageRating()  {
        let sum = 0;
        for (const review of this._reviews) {
            sum += Object.values(review.rating).reduce((sumRating, currentReating) => (sumRating += currentReating), 0);
        }

        return sum / this._reviews.length;
    },

    /**
     * Returns a string containing the values of all available properties.
     */
    
     getFullInformation() {
        for (const key in this) {
            console.log(key);
        }
     }, 
     /**
      * Calculates the cost of goods
      * @param {*} count - number of goods
      * @returns the price for n products of the given type in formatted form, for example: "$12.40"
      */
     getPriceForQuantity(count) {
        return `${count * this._price}$`
     },

})


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



console.log("Create array products and fill out reviews");

let products = [];


products.push(new Product( "T-shirt", "T-shirt", 2300, "Adidas", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]));
products.push(new Product("shirt", "shirt", 200, "Nike", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]));
products.push(new Product("dress", "cool dress", 932, "Zara", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]));
products.push(new Product("underpants", "new style", 12300, "Tico", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]));

for (const product of products) {
    product.addReview(new Reviews("1", "Vasya", Date.now(), "Wow", {'service': 5, 'price': 5, 'value': 5, 'quality': 4}));
    product.addReview(new Reviews("2", "Peter", Date.now(), "Ok", {'service': 4, 'price': 4, 'value': 3, 'quality': 4}));
    product.addReview(new Reviews("3", "Olga", Date.now(), "Wery bed", {'service': 1, 'price': 2, 'value': 1, 'quality': 1}));
}

//print products
//products.forEach(product => console.log(product));

console.log("\n##############################################################\n");
console.log("Find the \"review\" object by the given key \"2\"");
//products[0].date(",jdhjjdkgjekjrhklgn,sdnvkjdsk");
console.log(products[0].getPriceForQuantity(10));
products[0].getFullInformation();
