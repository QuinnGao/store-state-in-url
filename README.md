# Store State in URL

A utility for managing application state through URL parameters.

## Features

- Sync application state with URL parameters
- Easy to integrate with existing applications
- Type-safe parameter handling
- Minimal dependencies

## Installation

```bash
npm install store-state-in-url
```

## Usage

```typescript
import { encode, decode } from 'store-state-in-url';

encode(window.location.href) // output: "foo=bar"
decode(window.location.href) // output: { foo: 'bar' }
```

## API Documentation

For detailed API documentation, please refer to the docs directory.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT License
