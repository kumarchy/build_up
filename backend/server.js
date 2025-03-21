import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://build-up-frontend.onrender.com",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Allows all origins dynamically
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allows cookies/tokens
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(router);

app.get("/", (req, res) => {
  res.send("Hi everyone");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
