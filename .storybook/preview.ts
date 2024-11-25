import type { Preview } from "@storybook/react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // decorators: [
  //   (Story) =>
  //     React.createElement(SessionProvider, null, React.createElement(Story)),
  // ],
};

export default preview;
