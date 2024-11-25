// components/UserProfile.stories.tsx
import UserProfile from "@/components/UserProfile";
import { Meta, StoryFn } from "@storybook/react";
import { within, waitFor, expect } from "@storybook/test";
import { SessionProvider } from "next-auth/react";

export default {
  title: "Components/UserProfile-decorative-play",
  component: UserProfile,
  decorators: [
    (Story, context) => (
      <SessionProvider session={context.args.session}>
        <Story />
      </SessionProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <UserProfile {...args} />;

export const Default = Template.bind({});
const loggedOutSession = null;

const loggedInSession = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
  },
  expires: "9999-12-31T23:59:59.999Z",
};
export const LoggedOut = Template.bind({});
LoggedOut.args = {
  session: loggedOutSession,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  session: loggedInSession,
};
export const PlayLoggedIn = Template.bind({});

PlayLoggedIn.args = {
  session: loggedInSession,
};

PlayLoggedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Test logged-in state
  await waitFor(() => {
    expect(canvas.getByText("Sign Out")).toBeInTheDocument();
  });
};
export const PlayLoggout = Template.bind({});
PlayLoggout.args = {
  session: loggedOutSession,
};
PlayLoggout.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(() => {
    expect(canvas.getByText("You are not logged in.")).toBeInTheDocument();
  });
};
