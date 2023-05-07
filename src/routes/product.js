import { Router } from "express";
import { create, getComment, list, read, remove, search, update, getRelated, getBySlug, most_buys } from "../controllers/product";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.get("/product", list);
router.get("/product/:id/comment", getComment);
router.get("/product/:slug/getRelated", getRelated);
router.get("/product/:slug/getBySlug", getBySlug);
router.get("/product/search", search);
router.get("/product/:id", read);
router.get("/minbuys", async (req, res) => {
  try {
    //  Use aggregation to group the products by buy and sort them in ascending order 
    const products = await Product.aggregate([{ $group: { _id: "$buy", products: { $push: "$$ROOT" } } }, { $sort: { _id: 1 } },]);
    // Flatten the array of arrays into a single array 
    const sortedProducts = products.flatMap(group => group.products);
    // Send back the sorted products as JSON 
    res.json(sortedProducts);
  } catch (err) {
    // Handle any errors 
    res.status(500).json({ message: err.message });
  }
});
router.get("/maxbuys", most_buys);
router.delete("/product/:id", remove);
router.post("/product", create);
router.put("/product/:id", update);

module.exports = router;
