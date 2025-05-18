const adminModel = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports.login = async (req, res) => {
	try {
		const {email, password,adminCode} = req.body;
        console.log("Login request received:", req.body); 

		if (!email || !password||!adminCode) {
			return res.status(400).json({ message: "Email, password and Admin Code are required." });
		}

		let admin = await adminModel.findOne({ email });
		if (!admin) {
            if(adminCode !== process.env.ADMIN_CODE) {
                return res.status(401).json({ message: "Invalid admin code." });
            }
			const hashedPassword = await bcrypt.hash(password, 10); 
			admin = await adminModel.create({ email, password: hashedPassword ,adminCode});
		}

		// Compare passwords
        const isAdminCodeValid = admin.adminCode === adminCode;
		const isPasswordValid = await bcrypt.compare(password, admin.password);
		if (!isPasswordValid|| !isAdminCodeValid) {
			return res.status(401).json({ message: "Invalid credentials." });
		}
		const token = jwt.sign(
			{ id: admin._id, email: admin.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		// Respond with token and admin details
		return res.status(200).json({
			message: "Login successful.",
			token,
			admin: {
				id: admin._id,
				email: admin.email,
				name: admin.name,
                adminCode: admin.adminCode,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "An error occurred during login." });
	}
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "An error occurred during logout." });
    }
}

module.exports.profile = async (req, res) => { 
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.id;

        // Fetch admin details from the database
        const admin = await adminModel.findById(adminId).select("-password");
        if (!admin) {
            return res.status(404).json({ message: "admin not found." });
        }

        return res.status(200).json({ admin });
    } catch (error) {
        console.error("Profile error:", error);
        return res.status(500).json({ message: "An error occurred while fetching profile." });
    }
}
