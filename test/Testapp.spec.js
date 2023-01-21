//testing calc function
import { formHandler } from "../src/client/js/formHandler";
describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(typeof formHandler).toBe("function");
  });
});
