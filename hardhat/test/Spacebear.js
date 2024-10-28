const {expect} = require("chai");
const hre = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers")

describe("Spacebear",()=>{

    async function deploySpacebearandMintToken(){
        const Spacebear = await hre.ethers.getContractFactory("Spacebear");
        const spacebearInstance = await Spacebear.deploy();
        const [owner,otherAccounts] = await ethers.getSigners();
        await spacebearInstance.safeMint(otherAccounts.address);

        return {spacebearInstance};
    }

    it("Should mint token",async()=>{
        const {spacebearInstance} = await loadFixture(deploySpacebearandMintToken);
        const [owner,otherAccounts] = await ethers.getSigners();
        expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccounts.address);
    })

    it("Should give error on wrong transfer from",async()=>{
        const {spacebearInstance} = await loadFixture(deploySpacebearandMintToken);
        const [owner,otherAccounts, notOwner] = await ethers.getSigners();
        expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccounts.address);

        await expect(spacebearInstance.connect(notOwner).transferFrom(otherAccounts.address,notOwner.address,0)).to.be.revertedWith("ERC721: transfer caller is not owner nor approved")
    })
})