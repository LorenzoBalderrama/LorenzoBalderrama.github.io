# Question 1:

Hey George,
No worries search engines can be difficult. Records is the data or object that will be saved into your index. It can contain attributes that will be a part of the larger object. Indexing is the way we process and organize this data to make it easier to search.

Custom Ranking is a bit more interesting, when we have data that can be retrieved from an index we want to ensure that this data is displayed in a way that your end user will care about. By default Algolia uses its parameters to display the retrieved data. I suggest ensuring that you customize this data by important metrics such as popularity, rating, or best sellers. Essentially focusing on things that you want to highlight within the results you searched for.

Let me know if you have any further questions.

Best Regards,
Lorenzo

# Question 2:

Hi Matt,
No worries we appreciate feedback regardless if its positive or negative. Changes can be frusterating and having to manually clear and delete indexes can be time consuming and challenging. It sounds like you are familiar with the dashboard but I highly recommend automating or at minimum expediting the process by utilzing our [API](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/delete-indices/#delete-indices-with-the-api).

I would love to understand your issues further to ensure we can get you a full solution. If you have any challenges getting this set up or require further clarification please let me know.

Best Regards,
Lorenzo

# Question 3:

Hey Leo,
No worries we attempt to make it easy to get started at Algolia. I highly recommend to take a look at one of our [quick starts](https://www.algolia.com/doc/) which can be customized to your tech stack. At a high level what you need to accomplish to get started with Algolia is:
1. Create an Index
2. Prepare your data for Algolia
3. Upload your data using an Algolia API client, no code connector, CLI, crawler or dashboard
4. Configure you [relevance](https://www.algolia.com/doc/guides/managing-results/relevance-overview/)
5. Create a search UI such as the InstantSearch or Autocomplete libraries to simplify this process.

This should allow you to get started and from there you can customize and review any further documentation to accomplish your solution.

Let me know if you have any further questions.

Best Regards,
Lorenzo