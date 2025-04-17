// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");

// Home page
router.get("/", async (req, res) => {
  const skills = await Skill.find({});
  const projects = await Project.find({});
  res.render("index", { skills, projects });
});

// About page
router.get("/about", (req, res) => {
  res.render("about");
});

// Contact page
router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
