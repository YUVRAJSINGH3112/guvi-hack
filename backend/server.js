const express = require('express');
const dotenv= require('dotenv');
const app = express();
const db=require('./config/mongoose-connection');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const adminRoutes= require('./routes/admin.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5172', 
    credentials: true,
}));
app.use(cookieParser())
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});