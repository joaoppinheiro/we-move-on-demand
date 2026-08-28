import { useState } from 'react';
import type { CartLine } from '@/lib/cart';

/**
 * Submits a "Request Availability" form to the notification endpoint.
 *
 * REUSABLE BOXES ONLY — ordinary carts go through Stripe checkout, not this
 * inquiry path. The endpoint rejects payloads with no reusable line.
 *
 * Mirrors useQuoteSubmit so both lead paths behave identically from the UI's
 * point of view.
 */

export type AvailabilityFields = {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
};

export type AvailabilityLine = {
  name: string;
  qty: number;
  kind: CartLine['kind'];
  /** null for reusable boxes (price confirmed by the team). */
  price: number | null;
};

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function useAvailabilityRequest(source: string) {
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function submit(fields: AvailabilityFields, lines: AvailabilityLine[]): Promise<boolean> {
    setState('loading');
    setErrorMessage('');
    try {
      // TODO: endpoint de envio do formulário — api/box-availability.ts reaproveita
      // a lógica de lead de api/quote.ts com o payload adaptado (lista do carrinho).
      // Se o endpoint dedicado for consolidado dentro de /api/quote no futuro,
      // basta trocar a URL aqui.
      const res = await fetch('/api/box-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, lines, source }),
      });
      const data = await res.json().catch(() => ({ ok: false, error: 'Invalid response' }));
      if (!res.ok || !data.ok) {
        setErrorMessage(data?.error || 'Something went wrong. Please call us at (561) 212-7570.');
        setState('error');
        return false;
      }
      setState('success');
      return true;
    } catch {
      setErrorMessage('Network error. Please call us at (561) 212-7570.');
      setState('error');
      return false;
    }
  }

  function reset() {
    setState('idle');
    setErrorMessage('');
  }

  return { state, errorMessage, submit, reset, isLoading: state === 'loading' };
}
