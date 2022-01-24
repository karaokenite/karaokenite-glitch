import { Link, Text, Box, ComponentProvider } from "@animus-ui/components";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/dist/client/router";

import NextLink from "next/link";

export const components = {
  h1: (props) => <Text as="h1" mb={16} {...props} />,
  h2: (props) => <Text as="h2" mb={16} {...props} />,
  h3: (props) => <Text as="h3" mb={16} {...props} />,
  h4: (props) => <Text as="h4" mb={16} {...props} />,
  h5: (props) => <Text as="h5" mb={16} {...props} />,
  h6: (props) => <Text as="h6" mb={16} {...props} />,
  p: (props) => <Text as="p" mb={16} {...props} />,
  li: (props) => <Box as="li" {...props} />,
  a: (props) => <Link variant="text" {...props} />,
};

export const overrides = {
  Link: {
    extend:
      (Link) =>
      ({ variant = "ui", children, ...props }) => {
        const { asPath } = useRouter();
        const isActive =
          props.active !== undefined ? props.active : asPath === props.href;
        return (
          <NextLink href={props.href} passHref>
            <Link
              active={isActive}
              variant={variant}
              position="relative"
              fontWeight={700}
              {...props}
            >
              {children}
              {variant === "ui" && isActive && props.href !== "/" && (
                <Box
                  zIndex={-1}
                  borderRadius=".5rem"
                  bg="primary"
                  width="calc(100% + 1rem)"
                  left="-.5rem"
                  position="absolute"
                  bottom="0.25rem"
                  height="0.65em"
                />
              )}
            </Link>
          </NextLink>
        );
      },
  },
};

export const AppProvider = ({ children }) => {
  return (
    <ComponentProvider overrides={overrides}>
      <MDXProvider components={components}>{children}</MDXProvider>
    </ComponentProvider>
  );
};
