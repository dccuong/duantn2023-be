import { Router } from "express";
import { create, getComment, list, read, remove, search, update, getRelated, getBySlug } from "../controllers/product";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.get("/product", list);
router.get("/product/:id/comment", getComment);
router.get("/product/:slug/getRelated", getRelated);
router.get("/product/:slug/getBySlug", getBySlug);
router.get("/product/search", search);
router.get("/product/:id", read);
router.get("/product/most-buys", async (req, res) => {
    try {
        // Use aggregation to group the products by buy and sort them in descending order
        const mostBuys = await Product.aggregate([
            { $group: { _id: "$buy", products: { $push: "$$ROOT" } } },
            { $sort: { _id: -1 } },
        ]);
        // Send back the first group of products as JSON
        res.json(mostBuys[0].products.slice(0, 3));
    } catch (err) {
        // Handle any errors
        res.status(500).json({ message: err.message });
    }
});
router.get("/product/least-buys", async (req, res) => {
    try {
      // Use aggregation to group the products by buy and sort them in ascending order
      const leastBuys = await Product.aggregate([
        { $group: { _id: "$buy", products: { $push: "$$ROOT" } } },
        { $sort: { _id: 1 } },
      ]);
      // Send back the first group of products as JSON
      res.json(leastBuys[0].products.slice(0, 3));
    } catch (err) {
      // Handle any errors
      res.status(500).json({ message: err.message });
    }
  });
router.delete("/product/:id", remove);
router.post("/product", create);
router.put("/product/:id", update);

module.exports = router;
