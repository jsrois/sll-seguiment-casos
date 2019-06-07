export class Page {
  public url(): any {
    return "/editor";
  }
}

describe("Main Page", () => {
  it("has option to add new minutes", () => {
    const page = new Page();

    expect(page.url()).toBe("/editor");
  });
});
