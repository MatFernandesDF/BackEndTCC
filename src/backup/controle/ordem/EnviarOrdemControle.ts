import {Request, Response} from 'express'
import {EnviarOrdemServico} from '../../servico/ordem/EnviarOrdemServico'

class EnviarOrdemControle{
  async handle(req: Request, res: Response){
    const { ordem_id } = req.body;

    const enviarOrdem = new EnviarOrdemServico();

    const ordem = await enviarOrdem.execute({
      ordem_id
    });

    return res.json(ordem);

  }
}

export { EnviarOrdemControle }