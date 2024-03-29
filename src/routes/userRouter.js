import { Router } from "express";
import { create, getAll, get, remove, update, changePassword } from "../controllers/userController";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/users", requireSignin, isAuth, isAdmin, create);
router.get("/users", getAll);
router.get("/users/:id", requireSignin, isAuth, isAdmin, get);
router.put("/users/changepassword/:id", requireSignin, isAuth, changePassword);
router.put("/users/:id", requireSignin, isAuth, isAdmin, update);
router.delete("/users/:id", requireSignin, isAuth, isAdmin, remove);

module.exports = router;
