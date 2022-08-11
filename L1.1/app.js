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
    
    this.getReviewByID = function(id) {
        return this.reviews.find(item => item.id = id);
    }

    this.addReview = function(review) {
        this.reviews.push(review);
    }

    this.deleteReview = function(reviewID)  {
        let position = this.reviews.findIndex(item => item.id == reviewID);
        if (position >= 0)  {
            this.reviews.splice(position, 1);
        }
    }

    this.getImage = function(image) {
        let position = this.images.indexOf(image);
        return position >=0 ? this.images[position] : this.images[0];
    }

    this.addSize = function(size)  {
        size = size.toUpperCase();
        this.sizes.includes(size) ?? this.sizes.push(size);
    }

    this.deleteSize = function(size)  {
        let position = this.sizes.indexOf(size.toUpperCase());
        if (position >= 0)  {
            this.sizes.splice(position, 1);
        }
    }

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


function searchProducts(products, search) {

}

let p = new Product(10, "T-shirt", "T-shirt", 12300, "Adidas",["S", "L", "XL"], "L", 150, new Date("2022-04-15 18:30"), ["Picture1", "Picture2"]);

p.addReview(new Reviews("1", "Vasya", Date.now(), "Wow", {'service': 5, 'price': 5, 'value': 5, 'quality': 4}));
p.addReview(new Reviews("2", "Peter", Date.now(), "Ok", {'service': 4, 'price': 4, 'value': 3, 'quality': 4}));
p.addReview(new Reviews("3", "Olga", Date.now(), "Wery bed", {'service': 1, 'price': 2, 'value': 1, 'quality': 1}));

// for (const it of p) {
//     console.log(it);
// }
// p.deleteReview('4');
// let pp = p.getReviews();
// for (const key in pp) {
//     if (pp.hasOwnProperty.call(pp, key)) {
//         console.log(pp[key]);
        
//     }
// }


console.log(p.getAverageRating());

//p.setDate('2020-10-15 ');
console.log(p.getReviews());
let d = Date.now();
console.log(d);
