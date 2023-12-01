import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { rotas } from './rotas';

const iniciarServer = () => {
    const app = express();

    configurarMiddlewares(app);
    configurarRotas(app);
    configurarManipuladoresDeErro(app);

    const servidor = app.listen(3333, () =>
        console.log('Servidor online')
    );

    return servidor; 
};

const configurarMiddlewares = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
};

const configurarRotas = (app) => {
    app.use(rotas);
};

const configurarManipuladoresDeErro = (app) => {
    app.use(
        (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({
                status: 'error',
                message: 'Erro do Servidor Interno'
            });
        }
    );
};

const servidor = iniciarServer();

export { servidor };