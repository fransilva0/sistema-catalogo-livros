import { Router } from "express";
import { LibraryController } from "../controllers/library_controller";
import { HomeController } from "../controllers/home_controller";

const router = Router();
router.get("/", HomeController.index);
router.get("/sobre", HomeController.sobre);

router.get("/biblioteca", LibraryController.index);
router.get("/biblioteca/novo", LibraryController.novo);
router.post("/biblioteca/criar", LibraryController.criar);

export default router
