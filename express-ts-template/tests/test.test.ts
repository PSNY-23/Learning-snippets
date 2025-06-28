import request from "supertest";
import app from "../src/app";

describe("POST /api/test", () => {
  it("should return 201 and created object when valid name is provided", async () => {
    const response = await request(app).post("/api/test").send({ name: "Pankaj" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Pankaj");
  });

  it("should return 500 when name is missing", async () => {
    const response = await request(app).post("/api/test").send({}); // Missing name

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("message");
  });
});
