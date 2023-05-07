import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/cateproduct";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.get("/cateproduct", list);
router.get("/cateproduct/:id", read);
router.delete("/cateproduct/:id", remove);
router.post("/cateproduct", create);
router.put("/cateproduct/:id", requireSignin, update);

module.exports = router;
