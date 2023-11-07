const socket = io();
socket.on('products', (data) => {
  const productsList = document.querySelector(".container");
  productsList.innerHTML = " ";
  data.forEach((element) => {
    const boxItem = `
                <div class="product">
                <h3>${element.title}</h3>
                <p>Description: ${element.description}</p>
                <p>ID: ${element.id}</p>
                <p>$ ${element.price}</p>
                <p>Stock: ${element.stock}</p>
                </div>`;
    productsList.innerHTML += boxItem;
  });
});
