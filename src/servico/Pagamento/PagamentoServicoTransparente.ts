import prismaClient from "../../prisma";
import Stripe from 'stripe';

export interface PagamentoRequest {
  user_id: string;
  valor: number; // Atenção: Este valor deve ser passado em centavos, não em reais
  ordem_id: string;
}

class PagamentoServico {
  async execute({ user_id, valor, ordem_id }: PagamentoRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
      appInfo: {
        name: 'DigiFood',
        version: '1',
      },
    });

    // Buscar o usuário e cadastrar ele no Stripe caso não tenha cadastrado
    const findUser = await prismaClient.usuario.findFirst({
      where: { id: user_id },
    });

    if (!findUser) {
      throw new Error('User not found.');
    }

    let customerId = findUser.stripe_customer_id;

    // Criar um cliente no Stripe se não existir
    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: findUser.email,
      });

      // Atualizar o usuário com o Stripe Customer ID
      await prismaClient.usuario.update({
        where: { id: user_id },
        data: { stripe_customer_id: stripeCustomer.id },
      });

      customerId = stripeCustomer.id;
    }

    // Criar um PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: valor, // certifique-se de que valor está em centavos
      currency: 'brl',
      customer: customerId,
      metadata: { ordem_id },
      // A captura pode ser automática ou manual, dependendo do seu fluxo de negócios
      capture_method: 'automatic',
    });

    // Retornar o client_secret para o cliente
    return { clientSecret: paymentIntent.client_secret };
  }
}

export { PagamentoServico };