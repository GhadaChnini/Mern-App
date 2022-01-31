const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
     const contact = await Contact.find({ user: req.user._id });
     res.json(contact);
});


const AddContact = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email ) {
    res.status(400);
    throw new Error("Please Fill all the Feilds");
  } else {
    const contact = new Contact({ user: req.user._id, name, email});

    const AddContact = await contact.save();

    res.status(201).json(AddContact);
  }
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const contact = await Contact.findById(req.params.id);

  if (contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (contact) {
    contact.name = name;
    contact.email = email;
    const updateContact = await contact.save();
    res.json(updateContact);
  } else {
    res.status(404);
    throw new Error("Contact not found");
  }
});

const DeleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (contact) {
    await contact.remove();
    res.json({ message: "Contact Removed" });
  } else {
    res.status(404);
    throw new Error("Contact not found");
  }
});

module.exports = {
  getContacts,
  AddContact,
  getContactById,
  updateContact,
  DeleteContact,
};