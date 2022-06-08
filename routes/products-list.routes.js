const router = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/products-list", (req, res, next) => {
  Product.find()
    .then((allProductsList) => {
      res.status(200).json(allProductsList);
    })
    .catch((err) =>
      res.status(400).json({ message: "No Products were found" })
    );
});

router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

//Create
router.post(
  "/create-product", (req, res, next) => {
    console.log(req.body);

    const { name, price, size, description, brand, category, available, image } =
      req.body;

    Product.create({
      name,
      price,
      size,
      description,
      brand,
      image,
      category,
      available,
    })
      .then((newProduct) => {
        return res.status(200).json(newProduct);
      })
      .catch((err) =>
        res.status(400).json({ message: "No Products were created" })
      );
  }
);

router.get("/products-list/category/:category", (req, res, next) => {
  const { category } = req.params;
  Product.find({ category: { $regex: category, $options: "i" } })
    .then((searchedProduct) => {
      res.status(200).json(searchedProduct);
    })
    .catch((err) =>
      res.status(400).json({ message: "No Products were found" })
    );
});

router.get("/products-list/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then((detailsProduct) => {
      res.status(200).json(detailsProduct);
    })
    .catch((err) =>
      res.status(400).json({ message: "No Products were found" })
    );
});

router.put(
  "/products-list/:productId/",(req, res, next) => {
    const { productId } = req.params;
    const {
      name,
      price,
      size,
      description,
      image,
      brand,
      category,
      available,
    } = req.body;


    let productToUpdate = {
      name,
      price,
      size,
      description,
      image,
      brand,
      category,
      available,
    };
    Product.findByIdAndUpdate(productId, productToUpdate, { new: true })

      .then((modifiedProduct) => {
        res.status(200).json(modifiedProduct);
      })
      .catch((err) => {
        if (productId === undefined) {
          res.status(400).json({ message: "Invalid ID supplied" });
        } else if (!modifiedProduct) {
          res.status(404).json({ message: "Product not found" });
        } else {
          res.status(405).json({ message: "Validation exception" });
        }
      });
  }
);

router.delete("/products-list/:productId", (req, res, next) => {
  const { productId } = req.params;
  //console.log(req.params);

  Product.findByIdAndRemove(productId)

    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(400).json({ message: "Error message" }));
});

module.exports = router;
