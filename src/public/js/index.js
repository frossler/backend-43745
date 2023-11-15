const socket = io();
socket.on('products', (data) => {
  const productsList = document.querySelector(".container");
  productsList.innerHTML = " ";
  data.forEach((element) => {
    const thumbnails = element.thumbnails.map(thumbnail => `<img src=${thumbnail} style="width: 50px;"></img>`).join('');
    const boxItem = `
      <div class="product">
        <h3>${element.title}</h3>
        ${thumbnails}
        <p>Code: ${element.code}</p>
        <p>Description: ${element.description}</p>
        <p>ID: ${element.id}</p>
        <p>$ ${element.price}</p>
      </div>`;
    productsList.innerHTML += boxItem;
  });
});
