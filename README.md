# My personal website - f1sh.cz

> [!Note]
> Code is licensed under the [MIT License](./MIT-LICENSE.md) and content is licensed under [CC BY NC](./CC-BY-NC.md). See [LICENSE.md](./LICENSE.md) for more info.

The tech stack is Astro paired with Svelte and it is currently hosted on [nekoweb.org](https://nekoweb.org) as a static website. Some content is being fetched from [my backend](https://github.com/wirelessfish/website-backend) which is in a separate repository and hosted on my Latitude E6400 laptop. The backend is basically an Fastify API with an SQLite DB and a [last.fm](https://www.last.fm) proxy.

There is a few things I can pull directly from the frontend, such as my [status.cafe](https://status.cafe/) status, nekoweb stats and my backend's status. Other data, namely my [last.fm](https://www.last.fm/user/sharkyblacktip) scrobbles and the [guestbook page](https://f1sh.cz/guestbook/) fetch from my backend in order to avoid exposing my API keys (last.fm) or simply because it's my own solution (guestbook).

## Running the thing

Of course clone the repo and pnpm install, the usual setup. Then simply run `pnpm run dev` to start the Astro dev server.

If you'd like to test the full functionality, you'd also have to replace `apiUrl` in `src/scripts/config.ts` with the backend's endpoint and clone+run the [backend](https://github.com/wirelessfish/website-backend) yourself
