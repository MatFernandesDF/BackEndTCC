import { Request, Response } from 'express';
import { CriarOrdemServico } from '../../servico/ordem/CriarOrdemServico'; 

class CriarOrdemViagemControle{
    async handle(req: Request, res: Response){
        const { nome, usuario_id } = req.body;
        const criarOrdemServico = new CriarOrdemServico();

        const ordem = await criarOrdemServico.execute({
            nome,
            usuario_id

        });

        return res.json(ordem);
    }
}

export { CriarOrdemViagemControle };