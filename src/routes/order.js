import { Router } from "express";
import { create, list, read, remove, update, getByUser } from "../controllers/order";

const router = Router();

router.get("/order", list);
router.get("/order/getByUser/:userId", getByUser);
router.get("/order/:id", read);
router.delete("/order/:id", remove);
router.post("/order", create);
router.put("/order/:id", update);
router.get("/order/total-price", async (req, res) => {
    try {
      // Get the current date
      const today = new Date();
      // Get the date one week ago
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      // Use aggregation to match the orders within the date range and sum their totalPrice
      const totalPrice = await Order.aggregate([
        { $match: { createdAt: { $gte: lastWeek, $lte: today } } },
        { $group: { _id: null, totalPrice: { $sum: "$totalPrice" } } },
      ]);
      // Send back the result as JSON
      res.json(totalPrice[0].totalPrice);
    } catch (err) {
      // Handle any errors
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;