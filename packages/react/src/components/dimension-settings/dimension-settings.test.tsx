import React from "react";
import { render, RenderOptions, screen, fireEvent } from "../../../test-utils";
import { DimensionSettings } from "./dimension-settings.component";
import { DimensionsContextProvider } from "../../contexts";

jest.mock("next/router");

const customRender = (ui: React.ReactElement, renderOptions?: RenderOptions) =>
  render(
    <DimensionsContextProvider {...renderOptions}>
      {ui}
    </DimensionsContextProvider>,
    renderOptions
  );

const getCheckBox = (label: string): HTMLInputElement =>
  screen.getByLabelText(label);

describe("Dimension Settings component", () => {
  it("the dimension settings component renders correctly when closed", () => {
    customRender(<DimensionSettings />);
    expect(screen.queryByText(/Demo v1.0/)).toBeFalsy();
  });

  it("the dimension settings component renders correctly when open", () => {
    customRender(<DimensionSettings show />);
    expect(screen.getByText(/Demo v1.0/)).toBeTruthy();
    expect(screen.getByRole("link")).toHaveProperty(
      "href",
      "mailto:hello@skylarkplatform.com?subject=Enquiry%20from%20StreamTV"
    );
  });

  it("should change the active dimension language", () => {
    customRender(<DimensionSettings show />);
    expect(getCheckBox("English").checked).toBeTruthy();
    expect(getCheckBox("Portuguese").checked).toBeFalsy();
    fireEvent.click(screen.getByText("Portuguese"));
    expect(getCheckBox("Portuguese").checked).toBeTruthy();
    expect(getCheckBox("English").checked).toBeFalsy();
  });

  it("should change the active dimension customer type", () => {
    customRender(<DimensionSettings show />);
    expect(getCheckBox("Premium").checked).toBeTruthy();
    expect(getCheckBox("Standard").checked).toBeFalsy();
    fireEvent.click(screen.getByText("Standard"));
    expect(getCheckBox("Standard").checked).toBeTruthy();
    expect(getCheckBox("Premium").checked).toBeFalsy();
  });

  it("should change the active dimension device type", () => {
    customRender(<DimensionSettings show />);
    fireEvent.click(screen.getByText("Desktop"));
    expect(getCheckBox("Desktop").checked).toBeTruthy();
    expect(getCheckBox("Phone").checked).toBeFalsy();
    fireEvent.click(screen.getByText("Phone"));
    expect(getCheckBox("Phone").checked).toBeTruthy();
    expect(getCheckBox("Desktop").checked).toBeFalsy();
  });
});
