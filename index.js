const express = require("express");
const app = express();
const connectDB = require("./config/db.js");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use("/api", require("./routes/user.route"));

app.listen(PORT, () => {
  console.log(`Server started on port PORT`);
});
