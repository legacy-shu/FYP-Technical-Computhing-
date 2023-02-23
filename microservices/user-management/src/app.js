import express from 'express';
import userRouter from './router/index.js'
const StartServer = async() => {

    const app = express();
    app.use('/', userRouter)    
    app.listen(process.env.PORT, () => {
        console.log(`Server listning on port ${process.env.PORT}`);
    })
}

StartServer();