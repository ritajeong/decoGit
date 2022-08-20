import { randomUUID } from "crypto"
import Fastify, { FastifyRequest } from "fastify"
import { readFile, writeFile } from "fs/promises"
import axios from "axios"
import qs from "querystring"
import cors from "@fastify/cors"

import { SigningStargateClient, StargateClient } from "@cosmjs/stargate"

import {getSignerFromMnemonic} from "./helper"

import { IDatabase } from "./schema"
import * as config from "./config"

const write = async () => {
  return writeFile("./db.json", JSON.stringify(db))
}

const db: IDatabase = {}
const context: {
  decoGitClient: StargateClient | null
  decoGitFaucetClient: SigningStargateClient | null
  faucetAddress: string
} = {
  decoGitClient: null,
  decoGitFaucetClient: null,
  faucetAddress: ''
}

// Require the frameworStargateClientk and instantiate it
const fastify = Fastify({ logger: true })

type AccountsAccountIdRequestParams = FastifyRequest<{
  Params: {
    accountId: string
  }
}>

type GHHookRequestParams = FastifyRequest<{
  Body: {
    repository: any
    sender: {
      id: string
    }
    pusher: {
      name: string
    }
    installation: { id: string }
  }
}>

type GHAuthRequestParams = FastifyRequest<{
  Querystring: {
    code: string
    installation_id: string
    setup_action: string
    state: string
  }
}>


async function sendDecoTo(addr: string, amount: string) {

  return context.decoGitFaucetClient!.sendTokens(
    context.faucetAddress,
    addr,
    [{ denom: "udeco", amount: amount }],
    {
      amount: [{ denom: "udeco", amount: "500" }],
      gas: "200000",
    }
  )

}

fastify.get("/test", async (request, reply) => {
  const addr = "decogit1twkjaqwpq053aurk4x4m7tu4yckv8qzwnwjr2s"
  console.log(await sendDecoTo(addr, "100000"))
  return "test"
})

fastify.get("/", async (request, reply) => {
  return "DecoGit API Server"
})

// Declare a route
fastify.get(
  "/api/accounts/:accountId",
  async (request: AccountsAccountIdRequestParams, reply) => {
    if (typeof db[request.params.accountId] === "undefined") {
      return reply.callNotFound()
    } else {
      return db[request.params.accountId].account
    }
  }
)

fastify.post(
  "/api/accounts/:accountId",
  async (request: AccountsAccountIdRequestParams, reply) => {
    if (typeof db[request.params.accountId] !== "undefined") {
      return reply.status(403).send({
        success: false,
      })
    }

    const redirectTo = request.headers.host ?? null
    const token = randomUUID()

    db[request.params.accountId] = {
      token,
      redirectTo,
      account: null,
    }
    await write()

    return { success: true, redirectTo: config.githubApp.buildRedirUrl(token) }
  }
)

fastify.get(
  "/api/external/github/auth",
  async (request: GHAuthRequestParams, reply) => {
    const { code, installation_id, setup_action, state } = request.query

    let success = false
    if (setup_action === "install") {
      try {
        const { client_id, client_secret, oAuthUrl } = config.githubApp

        const response = await axios.post(oAuthUrl, {
          client_id,
          client_secret,
          code,
        })

        const { access_token } = qs.parse(response.data)

        const response2 = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `Token ${access_token}`,
          },
        })

        const { id: userId, name, avatar_url } = response2.data

        const tempInstance = Object.values(db).find((v) => v.token === state)

        if (!tempInstance) {
          fastify.log.error(
            `gh userId=${userId} does not have any temp session`
          )
        } else {
          tempInstance.account = {
            id: userId,
            name,
            avatar_url,
          }
          await write()
          success = true

          if (tempInstance.redirectTo) {
            return reply.redirect(301, `http://${tempInstance.redirectTo}`)
          }
        }
      } catch (err) {
        fastify.log.error(err)
      }
    }
    return { success }
  }
)

fastify.post(
  "/api/external/github/hook",
  async (request: GHHookRequestParams, reply) => {
    fastify.log.debug(request.body)

    const {
      sender: { id: senderId },
      pusher,
      installation,
    } = request.body

    const isPush = !!pusher
    const isInstallation = !!installation

    let success = false

    if (isPush) {
      const receipientAddress = Object.keys(db).find(
        (key) => db[key]?.account?.id === senderId
      )

      if (!receipientAddress) {
        fastify.log.error(
          `gh senderId=${senderId} does not have any wallet address`
        )
        success = false
      } else {
        // add point to blockchain
        const amount = "100000"
        fastify.log.info(await sendDecoTo(receipientAddress, amount))
        success = true
      }
    } else if (isInstallation) {
      success = true
    } else {
      success = false
    }

    console.log(`GHHookRequestParams success=${success}`)
    return { success }
  }
)

const port = 3030

// Run the server!
const start = async () => {
  try {
    Object.assign(db, JSON.parse(await readFile("./db.json", "utf-8")))
  } catch (err) {
    fastify.log.error(err)
  }
  try {
    // blockchain client init
    context.decoGitClient = await StargateClient.connect(config.decoGitChain.rpc)
    fastify.log.info(await context.decoGitClient.getChainId())
    const signer = await getSignerFromMnemonic()
    context.decoGitFaucetClient = await SigningStargateClient.connectWithSigner(
      config.decoGitChain.rpc,
      signer
    );

    // blockchain signed client (faucet) init
    const { address } = (await signer.getAccounts())[0]
    context.faucetAddress = address
    fastify.log.info(await context.decoGitClient.getAllBalances(address))

    // fastify listen
    await fastify.register(cors)
    await fastify.listen({ port, host: "0.0.0.0" })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
