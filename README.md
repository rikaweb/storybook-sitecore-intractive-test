# Interactive Testing in Storybook for Sitecore XM Cloud

For more information, visit our detailed blog post: [Interactive Testing in Storybook with Next.js & Sitecore XM Cloud](https://www.getfishtank.com/insights/interactive-testing-storybook-with-nextjs-sitecore-xm-cloud)

This branch contains the code for the blog **"Interactive Testing in Storybook for Sitecore XM Cloud"**, showcasing how to validate UI components with dynamic behaviors in Storybook.

## Branch Overview

This branch focuses on:

1. Writing **interactive tests** for Next.js components using Storybook Testing Library.
2. Mocking **GraphQL APIs** using MSW (Mock Service Worker) and Apollo MockedProvider for dynamic data.
3. Simulating real-world scenarios like:
   - Form validation and submission with error handling
   - Navigation menu hover interactions with dynamic dropdowns
   - Accessibility validation for interactive elements

## Key Features

- **Interactive Form Testing**  
  Validate input fields, error messages, and submission handling using Storybook Testing Library with features like:

  - Real-time validation
  - Error state management
  - Submission flow testing

- **Navigation Hover Testing**  
  Test dropdown visibility and hover-out behavior for navigation menus, including:

  - Dynamic dropdown rendering
  - Hover state management
  - Accessibility attributes

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
