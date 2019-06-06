import MongodbMemoryServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import User from "../users/user.model";
import * as request from "supertest";
import app from "../app";
import Minutes from "./minutes.model";

describe("minutes API", async () => {
  const mongod = new MongodbMemoryServer();
  let token: string = "";

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });
    const user = new User();
    user.email = "test@email.com";
    user.setPassword("test-password");
    await user.save();
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@email.com", password: "test-password" });
    token = response.body.token;
  });

  afterAll(async () => {
    await User.remove({});
    await mongoose.disconnect();
    await mongod.stop();
  });

  it("Allows to retrieve all minutes", async () => {

    const minutes = new Minutes();
    minutes.date = "2019/05/01"
    minutes.content = "These are the minutes ..."
    minutes.save()

    const response = await request(app)
      .get("/api/minutes")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([expect.objectContaining({ date: "2019/05/01", content: "These are the minutes ..." })]);
  });
});
