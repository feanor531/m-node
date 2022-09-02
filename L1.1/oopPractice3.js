//########### class Reviews #############

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
//########### end class Reviews #############


//########### abstract class Product #############

function Product ({name, description, price, brand, quantity, date, images}) {   
    if(this.constructor === Product) {
        throw new Error ("Can't instantiate abstract class!");
    }  
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
        } else if(typeof(name) == 'string') {
            this._name = name;            
        }
    },

    description(description) {
        if(!arguments.length) {
            return this._description;
        } else if(typeof(description) == 'string') {
            this.description = description;
        }        
    },
    
    price(price) {
        if(!arguments.length) {
            return this._price;
        } else if(typeof(price) == 'number') {
            this._price = price;
        }  
    },

    brand(brand) {
        if(!arguments.length) {
            return this._brand;
        } else if(typeof(brand) == 'string') {
            this._brand = brand;
        }   
    },
    
    quantity(quantity) {
        if(!arguments.length) {
            return this._quantity;
        } else if(typeof(quantity) == 'number') {
            this._quantity = quantity > 0 ? quantity : 0;
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
        let str = "";
        Object.entries(this).forEach((item) => {
            str += item[0].slice(1) + " : " + item[1] + "\n";
        });
        return str;
    }, 
     /**
      * Calculates the cost of goods
      * @param {*} count - number of goods
      * @returns the price for n products of the given type in formatted form, for example: "$12.40"
      */
    getPriceForQuantity(count) {
        return `${count * this._price}$`
    },

    universalGetSet(name, value) {
        if(Object.keys(this).includes(name)) {
            let val = value ? typeof(value) == 'string' ? `('${value}')` : `(${value})` : '()';
            let func = new Function('obj', `return obj.${name.slice(1)}${val}`);
            return func(this);
        } else {
            throw new Error ('Parameter not found');
        };
    },

})

//########### end class Product #############


//########### class Clothes #############
function Clothes({ material, color, ...rest }) {
    Product.call(this, rest);
    this._material = material;
    this._color = color;
}

Clothes.prototype = Object.create(Product.prototype);
Clothes.prototype.constructor = Clothes;

Object.assign(Clothes.prototype, {
    material(material){
        if(!arguments.length) {
            return this._material;
        } else if(typeof(material) == 'string') {
            this._material = material;
        }         
    },

    color(color){
        if(!arguments.length) {
            return this._color;
        } else if(typeof(color) == 'string') {
            this._color = color;
        }         
    },
});
//########### end class Clothes #############


//########### class Electronics #############
function Electronics({warranty, power, ...rest}) {
    Product.call(this, rest);
    this._warranty = warranty;
    this._power = power;
};

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;

Object.assign(Electronics.prototype, {
    warranty(warranty) {
        if(!arguments) {
            return this._warranty;
        } else if(typeof (warranty) === "number") {
            this._warranty = warranty;
        }
    },

    power(power) {
        if(!arguments) {
            return this._power;
        } else if(typeof (power) === "number") {
            this._power = power;
        }
    },
});

//########### end class Electronics #############

//############## Other functional ########################
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
                    return a.id.localeCompare(b.id());
                } else 
                    return a.id().length - b.id().length;
            });
            break;
    
        case "name":
            products.sort((a, b) => a.name().localeCompare(b.name()));  
            break;

        case "price":
            products.sort((a, b) => a.price() - b.price()); 
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
    return products.filter(product => (product.name().includes(search) || product.description().includes(search)));
}
//############## End Other functional ####################

//############## Test classes #############################

//Create array products and fill out reviews

let products = [];

products.push(new Clothes({    
    name : "T-shirt", 
    description : "Woman, sexy T-shirt", 
    price : 2300, 
    brand : "Adidas", 
    quantity : 150, 
    date : new Date("2022-04-15 18:30"), 
    images : ["Picture1", "Picture2"],
    material : "satin", 
    color : "red", 
}));
products.push(new Clothes({
    name : "shirt", 
    description : "men shirt", 
    price : 200, 
    brand : "Nike", 
    quantity : 150, 
    date : new Date("2022-04-15 18:30"), 
    images : ["Picture1", "Picture2"],
    material : "satin", 
    color : "red",
}));
products.push(new Electronics({
    name : "Fridge", 
    description : "fridge freezer", 
    price : 12900, 
    brand : "Bosh", 
    quantity : 10, 
    date : new Date("2022-04-15 18:30"), 
    images : ["Picture1", "Picture2"],
    warranty : 24, 
    power : 500,
}));
products.push(new Electronics({
    name : "vacuum cleaner", 
    description : "vacuum cleaner with aqua filter", 
    price : 3800, 
    brand : "LG", 
    quantity : 30, 
    date : new Date("2022-04-15 18:30"), 
    images : ["Picture1", "Picture2"],
    warranty : 12, 
    power : 2500,
}));
for (const product of products) {
    product.addReview(new Reviews("1", "Vasya", Date.now(), "Wow", {'service': 5, 'price': 5, 'value': 5, 'quality': 4}));
    product.addReview(new Reviews("2", "Peter", Date.now(), "Ok", {'service': 4, 'price': 4, 'value': 3, 'quality': 4}));
    product.addReview(new Reviews("3", "Olga", Date.now(), "Wery bed", {'service': 1, 'price': 2, 'value': 1, 'quality': 1}));
}

console.log("\n##############################################################\n");
console.log("Сhecking for the impossibility of creating an abstract class");
try {
    const product = new Product("120", "T-shirt", "T-shirt", 2300, "Adidas",["S", "L", "XL"], "L", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]);
    console.log(product.getFullInformation());
} catch (error) {
    console.log(error.message);
}

console.log("\n##############################################################\n");
console.log("Сhecking new getter-setter for each property");
console.log(products[0].price());
products[0].price(10)
console.log(products[0].price());
console.log(products[0].material());
products[0].material("carbon")
console.log(products[0].material());

console.log("\n##############################################################\n");
console.log("Сhecking universal getter-setter");
console.log(products[0].universalGetSet('_price'));
products[0].universalGetSet('_price', 123);
console.log(products[0].universalGetSet('_price'));
console.log(products[0].universalGetSet('_material'));
products[0].universalGetSet('_material', "kevlar");
console.log(products[0].universalGetSet('_material'));


console.log("\n##############################################################\n");
console.log("Search for an image by the passed parameter (Picture2)");
console.log(products[1].getImage("Picture2"));
console.log("image search parameter not set");
console.log(products[0].getImage());

console.log("\n##############################################################\n");
console.log("Search function getFullInformation()");
console.log(products[3].getFullInformation());

console.log("\n##############################################################\n");
console.log("Search function getPriceForQuantity()");
console.log(products[3].getPriceForQuantity(10));

console.log("\n##############################################################\n");
console.log("Search product \"sh\"");

let foundProducts = searchProducts(products, "sh");
foundProducts.forEach(product => console.log(product.getFullInformation() + "\n\n"));

console.log("\n##############################################################\n");
console.log("Sort by name");
sortProducts(products, 'name');
products.forEach(product => console.log(product));

console.log("\n##############################################################\n");
console.log("Sort by price");
sortProducts(products, 'price');
products.forEach(product => console.log(product));
