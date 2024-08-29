# BONZO Liquidity Pool

Lightweight Access Library to Bonzo Liquidity Pool

This library provides utilities abstracting away some of the complexities involved with retrieving account information from the [Bonzo Finance](https://bonzo.finance/) Lending pool.  For example, a user can use this library to retrieve an lender or borrower’s balances for all tokens supported by the pool.

## Installation

This library does not provide a user interface nor command line tool, the intention is to be utilized by other JavaScript projects.  It can be added to a project using `npm` package manger:

```sh
npm install @bonzolabs/liquidity-pool
```

## Usage

After installation, an instance of a pool client can be created with the `LiquidityPool.create()` method:

```js
const pool = await LiquidityPool.create(getProvider(), getPoolAddress());
```

Where `getProvider()` returns a [ethers](https://docs.ethers.org/v6/) [Provider](https://docs.ethers.org/v6/api/providers/#about-providers) object connecting the library to a [JSON-RPC](https://docs.hedera.com/hedera/core-concepts/smart-contracts/deploying-smart-contracts/json-rpc-relay) relay (such as [hashio](https://www.hashgraph.com/hashio/)) and `getPoolAddress()` returns the contract address of the Bonzo Liquidity Pool contract for the ledger the Provider is connected with.


After Creation, the pool client can query for an account’s reserve, aToken and debt token balances with the `LendingPool.getBalances()` method:

```js
let balances = await pool.getBalances(getAccountAddress());
```

Where `getAccountAddress()`returns the address of the account in question.

## Building

For build instructions, please visit our source github project: [https://github.com/bonzo-labs/bonzo-utils.git](https://github.com/bonzo-labs/bonzo-utils.git)

## Authors

[Jason Fabritz](mailto:jason@bonzo.finance)

## License

[MIT](/LICENSE)