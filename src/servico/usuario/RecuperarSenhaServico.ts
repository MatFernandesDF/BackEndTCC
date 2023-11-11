import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import nodemailer from 'nodemailer';

interface PasswordResetRequest {
  email: string;
}

interface PasswordResetService {
  generateTemporaryPassword(): string;
  sendTemporaryPasswordByEmail(name: string, email: string, tempPassword: string): Promise<void>;
  execute(request: PasswordResetRequest): Promise<void>;
}

class DefaultPasswordResetService implements PasswordResetService {
  generateTemporaryPassword(): string {
    // Gere uma senha temporária aleatória aqui, em vez de usar um padrão
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tempPassword = Array.from({ length: 10 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    return tempPassword;
  }

  async sendTemporaryPasswordByEmail(name: string, email: string, tempPassword: string): Promise<void> {
    const transporter = nodemailer.createTransport({
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

      Prezado(a) ${name},
      
      Recebemos uma solicitação de recuperação de senha para a sua conta no [DigiFood].
      
      Caso tenha solicitado a recuperação de senha, siga as instruções abaixo para redefinir sua senha:
      
      Sua nova senha temporaria é: "${tempPassword}" sem as aspas.
      Ao logar na pagina com sua nova senha, é altamente recomendado mudar a senha.
      Siga as diretrizes fornecidas na página para criar uma senha forte e segura.
      Após redefinir a senha, você poderá acessar sua conta usando suas novas credenciais.
      Lembramos que é importante manter suas informações de login em segurança. Não compartilhe suas senhas com ninguém e evite usar informações pessoais óbvias como senhas.
      
      Caso continue com problemas para acessar sua conta ou tenha alguma dúvida, sinta-se à vontade para entrar em contato conosco.
      
      Atenciosamente,
      A Equipe de Suporte do [DigiFood]`,
   
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }

  async execute(request: PasswordResetRequest): Promise<void> {
    const { email } = request;
    console.log('Received email:', email);
    
    const user = await prismaClient.usuario.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const tempPassword = this.generateTemporaryPassword();

    await prismaClient.usuario.update({
      where: {
        id: user.id
      },
      data: {
        senha: await hash(tempPassword, 8)
      }
    });

    await this.sendTemporaryPasswordByEmail(user.nome, email, tempPassword);
  }
}

export default new DefaultPasswordResetService();