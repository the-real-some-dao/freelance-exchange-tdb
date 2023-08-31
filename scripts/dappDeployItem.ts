import { NftDapp } from '../wrappers/NftDapp';
import { NetworkProvider } from '@ton-community/blueprint';
import { Address } from 'ton-core';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Dapp address'));
    // const address = Address.parse('EQBnpqO9a1AsFlJd2mDgVHWudVcAmqAqJDTgNyJNULkwK16r')
    const nftDapp = provider.open(NftDapp.createFromAddress(address));

    await nftDapp.sendDeployItemMsg(provider.sender(), {
            itemIndex: 0,
            collectionId: 0,
            queryId: 0,
            itemOwnerAddress: address,
            itemAuthorityAddress: address,
    });

    ui.write("Item successfully deployed!");
}

