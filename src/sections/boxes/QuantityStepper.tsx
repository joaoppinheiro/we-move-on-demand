import { Minus, Plus } from 'lucide-react';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Accessible label, e.g. 'Quantity of Medium Box'. */
  label: string;
  size?: 'default' | 'sm';
  /**
   * true (default): fill the container width, with the two buttons pinned to
   * the ends — correct inside product cards, whose column layout stretches
   * children. false: shrink to content, for the cart rows.
   */
  stretch?: boolean;
};

/**
 * Touch-friendly quantity control. Buttons are 44px square (default size) so
 * they clear the minimum tap target on mobile.
 *
 * Layout note: the container previously used `inline-flex` with fixed-width
 * children. Inside the product cards (a `flex flex-col`, which stretches its
 * children) the container ended up full-width while the buttons stayed
 * shrink-to-fit, so the leftover space collected after the "+" — making it look
 * oversized and off-centre relative to the "−". Now the two buttons are equal
 * fixed squares that never grow or shrink, and the input absorbs all remaining
 * space between them.
 */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
  label,
  size = 'default',
  stretch = true,
}: QuantityStepperProps) {
  const buttonSize = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
  const inputWidth = stretch ? 'flex-1 min-w-0' : size === 'sm' ? 'w-10' : 'w-12';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  const buttonCls = `${buttonSize} flex-none grow-0 shrink-0 inline-flex items-center justify-center text-[#0A0A0A] hover:bg-[#F3F3F1] active:bg-gray-200 transition-colors disabled:opacity-30 disabled:hover:bg-transparent`;

  return (
    <div
      className={`${stretch ? 'flex w-full' : 'inline-flex'} items-stretch bg-white border border-gray-200 rounded-full overflow-hidden`}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className={buttonCls}
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
        className={`${inputWidth} ${textSize} text-center font-bold text-[#0A0A0A] tabular-nums bg-transparent border-x border-gray-200 focus:outline-none focus:bg-[#F3F3F1]`}
      />

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className={buttonCls}
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
