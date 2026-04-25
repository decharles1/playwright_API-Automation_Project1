import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";

test("Get single article by slug", async ({ api }) => {
  const listResponse = await api
    .path("/articles")
    .params({ limit: 1, offset: 0 })
    .getRequest(200);

  expect(listResponse.articles.length).toBeGreaterThan(0);

  const slug = listResponse.articles[0].slug;

  const articleResponse = await api
    .path(`/articles/${slug}`)
    .getRequest(200);

  expect(articleResponse.article.slug).toEqual(slug);
  expect(articleResponse.article.title).toBeDefined();
});
