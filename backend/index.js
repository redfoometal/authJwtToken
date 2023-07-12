import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import { connect } from './config/database.js';
import router from './routes/route.js';

const app = express();
const port = process.env.PORT;
connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})


