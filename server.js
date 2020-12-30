const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const enforce = require("express-sslify");

const app = express();

// Force user to use secure version of website. Certificates are issued by Heroku.
// {trustProtoHeader: true} is required by Heroku specifically
app.use(enforce.HTTPS({trustProtoHeader: true}));

// serve production compiled files
app.use(serveStatic(__dirname + "/dist"));

// prevent history issues
app.use(history());

app.listen(process.env.PORT || 5000);
