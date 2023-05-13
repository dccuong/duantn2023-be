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
router.get("/minbuys", );
router.get("/maxbuys", most_buys);
router.delete("/product/:id", remove);
router.post("/product", create);
router.put("/product/:id", update);

module.exports = router;
