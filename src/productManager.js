import fs from 'fs';

export class ProductManager {
    constructor() {
        this.path = './products.json';
        this.idMax = 0;
    };
    //    Methods
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productsJSON);
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    };
    async getProductsByLimit(limit){
        try {
            const products = await this.getProducts();
            console.log(products);
            if(!limit || limit >= products.length) return products;
            else return products.slice(0, limit);
        } catch (error) {
            console.log(error);
        }
    };
    async addProduct(product) {
        try {
            const mandatoryKeys = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
            const missingKeys = mandatoryKeys.filter((key) => !product.hasOwnProperty(key));

            if (missingKeys.length > 0) {
                console.error('ERROR: Product is missing mandatory keys:', missingKeys);
                return false;
            }

            const products = await this.getProducts();

            if (products.some(prod => prod.id === product.id)) {
                console.error('ERROR: Product ID already exists');
                throw new Error('Product ID already exists');
            }

            if (products.some(prod => prod.code === product.code)) {
                console.error('ERROR: Product CODE already exists');
                throw new Error('Product CODE already exists');
            }

            product.id = this.idMax++;
            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log('SUCCESS: Product added and persisted successfully');
            return true;
        } catch (error) {
            console.error('ERROR: Failed to add the product:', error);
            return false;
        }
    };
    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((p) => p.id === id);
        if (product) {
            console.log(`SUCCESS: Product Matching >>> ID: ${id}\n`, product);
            return product;
        } else {
            console.error(`ERROR: Can't find Product with ID: ${id}`);
            return null;
        }
    };
    async updateProduct(id, newProduct) {
        try {
            const products = await this.getProducts();
    
            const index = products.findIndex((product) => product.id === id);
    
            if (index === -1) {
                console.error(`ERROR: Product with ID ${id} not found`);
                throw new Error('Product not found');
            }
    
            const updatedProduct = { ...newProduct, id };
    
            products[index] = updatedProduct;
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));
    
            console.log(`SUCCESS: Product with ID ${id} updated`);
            return true;
        } catch (error) {
            console.error('ERROR: Failed to update the product:', error);
            return false;
        }
    };
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
    
            const index = products.findIndex((product) => product.id === id);
    
            if (index === -1) {
                console.error(`ERROR: Product with ID ${id} not found`);
                throw new Error('Product not found');
            }
    
            products.splice(index, 1);
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));
    
            console.log(`SUCCESS: Product with ID ${id} deleted`);
            return true;
        } catch (error) {
            console.error('ERROR: Failed to delete the product:', error);
            return false;
        }
    };
}

//    Instance 
const productManager = new ProductManager();

//           Test Products 
const product1 = {
    title: "Sahumerios PALO SANTO",
    description: "Aroma a palo santo triple bendición",
    price: 200,
    thumbnail: "http://not-available-for-now",
    code: "0005",
    stock: 25
}
const product2 = {
    title: "Aceite para Masajes CBD",
    description: "Aceite para realizar masajes con CBD",
    price: 300,
    thumbnail: "http://not-available-for-now",
    code: "4578",
    stock: 25
}
const product3 = {
    title: "Sahumerio en Rama Sándalo Sagrado",
    description: "Sahumerio en rama para partir con aroma a sándalo",
    price: 100,
    thumbnail: "http://not-available-for-now",
    code: "1989",
    stock: 25
}
//    Test Methods Function 
// const test = async () => {
    // console.log(await productManager.getProducts());
    // await productManager.addProduct(product1);
    // await productManager.addProduct(product2);
    // await productManager.addProduct(product3);
// }
// test();