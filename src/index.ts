import 'dotenv/config';
import express, { Request, Response } from 'express';
const app = express();
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import pass from './config/passport';
import users from './routes/api/users';
import posts from './routes/api/posts';
import favorites from './routes/api/favorites';

app.use(passport.initialize());
pass(passport);
app.use(express.static('dist'));
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", users);
app.use("/api", posts);
app.use("/api", favorites);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${ port }`));