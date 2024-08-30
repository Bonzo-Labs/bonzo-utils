/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import { BigNumber } from "ethers";
/**
 * Basic static information concerning a token
 * related to the lending pool.
 */
export interface TokenData {
    /**
     * Contract address of the ERC-20 compatible token.
     */
    address: string;
    /**
     * Name of the token.
     */
    name: string;
    /**
     * Symbol of the token.
     */
    symbol: string;
    /**
     * Number of decimals associated with the token.
     */
    decimals: BigNumber;
}
/**
 * Combined token and balance information concerning
 * an accounts holdings of a lending pool related token.
 */
export interface UserTokenData extends TokenData {
    /**
     * The accounts current balance of token, 
     * denominated in the smallest unit.
     */
    balance: BigNumber;
}