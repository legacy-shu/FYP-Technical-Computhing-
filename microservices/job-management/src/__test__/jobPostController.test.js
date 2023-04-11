import request from "supertest";
import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import JobPost from "../models/jobPost.js";

let mongoServer;

describe("jobPostController", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { dbName: "testingDb" });
  });
  afterAll(async () => {
    await mongoose.disconnect();
    // await mongoServer.close();
  });

  describe("registerJobPosting", () => {
    it("should create a new job posting", async () => {
      const jobPosting = {
        description: {
          userId: "user123",
          title: "Software Engineer",
          email: "test@example.com",
          company: "Example Inc.",
          address: {
            country: "USA",
            zipCode: "12345",
            state: "CA",
            city: "San Francisco",
          },
          salary: "$100,000",
          jobType: "Full-time",
          posted: new Date(),
          about: "This is a job posting for a software engineer position.",
          roleDetail:
            "Responsibilities include designing and implementing software solutions.",
          responsibilities:
            "• Design and implement software solutions\n• Collaborate with team members",
          skills:
            "• Experience with JavaScript and Node.js\n• Strong problem-solving skills",
          applicants: [],
        },
      };
      const response = await request(app)
        .post("/jobs")
        .send(jobPosting)
        .expect(201);

      expect(response.body.jobposting.description.title).toBe(
        jobPosting.description.title
      );
    });
  });

  describe("getAllJobPostings", () => {
    it("should get all job postings", async () => {
      const jobPosting = {
        description: {
          userId: "123",
          title: "Software Engineer",
          email: "test@test.com",
          company: "Test Company",
          address: {
            country: "United States",
            zipCode: "12345",
            state: "CA",
            city: "San Francisco",
          },
          salary: "$100,000 - $120,000",
          jobType: "Full-time",
          posted: new Date(),
          about: "This is a test job posting",
          roleDetail: "This is a test role detail",
          responsibilities: "These are test responsibilities",
          skills: "These are test skills",
          applicants: [],
        },
      };
      await new JobPost(jobPosting).save();
      const res = await request(app).get("/jobs");
      expect(res.statusCode).toEqual(200);
      expect(res.body[0].description.title).toEqual("Software Engineer");
    });
  });

  describe("updateJobPosting", () => {
    it("should update a job posting", async () => {
      const jobPosting = {
        description: {
          userId: "123",
          title: "Software Engineer",
          email: "test@test.com",
          company: "Test Company",
          address: {
            country: "United States",
            zipCode: "12345",
            state: "CA",
            city: "San Francisco",
          },
          salary: "$100,000 - $120,000",
          jobType: "Full-time",
          posted: new Date(),
          about: "This is a test job posting",
          roleDetail: "This is a test role detail",
          responsibilities: "These are test responsibilities",
          skills: "These are test skills",
          applicants: [],
        },
      };
      const createdJobPosting = await new JobPost(jobPosting).save();
      const res = await request(app)
        .put(`/jobs/${createdJobPosting.id}`)
        .send({
          description: {
            title: "Updated Software Engineer",
          },
        });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("removeJobPosting", () => {
    it("should remove a job posting", async () => {
      const jobPosting = {
        description: {
          userId: "123",
          title: "Software Engineer",
          email: "test@test.com",
          company: "Test Company",
          address: {
            country: "United States",
            zipCode: "12345",
            state: "CA",
            city: "San Francisco",
          },
          salary: "$100,000 - $120,000",
          jobType: "Full-time",
          posted: new Date(),
          about: "This is a test job posting",
          roleDetail: "This is a test role detail",
          responsibilities: "These are test responsibilities",
          skills: "These are test skills",
          applicants: [],
        },
      };
      const createdJobPosting = await new JobPost(jobPosting).save();
      const res = await request(app)
        .put(`/jobs/${createdJobPosting.id}`)
        .send({
          description: {
            title: "Updated Software Engineer",
          },
        });
      expect(res.statusCode).toEqual(400);
      
    });
  });

  describe("removeJobPosting", () => {
    it("should remove a job posting", async () => {
      const jobPosting = {
        description: {
          userId: "testUserId",
          title: "testTitle",
          email: "test@test.com",
          company: "testCompany",
          address: {
            country: "testCountry",
            zipCode: "testZipCode",
            state: "testState",
            city: "testCity",
          },
          salary: "testSalary",
          jobType: "testJobType",
          posted: new Date(),
          about: "testAbout",
          roleDetail: "testRoleDetail",
          responsibilities: "testResponsibilities",
          skills: "testSkills",
          applicants: [],
        },
      };
      const savedJobPosting = await new JobPost(jobPosting).save();

      // make request to delete the job posting
      const response = await request(app).delete(`/jobs/${savedJobPosting.id}`);

      // check that the job posting is removed
      const deletedJobPosting = await JobPost.findById(savedJobPosting.id);
      expect(deletedJobPosting).toBe.null;
      expect(response.status).toEqual(204);
    });
  });
});
