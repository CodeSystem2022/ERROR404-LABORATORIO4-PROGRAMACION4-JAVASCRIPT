 

const shopContent = document.getElementById("shopContent");

productos.forEach((product) => {
    console.log("un producto");
    const content = document.createElement("div");
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.productName}</h3>
    <p>${product.price}</p>
    `;
    shopContent.append(content);
});