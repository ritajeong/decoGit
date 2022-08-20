export const githubApp = {
  client_id: "Iv1.e8c077f59421fb90",
  client_secret: process.env.CLIENT_SECRET,
  oAuthUrl: "https://github.com/login/oauth/access_token",
  buildRedirUrl: (state: string, redirectTo: string) =>
    `https://github.com/login/oauth/authorize?client_id=${githubApp.client_id}&redirect_uri=${redirectTo}&state=${state}`,
}

export const decoGitChain = {
  rpc: "http://localhost:26657",
  rest: "http://localhost:1317",
}
