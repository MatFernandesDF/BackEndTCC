import { Request, Response } from 'express';
import { CriarOrdemServico } from '../../servico/ordem/CriarOrdemServico'; 

class CriarOrdemControle{
    async handle(req: Request, res: Response){
        const { mesa, nome, usuario_id } = req.body;

        const criarOrdemServico = new CriarOrdemServico();

        const ordem = await criarOrdemServico.execute({
            mesa,
            nome,
            usuario_id
        });

        return res.json(ordem);
    }
}

export { CriarOrdemControle };