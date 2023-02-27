import express from 'express';
import {jobPost} from './router/jobPost.js'
const StartServer = async() => {

    const app = express();
    app.use('/jobs', jobPost)    
    app.listen(process.env.PORT, () => {
        console.log(`Server listning on port ${process.env.PORT}`);
    })
}

StartServer();