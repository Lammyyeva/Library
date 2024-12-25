const express = require("express");
const router = new express.Router();
const {VerifyAdminAccessToken} = require("../middleware/Auth");
const adminController = require("../controller/adminController");

router.post("/add-book", VerifyAdminAccessToken, adminController.addBook);
router.put("/update-book", VerifyAdminAccessToken, adminController.updateBook);
router.delete("/delete-book/:id",VerifyAdminAccessToken, adminController.deleteBook);

module.exports = router;

