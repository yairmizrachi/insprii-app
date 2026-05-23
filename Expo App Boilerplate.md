
database + auth: supabase
email: resend
analytics: posthog
payments + paywall: revenue cat
store: mmkv
state managment: Zustand
typesafe api: tRPC
prettier, tailwind / nativewind, typescript

assets generators
splash loading screens
welcome screen
auth flows
home, setting / profile, debug mode

* [ ] Toasts, expo app
* [ ] make compatiable with us aka metric system preferences and so on out of the box
* [ ] Requirements: make the boilerplate simple, easily configurable and customizable, especially the ui components, global toasts / alerts
* [ ] Add an agents.md file: add analytic events, use stores when possible
* [ ] add a docs file with instruction on what to change (both internally in the code / asssets that need adding, and configurations outside like supabase or email and payments, etc...) as a .md checklist type format
* [ ] 

* [ ] add agents.md like seen on [Tanstack repo](https://github.com/tanstack/tanstack.com)
* [ ] getbaseurl function in the expo app /util rwquires modefication for production, we need to have it dictated by enviroment and env as per the notes to work for both dev and prod
* [ ] remove mentions of turbo.t3.gg or anything that has to do with the boiler plate leave empty if possible or replace with a general defualt value. even in notes or comments
* [ ] add readme linking to recourses to read, also make a central read me in the root of the file
* [ ] replace @acme with @repo
* [ ] add the landing page and reffrence it in the final prompt telling it exactly what to keep like framer animations, and what to change like removing supabase
* [ ] make a note to on the setup of change to connection, using the TRNASACTION POOLING from supabase uri aka port 6543 from suspbase instead of old vercel way and in very short making a note on the diffrence between using vercel pooling like one sentence, supbase pooiling, edge functions, etc.., reffering to the ### 1. Setup dependencies > **Note** section in the read me file
* [ ] give instructions to Claude: make the project generic, remove all custom styles from components, web pages, app screens keeping the default shadcn component functionality, even reinstalling to make sure and changing tailwind or css color, spacing, etc... styles into a generic monochrome color palate and defult or common px values, give generic package names or app bundle identifier id like "your.bundle.identifier" or "your-brand-name" wahtever makes the most sense, make all app / brand specific copywriting in the screens or pages or in any text files like read me, agents, etc... generic, change out assets / images / stylized fonts for placeholders from a website like unsplash or basic font like Poppins from google font if there was an existing import already, note all changes you made and add into a md file in a todo style for future developers to know quickly what to change, clean up any unused dependencies, duplicate code, etc..., format all of it, lint it just to make sure, give final suggestions on what problem or duplicates you see in the project, and turn it into a boiler plate in the [full stack boilerplate repo](https://github.com/yairmizrachi/full-stack-mobile-application-boilerplate) I made


Starter kit used for the project is [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo)

[Turborepo Docs](https://turborepo.dev/docs) has a [section talking about project structure](https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository) and best practices for a monorepo. They also provide [working examples](https://github.com/vercel/turborepo/tree/main/examples) that cover a wide range of applications

Starter kit for expo is partially from [ignite](https://github.com/infinitered/ignite), you can also check it out in the future if you'd like to implement tests with [Jest](https://jestjs.io/) or [Maestro](https://docs.maestro.dev/)
- [Quick start documentation](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/Boilerplate.md)
- [Full documentation](https://github.com/infinitered/ignite/blob/master/docs/README.md)
- [Working Examples](https://ignitecookbook.com/docs/recipes)
  
Starter kit for NextJS is partially from [nextjs-notion-waitlist-template](https://github.com/lakshaybhushan/nextjs-notion-waitlist-template) 

tRPC [working exampels](https://trpc.io/docs/community/awesome-trpc)
