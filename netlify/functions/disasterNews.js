export async function handler(event, context) {
  const API_KEY = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=natural%20disaster&language=en&sortBy=publishedAt&pageSize=5`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    const data = await response.json();

    // Optional: return only useful info
    const articles = data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
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
