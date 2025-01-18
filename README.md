# React Native Forge UI

A modern, customizable UI component library for React Native, inspired by shadcn/ui's approach.

## Features

- 🎨 Beautifully designed components
- 📦 Copy & paste components into your project
- ⚡️ Fully customizable and maintainable
- 🔥 Written in TypeScript
- 📱 Cross-platform (iOS & Android)

## Installation

```bash
npx react-native-forge-ui@latest init my-app
```

## Usage

### Adding Components

To add a component to your project:

```bash
npx react-native-forge-ui@latest add button
```

This will create a new component in your project's `src/components` directory. You can then import and use it:

```tsx
import { Button } from '@/components/button';

export default function App() {
  return (
    <Button 
      variant="primary" 
      size="md" 
      onPress={() => console.log('Pressed!')}
    >
      Click Me
    </Button>
  );
}
```

### Available Components

- Button
  - Variants: primary, secondary, outline, ghost
  - Sizes: sm, md, lg
  - Features: loading state, icons, disabled state

More components coming soon!

### Customization

All components are copied into your project's source code, giving you full control to customize them. The components are built with:

- TypeScript for type safety
- Modern React Native practices
- Performance optimizations
- Accessibility support

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
