const renderDOM = require("./helpers");

let dom;
let document;

describe("dashboard.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("dashboard.html");
    document = await dom.window.document;
  });

  // ill leave this here as an example of how an "event" can be spoofed in this environment.
  // test("should change text on click", async () => {
  //   const button = document.querySelector(".test-button");
  //   const h1 = document.querySelector(".test-text");

  //   button.dispatchEvent(new dom.window.Event("click"));

  //   const updatedH1 = document.querySelector(".test-text");

  //   expect(updatedH1.innerHTML).toBe("everything!");
  // });

  test("the button text should change after click.", () => {
    const button = document.querySelector(".swap-button");
    expect(button.textContent).toBe("View Completed");
    // the text content of the button changes after click
    button.dispatchEvent(new dom.window.Event("click"));
    expect(button.textContent).toBe("View in-progress");
  });
});
