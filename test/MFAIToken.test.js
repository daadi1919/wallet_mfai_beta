const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MFAIToken", function () {
  let MFAIToken;
  let mfaiToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MFAIToken = await ethers.getContractFactory("MFAIToken");
    mfaiToken = await MFAIToken.deploy(ethers.utils.parseEther("1000000000"));
    await mfaiToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await mfaiToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await mfaiToken.balanceOf(owner.address);
      expect(await mfaiToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await mfaiToken.transfer(addr1.address, 50);
      const addr1Balance = await mfaiToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await mfaiToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await mfaiToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await mfaiToken.balanceOf(owner.address);
      await expect(
        mfaiToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      expect(await mfaiToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.utils.parseEther("1000");
      await mfaiToken.mint(addr1.address, mintAmount);
      expect(await mfaiToken.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should fail if non-owner tries to mint tokens", async function () {
      const mintAmount = ethers.utils.parseEther("1000");
      await expect(
        mfaiToken.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
}); 