const { ensureAuthenticated } = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
    res.status(200).json([
    {
      name: "Mobile",
      price: 10000,
    },
    {
      name: "Tv",
      price: 500000,
    },
    {
      name: "Laptop",
      price: 800000,
    },
  ]);
});

module.exports = {
  router,
};
