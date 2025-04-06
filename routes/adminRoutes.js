// routes/adminRoutes.js
import express from "express";
import { getUsers, updateUser, deleteUser, getVolunteers, addVolunteer, updateVolunteer, deleteVolunteer } from "../controllers/adminController.js";

const adminrouter = express.Router();

// User routes
adminrouter.get("/users", getUsers);
adminrouter.put("/users/:id", updateUser);
adminrouter.delete("/users/:id", deleteUser);

// Volunteer routes
adminrouter.get("/volunteers", getVolunteers);
adminrouter.post("/volunteers", addVolunteer);
adminrouter.put("/volunteers/:id", updateVolunteer);
adminrouter.delete("/volunteers/:id", deleteVolunteer);

export {adminrouter};
