import { Request, Response } from "express";
import { EditarCategoriaServico } from "../../servico/categoria/EditarCategoriaServico";

class EditarCategoriaControle {
  async handle(req: Request, res: Response) {
    const { id, nome} = req.body;

    let banner;

    
    if (req.file) {
      const { originalname, filename } = req.file;
      banner = filename;
    }

    const editarProdutoServico = new EditarCategoriaServico();

    try {
      const categoria = await editarProdutoServico.execute({
        id,
        nome,
        banner, 
      });
      return res.json(categoria);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { EditarCategoriaControle };