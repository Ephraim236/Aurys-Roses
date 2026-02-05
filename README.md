
  # Website Design for Aurys Roses

  This is a code bundle for Website Design for Aurys Roses. The original project is available at https://www.figma.com/design/j3d7Eg7hA1WM1n3gCP7Q3j/Website-Design-for-Aurys-Roses.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Contact form server
- Copy `.env.example` to `.env` and fill Mailjet credentials and the target email.
- Install server deps: `npm i express cors node-mailjet dotenv`
- Start the server: `npm run start:server`
- The contact form POSTs to `http://localhost:4000/api/contact` by default.
