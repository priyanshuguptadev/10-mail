# 10-Mail

A 10 minute burner email service built with Next.js.

## Getting Started

1. Clone the repository:

   ```bash
   git clone github.com/priyanshugupta/10-mail
   ```

2. Install dependencies:

   ```bash
   bun install
   ```  

3. Create a `.dev.vars` and `.env.local` files in the root directory:

   ```bash
   cp .env.example .dev.vars
   cp .env.example .env.local
   ```
4. Update the `.dev.vars` and `.env.local` files with your own values for `DATABASE_URL` and `WEBHOOK_SIGNING_SECRET`.

5. Start the vinext development server:

   ```bash
   bun dev:vinext
   ```



## Deploying to Cloudflare 

1. Login to your Cloudflare account using CLI:

   ```bash
   bun x cf login
   ```
2. Check if you are logged in:

   ```bash
   bun x cf whoami
   ```
3. Deploy the application to Cloudflare:

   ```bash
   bun run deploy:vinext
   ```



## Run production preview locally

1. Build the application:

   ```bash
   bun run build:vinext
   ```
2. Start the production preview server:

   ```bash
   bun run start:vinext
   ```