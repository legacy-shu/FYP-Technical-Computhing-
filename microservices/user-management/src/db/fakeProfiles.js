import { faker } from "@faker-js/faker";
import { config } from "../../config.js";
import { User, Profile } from "../models/index.js";
import { hash } from "bcrypt";
import axios from "axios";
const URI = config.seed.url;
export const generateFakeUsersAndProfiles = async (datacount) => {
  await User.deleteMany({});
  await Profile.deleteMany({});
  const users = [];
  const profiles = [];
  const postings = [];
  try {
    for (let i = 0; i < datacount; i++) {
      const random = i % 3 == 0 ? true : false;
      users.push(
        new User({
          email: faker.internet.email().toLowerCase(),
          password: await hash("password", config.bcrypt.saltRounds),
          role: {
            provider: random,
          },
        })
      );
    }
    console.log("fake data inserting to database...");
    await User.insertMany(users);
    console.log(`${users.length} fake users generated!`);

    users.map((user) => {
      profiles.push(
        new Profile({
          user: user.id,
          name: {
            first: faker.name.firstName(),
            last: faker.name.lastName(),
          },
          contact: {
            countryCode: faker.phone.number("##"),
            phoneNumber: faker.phone.number("##########"),
          },
          address: {
            country: faker.address.country(),
            zipCode: faker.address.zipCode("#####"),
            state: faker.address.county(),
            city: faker.address.cityName(),
          },
        })
      );
    });
    console.log("fake data inserting to database...");
    await Profile.insertMany(profiles);
    console.log(`${profiles.length} fake profiles generated!`);

    await axios.get(`${URI}/jobs/seedonly/drop`);
    const filteredusers = users.filter((u) => u.role.provider);

    filteredusers.map((user) => {
      for (let i = 0; i < 10; i++) {
        postings.push(
          axios.post(`${URI}/jobs/seedonly`, {
            description: {
              userId: user.id,
              title: faker.name.jobTitle(),
              email: user.email,
              company: `${faker.company.name()}, ${faker.name.jobType()}`,
              address: profiles.filter(
                (p) => p.user.toHexString() === user._id.toHexString()
              )[0].address,
              salary: `${faker.phone.number("2#000-6#000")} / Per Year`,
              jobType: "Full-time(permanent,office)",
              posted: faker.date.between(
                "2023-01-01T00:00:00.000Z",
                "2023-03-020T00:00:00.000Z"
              ),
              about: faker.lorem.paragraph(6),
              roleDetail: faker.lorem.paragraphs(10),
              responsibilities: faker.lorem.paragraph(8),
              skills: faker.lorem.paragraph(5),
            },
          })
        );
      }
    });

    let newPostings = await Promise.all(postings);
    console.log(`${newPostings.length} fake postings generated!`);
  } catch (error) {
    console.log(error);
  }
};
