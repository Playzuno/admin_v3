import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'light'
  | 'error'
  | 'zuno-light'
  | 'zuno-dark'
  | 'zuno-dark-2'
  | 'zuno-light-outlined'
  | 'zuno-orange-light';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: typeof LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  bgColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  children,
  bgColor,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center transition-colors duration-200 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-offset-2';
  const btnColor = bgColor || 'primary';
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#400C7A] text-white hover:bg-[#330962] focus:ring-[#400C7A]/50',
    secondary:
      'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary/50',
    outline: `border-2 border-${btnColor} text-${btnColor} hover:bg-${btnColor}-50 focus:ring-${btnColor}/50`,
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500/50',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50',
    light:
      'bg-[#E2E2E2] text-[#909090] hover:bg-[#D1D1D1] focus:ring-[#400C7A]/50 px-6',
    error: 'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500/50',
    'zuno-light':
      'bg-[#E7D1FF] text-[#400C7A] hover:bg-[#D1B8F5] focus:ring-[#400C7A]/50 border-[#400C7A] border',
    'zuno-dark':
      'bg-[#400C7A]/25 text-[#400C7A] hover:bg-[#400C7A]/50 focus:ring-[#400C7A]/50 rounded-xl',
    'zuno-dark-2':
      'bg-[#EDEAFD] text-[#400C7A] hover:bg-[#400C7A]/50 focus:ring-[#400C7A]/50 font-semibold',
    'zuno-light-outlined':
      'text-[#D1D1D1]  focus:ring-[#400C7A]/50 border-gray-300 border',
    'zuno-orange-light':
      'bg-primary-100 rounded-xl text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500/50',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-8 py-2 text-xs',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

  const buttonStyles = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    disabled || loading ? disabledStyles : '',
    className,
    bgColor ? `bg-[${bgColor}]` : '',
  ].join(' ');

  return (
    <button className={buttonStyles} disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" />}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon className="w-5 h-5 ml-2" />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
