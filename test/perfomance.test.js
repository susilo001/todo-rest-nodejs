const { describe, it, expect } = require("@jest/globals");

describe("Concurrent API Request", () => {
  it("should handle concurrent request", async () => {
    const concurrentRequest = 1000;

    const requests = [];

    for (let i = 0; i < concurrentRequest; i++) {
      requests.push(await fetch("http://localhost:3030/activity-groups"));
    }

    const responses = await Promise.all(requests);

    expect(responses.length).toBe(concurrentRequest);

    responses.forEach((response) => {
      expect(response.status).toBe(200);
    });
  });

  it("should handle concurrent POST request ", async () => {
    const concurrentRequest = 1000;

    const requests = [];

    for (let i = 0; i < concurrentRequest; i++) {
      requests.push(
        await fetch("http://localhost:3030/activity-groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Activity Group" + i,
            email: "activitygroup" + i + "@gmail.com",
          }),
        })
      );
    }

    const responses = await Promise.all(requests);

    expect(responses.length).toBe(concurrentRequest);

    responses.forEach((response) => {
      expect(response.status).toBe(201);
    });
  });
});
