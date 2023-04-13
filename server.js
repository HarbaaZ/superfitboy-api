const express = require('express');
const app = express();
var cors = require('cors')
const path = require('path');

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: path.resolve(__dirname + '/config/.env') });
}

const connectDatabase = require('./config/database');

const port = process.env.PORT || 8000;

const leaderboard = require('./routes/leaderboard');

app.use(cors());
app.use(express.json());

connectDatabase();

app.use('/api/v1', leaderboard);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
