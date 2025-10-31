const mongoose = require("mongoose");
const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require("../db/redis");
const { publishToQueue } = require("../broker/broker");

async function registerUser(req, res) {
    try {
        const { username, email, password, fullName: { firstName, lastName }, role } = req.body;

        const isUserAlreadyRegistered = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserAlreadyRegistered) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            fullName: {
                firstName,
                lastName
            },
            role: role || 'user'
        });

        // Publish user created events to RabbitMQ in parallel
        await Promise.all([
            publishToQueue('AUTH_NOTIFICATION.USER_CREATED', {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
            }),
            publishToQueue('AUTH_SELLER_DASHBOARD.USER_CREATED', user)
        ]);

        const token = jwt.sign({ 
                id: user._id, 
                email: user.email, 
                username: user.username,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: '1d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(201).json({ 
            message: "User registered successfully", 
            user: { 
                id: user._id, 
                email: user.email,
                username: user.username,
                fullName: {
                    firstName: user.fullName.firstName,
                    lastName: user.fullName.lastName
                },
                role: user.role,
                address: user.address
            } 
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;
        
        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password || "");
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ 
                id: user._id, 
                email: user.email, 
                username: user.username,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: '1d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ 
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                fullName: {
                    firstName: user.fullName.firstName,
                    lastName: user.fullName.lastName
                },
                role: user.role,
                address: user.address
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getCurrentUser(req, res) {
    try {
        return res.status(200).json({ 
            message: "Current user fetched successfully",
            user: req.user 
        });        
    } catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function logoutUser(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: 'No token found in cookies' });
        }

        if(token){
            await redis.set(`blacklist:${token}`, token, 'EX', 24 * 60 * 60); // Set expiry to 1 day
            res.clearCookie("token", {
                httpOnly: true,
                secure: true
            });
            return res.status(200).json({ message: "User logged out successfully" });
        }
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getUserAddress(req, res) {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId).select("address");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "User address fetched successfully",
            address: user.address 
        });
    } catch (error) {
        console.error("Error fetching user address:", error);
        res.status(500).json({ message: "Internal server error" });        
    }
}

async function addUserAddress(req, res) {
    try {
        const userId = req.user.id;

        const { street, city, state, zip, country, isDefault } = req.body; 
        
        const user = await userModel.findByIdAndUpdate(userId, {
            $push: { 
                address: { 
                    street, 
                    city, 
                    state, 
                    zip, 
                    country,
                    isDefault 
                } 
            }
        }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User address added successfully",
            address: user.address
        });
    } catch (error) {
        console.error("Error adding user address:", error);
        res.status(500).json({ message: "Internal server error" });        
    }    
}

async function deleteUserAddress(req, res) {
    try {
        const userId = req.user.id;
        const { addressId } = req.params;

        const user = await userModel.findByIdAndUpdate(
            userId, 
            { $pull: { address: { _id: addressId } } }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addressExists = user.address.some(addr => addr._id.toString() === addressId);
        if (addressExists) {
            return res.status(404).json({ message: "Address not found" });
        }

        return res.status(200).json({
            message: "User address deleted successfully",
            address: user.address
        });
    } catch (error) {
        console.error("Error deleting user address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    getUserAddress,
    addUserAddress,
    deleteUserAddress
};