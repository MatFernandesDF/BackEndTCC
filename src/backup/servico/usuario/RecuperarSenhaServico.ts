import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'; // Importe o cliente Prisma
import nodemailer from 'nodemailer';

interface RecuperarSenhaRequest {
  email: string;
}

interface RecuperarSenhaServico {
  generateTempPassword(email: string): Promise<string>;
  sendTempPasswordByEmail(email: string, tempPassword: string): Promise<void>;
  execute(request: RecuperarSenhaRequest): Promise<void>;
}

class DefaultRecuperarSenhaServico implements RecuperarSenhaServico {
  async generateTempPassword(email: string): Promise<string> {
    const tempPassword = email.split('@')[0] + "123@";
    const hashedTempPassword = await hash(tempPassword, 8);
    return hashedTempPassword;
  }

  async sendTempPasswordByEmail(email: string, tempPassword: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'smtp-relay.brevo.com',
      port: 587,
      secure:true,
      auth: {
        user: 'mateuscaldasfernandes@gmail.com',
        pass: 'O2bX3KRth7Pvs6nH'
      }
    });

    const mailOptions = {
      from: '<admin>mateuscaldasfernandes@gmail.com',
      to: email,
      subject: 'Recuperação de Senha',
      text: `Sua nova senha temporária é: ${tempPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error('Erro ao enviar e-mail');
      } else {
        console.log('E-mail enviado: ' + info.response);
      }
    });
  }

  async execute(request: RecuperarSenhaRequest): Promise<void> {
    const { email } = request;
    console.log("Received email:", email);
    const tempPassword = await this.generateTempPassword(email);

    // Obtenha o usuário com base no e-mail
    const user = await prismaClient.usuario.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Atualize a senha do usuário no banco de dados usando o id retornado
    await prismaClient.usuario.update({
      where: {
        id: user.id
      },
      data: {
        senha: tempPassword
      }
    });

    // Envie o e-mail com a senha temporária
    await this.sendTempPasswordByEmail(email, tempPassword);
  }
}

export default new DefaultRecuperarSenhaServico();