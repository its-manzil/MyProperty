const { ethers } = require("hardhat");

async function main() {
  const LandRegistry = await ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.deploy();  

  console.log("LandRegistry deployed to:", landRegistry.address); 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
