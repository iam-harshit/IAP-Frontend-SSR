import React, { useState, useEffect } from 'react';

/**
 * This component ensures its children are only rendered on the client side (in the browser),
 * preventing SSR errors for incompatible third-party libraries.
 */
export default function ClientOnly({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // This effect only runs in the browser, after the component has mounted.
    // It sets the state to true, triggering a re-render.
    setHasMounted(true);
  }, []);

  // On the server render and the initial client render, `hasMounted` is false.
  // We return the fallback (or null) to avoid rendering the problematic component.
  if (!hasMounted) {
    return fallback;
  }

  // After the component has successfully mounted on the client, we render the actual children.
  return <>{children}</>;
}
