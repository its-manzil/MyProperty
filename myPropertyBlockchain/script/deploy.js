const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying LandRegistry contract...");

  const LandRegistry = await ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.deploy();  
  console.log("Contract details:", landRegistry);


  
  const address = landRegistry.address;
  if (address) {
    console.log("LandRegistry deployed to:", address);
  } else {
    console.error("Failed to deploy LandRegistry contract.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("An error occurred during deployment:", error);
    process.exit(1);
  });
