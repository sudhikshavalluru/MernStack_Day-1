import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js'
import{
  getUserDetails,
  getMyUrl,
}from "../controllers/userController.js"

const userRouter = Router();


userRouter.get("/me", protect, getUserDetails);
userRouter.get("/my/urls", protect, getMyUrl);
export default userRouter;