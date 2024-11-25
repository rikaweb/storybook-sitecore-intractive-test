// stories/NavigationMenu.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import NavigationMenu from "@/components/NavigationMenu";
import { within, userEvent, expect } from "@storybook/test";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";

interface NavigationMenuProps {
  className?: string;
}

export default {
  title: "Example/NavigationMenu",
  component: NavigationMenu,
  args: {
    className: "navigation-menu",
  },
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: gql`
                query GetNavigation {
                  navigation {
                    items {
                      id
                      title
                      link
                      children {
                        id
                        title
                        link
                      }
                    }
                  }
                }
              `,
            },
            result: {
              data: {
                navigation: {
                  items: [
                    {
                      id: "1",
                      title: "Home",
                      link: "/home",
                    },
                    {
                      id: "2",
                      title: "Services",
                      link: "/services",
                      children: [
                        {
                          id: "2-1",
                          title: "Consulting",
                          link: "/services/consulting",
                        },
                        {
                          id: "2-2",
                          title: "Development",
                          link: "/services/development",
                        },
                      ],
                    },
                    {
                      id: "3",
                      title: "Contact",
                      link: "/contact",
                    },
                  ],
                },
              },
            },
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
} as Meta<typeof NavigationMenu>;

const Template: StoryFn<NavigationMenuProps> = (args) => (
  <NavigationMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  className: "navigation-menu--default",
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for the navigation items to be loaded
  const servicesLink = await canvas.findByText(
    "Services",
    {},
    { timeout: 2000 }
  );

  // Hover over "Services" to display dropdown
  await userEvent.hover(servicesLink);

  // Assert that the dropdown is visible
  const consultingLink = await canvas.findByText(
    "Consulting",
    {},
    { timeout: 2000 }
  );
  expect(consultingLink).toBeVisible();

  // Hover out and verify dropdown disappears
  await userEvent.unhover(servicesLink);
  await expect(canvas.queryByText("Consulting")).not.toBeInTheDocument();
};
