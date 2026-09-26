# My personal website - wireless.fish

> [!Note]
> Despite the source code being public, this repository is still under Copyright (unless specified otherwise). Feel free to poke around, see how I made things and test what happens when you change them. However, you are not allowed to publish or distribute my code. See LICENSE for more info.

The tech stack is Astro paired with Svelte and it is currently hosted on [nekoweb.org](https://nekoweb.org) as a static website. Some content is being fetched from [my backend](https://github.com/wirelessfish/website-backend) which is in a separate repository and hosted on my Raspberry Pi. The backend is basically an Express.js API with an SQLite DB.

There is a few things I can pull directly from the frontend, such as my [status.cafe](https://status.cafe/) status, nekoweb stats and my backend's status. Other data, namely my [last.fm](https://www.last.fm/user/sharkyblacktip) scrobbles and the [guestbook page](https://wireless.fish/guestbook/) fetch from my backend in order to avoid exposing my API keys (last.fm) or simply because it's my own solution (guestbook).

## Running the thing

Of course clone the repo and pnpm install, the usual setup. Then simply run `pnpm run dev` to start the Astro dev server.

If you'd like to test the full functionality, you'd also have to replace all instances of `api.wireless.fish` with `localhost:3000` and clone+run the backend yourself
