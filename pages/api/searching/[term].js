export default async function handler(req, res) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "Ko0mpGFlX4QtPtZ12pEQKoyh9XWJip2ixOs0nU2JZbEutSD41TylXp0DsaI2dvLL",
    },
  };
  const fetchBody = {
    dataSource: "Cluster0",
    database: "Rugby",
    collection: "rugby-info",
  };
  const baseUrl = `https://data.mongodb-api.com/app/data-eoohy/endpoint/data/v1/action`;

  try {
    switch (req.method) {
      case "GET":
        const term = req.query.term;
        const readData = await fetch(`${baseUrl}/aggregate`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            pipeline: [
              {
                $search: {
                  index: "default",
                  text: {
                    query: term,
                    path: {
                      wildcard: "*",
                    },
                    fuzzy: {},
                  },
                },
              },
              { $sort: { postedAt: -1 } },
            ],
          }),
        });
        const readDataJson = await readData.json();
        res.status(200).json(readDataJson.documents);
        break;
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};