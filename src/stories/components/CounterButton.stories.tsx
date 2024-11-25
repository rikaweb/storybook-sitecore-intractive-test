// CounterButton.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";

import CounterButton from "../../components/CounterButton";

export default {
  title: "Example/CounterButton",
  component: CounterButton,
} as Meta<typeof CounterButton>;

const Template: StoryFn<typeof CounterButton> = (args) => (
  <CounterButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initialCount: 0,
};

export const ClickedOnce = Template.bind({});
ClickedOnce.args = {
  initialCount: 0,
};
ClickedOnce.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.getByTestId("counter-button");

  // Simulate a click
  await userEvent.click(button);

  // Assert the button text
  await expect(button).toHaveTextContent("Clicked 1 times");
};

export const ClickedThrice = Template.bind({});
ClickedThrice.args = {
  initialCount: 0,
};
ClickedThrice.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.getByTestId("counter-button");

  // Simulate three clicks
  await userEvent.click(button);
  await userEvent.click(button);
  await userEvent.click(button);

  // Assert the button text
  await expect(button).toHaveTextContent("Clicked 3 times");
};
