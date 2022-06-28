const renderDOM = require("./helpers");

let dom;
let document;

describe("dashboard.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("dashboard.html");
    document = await dom.window.document;
  });

  test("should change text on click", async () => {
    const button = document.querySelector(".test-button");
    const h1 = document.querySelector(".test-text");

    button.dispatchEvent(new dom.window.Event("click"));

    const updatedH1 = document.querySelector(".test-text");

    expect(updatedH1.innerHTML).toBe("everything!");
  });
});
