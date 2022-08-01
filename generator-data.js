const { fake } = require("faker");
const faker = require("faker");
const fs = require("fs");
faker.locale = "vi";

console.log(faker.commerce.department());
console.log(faker.commerce.productName());
console.log(faker.commerce.productDescription());
console.log(faker.commerce.productAdjective());

console.log(faker.image.imageUrl());
const Random = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  Array.from(new Array(n)).forEach((item) => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};
const randomProduct = (List, number) => {
  const ProductList = [];
  if (number <= 0) return [];
  for (const item of List) {
    Array.from(new Array(number)).forEach(() => {
      //   console.log(item);
      const product = {
        categoryId: item.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        desciptions: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      ProductList.push(product);
    });
  }
  return ProductList;
};
const rt = (List, number) => {
  const ProductList = [];
  if (number <= 0) return [];
  for (const item of List) {
    Array.from(new Array(number)).forEach(() => {
      //   console.log(item);
      const product = {
        categoryId: item.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        desciptions: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
      };
      ProductList.push(product);
    });
  }
  return ProductList;
};
//IIFE
(() => {
  const categoryList = Random(4);
  const productList = randomProduct(categoryList, 5);
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Po",
    },
  };
  //write db object to db.json
  fs.writeFile("./db.json", JSON.stringify(db), () => {
    console.log("Write data succecful");
  });
})();
