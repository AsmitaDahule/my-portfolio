// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Message = require("../models/Message");

// Admin login page
router.get("/login", (req, res) => {
  res.render("admin/login");
});

// Admin login POST
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.isAdmin = true;
    res.redirect("/admin/dashboard");
  } else {
    res.send("Invalid credentials");
  }
});

// Admin dashboard
router.get("/dashboard", (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/admin/login");
  res.render("admin/dashboard");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
});

// Add Project (GET & POST)
router.get("/add-project", (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/admin/login");
  res.render("admin/add-project");
});

router.post("/add-project", async (req, res) => {
  const { title, description, techStack, githubLink } = req.body;
  await Project.create({ title, description, techStack, githubLink });
  res.redirect("/admin/dashboard");
});

// Add Skill
router.get("/add-skill", (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/admin/login");
  res.render("admin/add-skill");
});

router.post("/add-skill", async (req, res) => {
  const { name } = req.body;
  await Skill.create({ name });
  res.redirect("/admin/dashboard");
});

// View Messages
router.get("/messages", async (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/admin/login");
  const messages = await Message.find({});
  res.render("admin/messages", { messages });
});

module.exports = router;
