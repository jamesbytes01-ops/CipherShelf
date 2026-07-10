import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm border border-slate-900',
    accent: 'bg-accent text-white hover:bg-accent-hover shadow-sm border border-accent',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-transparent',
    outline: 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-xl',
    lg: 'text-base px-6 py-3 gap-2.5 rounded-xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
}
