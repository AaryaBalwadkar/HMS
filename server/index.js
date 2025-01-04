import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import AuthRoutes from './routes/AuthRoutes.js'
import admin from "firebase-admin";
import serviceAccountKey from "./blogging-website-practice-firebase-adminsdk-yoq6n-34ee0b247a.json" assert { type: "json" };

dotenv.config()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,DELETE",
    credentials: true,
}))

app.use("/api/auth", AuthRoutes)

app.get("/api/hospitals", async (req, res) => {
    try {
      const overpassUrl = "https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:5000,18.5499648,73.8394112);out;";
      const response = await axios.get(overpassUrl);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    }
  });

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB Connection Successful")).catch(err=>console.log(err.message))

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})