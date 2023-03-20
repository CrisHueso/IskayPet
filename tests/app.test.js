const request = require('supertest')
const app = require("../src/app")

/**
 * Testing get all pets endpoint
 */
describe("GET /pets", () => {
  it("respond with json containing a list of all pets", (done) => {
    request(app)
      .get("/pets")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

/**
 * Testing POST pets endpoint, add new pet to bbdd
 */
 describe("POST /pets", () => {
  it("respond with 200 created", (done) => {
    const data = {
      name: "Leo",
      race: "golden",
      gender: "male",
      date_birth: "2019-09-08",
      spcecie: "dog",
    };
    request(app)
      .post("/pets")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("respond with 400 on bad request", (done) => {
    const data = {
      // no data
    };
    request(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('"pet not created"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing get info pet by id
 */
 describe("GET /pets/:id", () => {
  it("respond with json containing info pet", (done) => {
    request(app)
      .get("/pets/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("respond with json pet not found when the pet does not exists", (done) => {
    request(app)
      .get("/pets/a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('"pet not found"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing get most numerous species
 */
describe("GET /most_numerous_species", () => {
  it("respond with json containing the most numerous species", (done) => {
    request(app)
      .get("/most_numerous_species")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("respond with 400 on bad request", (done) => {
    const data = {
      // no data
    };
    request(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('"Bad Request"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


/**
 * Testing get average age and desviation from a specie
 */
 describe("GET /pets/species/average_age/:specie_name", () => {
  it("respond with json containing average age and desviation", (done) => {
    request(app)
      .get("/pets/species/average_age/:cat")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("respond with 400 on bad request", (done) => {
    const data = {
      // no data
    };
    request(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('"Bad Request"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});