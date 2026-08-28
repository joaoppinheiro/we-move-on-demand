import { Minus, Plus } from 'lucide-react';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Accessible label, e.g. 'Quantity of Medium Box'. */
  label: string;
  size?: 'default' | 'sm';
};

/**
 * Touch-friendly quantity control. Buttons are 44px (default) so they clear the
 * minimum tap target on mobile.
 */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  label,
  size = 'default',
}: QuantityStepperProps) {
  const btn =
    size === 'sm'
      ? 'w-9 h-9'
      : 'w-11 h-11';
  const field = size === 'sm' ? 'w-10 text-sm' : 'w-12 text-base';

  return (
    <div
      className="inline-flex items-center bg-white border border-gray-200 rounded-full overflow-hidden"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className={`${btn} flex items-center justify-center text-[#0A0A0A] hover:bg-[#F3F3F1] active:bg-gray-200 transition-colors disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        <Minus className="w-4 h-4" aria-hidden="true" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        aria-label={label}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, '');
          // Clearing the field falls back to 1, never to `min` — inside the cart
          // min is 0, and 0 removes the line, which would delete the item
          // mid-edit as soon as the user selects-all to retype a quantity.
          if (digits === '') return onChange(Math.max(min, 1));
          onChange(Math.min(max, Math.max(min, Number(digits))));
        }}
        className={`${field} text-center font-bold text-[#0A0A0A] bg-transparent border-x border-gray-200 py-2 focus:outline-none focus:bg-[#F3F3F1]`}
      />

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className={`${btn} flex items-center justify-center text-[#0A0A0A] hover:bg-[#F3F3F1] active:bg-gray-200 transition-colors disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
