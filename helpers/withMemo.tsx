import React from "react";

export function withMemo<P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prev: Readonly<P>, next: Readonly<P>) => boolean
) {
  const Memoized = React.memo(Component, areEqual);
  const Wrapped = (props: P) => <Memoized {...props} />;
  return Wrapped;
}
