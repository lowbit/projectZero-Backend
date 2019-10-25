const express = require('express');
const Cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileUpload = require('express-fileupload');

const app = express();
const API_PORT = process.env.API_PORT || 3001;
const API_ADDRESS = process.env.API_ADDRESS || 'localhost';

require('./auth/passport');

app.use(Cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static('public'));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

require('./routes/user/loginUser')(app);
require('./routes/user/registerUser')(app);
require('./routes/user/forgotPassword')(app);
require('./routes/user/resetPassword')(app);
require('./routes/user/updatePassword')(app);
require('./routes/user/updatePasswordViaEmail')(app);
require('./routes/user/findUsers')(app);
require('./routes/user/deleteUser')(app);
require('./routes/user/updateUser')(app);

require('./routes/game/getGames')(app);
require('./routes/game/getGame')(app);
require('./routes/game/updateGame')(app);
require('./routes/game/fileUpload')(app);

app.listen(API_PORT, () => {
    console.log(`Listening on ${API_ADDRESS}:${API_PORT}`);
});

module.exports = app;