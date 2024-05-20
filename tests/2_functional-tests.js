const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // Test creating an issue with every field
  test("Create an issue with every field", function (done) {
    chai
      .request(server)
      .post("/api/issues/test")
      .send({
        issue_title: "Test Issue",
        issue_text: "This is a test issue",
        created_by: "Test User",
        assigned_to: "Assigned User",
        status_text: "In Progress",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "issue_title");
        assert.property(res.body, "issue_text");
        assert.property(res.body, "created_by");
        assert.property(res.body, "assigned_to");
        assert.property(res.body, "status_text");
        assert.property(res.body, "_id");
        done();
      });
  });

  // Test creating an issue with only required fields
  test("Create an issue with only required fields", function (done) {
    chai
      .request(server)
      .post("/api/issues/test")
      .send({
        issue_title: "Test Issue",
        issue_text: "This is a test issue",
        created_by: "Test User",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "issue_title");
        assert.property(res.body, "issue_text");
        assert.property(res.body, "created_by");
        assert.property(res.body, "_id");
        done();
      });
  });

  // Test creating an issue with missing required fields
  test("Create an issue with missing required fields", function (done) {
    chai
      .request(server)
      .post("/api/issues/test")
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "required field(s) missing");
        done();
      });
  });

  // Test viewing issues on a project
  test("View issues on a project", function (done) {
    chai
      .request(server)
      .get("/api/issues/test")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // Add more assertions based on expected response
        done();
      });
  });

  // Test viewing issues on a project with one filter
  test("View issues on a project with one filter", function (done) {
    chai
      .request(server)
      .get("/api/issues/test?open=true")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // Add more assertions based on expected response
        done();
      });
  });

  // Test viewing issues on a project with multiple filters
  test("View issues on a project with multiple filters", function (done) {
    chai
      .request(server)
      .get("/api/issues/test?open=true&status_text=In Progress")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // Add more assertions based on expected response
        done();
      });
  });

  // Test updating one field on an issue
  test("Update one field on an issue", function (done) {
    chai
      .request(server)
      .put("/api/issues/test")
      .send({ _id: "valid_id", issue_title: "Updated Title" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // Add more assertions based on expected response
        done();
      });
  });

  // Test updating multiple fields on an issue
  test("Update multiple fields on an issue", function (done) {
    chai
      .request(server)
      .put("/api/issues/test")
      .send({
        _id: "valid_id",
        issue_text: "Updated text",
        status_text: "Done",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // Add more assertions based on expected response
        done();
      });
  });

  // Test updating an issue with missing _id
  test("Update an issue with missing _id", function (done) {
    chai
      .request(server)
      .put("/api/issues/test")
      .send({ issue_title: "Updated Title" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "missing _id");
        done();
      });
  });

  // Test updating an issue with no fields to update
  test("Update an issue with no fields to update", function (done) {
    chai
      .request(server)
      .put("/api/issues/test")
      .send({ _id: "valid_id" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "no update field(s) sent");
        done();
      });
  });

  // Test updating an issue with an invalid _id
  test("Update an issue with an invalid _id", function (done) {
    chai
      .request(server)
      .put("/api/issues/test")
      .send({ _id: "invalid_id", issue_title: "Updated Title" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "could not update");
        done();
      });
  });

  // Test deleting an issue
  test("Delete an issue", function (done) {
    chai
      .request(server)
      .delete("/api/issues/test")
      .send({ _id: "valid_id" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // Add more assertions based on expected response
        done();
      });
  });

  // Test deleting an issue with an invalid _id
  test("Delete an issue with an invalid _id", function (done) {
    chai
      .request(server)
      .delete("/api/issues/test")
      .send({ _id: "invalid_id" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "could not delete");
        done();
      });
  });

  // Test deleting an issue with missing _id
  test("Delete an issue with missing _id", function (done) {
    chai
      .request(server)
      .delete("/api/issues/test")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "missing _id");
        done();
      });
  });
});
