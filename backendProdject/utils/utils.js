const connection = require("../db/shopDB");

function separatedProductsByCategory(products) {
  const getAllCategoriesQuery = `SELECT * FROM Categories`;
  return new Promise((resolve, reject) => {
    connection.query(getAllCategoriesQuery, (err, allCategories) => {
      if (!err) {
        let allProducts = {};
        allCategories.forEach((category) => {
          allProducts[category.title] = [];
          products.forEach((product) => {
            if (product.categoryID === category.id) {
              allProducts[category.title].push(product);
            }
          });
        });
        resolve(allProducts);
      }
    });
  });
}

module.exports = separatedProductsByCategory;
