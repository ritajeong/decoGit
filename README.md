<p align="center">
  <img height="60" src="https://user-images.githubusercontent.com/4417431/185773833-ba17b773-044f-4d1f-9fff-47a7f4f610da.png">
</p>

<p align="center">
<b>Bringing what we all love to blockchain</b>
</p>

<p align="center">
Junction Asia 2022 &middot; Team decoGit &middot; Chainapsis Track
</p>

## Overview

<img width="564" alt="스크린샷 2022-08-21 오후 12 18 51" src="https://user-images.githubusercontent.com/4417431/185773894-3dd13279-592a-4d7b-91b5-1de61f15c1ff.png">

decoGit is a blockchain-backed web app using the Cosmos ecosystem. It integrates your GitHub repository to your own digital laptop. Our project is powered by React, Next.js, and Fastify.

Whenever you commit, merge, or submit a pull request you will receive a special token named DECO. With DECO, you can purchase a variety of stickers.

These stickers are put on to your virtual laptop, then can be shared as an image through social media. The image can also be minted as an NFT and you can trade it with various developers around the world.

## Stacks

### Web Frontend

* React + Next.js + Typescript
  * Tailwind CSS, Emotion, Axios

### Web Backend

* Node.js + Typescript + Fastify

### Blockchain

* Cosmos Ecosystem + Keplr Wallet
  * CosmJS, Stargate
  * Ignite CLI

## How Does It Work?

![Group 18](https://user-images.githubusercontent.com/4417431/185773930-8cc2bf0e-831f-4033-817b-bdfd99a9585d.png)

* User connects their Keplr wallet to the browser (logging in)
* User authorizes their GitHub, linking the Keplr wallet with their GitHub profile
  * Backend server matches the wallet and the profile, using Github API
* Commits, PRs, and merges are made in the repository by the contributor
  * Webhooks are registered to the backend
  * Backend issues DECO to the contributor; also some stickers based on commit files
* User can purchase stickers with DECO; possibly sticking them to their digital laptop
  * We use our own blockchain - decoGit
  * Decorated laptops can be shared on the internet; is also possible to mint them to an NFT in the future
  
<img width="361" alt="스크린샷 2022-08-21 오후 12 28 02" src="https://user-images.githubusercontent.com/4417431/185774071-3022e277-2418-426a-a3af-d0043f62c58e.png">

## Demo

https://user-images.githubusercontent.com/4417431/185774110-ee73360b-de79-48d3-bd80-418314d7e2a0.mp4

## The Team

* Huiwon Choi <havana723@korea.ac.kr> / PM; Product Designer; Frontend Engineer
* Jinju Jeong <ritajeong.dev@gmail.com> / PM; Frontend Engineer
* Suho Lee <bird@susuyo.ai> / PM; Backend Engineer
* Suhyun Park <me@shiftpsh.com> / PM; Product Designer; Frontend Engineer

