// CLASS
class ProductManager {
    constructor() {
        this.products = [];
        this.idMax = 0;
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find((e) => e.id === id);
        if (product) {
            console.log("SUCCESS: Product Matching >>> ID: " + id, product);
            return product;
        } else {
            console.error("ERROR: Can't find Product with ID: " + id);
            return null;
        }
    }
    validateProductId(id) {
        return this.products.some(e => e.id === id);
    }
    validateProductCode(code) {
        return this.products.some(e => e.code === code);
    }
    addProduct(product) {
        const mandatoryKeys = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        const missingKeys = mandatoryKeys.filter((key) => !product.hasOwnProperty(key));

        if (missingKeys.length > 0) {
            console.error('ERROR: Product is missing mandatory keys:', missingKeys);
            return false;
        } else if (this.validateProductId(product.id)) {
            console.error('ERROR: Product ID already exists');
            return false;
        } else if (this.validateProductCode(product.code)) {
            console.error('ERROR: Product CODE already exists');
            return false;
        } else {
            product.id = this.idMax++;
            this.products.push(product);
            console.log('SUCCESS: Product added successfully');
            return true;
        }
    }
}

////////////////////// TESTS //////////////////////////
const instance1 = new ProductManager();

console.log(instance1.getProducts());

instance1.addProduct({
    title: "Test Product",
    description: "Test description",
    price: 200, 
    thumbnail: "http://not-available-for-now",
    code: "0001",
    stock: 25,
    }
);

instance1.addProduct({
    title: "Test Product 2",
    description: "Test description 2",
    price: 200, 
    thumbnail: "http://not-available-for-now",
    code: "0002",
    stock: 25
    }
);

instance1.addProduct({
    title: "Test Product 3",
    description: "Test description 3",
    price: 200, 
    thumbnail: "http://not-available-for-now",
    code: "0003",
    stock: 25
    }
);
// ID already exists
instance1.addProduct({
    title: "Test Product 4",
    description: "Test description 4",
    price: 200, 
    thumbnail: "http://not-available-for-now",
    code: "0004",
    stock: 25,
    id: 0
    }
);
// Does not have all mandatory keys:
instance1.addProduct({
    title: "Test Product 5",
    description: "Test description 5",
    }
);
// CODE already exists
instance1.addProduct({
    title: "Test Product 6",
    description: "Test description 6",
    price: 200, 
    thumbnail: "http://not-available-for-now",
    code: "0002",
    stock: 25,
    }
);

instance1.getProductById(0)
instance1.getProductById(999) // ID not found

// console.log(instance1.getProducts())
