# What I attempted to Accomplish

I have been the biggest comic book fan since my wife first introduced them to me about 10 years ago. I love the ability to find great stories, exciting characters and deep dive into the timelines. The challenging thing about comic books is that they often share titles, characters, and are often repeated / rebooted in different years. My main goal is to improve the ability to find these comics and simulate an improved website that sells them.

The biggest comic book seller in America comes from my hometown Denver, Co and their website is aweful to navigate, and hard to identify the right comic books. [Mile High Comics](https://www.milehighcomics.com)

Using Algolia I was able to use InstantSearch, Hits, Refinement Lists, Range Sliders, Pagination, SortBy to make it easier to find comics. Within the Hits I am able to use react to create a comic book card that displays:
1. Title
2. Issue Number
3. Release Data
4. Creator
5. Description
6. Price
7. Comic Book Cover Image

Relevance:

As I mentioned earlier, comic books often reboot, repeat titles, and introduce alternate versions of storylines and characters. This can make it challenging to pinpoint the right series or issue. A Refinement List helps solve this by allowing you to filter and narrow down results based on specific details, making the search experience more precise and enjoyable.

A practical application and example for comic book enthusiasts like myself is finding a recent X-Men run. The name "X-Men #1-20+" share the same title but are written by two separate comic book writers. The refinement list makes this incredibly easy to find the right version by title and creator. If I had more time to work on this I would have loved to explore more ways to filter comics and make it easier for us enthusiasts!


I enjoyed working on the sortBy and making the replica indexes, I attempted to make the most logical ways to sort my comics, A-Z, Z-A, and prices made the most sense. In the real world collecting and buying comics vary due to variant covers, so a sort by price makes it easy to identify the typical print versus something that was created as a limited edition.

A lot of the settings I played with were to make the life of comic collectors easier, a longer project would be ultimately encorporating more and more filtering, and search attributes to ensure the best experience. I think this showcases a quick introduction how a real world problem I face, is made easier by Algolia.

Improvements:

 A struggle I can't imagine I don't share with first time users of Algolia is having trouble finding the right tech stack documentation. A small issue but I didn't realize that under the Building Search UI box I could change the tech stack for proper documentation. Easy fix once i know what I am looking at but definetly hard to find as a quick look through.

Improvement of API vs Dashboard capabilities would be great! I think I found myself trying to understand if it was possible to complete certain things within a dashboard vs API and vice versa.