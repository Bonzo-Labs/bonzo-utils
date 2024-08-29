/*
 * Copyright (c) 2024 Bonzo Labs
 * Released under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import { Addressable, AddressLike, isAddressable } from "ethers";
/**
 * Helper function to converts an AddressLike value into a value 
 * conforming to string or Addressable
 * @param addressLike object conforming to the address like shape.
 * @returns the original addressLike object projected into an 
 * string or Addressable if necessary.
 */
export function asStringOrAddressable(addressLike: AddressLike): string | Addressable {
    if (typeof addressLike === 'string') {
        return addressLike;
    } else if (addressLike instanceof Promise) {
        return { getAddress: () => addressLike };
    } else if (isAddressable(addressLike)) {
        return addressLike;
    }
    throw new Error('Not an addressable type.');
}