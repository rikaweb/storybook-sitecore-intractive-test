// components/NavigationMenu.tsx
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

type NavigationItem = {
  id: string;
  title: string;
  link: string;
  children?: NavigationItem[];
};

export default function NavigationMenu() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const NAVIGATION_QUERY = gql`
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
  `;

  const { data, loading, error } = useQuery(NAVIGATION_QUERY);

  const handleMouseEnter = (id: string) => {
    setActiveItem(id);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  if (loading) return <p>Loading navigation...</p>;
  if (error) return <p>Error loading navigation.</p>;

  const items: NavigationItem[] = data?.navigation?.items || [];

  return (
    <nav className="bg-gray-800 text-white">
      <ul className="flex space-x-6 p-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href={item.link}
              className="hover:text-yellow-400 transition-colors"
              aria-expanded={item.children ? activeItem === item.id : undefined}
              aria-haspopup={item.children ? "true" : undefined}
            >
              {item.title}
            </a>
            {item.children && activeItem === item.id && (
              <ul
                role="menu"
                aria-label={`${item.title} submenu`}
                className="absolute left-0 mt-2 bg-gray-700 p-2 rounded-lg shadow-lg"
              >
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={child.link}
                      className="block px-4 py-2 hover:bg-gray-600 hover:text-yellow-400 rounded"
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
