const Router = require("router");
import { depositRoutes } from "../modules/deposit/deposit-routes";
import { signupRoutes } from "../modules/signup/signup-routes";
import { withdrawRoutes } from "../modules/withdraw/withdraw-routes";

const router = Router();

router.use(signupRoutes);
router.use(depositRoutes);
router.use(withdrawRoutes);

export default router;