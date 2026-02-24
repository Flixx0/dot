import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import type { ComponentProps } from "react";

type ExternalLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export const ExternalLink = (props: ExternalLinkProps) => (
    <Link
      {...props}
      // @ts-expect-error: External URLs are not typed.
      href={props.href}
      onPress={(e) => {
        e.preventDefault();
        WebBrowser.openBrowserAsync(props.href as string);
      }}
    />
);
