# Ubento Stripe Service

A high-performance Stripe SDK wrapper for the Ubento platform. This service provides a standardized interface for accessing Stripe data (customers, subscriptions, payments) within the Ubento ecosystem.

## Features

- **Standardized Types**: Zod-validated schemas for core Stripe resources.
- **SDK Wrapper**: Simplified interface for Stripe operations.

## Installation

```bash
pnpm add @ubento/stripe-service
```

## Usage

```typescript
import { createStripeClient } from "@ubento/stripe-service";

const client = createStripeClient({ apiKey: process.env.STRIPE_API_KEY });
const customers = await client.listCustomers();
```
