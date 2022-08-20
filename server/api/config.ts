export const githubApp = {
  client_id: "Iv1.e8c077f59421fb90",
  client_secret: process.env.CLIENT_SECRET,
  oAuthUrl: "https://github.com/login/oauth/access_token",
  buildRedirUrl: (state: string) =>
    `https://github.com/apps/decogit/installations/new/permissions?target_id=4835442&state=${state}`,
}

export const decoGitChain = {
  rpc: "http://localhost:26657",
  rest: "http://localhost:1317",
}
