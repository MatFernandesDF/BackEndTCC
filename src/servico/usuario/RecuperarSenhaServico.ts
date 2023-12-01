import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import nodemailer from 'nodemailer';

interface RedefinirSenhaRequest {
  email: string;
}

interface RedefinirSenhaService {
  gerarSenhaTemporaria(): string;
  enviarSenhaTemporariaPorEmail(nome: string, email: string, tempPassword: string): Promise<void>;
  execute(request: RedefinirSenhaRequest): Promise<void>;
}

class ResetarSenhaPadrão implements RedefinirSenhaService {
  gerarSenhaTemporaria(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const senhaTemporaria = Array.from({ length: 10 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
    return senhaTemporaria;
  }

  async enviarSenhaTemporariaPorEmail(nome: string, email: string, senhaTemporaria: string): Promise<void> {
    const servidor = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mateuscaldasfernandes@gmail.com',
        pass: 'O2bX3KRth7Pvs6nH',
      },
    });

    const mailOptions = {
      from: '"Admin" <mateuscaldasfernandes@gmail.com>',
      to: email,
      subject: 'Mudança de Senha',
      text:`Assunto: Recuperação de Senha

      Prezado(a) ${nome},
      
      Recebemos uma solicitação de recuperação de senha para a sua conta no [DigiFood].
      
      Caso tenha solicitado a recuperação de senha, siga as instruções abaixo para redefinir sua senha:
      
      Sua nova senha temporaria é: "${senhaTemporaria}" sem as aspas.
      Ao logar na pagina com sua nova senha, é altamente recomendado mudar a senha.
      Siga as diretrizes fornecidas na página para criar uma senha forte e segura.
      Após redefinir a senha, você poderá acessar sua conta usando suas novas credenciais.
      Lembramos que é importante manter suas informações de login em segurança. Não compartilhe suas senhas com ninguém e evite usar informações pessoais óbvias como senhas.
      
      Caso continue com problemas para acessar sua conta ou tenha alguma dúvida, sinta-se à vontade para entrar em contato conosco.
      
      Atenciosamente,
      A Equipe de Suporte do [DigiFood]`,
   
    };

    try {
      const info = await servidor.sendMail(mailOptions);
      console.log('Email enviado:', info.response);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error('Erro ao enviar email');
    }
  }

  async execute(request: RedefinirSenhaRequest): Promise<void> {
    const { email } = request;
    console.log('Email recebido:', email);
    
    const usuario = await prismaClient.usuario.findFirst({
      where: {
        email: email
      }
    });

    if (!usuario) {
      throw new Error('Usuario não existe');
    }

    const senhaTemporaria= this.gerarSenhaTemporaria();

    await prismaClient.usuario.update({
      where: {
        id: usuario.id
      },
      data: {
        senha: await hash(senhaTemporaria, 8)
      }
    });

    await this.enviarSenhaTemporariaPorEmail(usuario.nome, email, senhaTemporaria);
  }
}

export default new ResetarSenhaPadrão();