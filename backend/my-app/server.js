import express from 'express';
import routes from './routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors'; 

const app = express();


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server running on port 3000..');
});