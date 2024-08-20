const express = require('express').Router();

const apiRoutes = require('./api');
const homeRoute = require('./home');

Router.use('/api', apiRoutes);
Router.use('/', homeRoute);

module.exports = Router;