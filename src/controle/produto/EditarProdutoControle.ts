import { Request, Response } from "express";
import { EditarProdutosServico } from "../../servico/produto/EditarProdutoServico";

class EditarProdutoControle {
  async handle(req: Request, res: Response) {
    const { id, nome, valor, descricao, categoria_id } = req.body;

    let banner; // Declara a variável para capturar o caminho do banner (se for enviado)

    // Verifique se o arquivo foi enviado e capture o caminho do banner
    if (req.file) {
      const { originalname, filename } = req.file;
      banner = filename;
    }

    const editarProdutoServico = new EditarProdutosServico();

    try {
      const produto = await editarProdutoServico.execute({
        id,
        nome,
        banner, // Passe o banner (pode ser undefined)
        valor,
        descricao,
        categoria_id,
      });
      return res.json(produto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { EditarProdutoControle };