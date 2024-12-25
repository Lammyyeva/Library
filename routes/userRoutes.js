const express = require("express");
const router = new express.Router();
const userControllers = require("../controller/userController"); 


router.post("/register", userControllers.register);
router.post("/verify-otp", userControllers.verifyOtp);
router.post("/login", userControllers.login);
router.get("/refresh-token", userControllers.refreshToken);
router.post("/forget-password", userControllers.forgetPassword);
router.post("/reset-password", userControllers.resetPassword);
router.delete("/logout", userControllers.logout);

router.get("/home", userControllers.getHomePage);
router.get("/authors", userControllers.seeAllAuthors);
router.get("/authors/:id", userControllers.seeAuthor);

router.get("/category/:id", userControllers.selectCategory);
router.get("/subCategory/:id", userControllers.selectSubCategoryBooks);
router.get("/books/:id", userControllers.seeBook);


router.post("/post-rating/:id", userControllers.postRating);
router.get("/favorites", userControllers.getFavorites);
router.get("/add-to-favorite/:id", userControllers.addToFavorite);
router.get("/remove-from-favorite/:id", userControllers.removeFromFavorite);






module.exports = router;