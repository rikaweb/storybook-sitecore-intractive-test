# Interactive Testing in Storybook for Sitecore XM Cloud

This branch contains the code for the blog **"Interactive Testing in Storybook for Sitecore XM Cloud"**, showcasing how to validate UI components with dynamic behaviors in Storybook.

## Branch Overview

This branch focuses on:

1. Writing **interactive tests** for Next.js components.
2. Mocking **GraphQL APIs** using MSW (Mock Service Worker) for dynamic data.
3. Simulating real-world scenarios like:
   - Form validation and submission.
   - Navigation menu hover interactions with dropdowns.

## Key Features

- **Interactive Form Testing**  
  Validate input fields, error messages, and submission handling using Storybook Testing Library.

- **Navigation Hover Testing**  
  Test dropdown visibility and hover-out behavior for navigation menus.

- **GraphQL Mocking with MSW**  
  Mock Sitecore GraphQL queries to test data-driven components without relying on live APIs.

## How to Use

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
git checkout <branch-name>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Storybook

```bash
npm run storybook
```
