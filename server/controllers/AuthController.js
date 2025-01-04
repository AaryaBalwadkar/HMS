import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/UserModel.js'
import { getAuth } from "firebase-admin/auth";

const formatDatatoSend = (user) => {
    const access_token = jwt.sign(
        { id: user._id },
        process.env.SECRET_ACCESS_KEY
    )
    return {
        access_token,
        profile_img: user.profile_img,
        name: user.name,
        email: user.email,
    }
}

export const signup = async (req, res) => {
    const { name, email, password, confirmPassword, status } = req.body

    try {
        if (!name) {
            return res.status(400).json({ "error": "Email is required" })
        }
        if (!email) {
            return res.status(400).json({ "error": "Email is required" })
        }
        if (!password) {
            return res.status(400).json({ "error": "Password is required" })
        }
        if (!confirmPassword) {
            return res.status(400).json({ "error": "Please rewrite your same password to confirm it" })
        }
        if (!status) {
            return res.status(400).json({ "error": "Are you a doctor ?" })
        }
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ "error": "All fields are required" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ "error": "Password and ConfirmPassword should be same" })
        }

        const userAlreadyExists = await User.findOne({ email });
        if(userAlreadyExists){
            return res.status(400).json({ "error": "User Already Exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const user = new User({
            email,
            password: hashedPassword,
            name,
            status,
        });

        await user.save()
            .then((u) => { 
                res.status(200).json(formatDatatoSend(u))
            })
            .catch((err) => {
                res.status(500).json({ "error": err.message })
            })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password, status } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ "error": "Email is required" })
        }
        if (!password) {
            return res.status(400).json({ "error": "Passwordl is required" })
        }
        if (!status) {
            return res.status(400).json({ "error": "Are you a doctor ?" })
        }

        const user = await User.findOne({ email, status });
        if (!user) {
            return res.status(400).json({ "error": "Invalid credentials" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ "error": "Invalid credentials" });
        }

        res.status(200).json(formatDatatoSend(user))

    } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const googleAuthentication = async (req, res) =>{
    let { access_token } = req.body;

    getAuth()
        .verifyIdToken(access_token)
        .then(async (decodedUser) => {
            let { email, name, picture } = decodedUser;

            picture = picture.replace("s96-c", "s384-c");

            let user = await User.findOne({ email })
                .select(
                    "name profile_img google_auth"
                )
                .then((u) => {
                    return u || null;
                })
                .catch((err) => {
                    return res.status(500).json({ error: err.message });
                });

            if (user) {
                if (!user.google_auth) {
                    return res
                        .status(403)
                        .json({
                            error:
                                "This email was signed up without google. Please log in with password to access the account",
                        });
                }
            } 

            if(!user) {
                user = new User({
                    name,
                    email,
                    profile_img: picture,
                    google_auth: true,
                });

                await user.save()
                    .then((u) => {
                        user = u;
                    })
                    .catch((err) => {
                        return res.status(500).json({ error: err.message });
                    });
            }

            return res.status(200).json(formatDatatoSend(user));
        })
        .catch((err) => {
            return res
                .status(500)
                .json({
                    error:
                        "Failed to authenticate you with google. Try with some other google account",
                });
        });
};