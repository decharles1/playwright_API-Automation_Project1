import { createToken } from "../helpers/createToken.ts";
import { test } from "../utils/fixtures";
import { expect } from "@playwright/test";


let authToken: string;

test.beforeAll("Get Token", async ({ api, config }) => {
//   const tokenResponse = await api
//     .path("/users/login")
//     .body({
//       "user": { "email": "mahallerutuja@gmail.com", "password": "password12345" },
//     })
//     .postRequest(200);
  authToken = await createToken(config.userEmail, config.userPassword);
});

test("Get Articles", async ({ api }) => {
  const response = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(response.articles.length).toBeLessThanOrEqual(10);
  expect(response.articlesCount).toEqual(10);
});

test("Get Test Tags", async ({ api }) => {
  const response = await api.path("/tags").getRequest(200);

  expect(response.tags[0]).toEqual("Test");
  expect(response.tags.length).toBeLessThanOrEqual(10);
});

test("Create, Update and Delete the article", async ({ api }) => {
  const createArticleResponse = await api
    .path("/articles")
    .headers({ Authorization: authToken })
    .body({
            "article": {
                "title": "New Aritcle 3", 
                "description": "Whats this article about?", 
                "body": "Description", 
                "tagList": []
            }
        })
    .postRequest(201);
  const slugId = createArticleResponse.article.slug

  const articleReadResponse = await api
    .path("/articles")
    .headers({ Authorization: authToken })
    .getRequest(200);

  expect(articleReadResponse.articles[0].title).toEqual("New Aritcle 3");

  const updateArticleResponse = await api
    .path(`/articles/${slugId}`)
    .headers({ Authorization: authToken })
    .body({
            "article": {
                "title": "New Aritcle 3 Modified", 
                "description": "Whats this article about?", 
                "body": "Description", 
                "tagList": []
            }
        })
    .putRequest(200);
  const slugNewId = updateArticleResponse.article.slug

  const updatedarticleReadResponse = await api
    .path("/articles?limit=10&offset=0")
    .headers({ Authorization: authToken })
    .getRequest(200);

  expect(updatedarticleReadResponse.articles[0].title).toEqual("New Aritcle 3 Modified");

  const deleteArticle = await api
  .path(`/articles/${slugNewId}`)
  .headers({ Authorization: authToken })
  .deleteRequest(204)

   const updatedarticleReadResponse2 = await api
    .path("/articles?limit=10&offset=0")
    .headers({ Authorization: authToken })
    .getRequest(200);

  expect(updatedarticleReadResponse2.articles[0].title).not.toEqual("New Aritcle 3 Modified")
});
