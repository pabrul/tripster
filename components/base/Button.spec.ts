import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

describe("Button.vue", () => {
  it("renders properly with label", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click Me",
      },
    });
    expect(wrapper.text()).toContain("Click Me");
  });

  it("emits click event", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
