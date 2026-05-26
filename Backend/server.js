const express = require("express");
const cors = require("cors");

// const uploadRoutes = require("./routes/uploadRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend running successfully",
  });
});

// app.use("/api", uploadRoutes);
app.use(
"/api",
uploadRoutes
);

app.use(cors({
origin:"*"
}));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
