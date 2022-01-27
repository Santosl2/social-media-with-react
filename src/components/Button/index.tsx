import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Button({ children }: Props) {
  function alertTest() {
    alert("opaaaaa");
  }

  return (
    <div>
      <button onClick={alertTest}>{children}</button>
    </div>
  );
}
