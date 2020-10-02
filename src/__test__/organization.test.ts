import request from "supertest";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Organization from "../model/organization_model";
import app from "../app";

dotenv.config();

const req = request(app);
let connection: any;
let db: any;

beforeAll(async () => {
  mongoose
    .connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongoose Database Test Connected Successfully.....");
    })
    .catch((err) => console.log(err));

  await Organization.deleteMany({});
});
describe("Data test", function () {
  describe("Queries", function () {
    it("Get all organization", async function (done) {
      req
        .post("/graphql")
        .send(
          await {
            query: `
      {
        organizations{
          organization,
          marketValue,
          products,
          createdAt,
          updatedAt,
          employees
        }
      }`,
          }
        )
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });
    it("Get a single organization", async function (done) {
      req
        .post("/graphql")
        .send(
          await {
            query: `
        {
          organization(id: "5f7424ad77075835a5bfec4e"){
            organization
          }
        }
        `,
          }
        )
        .expect(200)
        .end(async function (err, res) {
          if (err) return done(err);
          // done();
          expect(await res.body).toBeInstanceOf(Object);
          done();
        });
    });
  });

  describe("Mutations", () => {
    it("Post Organization", function (done) {
      req
        .post("/graphql")
        .send({
          mutation: `
        {
          createOrganization (
            organization:"Wernsy"
            products:["Transport"],
            marketValue: "90%",
            address: "Kano",
            ceo: "Bright",
            country: "Nigeria",
            noOfEmployees: 10,
            employees: ["Banirhe", "Bola"]
          ){
            id,
            organization,
            marketValue
          }
        }
        `,
        })
        .set("Accept", "Application/json")
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) return done(err);

          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
