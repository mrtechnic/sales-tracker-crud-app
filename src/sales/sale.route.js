const express = require("express");
const router = express.Router();
const { createSale, getAllsales } = require("./sale.controller");
const { authenticateAccess, authenticateAdminAccess } = require("../middleware/auth.middleware");

router.post("/create-sale", authenticateAccess, createSale);
router.get('/', authenticateAdminAccess, getAllsales )

module.exports = router;
