const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const port = process.env.PORT;
const helmet = require("helmet")

app.use(cors({ credentials: true, origin: '*' }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.listen(port, () => {
    console.log(`I am on port ${port}`);
    
});

