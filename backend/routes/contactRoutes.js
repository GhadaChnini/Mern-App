const express = require("express");
const {
  getContacts,
  AddContact,
  getContactById,
  updateContact,
  DeleteContact,
} = require("../controllers/contactController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");


router.route("/").get(protect, getContacts);
router.route("/addcontact").post(protect, AddContact);
router
  .route("/:id")
  .get(getContactById)
  .put(protect, updateContact)
  .delete(protect, DeleteContact);




module.exports = router;