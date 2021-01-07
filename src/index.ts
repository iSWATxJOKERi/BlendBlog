import 'dotenv/config';
import express from 'express';
const app = express();
import bodyParser from 'body-parser';

import users from './routes/api/users';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${ port }`));