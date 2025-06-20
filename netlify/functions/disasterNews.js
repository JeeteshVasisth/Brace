export async function handler(event, context) {

  let keyword = "natural disaster";
  try {
    const body = JSON.parse(event.body);
    if (body.keyword) {
      keyword = encodeURIComponent(body.keyword);
    }
  } catch {
    // default to natural disaster
  }

  const url = `https://newsapi.org/v2/everything?q=${keyword}&language=en&sortBy=publishedAt&pageSize=5`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.NEWS_API_KEY,
      },
    });

    const data = await response.json();

    const articles = data.articles.map(article => ({
      title: article.title,
      url: article.url,
      source: article.source.name,
      description: article.description,
      publishedAt: new Date(article.publishedAt).toLocaleString(),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ articles }),
    };
  } catch (err) {
    console.error("News API error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
}
