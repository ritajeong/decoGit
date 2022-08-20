export interface GHAccount {
  id: string
  name: string
  avatar_url: string
}

export interface IDatabase {
  [walletId: string]: {
    token: string
    account: GHAccount | null
    redirectTo: string | null
  }
}
