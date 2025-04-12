const express = require("express");
const router = express.Router();
const { createSale, getAllsales } = require("../controllers/sale.controller");
const { authenticateAccess, authenticateAdminAccess } = require("../src/middleware/auth.middleware");

router.post("/create-sale", authenticateAccess, createSale);
router.get('/', authenticateAdminAccess, getAllsales )

module.exports = router;
