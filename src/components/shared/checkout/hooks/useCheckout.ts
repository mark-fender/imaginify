import { useToast } from '@/components/ui/use-toast';
import { checkoutCredits } from '@/lib/actions/transaction.actions';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

interface UseCheckoutParams {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}

const useCheckout = ({ plan, amount, credits, buyerId }: UseCheckoutParams) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      toast({
        title: 'Order placed!',
        description: 'You will receive an email confirmation',
        duration: 5000,
        className: 'success-toast',
      });
    }

    if (query.get('canceled')) {
      toast({
        title: 'Order canceled!',
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: 'error-toast',
      });
    }
  }, []);

  const onCheckoutAction = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return { onCheckoutAction };
};

export default useCheckout;
