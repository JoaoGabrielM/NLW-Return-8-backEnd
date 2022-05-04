import express, { response } from 'express';

const app = express();

app.use(express.json());

app.post('/feedbacks', (request, response) => {
    console.log(request.body);

    return response.send("Hello World");
})

app.listen(3333, () => {
    console.log("HTTP server running!");
})