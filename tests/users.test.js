const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("test /api/users", () => {
  const user = {
    fullName: "John Doe",
    email: "john@example.com",
    password: "john123",
  };

  test("should create user", async () => {
    const res = await api.post("/api/users").send(user).expect(201);
    expect(res.body.fullName).toBe(user.fullName);
  });
});
