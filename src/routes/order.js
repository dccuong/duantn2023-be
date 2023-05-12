import { Router } from "express";
import { create, list, read, remove, update, getByUser, get3mOrder, get7dOrder, getCustomOrder } from "../controllers/order";

const router = Router();

router.get("/order", list);
router.get("/order/getByUser/:userId", getByUser);
router.get("/order/:id", read);
router.delete("/order/:id", remove);
router.post("/order", create);
router.put("/order/:id", update);
router.get("/total-price",get3mOrder);
router.get("/total-price-7-date",get7dOrder);
router.get("/total-price-date",getCustomOrder);

module.exports = router;