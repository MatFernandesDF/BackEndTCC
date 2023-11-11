import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { rotas } from './rotas';

const startServer = () => {
    const app = express();

    configureMiddlewares(app);
    configureRoutes(app);
    configureErrorHandlers(app);

    const server = app.listen(3333, () =>
        console.log('Servidor online')
    );

    return server;
};

const configureMiddlewares = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
};

const configureRoutes = (app) => {
    app.use(rotas);
};

const configureErrorHandlers = (app) => {
    app.use(
        (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({
                status: 'error',
                message: 'internal server error'
            });
        }
    );
};

const server = startServer();

export { server };