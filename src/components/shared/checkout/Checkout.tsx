'use client';

import { Button } from '../../ui/button';
import useCheckout from './hooks/useCheckout';

interface CheckoutProps {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}

const Checkout = ({ plan, amount, credits, buyerId }: CheckoutProps) => {
  const { onCheckoutAction } = useCheckout({ plan, amount, credits, buyerId });

  return (
    <form action={onCheckoutAction} method='POST'>
      <section>
        <Button
          type='submit'
          role='link'
          className='w-full rounded-full bg-purple-gradient bg-cover'>
          Buy Credits
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
