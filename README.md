# Bonzo Labs API Typescript/Javascript Support Libraries

This is an experimental JavaScript project exploring potential useful libraries abstracting the low level details of interacting with a [Bonzo Finance](https://bonzo.finance/) Liquidity Pool and supporting smart contracts. Creators make no assertion of future maintenance or support. 

## NPM Packages produced by this source code repository:

* **LIQUIDITY-POOL** [@bonzolabs/liquidity-pool](./packages/liquidity-pool/README.md)

This project contains a helper client providing convenient programmatic access to the [Bonzo Finance](https://bonzo.finance/) Liquidity Pool.  Calling code can leverage this library to retrieve an lender or borrower’s balances for all tokens supported by the pool.

## Building

The authors of this project attempted to take a minimalist approach with regards to package dependencies.  The most significant package dependency is the [ethers](https://docs.ethers.org/v5/), which is required for accessing the smart contract interfaces on the ledger thru a [JSON-RPC Relay](https://docs.hedera.com/hedera/core-concepts/smart-contracts/deploying-smart-contracts/json-rpc-relay).

Retriving and building the project is simple, in an environment with [nodejs](https://nodejs.org/en) and [git](https://git-scm.com/) installed, enter the following:

* `git clone https://github.com/bonzo-labs/bonzo-utils.git`
* `cd bonzo-utils`
* `npm install`
* `npm build`

For running integration tests, copy the [`sample.env`](/sample.env) to a file named `.env` and edit appropriately to setup the test environment, then enter the following:

* `npm test`

The above will invoke the [mocha](https://mochajs.org/) based test suite and validate the inteded behavior of the codebase.

Please see the [package.json](/package.json) file for additional utility scripts.

## Authors

[Jason Fabritz](mailto:jason@bonzo.finance)

## License

[MIT](/LICENSE)