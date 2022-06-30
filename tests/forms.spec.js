const renderDom = require("./helpers");

let dom;
let document;


describe("form tests", () => {
  beforeEach(async () => {
    dom = await renderDom("index.html");
    document = await dom.window.document;
  });

  test("should be a register form available", async () => {
    const registerForm = document.querySelector("#registerForm");
    const result = await registerForm.dispatchEvent(
      new dom.window.Event("submit")
    );
    
  });
});
