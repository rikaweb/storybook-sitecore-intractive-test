// components/UserProfile.stories.tsx
import UserProfile from "@/components/UserProfile";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/UserProfile",
  component: UserProfile,
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
