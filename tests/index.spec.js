const renderDOM = require("./helpers");

let dom;
let document;

// VLADA, there is literally no front end html to test, omg lol.
// i added a test that makes sure that the #cbox hasn't gone missing.

describe("index.html", () => {
  beforeEach(async () => {
    dom = await renderDOM("index.html");
    document = await dom.window.document;
  });
  test("should have a title", () => {
    const title = document.querySelector("title");
    expect(title).toBeTruthy();
  });
  test("it should have a register form", () => {
    const container = document.querySelector("#cbox");
    expect(container).toBeTruthy();
  });
});
