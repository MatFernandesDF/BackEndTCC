// Controles de Usuário
import { CriarUsuarioControle } from './controle/usuario/CriarUsuarioControle';
import { AutenticarUsuarioControle } from './controle/usuario/AutenticarUsuarioControle';
import { DetalheDeUsuarioControle } from './controle/usuario/DetalheDeUsuarioControle';
import { RecuperarSenhaControle } from './controle/usuario/RecuperarSenhaControle';
import { ListarUsuariosControle } from './controle/usuario/ListarUsuarioControle';
import { DetalharUsuarioControle } from './controle/usuario/DetalharUsuarioControle';
import { AtualizarUsuarioControle } from './controle/usuario/AtualizarDadosControle';
import { DesativarUsuarioControle } from './controle/usuario/DesativarUsuarioControle';
import { AtivarUsuarioControle } from './controle/usuario/AtivarUsuarioControle';
import { ContatoEstabelecimentoControle } from './controle/usuario/ContatoEstabelecimentoControle';
// Controles de Categoria
import { CriarCategoriaControle } from './controle/categoria/CriarCategoriaControle';
import { ListarCategoriaControle } from './controle/categoria/ListarCategoriaControle';
import { ListarCategoriaControleFuncionario } from './controle/categoria/ListarCategoriaControleFuncionario';
import { EditarCategoriaControle } from './controle/categoria/EditarCategoriaControle';
import { DetalharCategoriaControle } from './controle/categoria/DetalharCategoriaControle';
import { DesativarCategoriaControle } from './controle/categoria/DesativarCategoriaControle';
import { AtivarCategoriaControle } from './controle/categoria/AtivarCategoriaControle';
// Controles de Produto
import { CriarProdutoControle } from './controle/produto/CriarProdutoControle';
import { ListarPorCategoriaControle } from './controle/produto/ListarPorCategoriaControle';
import { EditarProdutoControle } from './controle/produto/EditarProdutoControle';
import { ListarProdutosClienteControle } from './controle/produto/ListarProdutosClienteControle';
import { ListarProdutosControle } from './controle/produto/ListarProdutoControle';
import { DetalharProdutoControle } from './controle/produto/DetalharProdutoControle';
import { DesativarProdutoControle } from './controle/produto/DesativarProdutoControle';
import { AtivarProdutoControle } from './controle/produto/AtivarProdutoControle';

// Controles de Ordem
import { AdItemControle } from './controle/ordem/AdItemControle';
import { RemoverItemControle } from './controle/ordem/RemoverItemControle';
import { CriarOrdemControle } from './controle/ordem/CriarOrdemControle';
import { RemoverOrdemControle } from './controle/ordem/RemoverOrdemControle';
import { ListarOrdensControle } from './controle/ordem/ListarOrdensControle';
import { EnviarOrdemControle } from './controle/ordem/EnviarOrdemControle';
import { DetalharOrdemControle } from './controle/ordem/DetalharOrdemControle';
import { ListarOrdemConcluidasControle } from './controle/ordem/ListarOrdemConcluidasControle';
import { ListarOrdemAtuaisUsuarioControle } from './controle/ordem/ListarOrdemAtuaisUsuarioControle';
import { ListarOrdemUsuarioConcluidasControle } from './controle/ordem/ListarOrdemUsuarioConcluidasControle';
import { CriarOrdemViagemControle } from './controle/ordem/CriarOrdemViagemControle '; 
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { autenticado } from './middlewares/autenticado';
import { FinalizarOrdemControle } from './controle/ordem/FinalizarOrdemControle';
import { PagamentoControle } from './controle/Pagamento/PagamentoControle';
import {WebhooksControle} from './controle/Pagamento/WebhooksControle'
const rotas = Router();
const upload = multer(uploadConfig.upload('./tmp'));

// ROTAS DE USUÁRIOS
rotas.post('/usuarios', new CriarUsuarioControle().handle);
rotas.post('/login', new AutenticarUsuarioControle().handle);
rotas.get('/perfil', autenticado, new DetalheDeUsuarioControle().handle);
rotas.get('/ListarUsuarios', autenticado, new ListarUsuariosControle().handle);
rotas.get('/usuarios/detalhar', autenticado, new DetalharUsuarioControle().handle);
rotas.put('/AlterarDados',autenticado, new AtualizarUsuarioControle().handle);
rotas.put('/DesativarUsuario', new DesativarUsuarioControle().handle);
rotas.put('/AtivarUsuario', new AtivarUsuarioControle().handle);
rotas.post('/Contato', new ContatoEstabelecimentoControle().handle);
// ROTAS DE CATEGORIAS
rotas.post('/categorias1', autenticado, upload.single('imagem'), new CriarCategoriaControle().handle);
rotas.get('/categorias', autenticado, new ListarCategoriaControle().handle);
rotas.get('/categoriasFuncionarios', autenticado, new ListarCategoriaControleFuncionario().handle);
rotas.put('/EditarCategorias', autenticado, upload.single('imagem'), new EditarCategoriaControle().handle);
rotas.get('/DetalharCategorias', autenticado, new DetalharCategoriaControle().handle);
rotas.put('/Categorias/DesativarCategoria', autenticado, new DesativarCategoriaControle().handle);
rotas.put('/Categorias/AtivarCategoria', autenticado, new AtivarCategoriaControle().handle);
// ROTAS DE PRODUTOS
rotas.post('/produtos', autenticado, upload.single('imagem'), new CriarProdutoControle().handle);
rotas.get('/categorias/produtos', autenticado, new ListarPorCategoriaControle().handle);
rotas.put('/EditarProdutos', autenticado, upload.single('imagem'), new EditarProdutoControle().handle);
rotas.get('/listar/Produtos', autenticado, new ListarProdutosControle().handle);
rotas.get('/listar/ProdutosCliente', autenticado, new ListarProdutosClienteControle().handle);
rotas.put('/Produtos/DesativarProduto', autenticado, new DesativarProdutoControle().handle);
rotas.put('/Produtos/AtivarProduto', autenticado, new AtivarProdutoControle().handle);
rotas.get('/DetalharProdutos', autenticado, new DetalharProdutoControle().handle);
// ROTAS DE ORDEM
rotas.post('/ordens', autenticado, new CriarOrdemControle().handle);
rotas.post('/ordensViagem', autenticado, new CriarOrdemViagemControle().handle);
rotas.delete('/ordens', autenticado, new RemoverOrdemControle().handle);
rotas.post('/ordens/adicionar-item', autenticado, new AdItemControle().handle);
rotas.delete('/ordens/remover-item', autenticado, new RemoverItemControle().handle);
rotas.put('/ordens/enviar', autenticado, new EnviarOrdemControle().handle);
rotas.get('/ordens/listar', autenticado, new ListarOrdensControle().handle);
rotas.get('/ordens/detalhar', autenticado, new DetalharOrdemControle().handle);
rotas.post('/recuperar', new  RecuperarSenhaControle().handle);
rotas.put('/ordens/finalizar', new  FinalizarOrdemControle().handle);
rotas.post('/webhooks', new WebhooksControle().handle)
rotas.get('/ordens/listarConcluidos', autenticado, new ListarOrdemConcluidasControle().handle);
rotas.get('/ordens/listarAtuaisUsuario', autenticado, new ListarOrdemAtuaisUsuarioControle().handle);
rotas.get('/ordens/listarConcluidasUsuario', autenticado, new ListarOrdemUsuarioConcluidasControle().handle);
rotas.post('/pagamento', autenticado, new PagamentoControle().handle)

export { rotas };