// controllers/adminController.js

import { userModel } from "../models/User.js";
import { VolunteerModel } from "../models/Volunteer.js";

// Get all users
export async function getUsers(req, res) {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update user
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await userModel.findByIdAndUpdate(id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete user
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get all volunteers
export async function getVolunteers(req, res) {
  try {
    const volunteers = await VolunteerModel.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add a volunteer
export async function addVolunteer(req, res) {
    try {
      const { name, location, contact } = req.body;
  
      // Validate input data
      if (!name || !location || !contact) {
        return res.status(400).json({ error: 'All fields (name, location, contact) are required' });
      }
  
      // Create a new volunteer instance with the provided data
      const volunteer = new VolunteerModel({
        name,
        location,
        contact
      });
  
      // Save the volunteer to the database
      await volunteer.save();
  
      // Send a success response
      res.status(201).json({ message: 'Volunteer added successfully', volunteer });
    } catch (err) {
      // Send an error response
      res.status(500).json({ error: 'Error adding volunteer', details: err.message });
    }
  }
  

// Update volunteer
export async function updateVolunteer(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const volunteer = await VolunteerModel.findByIdAndUpdate(id, updates, { new: true });
    res.json(volunteer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Delete volunteer
export async function deleteVolunteer(req, res) {
  try {
    const { id } = req.params;
    await VolunteerModel.findByIdAndDelete(id);
    res.json({ message: "Volunteer deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
