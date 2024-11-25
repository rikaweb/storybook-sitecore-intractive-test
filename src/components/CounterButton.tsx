// CounterButton.tsx
import React, { useState } from "react";

type CounterButtonProps = {
  initialCount?: number;
};

export default function CounterButton({
  initialCount = 0,
}: CounterButtonProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <button onClick={() => setCount(count + 1)} data-testid="counter-button">
      Clicked {count} times
    </button>
  );
}
