import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  createOrder,
  myOrders,
  allOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderById,
} from "../controllers/order.controller.js";

const router = Router();

// ----------------------------
// Buyer/Admin creates order
// ----------------------------
router.post("/", auth(["buyer", "admin"]), createOrder);

// ----------------------------
// Buyer views their own orders
// ----------------------------
router.get("/me", auth(["buyer", "admin"]), myOrders);

// ----------------------------
// Fetch single order by ID
// ----------------------------
router.get("/:id", auth(["buyer", "admin"]), getOrderById);

// ----------------------------
// Admin-only endpoints
// ----------------------------
router.get("/", auth(["admin"]), allOrders);
router.put("/:id/status", auth(["admin"]), updateOrderStatus);

// ----------------------------
// Buyer cancels their order
// ----------------------------
router.patch("/:id/cancel", auth(["buyer", "admin"]), cancelOrder);

export default router;