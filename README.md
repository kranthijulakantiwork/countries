## Setup Instructions

Clone the repo using git clone https://github.com/kranthijulakantiwork/countries.git or download zip

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Credentials for mock login

username: testuser
password: password123

## Design choices, assumptions, and explanation of SSG/SSR choices.

- For styling used tailwindcss as it is enables faster development, maintainability and simplifies creation of responsive design and easier to scale.
- Used Shadcn components, as they are plain and easily customizable.
- Used SSR across home page and country details page as they have data fetching and loading will be faster with SSR.
- Used client side rendering across login and favorites, as there is not much dynamic data from server.

# Explanation of your chosen state management solution.

- For State management, used redux toolkit as it is simple to implement and has inbuilt RTK query which has inbuilt caching feature.

## Link to deployed application.

https://tangerine-raindrop-2a2bf4.netlify.app/
