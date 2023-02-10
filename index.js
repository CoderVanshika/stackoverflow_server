import express, { json, urlencoded } from "express";
import { mongoose } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import userRoutes from "./routes/users.mjs";
import questionRoutes from "./routes/Questions.mjs";
import answerRoutes from "./routes/Answers.mjs";

const app = express();
config();
app.use(json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
