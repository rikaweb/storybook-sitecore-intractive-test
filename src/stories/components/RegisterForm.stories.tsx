// stories/RegisterForm.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import RegisterForm from "@/components/RegisterForm";

export default {
  title: "Example/RegisterForm",
  component: RegisterForm,
} as Meta<typeof RegisterForm>;

const Template: StoryFn<typeof RegisterForm> = (args) => (
  <RegisterForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (data: { name: string; email: string; password: string }) => {
    console.log("Form submitted", data);
  },
};

export const FilledForm = Template.bind({});
FilledForm.args = {
  onSubmit: (data: { name: string; email: string; password: string }) => {
    console.log("Form submitted", data);
  },
};
FilledForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Fill out the name field
  const nameInput = canvas.getByTestId("name-input");
  await userEvent.type(nameInput, "John Doe");
  await expect(nameInput).toHaveValue("John Doe");

  // Fill out the email field
  const emailInput = canvas.getByTestId("email-input");
  await userEvent.type(emailInput, "john.doe@example.com");
  await expect(emailInput).toHaveValue("john.doe@example.com");

  // Fill out the password field
  const passwordInput = canvas.getByTestId("password-input");
  await userEvent.type(passwordInput, "password123");
  await expect(passwordInput).toHaveValue("password123");

  // Submit the form
  const submitButton = canvas.getByTestId("submit-button");
  await userEvent.click(submitButton);

  // Optionally, you can mock the onSubmit function and verify it was called
};

export const SubmitEmptyForm = Template.bind({});
SubmitEmptyForm.args = {
  onSubmit: (data: { name: string; email: string; password: string }) => {
    console.log("Form submitted", data);
  },
};
SubmitEmptyForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Submit the form without filling it
  const submitButton = canvas.getByTestId("submit-button");
  await userEvent.click(submitButton);

  // Expect validation errors
  await waitFor(() => {
    expect(canvas.getByText("Name is required")).toBeInTheDocument();
    expect(canvas.getByText("Email is required")).toBeInTheDocument();
    expect(
      canvas.getByText("Password must be at least 6 characters long")
    ).toBeInTheDocument();
  });
};

export const SubmitWithErrors = Template.bind({});
SubmitWithErrors.args = {
  onSubmit: (data: { name: string; email: string; password: string }) => {
    console.log("Form submitted", data);
  },
};
SubmitWithErrors.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Submit the empty form to trigger all error messages
  const submitButton = canvas.getByTestId("submit-button");
  await userEvent.click(submitButton);

  // Check for all error messages
  await waitFor(() => {
    expect(canvas.getByText("Name is required")).toBeInTheDocument();
    expect(canvas.getByText("Email is required")).toBeInTheDocument();
    expect(
      canvas.getByText("Password must be at least 6 characters long")
    ).toBeInTheDocument();
  });

  // Fill out the name field correctly
  const nameInput = canvas.getByTestId("name-input");
  await userEvent.type(nameInput, "John Doe");

  // Check that the name error message is gone
  await waitFor(() => {
    expect(canvas.queryByText("Name is required")).not.toBeInTheDocument();
  });

  // Fill out the email field incorrectly
  const emailInput = canvas.getByTestId("email-input");
  await userEvent.type(emailInput, "invalid-email");

  // Fill out the password field with a short password
  const passwordInput = canvas.getByTestId("password-input");
  await userEvent.type(passwordInput, "short");

  // Submit the form
  await userEvent.click(submitButton);

  // Check for remaining error messages
  await waitFor(() => {
    expect(canvas.getByText("Email is")).toBeInTheDocument();
    expect(
      canvas.getByText("Password must be at least 6 characters long")
    ).toBeInTheDocument();
  });

  // Correct the email and password
  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, "john.doe@example.com");
  await userEvent.clear(passwordInput);
  await userEvent.type(passwordInput, "validpassword123");

  // Check that all error messages are gone
  await waitFor(() => {
    expect(canvas.queryByText("Name is required")).not.toBeInTheDocument();
    expect(canvas.queryByText("Email is required")).not.toBeInTheDocument();
    expect(
      canvas.queryByText("Password must be at least 6 characters long")
    ).not.toBeInTheDocument();
  });

  // Submit the form again
  await userEvent.click(submitButton);

  // Ensure no error messages are displayed
  await waitFor(() => {
    expect(canvas.queryByText("Name is required")).not.toBeInTheDocument();
    expect(canvas.queryByText("Email is invalid")).not.toBeInTheDocument();
    expect(
      canvas.queryByText("Password must be at least 6 characters long")
    ).not.toBeInTheDocument();
  });
};
