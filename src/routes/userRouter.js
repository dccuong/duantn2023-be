import { Router } from "express";
import { create, getAll, get, remove, update, changePassword } from "../controllers/userController";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";
const router = Router();
router.post("/users", create);
router.get("/users", getAll);
router.get("/users/:id", get);
router.put("/users/changepassword/:id", requireSignin, changePassword);
router.put("/users/:id",  update);
router.delete("/users/:id", requireSignin, isAuth, remove);

module.exports = router;
