import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

dotenv.config(); // .env faylını yüklə

// Nodemailer transporter - yalnız bir dəfə yaradılır
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NodeMailler_mail,
        pass: process.env.NodeMailler_password,
    },
});

// Transporter bağlantısını yoxla
transporter.verify((error, success) => {
    if (error) {
        console.error("Mail konfiqurasiyası səhvdir:", error);
    } else {
        console.log("Mail server hazırdır və bağlantı uğurludur");
    }
});

export const UserController = {
    // Bütün user-ləri gətir
    getUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.send(users);
        } catch (err) {
            console.error("getUsers error:", err);
            res.status(500).send("Server Error");
        }
    },

    // Qeydiyyat
    register: async (req, res) => {
        try {
            const { email, password, name, surname } = req.body;

            // Input validation
            if (!email || !password || !name || !surname) {
                return res.status(400).send("Bütün sahələr doldurulmalıdır");
            }

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).send("Bu email ilə istifadəçi mövcuddur");
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                name,
                surname,
                email,
                password: hashPassword,
            });

            await newUser.save();
            
            // Şifrəni response-dan çıxar
            const userResponse = newUser.toObject();
            delete userResponse.password;
            
            res.status(201).send(userResponse);
        } catch (err) {
            console.error("register error:", err);
            res.status(500).send("Server Error");
        }
    },

    // Login və emailə təsdiq kodu göndər
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Input validation
            if (!email || !password) {
                return res.status(400).send("Email və şifrə daxil edilməlidir");
            }
            
            const user = await UserModel.findOne({ email });
            if (!user) return res.status(404).send("Qeydiyyatdan keçməmisiniz");
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(400).send("Şifrə yalnışdır");
            
            const confirmCode = Math.floor(100000 + Math.random() * 900000);
            
            // Mail göndər
            try {
                const info = await transporter.sendMail({
                    from: process.env.NodeMailler_mail,
                    to: user.email,
                    subject: "Təsdiq Kodu - Daxil Olma",
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h2 style="color: #333;">Təsdiq Kodu</h2>
                            </div>
                            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                                <p style="font-size: 16px; color: #333;">Salam <strong>${user.name} ${user.surname}</strong>,</p>
                                <p style="font-size: 16px; color: #333;">Hesabınıza daxil olmaq üçün təsdiq kodu:</p>
                                <div style="text-align: center; margin: 20px 0;">
                                    <span style="font-size: 32px; font-weight: bold; color: #007bff; background-color: #e9ecef; padding: 10px 20px; border-radius: 5px; letter-spacing: 3px;">${confirmCode}</span>
                                </div>
                                <p style="font-size: 14px; color: #666;">Bu kod 10 dəqiqə müddətində etibarlıdır.</p>
                                <p style="font-size: 12px; color: #999;">Əgər bu sorğunu siz etməmisinizsə, bu maili ignore edin.</p>
                            </div>
                        </div>
                    `,
                });
                
                console.log("Mail uğurla göndərildi:", info.messageId);
                console.log("Mail response:", info.response);
            } catch (mailError) {
                console.error("Mail göndərilə bilmədi:", mailError);
                console.error("Mail error code:", mailError.code);
                console.error("Mail error message:", mailError.message);
                return res.status(500).send("Mail göndərilmədi, yenidən cəhd edin");
            }
            
            // Confirm kodu DB-ə yaz
            user.confirmPassword = confirmCode;
            user.confirmPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 dəqiqə
            await user.save();
            
            res.send({ 
                message: "Emailə təsdiq kodu göndərildi",
                email: user.email,
                expiresIn: "10 dəqiqə"
            });
        } catch (err) {
            console.error("login error:", err);
            res.status(500).send("Server Error");
        }
    },

    // Confirm kodu yoxla və token qaytar
    confirm: async (req, res) => {
        try {
            const { confirmPassword } = req.body;

            // Input validation
            if (!confirmPassword) {
                return res.status(400).send("Təsdiq kodu daxil edilməlidir");
            }

            const user = await UserModel.findOne({ 
                confirmPassword,
                confirmPasswordExpires: { $gt: new Date() } // Hələ vaxtı keçməyib
            });
            
            if (!user) {
                return res.status(400).send("Təsdiq kodu yalnış və ya vaxtı keçmişdir");
            }

            // Confirm kodunu sil
            user.confirmPassword = undefined;
            user.confirmPasswordExpires = undefined;
            await user.save();

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.Secretkey,
                { expiresIn: "1h" }
            );

            res.send({ 
                message: "Təsdiq uğurludur", 
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email
                }
            });
        } catch (err) {
            console.error("confirm error:", err);
            res.status(500).send("Server Error");
        }
    },

    // Mail test funksiyası (development üçün)
    testMail: async (req, res) => {
        try {
            const info = await transporter.sendMail({
                from: process.env.NodeMailler_mail,
                to: process.env.NodeMailler_mail, // Özünüzə göndərin
                subject: "Test Mail",
                text: "Bu test mailidir. Əgər bunu görürsünüzsə, mail konfiqurasiyası düzgündür.",
            });
            
            console.log("Test mail göndərildi:", info.messageId);
            res.send("Test mail göndərildi");
        } catch (error) {
            console.error("Test mail error:", error);
            res.status(500).send("Test mail göndərilmədi");
        }
    },
};