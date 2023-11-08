import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsinrealtimeRouter from "./routes/productsinrealtime.router.js";
import homeRouter from "./routes/home.router.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

// View Instance - Check how to work with from other file. 
import ProductManager from "./classes/productManager.js";
const store = new ProductManager("./src/data/products.json");

const PORT = 8080;
const app = express();

const httpServer = app.listen(PORT, () => console.log(` >>> Server Running 🚀 on port # ${PORT}`));

const socketServer = new Server(httpServer);
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/realtimeproducts", productsinrealtimeRouter); // WebSocket
app.use("/home", homeRouter); // Home

socketServer.on("connection", async (socket) => {
    console.log("New Connection ON");
    const products = await store.getProducts();
    socket.emit('products', products);
  });


