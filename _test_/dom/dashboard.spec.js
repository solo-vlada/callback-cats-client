const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const htmlFile = fs
  .readFileSync(__dirname + "/../../dashboard.html", "utf-8")
  .toString();
const document = new JSDOM(htmlFile).window.document;

describe("test the functionality of the dashboard", () => {
  test("something here", () => {
    expect(2 + 3).toBe(5);
  });

  test("Dashboard has a title 'Dashboard' ", () => {
    const title = document.querySelector("title");
    expect(title.textContent).toBe("Dashboard");
  });
});
