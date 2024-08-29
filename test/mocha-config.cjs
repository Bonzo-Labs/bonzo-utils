/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

// Note: it is important to do this first
// so that ts-node is registered before any
// other types of setup are attempted.
require("ts-node").register({
    project: "test/tsconfig.json"
});

module.exports = {
    "extension": ["ts"],
    "require": ["test/context.ts"],
    "spec": [
        "test/**/*.spec.ts"
    ]
}