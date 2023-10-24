import fs from 'fs';

export class ProductManager {
    constructor() {
        this.path = './products.json';
        this.idMax = 0;
    };
    //    Methods
    async getLastId(products){

    };
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
    
            const lastProduct = products[products.length - 1];
            const newId = lastProduct ? lastProduct.id + 1 : 1;
    
            product.id = newId;
            products.push(product);
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log('SUCCESS: Product added and persisted successfully');
            return true;
        } catch (error) {
            console.error('ERROR: Failed to add the product:', error);
            return false;
        }
    }
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
