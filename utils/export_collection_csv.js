const mongodb = require('mongodb').MongoClient;
const fastcsv = require('fast-csv');
const fs = require('fs');
const url =
  'mongodb+srv://cdcsdl:phonghuynh@cluster0.uz1vn.mongodb.net/Database?retryWrites=true&w=majority';
const ws = fs.createWriteStream('bezkoder_mongodb_fastcsv.csv');

mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    client
      .db('Database')
      .collection('users')
      .find({})
      .toArray((err, data) => {
        if (err) throw err;

        fastcsv
          .write(data, { headers: true })
          .on('finish', function () {
            console.log('Write to bezkoder_mongodb_fastcsv.csv successfully!');
          })
          .pipe(ws);
        client.close();
      });
  },
);
