const express = require('express');
const fs = require("fs")

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Wrokingl.......' });
});

app.get('/user', (req, res) => {
  console.log('Memory usage:', process.memoryUsage());
  console.log('CPU usage:', process.cpuUsage());
  console.log('Process ID:', process.pid);

  const user = { name: 'pankaj', age: 25, job: 'full-stack developer' };
  res.status(200).json(user);
  console.log('Memory usage:', process.memoryUsage());
  console.log('CPU usage:', process.cpuUsage());
  console.log('Process ID:', process.pid);
});


app.get("/make-copy-simple", (req, res) => {
  fs.copyFileSync("./people-2000000.csv", "./simple-copy.csv");
  res.json({message: "simple copy done"})
})



app.get("/make-copy-stream", (req, res) => {
  const sourcePath = "./people-2000000.csv";
  const destinationPath = "./copy.csv";

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destinationPath);

  readStream.pipe(writeStream);
  res.json({ message: "fiels copiesd" });

})

app.listen(4000, () => console.log('Server is running on 4000....'));
