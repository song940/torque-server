const http = require('http');
const kelp = require('kelp');
const body = require('kelp-body');
const send = require('kelp-send');
const mongodb = require('mongodb');

const app = kelp();

app.use(body);
app.use(send);

(async () => {
  const connection = await mongodb.connect('mongodb://lsong.me');
  const db = connection.db('torque');
  const collection = db.collection('torque');

  // http://localhost:7000/torque?eml=&v=8&session=1602754572710&id=bcc&time=1602754572710&kff1005=115.2843237&kff1006=40.49847798&kff1001=0.0&kff1007=0.0
  app.use(async (req, res, next) => {
    const { query } = req;
    const result = await collection.insertOne(query);
    console.log(result.result);
    res.status(200).send('OK!');
  });
  app.use((req, res) => res.end(404));
  http.createServer(app).listen(7000);

})();