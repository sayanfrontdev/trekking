import serverless from "serverless-http";
import { initializeDataStore, server } from "../../server.mjs";

const handleRequest = serverless(server);

export const config = {
  path: ["/api/*", "/auth/*"]
};

export async function handler(event, context) {
  await initializeDataStore();
  return handleRequest(event, context);
}
