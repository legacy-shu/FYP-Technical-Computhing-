import express from 'express';
import jobRouter from './router/index.js'
const StartServer = async() => {

    const app = express();
    app.use('/', jobRouter)    
    app.listen(process.env.PORT, () => {
        console.log(`Server listning on port ${process.env.PORT}`);
    })
}

StartServer();