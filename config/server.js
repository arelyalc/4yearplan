import express from 'express';
const app = express();
const port = process.env.PORT || 5656;
//routes..?
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
