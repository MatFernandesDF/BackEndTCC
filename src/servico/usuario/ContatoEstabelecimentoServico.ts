import nodemailer from 'nodemailer';

interface ContatoRequest {
  nome: string;
  email: string;
  mensagem: string;
}

class Contato {
  private servidor;

  constructor() {
    this.servidor = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mateuscaldasfernandes@gmail.com',
        pass: 'O2bX3KRth7Pvs6nH',
      },
    });
  }

  async sendEmail(request: ContatoRequest): Promise<void> {
    const { nome, email, mensagem } = request;

    
    const destinatario = {
      from: 'mateuscaldasfernandes@gmail.com',
      to: 'mateuscaldasfernandes@gmail.com',
      subject: 'Contato Recebido',
      text: `Nome do Cliente: ${nome}\nEmail do Cliente: ${email}\n\nMensagem:\n${mensagem}\n\nSua mensagem foi recebida com sucesso. Agradecemos por entrar em contato conosco.`,
    };

  
    const cliente = {
      from: 'mateuscaldasfernandes@gmail.com',
      to: email, 
      subject: 'Recebemos sua mensagem de contato',
      text: `Olá ${nome},\n\nAgradecemos por entrar em contato conosco. Sua mensagem foi recebida com sucesso e responderemos em breve.\n\nAtenciosamente,\n[Digifood]`,
    };

    try {
    
      const destinatarioInfo = await this.servidor.sendMail(destinatario);
      console.log('Email enviado para o destinatário:', destinatarioInfo.response);

      const clienteInfo = await this.servidor.sendMail(cliente);
      console.log('Email de retorno enviado para o cliente:', clienteInfo.response);
    } catch (error) {
      console.error('Erro ao enviar emails:', error);
      throw new Error('Erro ao enviar emails');
    }
  }
}

export default new Contato();