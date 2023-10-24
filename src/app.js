import express from "express";
import { ProductManager } from './productManager.js';
const productManager = new ProductManager("./products.json");

const PORT = 5000;

const app = express();
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();
        if (!limit) res.status(200).json(products);
        else {
            const productsByLimit = await productManager.getProductsByLimit(limit);
            res.status(200).json(productsByLimit);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.get("/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const productById = await productManager.getProductById(productId);

        if (productById) {
            res.status(200).json(productById);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.post("/products", async (req, res) => {
    try {
        const product = { ...req.body };
        const newProduct = await productManager.addProduct(product)
        const { title, description, price, thumbnail, code, stock } = newProduct
        const productResponse = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        res.status(200).json(productResponse);
    } catch (error) {
        res.status(500).json(error.message);
    };
});
