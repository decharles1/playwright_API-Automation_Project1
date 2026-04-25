test("Get single article by slug", async ({ api }) => {
  // Step 1: get a list of articles
  const listResponse = await api
    .path("/articles")
    .params({ limit: 1, offset: 0 })
    .getRequest(200);

  // Guard: ensure at least one article exists
  expect(listResponse.articles.length).toBeGreaterThan(0);

  const slug = listResponse.articles[0].slug;

  // Step 2: fetch that specific article
  const articleResponse = await api
    .path(`/articles/${slug}`)
    .getRequest(200);

  // Step 3: assertions
  expect(articleResponse.article.slug).toEqual(slug);
  expect(articleResponse.article.title).toBeDefined();
});
