const Spacebear = artifacts.require("Spacebear");
const truffleAssert = require('truffle-assertions');

contract("Spacebear",(accounts)=>{
    it("Should credit NTF to account 1",async()=>{
        const spacebear = await Spacebear.deployed();
        const txResult = await spacebear.safeMint(accounts[1],"spacebear_1.json")
        truffleAssert.eventEmitted(txResult, 'Transfer', {from: '0x0000000000000000000000000000000000000000', to: accounts[1], tokenId: web3.utils.toBN("0")});
        assert.equal(await spacebear.ownerOf(0), accounts[1], "Owner of Token is the wrong address");
    })
})