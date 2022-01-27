import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "",
      };
    },
  };
});

describe("Button Component", () => {
  it("button render correctly", () => {
    render(<Button>Teste</Button>);

    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  test("button click", () => {
    render(<Button>Jest Test</Button>);

    const button = screen.getByText("Jest Test");

    fireEvent.click(button);

    expect(alert).toHaveBeenCalled();
  });
});
