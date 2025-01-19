import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledActivityIndicator = styled(ActivityIndicator);

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-blue-500 active:bg-blue-600',
  secondary: 'bg-gray-500 active:bg-gray-600',
  outline: 'border border-blue-500 active:bg-blue-50',
  ghost: 'active:bg-gray-100',
};

const variantTextClasses = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-blue-500',
  ghost: 'text-gray-700',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 min-w-[64px]',
  md: 'px-4 py-2 min-w-[80px]',
  lg: 'px-6 py-3 min-w-[96px]',
};

const sizeTextClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  style,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <StyledTouchableOpacity
      className={`
        rounded-lg flex-row items-center justify-center
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50' : ''}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <StyledActivityIndicator
          className="mr-2"
          color={variant === 'outline' || variant === 'ghost' ? '#3B82F6' : '#FFFFFF'}
        />
      ) : leftIcon ? (
        <StyledView className="mr-2">{leftIcon}</StyledView>
      ) : null}
      
      <StyledText
        className={`
          font-medium text-center
          ${variantTextClasses[variant]}
          ${sizeTextClasses[size]}
        `}
      >
        {children}
      </StyledText>

      {rightIcon && !loading && (
        <StyledView className="ml-2">{rightIcon}</StyledView>
      )}
    </StyledTouchableOpacity>
  );
} 