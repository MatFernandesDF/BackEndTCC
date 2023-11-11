import nodemailer from 'nodemailer';

interface ContactRequest {
  nome: string;
  email: string;
  mensagem: string;
}

class Contato {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mateuscaldasfernandes@gmail.com',
        pass: 'O2bX3KRth7Pvs6nH',
      },
    });
  }

  async sendEmail(request: ContactRequest): Promise<void> {
    const { nome, email, mensagem } = request;

    // Configurar o email para o destinatário (você)
    const destinatarioMailOptions = {
      from: 'mateuscaldasfernandes@gmail.com',
      to: 'mateuscaldasfernandes@gmail.com',
      subject: 'Contato Recebido',
      text: `Nome do Cliente: ${nome}\nEmail do Cliente: ${email}\n\nMensagem:\n${mensagem}\n\nSua mensagem foi recebida com sucesso. Agradecemos por entrar em contato conosco.`,
    };

    // Configurar o email de retorno para o cliente
    const clienteMailOptions = {
      from: 'mateuscaldasfernandes@gmail.com',
      to: email, // Email do cliente
      subject: 'Recebemos sua mensagem de contato',
      text: `Olá ${nome},\n\nAgradecemos por entrar em contato conosco. Sua mensagem foi recebida com sucesso e responderemos em breve.\n\nAtenciosamente,\n[Digifood]`,
    };

    try {
      // Enviar o email para o destinatário
      const destinatarioInfo = await this.transporter.sendMail(destinatarioMailOptions);
      console.log('Email enviado para o destinatário:', destinatarioInfo.response);

      // Enviar o email de retorno para o cliente
      const clienteInfo = await this.transporter.sendMail(clienteMailOptions);
      console.log('Email de retorno enviado para o cliente:', clienteInfo.response);
    } catch (error) {
      console.error('Erro ao enviar emails:', error);
      throw new Error('Erro ao enviar emails');
    }
  }
}

export default new Contato();