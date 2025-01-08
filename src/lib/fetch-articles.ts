import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

/*
 * Create a Wix client with the OAuth strategy
 * and the items module.
 * see: https://dev.wix.com/docs/sdk/articles/work-with-the-sdk/about-the-wix-client
 */

const myWixClient = createClient({
  auth: OAuthStrategy({
    clientId: import.meta.env.PUBLIC_WIX_CLIENT_ID,
  }),
  modules: {
    items,
  },
});

export const fetchArticles = async ({
  limit,
  featured,
  isNew,
}: {
  limit?: number;
  featured?: boolean;
  isNew?: boolean;
}) => {
  let query = myWixClient.items.queryDataItems({
    dataCollectionId: "Articles",
  });

  if (limit) {
    query = query.limit(limit);
  }

  if (featured) {
    query = query.eq("featured", true);
  }

  if (isNew) {
    query = query.descending("publishedDate");
  }

  const articles = await query.find();
  return articles.items;
};
