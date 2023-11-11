import express, { Express, Router } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import { Server as HttpServer, createServer } from 'http';

import { Logger } from '../lib';
import router from '../router';

export class Server {
    private app: Express;
    private httpServer: HttpServer;
    private logger: Logger;
    
    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.logger = new Logger({ prefix: 'Server' });

        this.middlewares();
    }

    /**
     * This function is called when the server is started
     * @since 0.9.13
     */
    private middlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(cors({ credentials: true, origin: true }));
        this.app.use(compression());
        this.app.use('/', router());
    }

    private start(): void {
        this.httpServer.listen(4000, () => {
            this.logger.info('Server started on port 4000');
        });

        this.httpServer.on('error', (error) => {
            this.logger.error(error);
        });

    }

    public run(): void {
        this.start();
    }
}

export default Server; // Export the class as default