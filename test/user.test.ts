import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { UserTest } from "./test-ustil";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should register new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  it("should reject login user if username is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "hasfi",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject login user if password is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rafid",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to get user", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

  it("should reject get user if token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject update user if request is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "",
        name: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update user if request is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "wrong")
      .send({
        password: "benar",
        name: "benar",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should be able to update user name", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "hasfi",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("hasfi");
  });

  it("should be able to update user password", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "hasfi",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);

    const user = await UserTest.get();
    expect(await bcrypt.compare("hasfi", user.password)).toBe(true);
  });
});

describe("DELETE /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to logout", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");

    const user = await UserTest.get();
    expect(user.token).toBe(null);
  });

  it("should reject logout if token wrong", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "salah");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
