/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import { AddressLike, Contract, Provider } from "ethers";
import { asStringOrAddressable } from "./util";
import { TokenData, UserTokenData } from "./token-info";
import { Erc20 } from "./erc20";
/**
 * Human Readable ABI definitions for contract methods 
 * leveraged by the LiquidityPool class.
 */
const abi = [
    "function getReservesList() external view returns (address[] memory)",
    "function getReserveData(address asset) external view returns (uint256 configuration, uint128 liquidityIndex, uint128 variableBorrowIndex, uint128 currentLiquidityRate, uint128 currentVariableBorrowRate, uint128 currentStableBorrowRate, uint40 lastUpdateTimestamp, address aTokenAddress, address stableDebtTokenAddress, address variableDebtTokenAddress, address interestRateStrategyAddress, uint8 id)"
];
/**
 * Root library class for interacting with a Bonzo Liquidity Pool
 */
export class LiquidityPool {
    /**
     * Guard to prevent the accidental construction of this
     * pool class by the new operator, which would likely 
     * result in an instance that is inproperly configured.
     * Intantiation of the LiquidityPool class should be only
     * be achieved by calling the create static method.
     */
    private static _canConstruct = false;
    /**
     * Underlying contract entrypoint, bound to a particular
     * liquidity pool contract address upon creation.
     */
    private readonly _contract: Contract;
    /**
     * Cached list of tokens supported by this liquidity
     * pool instance, loaded upon creation since changing
     * of the list is extreemly rare in practice.
     */
    private readonly _tokens: TokenData[];
    /**
     * Private constructor, should only be invoked within
     * the context of the user calling the create method.
     * @param contract instance of the contract entry point.
     * @param tokens cached list of tokens supported by the pool.
     */
    private constructor(contract: Contract, tokens: TokenData[]) {
        if (!LiquidityPool._canConstruct) {
            throw new Error(`You can not construct a liquidity pool directly, use one of the 'create' methods.`);
        }
        LiquidityPool._canConstruct = false;
        this._contract = contract;
        this._tokens = tokens;
    }
    /**
     * Asyncrhonusly creates and configures a LendingPool class.
     * @param provider provides read-only access to the remote network.
     * @param address the address of the lending pool contract.
     * @returns a promise returning a configured instance of the LendingPool class.
     */
    static async create(provider: Provider, address: AddressLike): Promise<LiquidityPool> {
        const contract = new Contract(asStringOrAddressable(address), abi, provider);
        const tokenAddresses = await contract.getReservesList() as string[];
        const tokens = (await Promise.all(tokenAddresses.map<Promise<TokenData[]>>(async (token: string) => {
            const data = await contract.getReserveData(token);
            return await Promise.all([
                getTokenData(token),
                getTokenData(data.aTokenAddress),
                getTokenData(data.stableDebtTokenAddress),
                getTokenData(data.variableDebtTokenAddress),
            ]);
        }))).flat();
        LiquidityPool._canConstruct = true;
        return new LiquidityPool(contract, tokens);

        async function getTokenData(address: string): Promise<TokenData> {
            const erc20 = new Erc20(provider, address);
            const [name, symbol, decimals] = await Promise.all([erc20.name(), erc20.symbol(), erc20.decimals()]);
            return { address, name, symbol, decimals };
        }
    }
    /**
     * Retrieves a list of lending pool related token data, 
     * including balances for the given account.
     * @param account the account address to query the balances of.
     * @returns a promise returning an array of user token data for
     * the known tokens managed by this pool, including account 
     * balances for each token.
     */
    public getBalances(account: AddressLike): Promise<UserTokenData[]> {
        const contract = this._contract;
        const reserves = this._tokens.map(async token => {
            const erc20 = new Erc20(contract.runner!.provider!, token.address);
            const balance = await erc20.balanceOf(account);
            return { ...token, balance };
        });
        return Promise.all(reserves);
    }
}