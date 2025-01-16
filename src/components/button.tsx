import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import type {
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface ButtonProps extends PressableProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  variant = 'default',
  size = 'default',
  style,
  textStyle,
  children,
  ...props
}: ButtonProps) {
  const buttonStyles: StyleProp<ViewStyle> = [
    styles.base,
    styles[variant],
    styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}` as keyof typeof styles],
    style,
  ];

  const textStyles: StyleProp<TextStyle> = [
    styles.text,
    styles[`${variant}Text`],
    styles[`text${size.charAt(0).toUpperCase()}${size.slice(1)}` as keyof typeof styles],
    textStyle,
  ];

  return (
    <Pressable style={buttonStyles} {...props}>
      <Text style={textStyles}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  // Variants
  default: {
    backgroundColor: '#111111',
  } as ViewStyle,
  destructive: {
    backgroundColor: '#EF4444',
  } as ViewStyle,
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#111111',
  } as ViewStyle,
  secondary: {
    backgroundColor: '#E5E7EB',
  } as ViewStyle,
  ghost: {
    backgroundColor: 'transparent',
  } as ViewStyle,
  link: {
    backgroundColor: 'transparent',
  } as ViewStyle,
  // Sizes
  sizeDefault: {
    height: 40,
    paddingHorizontal: 16,
  } as ViewStyle,
  sizeSm: {
    height: 36,
    paddingHorizontal: 12,
  } as ViewStyle,
  sizeLg: {
    height: 44,
    paddingHorizontal: 32,
  } as ViewStyle,
  sizeIcon: {
    height: 40,
    width: 40,
  } as ViewStyle,
  // Text base style
  text: {
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,
  // Text variants
  defaultText: {
    color: '#FFFFFF',
  } as TextStyle,
  destructiveText: {
    color: '#FFFFFF',
  } as TextStyle,
  outlineText: {
    color: '#111111',
  } as TextStyle,
  secondaryText: {
    color: '#111111',
  } as TextStyle,
  ghostText: {
    color: '#111111',
  } as TextStyle,
  linkText: {
    color: '#111111',
    textDecorationLine: 'underline',
  } as TextStyle,
  // Text sizes
  textDefault: {
    fontSize: 14,
  } as TextStyle,
  textSm: {
    fontSize: 13,
  } as TextStyle,
  textLg: {
    fontSize: 16,
  } as TextStyle,
  textIcon: {
    fontSize: 14,
  } as TextStyle,
}); 