/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import { BigNumber, Contract, providers } from "ethers";
/**
 * Human Readable ABI definitions for methods supported by
 * the Erc20 helper class.
 */
const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function name() external view returns (string memory)",
    "function symbol() external view returns (string memory)",
    "function decimals() external view returns (uint8)"
];
/**
 * Internal helper class for querying account token balances
 * for tokens supporting the ERC-20 interface.  This will work
 * for both native hedera tokens and EVM bound ERC-20 tokens.
 */
export class Erc20 {
    /**
     * Underlying contract entrypoint, bound to a particular
     * token contract address upon creation of the Erc20 class.
     */
    private readonly _contract: Contract;
    /**
     * Public constructor, requires a provider and token address.
     * @param provider provides read-only access to the remote network.
     * @param token the address of the HTS token or ERC-20 token's contract.
     */
    constructor(provider: providers.Provider, token: string) {
        this._contract = new Contract(token, abi, provider);
    }
    /**
     * Retrieves the token balance for the given account (in smallest unit)
     * @param account the account address to query the balance of.
     * @returns a promise returning the account's token balance.
     */
    public balanceOf(account: string): Promise<BigNumber> {
        return this._contract.balanceOf(account);
    }
    /**
     * Retrieves the name of the ERC-20 token.
     * @returns a promise returning the token's name.
     */
    public name(): Promise<string> {
        return this._contract.name();
    }
    /**
     * Retrieves the symbol of the ERC-20 token.
     * @returns a promise returing the tokens symbol.
     */
    public symbol(): Promise<string> {
        return this._contract.symbol();
    }
    /**
     * Retrieves the decimal values associated with the token.
     * @returns a promise returning the decimals for the token.
     */
    public decimals(): Promise<BigNumber> {
        return this._contract.decimals();
    }
}