const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LandRegistry Contract", function () {
    let LandRegistry;
    let landRegistry;
    let owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        LandRegistry = await ethers.getContractFactory("LandRegistry");
        landRegistry = await LandRegistry.deploy();
    });

    it("Should add land successfully", async function () {
        await landRegistry.addLand(
            "1122",
            "suryodaya 8 ilam",
            "520",
            "Commercial",
            "Ashes",
            "1233421"
        );

        const records = await landRegistry.getLandRecords(owner.address);
        expect(records.length).to.equal(1);
        expect(records[0].landNumber).to.equal("1122");
        expect(records[0].landmark).to.equal("suryodaya 8 ilam");
        expect(records[0].area).to.equal("520");
        expect(records[0].landType).to.equal("Commercial");
        expect(records[0].ownerName).to.equal("Ashes");
        expect(records[0].citizenshipNo).to.equal("1233421");
    });

    it("Should allow different owners to add land", async function () {
        await landRegistry.connect(addr1).addLand(
            "1123",
            "suryodaya 9 ilam",
            "521",
            "Residential",
            "Manjil",
            "12334212"
        );

        const addr1Records = await landRegistry.getLandRecords(addr1.address);
        expect(addr1Records.length).to.equal(1);
        expect(records[0].landNumber).to.equal("1123");
        expect(records[0].landmark).to.equal("suryodaya 9 ilam");
        expect(records[0].area).to.equal("521");
        expect(records[0].landType).to.equal("Residential");
        expect(records[0].ownerName).to.equal("Manjil");
        expect(records[0].citizenshipNo).to.equal("12334212");
    });
});
