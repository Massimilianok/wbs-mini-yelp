require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const restaurantRouter = require('./routes/restaurantRoute');
const cityRouter = require('./routes/cityRoute');
const tagRouter = require('./routes/tagRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/city', cityRouter);
app.use('/api/tag', tagRouter);

module.exports = app;
