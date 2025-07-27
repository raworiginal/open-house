/* ===================== Dependencies ===================== */
const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");

/* ===================== Routes ===================== */

/* ===================== CREATE ===================== */
router.get("/new", (req, res) => {
  try {
    res.render("listings/new.ejs");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.owner = req.session.user._id;
    await Listing.create(req.body);
    res.redirect("/listings");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== READ ===================== */
// Read All
router.get("/", async (req, res) => {
  try {
    const populatedListings = await Listing.find({}).populate("owner");
    res.render("listings/index.ejs", {
      listings: populatedListings,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

router.get("/:listingId", async (req, res) => {
  try {
    const populatedListings = await Listing.findById(
      req.params.listingId
    ).populate("owner");

    res.render("listings/show.ejs", {
      listing: populatedListings,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});
/* ===================== Exports ===================== */
module.exports = router;
