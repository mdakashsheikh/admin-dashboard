require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const clientRoutes = require('./routes/client');
const generalRoutes = require('./routes/general');
const managementRoutes = require('./routes/management');
const salesRoutes = require('./routes/sales');

//data imports
const User = require('./models/User');
const { dataUser } = require('./data/index')

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES*/
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 9000
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Listening on PORT ${PORT}`);
        console.log('Database Connected!')

        // ONLY ADD DATA ONE TIME
        // User.insertMany(dataUser)
    })
    .catch((error) => console.log(`${error.message} did not connect`))