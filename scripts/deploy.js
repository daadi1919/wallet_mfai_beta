const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy MFAI Token
  const MFAIToken = await hre.ethers.getContractFactory("MFAIToken");
  const initialSupply = hre.ethers.utils.parseEther("1000000000"); // 1 billion MFAI
  const mfaiToken = await MFAIToken.deploy(initialSupply);
  await mfaiToken.deployed();
  console.log("MFAIToken deployed to:", mfaiToken.address);

  // Deploy MFAI Staking
  const MFAIStaking = await hre.ethers.getContractFactory("MFAIStaking");
  const mfaiStaking = await MFAIStaking.deploy(mfaiToken.address);
  await mfaiStaking.deployed();
  console.log("MFAIStaking deployed to:", mfaiStaking.address);

  // Create PancakeSwap pair and get LP token address
  // Note: This step requires interaction with PancakeSwap Factory
  console.log("Create PancakeSwap pair and get LP token address...");
  // Add PancakeSwap integration code here

  // Deploy LP Staking
  const MFAILPStaking = await hre.ethers.getContractFactory("MFAILPStaking");
  const lpTokenAddress = "PANCAKESWAP_LP_TOKEN_ADDRESS"; // Replace with actual LP token address
  const mfaiLPStaking = await MFAILPStaking.deploy(lpTokenAddress, mfaiToken.address);
  await mfaiLPStaking.deployed();
  console.log("MFAILPStaking deployed to:", mfaiLPStaking.address);

  // Transfer ownership of contracts if needed
  console.log("Setting up contract permissions...");
  
  // Mint tokens for staking rewards
  const stakingRewardAmount = hre.ethers.utils.parseEther("100000000"); // 100 million MFAI
  await mfaiToken.mint(mfaiStaking.address, stakingRewardAmount);
  await mfaiToken.mint(mfaiLPStaking.address, stakingRewardAmount);
  
  console.log("Deployment completed!");
  console.log("----------------------------------------------------");
  console.log("MFAI Token:", mfaiToken.address);
  console.log("MFAI Staking:", mfaiStaking.address);
  console.log("MFAI LP Staking:", mfaiLPStaking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 