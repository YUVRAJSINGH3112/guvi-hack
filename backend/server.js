const express = require('express');
const dotenv= require('dotenv');
const app = express();
const db=require('./config/mongoose-connection');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
app.use('/user',userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});