
# Box and Dice CRM API Client

A JavaScript/TypeScript client for interacting with the Box+Dice CRM API. This library provides a simple and type-safe way to interact with the Box+Dice CRM system.

## Installation

Install the package using npm:

```
npm install box-and-dice-crm
```

## Features

- Full TypeScript support with comprehensive type definitions
- Promise-based API
- Error handling with custom error types
- Pagination support
- Rate limiting protection
- Supports all major Box+Dice API endpoints:
  - Contacts
  - Sales Listings
  - Rental Listings
  - Offices
  - Consultants
  - Projects
  - Property Types/Categories
  - Suburbs
  - Lead Flow
  - Enquiries

## Usage

### Basic Setup

```
import { BoxDiceClient } from 'box-and-dice-crm';

const client = new BoxDiceClient({
  apiKey: 'your-api-key',
  domain: 'your-domain.boxdice.com.au'
});
```

### Examples

#### Working with Contacts

```
// Get all contacts
const contacts = await client.getContacts();

// Create a new contact
const newContact = await client.createContact({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  mobile: '0400000000'
});

// Update a contact
await client.updateContact(123, {
  email: 'newemail@example.com'
});
```

#### Working with Listings

```
// Get sales listings
const salesListings = await client.getSalesListings();

// Get rental listings for a specific office
const rentalListings = await client.getRentalListings(officeId);
```

### Error Handling

The client includes custom error types for common API errors:

```
try {
  await client.getContacts();
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Handle authentication error
  } else if (error instanceof RateLimitError) {
    // Handle rate limit error
    const retryAfter = error.statusCode; // Seconds to wait
  } else if (error instanceof BoxDiceError) {
    // Handle other API errors
    console.error(error.message, error.statusCode);
  }
}
```

## API Documentation

For detailed API documentation, please refer to the type definitions in the source code:

- Client Methods: src/client.ts
- Types: src/types.ts
- Error Types: src/errors.ts

## Requirements

- Node.js >= 14.0.0
- TypeScript >= 4.7.0 (if using TypeScript)

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request