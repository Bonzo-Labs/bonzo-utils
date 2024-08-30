/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import assert from "assert";
import { describe, it } from "mocha";
import { LiquidityPool } from "@bonzolabs/liquidity-pool";
import { getPoolAddress, getProvider, getTestAccountAddress } from "../context";
import { Erc20 } from "../../packages/liquidity-pool/src/erc20";

describe('LiquidityPool', function () {
    describe('#constructor()', function () {
        it('can not be instantiated directly', function () {
            const expected = new Error(`You can not construct a liquidity pool directly, use one of the 'create' methods.`);
            /* @ts-ignore */
            assert.throws(() => { new LiquidityPool() }, expected);
        });
    });
    describe('#create()', function () {
        it('instantiates a new instance', async function () {
            this.timeout(60000);
            const pool = await LiquidityPool.create(getProvider(), getPoolAddress());
            assert.ok(pool);
            assert.ok(pool instanceof LiquidityPool);
        });
    });
    describe('#getBalances()', function () {
        let pool: LiquidityPool;
        this.beforeAll(async function () {
            this.timeout(60000);
            pool = await LiquidityPool.create(getProvider(), getPoolAddress());
        });
        it('retrieves balances for test account', async function () {
            this.timeout(30000);
            let balances = await pool.getBalances(getTestAccountAddress());
            assert.ok(balances.length > 0);
            for (let i = 0; i < balances.length; i++) {
                let erc20 = new Erc20(getProvider(), balances[i].address);
                let expected = await erc20.balanceOf(getTestAccountAddress());
                assert.deepEqual(balances[i].balance, expected);
            }
        });
    });
});