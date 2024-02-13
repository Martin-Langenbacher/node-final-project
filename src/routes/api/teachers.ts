import express from 'express';

const teacher = express.Router();

teacher.get('/', (req: express.Request, res: express.Response) => {
  res.send('Teachers route');
});

export default teacher;
