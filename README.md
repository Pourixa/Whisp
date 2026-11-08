# Whisp

A full-stack messaging application for one-to-one and group conversations. Whisp lets users find people, exchange text and image messages in real time, manage friend requests, and personalize their profiles.

[Live demo](https://whisp-gray.vercel.app/login) · [Repository](https://github.com/Pourixa/Whisp)

## Main features

- **Real-time conversations:** send text and image messages through Socket.IO, revisit persisted chat history, and see conversations move to the top of the list when a new message arrives. The interface scrolls to the latest message.
- **People and groups:** search for usernames, start direct conversations, create named groups, and send, accept, reject, or remove friend relationships.
- **Accounts and profiles:** sign up with a username and password, edit a display name and bio, upload or remove an avatar, and view other users' profiles. Direct chats display online status or a last-seen timestamp.

The interface supports light and dark themes, a split chat layout on larger screens, and switching between the conversation list and an open chat on smaller screens.

## Project background and contribution

I built Whisp as a project for **The Odin Project**. The course provided the assignment; I planned the application and wrote the code myself, researching and learning the technologies as I developed it.

My work includes the React and TypeScript interface, Express API, relational database model, authentication, chat and friendship flows, profile editing, and image uploads. I integrated Socket.IO with persistent message storage and React state updates so that incoming messages appear in the appropriate conversation.

The UI also builds on Vite scaffolding, shadcn-style components, Base UI primitives, and icon libraries.

## Technical challenge: keeping conversations synchronized

A chat application has two related jobs: keep a durable history and deliver new messages to the right people immediately. Think of the database as the conversation's notebook and a Socket.IO room as its live delivery channel.

Whisp combines both:

1. The client loads the user's existing chats and message history through an authenticated HTTP request.
2. The server verifies the socket's JWT and joins it to rooms named `chat:<id>` for that user's chats.
3. When a `chat:message` event arrives, the server validates the payload and checks database membership in the requested chat.
4. It saves the message to PostgreSQL, then broadcasts the saved record to that chat's room.
5. Each receiving client updates the matching conversation in React state and sorts its conversation list by the most recent message.

Image messages use a separate HTTP upload first. The upload returns an image URL, which is included in the socket message and stored with the message record.

This is an implemented solution, with remaining work around delivery acknowledgements, reconnection recovery, and newly created group membership described below.

See [chat events](api/src/events/chatEvents.ts), [socket initialization](api/src/index.ts), and [client state updates](client/src/ChatsNPage.tsx).

## Technology choices

| Technology | Role and fit |
| --- | --- |
| React and React Router | Interactive chat screens, profile pages, and a multi-step group creation flow. |
| TypeScript | Types across the client and server, including generated Prisma types; some application state and event payloads still use `any`. |
| Socket.IO | Persistent connections, room-based message delivery, friendship events, and presence updates. |
| Node.js and Express | HTTP endpoints for authentication, initial data loading, profiles, groups, and uploads alongside the socket server. |
| PostgreSQL and Prisma | Persistent users, chats, memberships, messages, and friend requests, with migrations and relational queries. |
| JWT and bcrypt | Authentication for HTTP requests and socket handshakes, with hashed passwords in the database. |
| Multer and Supabase Storage | Multipart upload handling and hosted avatar/message images. |
| Vite, Tailwind CSS, Base UI, and shadcn | Frontend tooling, responsive styling, and reusable UI components. |

## Project structure

- `client/src/ChatsNPage.tsx` — initial data loading, socket listeners, and conversation state.
- `client/src/chats.tsx` and `chatPage.tsx` — conversation list and active chat.
- `client/src/components/` — chat, group, and UI components.
- `client/src/lib/` — HTTP helpers, socket client, and shared types.
- `api/src/index.ts` — Express/Socket.IO setup, group creation, and presence.
- `api/src/events/` — messaging and friendship event handlers.
- `api/src/routes/user.ts` — authentication, search, profile, and image endpoints.
- `api/prisma/` — database schema, migrations, and seed script.

## Run locally

You need Node.js compatible with the locked dependencies, npm, PostgreSQL, and a Supabase project for image storage.

### 1. Install dependencies

```bash
git clone https://github.com/Pourixa/Whisp.git
cd Whisp/api
npm ci
cd ../client
npm ci
```

### 2. Configure the server

Create `api/.env`:

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/whisp
JWT_SECRET=replace-with-a-long-random-secret
CLIENT=http://localhost:5173
PROJECT_URL=https://YOUR_PROJECT.supabase.co
ACCESS_TOKEN=YOUR_SERVER_SIDE_SUPABASE_KEY
```

`ACCESS_TOKEN` is the environment variable passed to the Supabase client as its API key. Keep it on the server.

Create storage buckets named **avatars** and **messages**. The current implementation uses public URLs, so these buckets require public reads and appropriate server-side upload permissions; avatar updates also use upsert. Public image URLs are a privacy limitation for a messaging application.

### 3. Configure the frontend

Set the following in `client/.env.local` to override the repository's existing frontend environment configuration:

```dotenv
VITE_API_URL=http://localhost:8585
```

### 4. Prepare the database and start the API

From `api/`:

```bash
npx prisma generate
npx prisma migrate deploy
npm run dev
```

The API and Socket.IO server share port **8585**.

### 5. Start the frontend

From `client/`, in a separate terminal:

```bash
npm run dev
```

Open the URL printed by Vite. Its origin must match the API's `CLIENT` setting.

### Available checks and builds

| Directory | Command | Purpose |
| --- | --- | --- |
| `client/` | `npm run lint` | Run Oxlint. |
| `client/` | `npm run build` | Run TypeScript checks and build with Vite. |
| `api/` | `npm run build` | Compile the TypeScript server. |
| `api/` | `npm start` | Start the compiled server after a successful build. |

These are the repository's configured commands, not a claim that the builds currently pass.

## Current limitations and improvements

- **Group synchronization:** group creation writes to the database but does not notify already connected members or join their sockets to the new room. Those members need to reload/reconnect to receive the updated group state.
- **Delivery reliability:** sending clears the input after emitting the event, without waiting for server acknowledgement. Failed sends and messages missed during a disconnection need recovery and retry handling.
- **Presence accuracy:** disconnecting one socket marks the user offline even if another tab remains connected. The client also does not update the last-seen timestamp when an offline event arrives.
- **History loading:** the initial user request loads all messages for all chats. Pagination and loading history on demand would reduce the initial payload.
- **Authentication and data privacy:** JWTs have no configured expiry and are stored in local storage. One recipient-facing new-chat query does not exclude member password hashes. Response filtering needs to be consistent, and chat images need private access controls if they are intended to remain confidential.
- **Validation and error handling:** message uploads have a 10 MiB limit and a MIME-type check, but avatar uploads lack equivalent limits. Upload parsing runs before authentication. Several socket handlers also need stronger validation and consistent error handling.
- **Automated coverage:** no automated test suite or CI workflow is included in the reviewed repository. Priority cases include chat membership, friendship transitions, reconnects, and multiple active sessions.

## Preview

![Whisp sign-in page](docs/screenshots/whisp-login.jpg)

---
