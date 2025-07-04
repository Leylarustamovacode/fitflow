import express from "express";
import { UserController } from "../controllers/UserControllers.js";

let router = express.Router();

router.get("/", UserController.getUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/confirm", UserController.confirm);

export default router;

// import express from "express";
// import { UserController } from "../controllers/UserControllers.js";

// let router = express.Router();

// // Auth routes
// router.get("/auth/profile", UserController.getProfile);
// router.post("/auth/register", UserController.register);
// router.post("/auth/login", UserController.login);
// router.post("/auth/logout", UserController.logout);
// router.post("/auth/refresh", UserController.refreshToken);
// router.post("/auth/confirm", UserController.confirm);

// // User routes
// router.get("/users", UserController.getUsers);
// router.put("/user/profile", UserController.updateProfile);
// router.put("/user/password", UserController.changePassword);
// router.delete("/user/account", UserController.deleteAccount);

// export default router;