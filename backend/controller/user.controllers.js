const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


module.exports.login = async (req, res) => {
	try {
		const {email, password} = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required." });
		}

		let user = await userModel.findOne({ email });
		if (!user) {
			// If user doesn't exist, create a new user
			const hashedPassword = await bcrypt.hash(password, 10); 
			user = await userModel.create({ email, password: hashedPassword });
		}

		// Compare passwords
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials." });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ id: user._id, email: user.email,role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.cookie("token", token, {
    			httpOnly: false,
    			secure: false,    
    			sameSite: "Lax",  
    			maxAge: 24 * 60 * 60 * 1000 ,
				path: "/",
		});

		return res.status(200).json({
			message: "Login successful.",
			token,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
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
        const userId = decoded.id;

        // Fetch user details from the database
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Profile error:", error);
        return res.status(500).json({ message: "An error occurred while fetching profile." });
    }
}
