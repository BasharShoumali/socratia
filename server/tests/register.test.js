import { beforeAll, afterAll, beforeEach, describe, it, expect } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import User from "../models/User.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/register", () => {
  it("registers a new user", async () => {
    const payload = {
      firstName: "Alice",
      lastName: "Smith",
      username: "alice123",
      phone: "1234567890",
      email: "Alice@Example.com",
      password: "s3cr3t",
    };

    const res = await request(app).post("/api/register").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered");
    expect(res.body.user).toBeTruthy();
    expect(res.body.user.email).toBe(payload.email.toLowerCase());
    expect(res.body.user.username).toBe(payload.username.toLowerCase());

    const user = await User.findOne({
      email: payload.email.toLowerCase(),
    }).lean();
    expect(user).toBeTruthy();
    expect(user.firstName).toBe(payload.firstName);
    expect(user.passwordHash).toBeTruthy();
    expect(user.passwordHash).not.toBe(payload.password);
  });

  it("returns 400 when missing fields", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ firstName: "Bob" });
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const res = await request(app).post("/api/register").send({
      firstName: "Bob",
      lastName: "Jones",
      username: "bobby",
      email: "not-an-email",
      password: "pw",
    });
    expect(res.status).toBe(400);
  });

  it("returns 409 when email already in use", async () => {
    const payload = {
      firstName: "Sam",
      lastName: "Doe",
      username: "sammy",
      email: "sam@example.com",
      password: "pw",
    };

    await request(app).post("/api/register").send(payload);
    const res = await request(app)
      .post("/api/register")
      .send({ ...payload, username: "other" });
    expect(res.status).toBe(409);
  });

  it("returns 409 when username already in use (case-insensitive)", async () => {
    const a = {
      firstName: "Case",
      lastName: "Test",
      username: "CaseUser",
      email: "case1@example.com",
      password: "pw",
    };

    await request(app).post("/api/register").send(a);
    const b = {
      firstName: "Case2",
      lastName: "Test2",
      username: "CASEUSER",
      email: "case2@example.com",
      password: "pw",
    };

    const res = await request(app).post("/api/register").send(b);
    expect(res.status).toBe(409);
  });
});
