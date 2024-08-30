/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import dotenv from "dotenv";
import { providers } from "ethers";

let poolAddress: string;
let testAccountAddress: string;
let provider: providers.Provider;

dotenv.config();

export const mochaHooks = {
    beforeAll(): void {
        poolAddress = process.env.POOL_CONTRACT!;
        testAccountAddress = process.env.TEST_ACCOUNT!;
        const providerAddress = process.env.JSONRPC;
        if (!poolAddress) {
            throw new Error('Test Pool Address is missing from configuration (POOL_CONTRACT).');
        }
        if (!testAccountAddress) {
            throw new Error('Test Account Address is missing from configuration (TEST_ACCOUNT).');
        }
        if (!providerAddress) {
            throw new Error('Test Provider Address is missing from configuration (JSONRPC).');
        }
        provider = new providers.JsonRpcProvider(providerAddress);
    }
};
/**
 * Returns the test context etherjs Provider.
 * @returns the test context's read-only proivder.
 */
export function getProvider() {
    return provider;
}
/**
 * Returns the address of the lending pool under test.
 * @returns the address of the lending pool contract under test.
 */
export function getPoolAddress() {
    return poolAddress;
}
/**
 * Retrieves the configured address of an account, this account
 * should, to be useful, hold balances of one or more of the tokens
 * associated with the lending pool contract under test.
 * @returns the test account under test.
 */
export function getTestAccountAddress() {
    return testAccountAddress;
}