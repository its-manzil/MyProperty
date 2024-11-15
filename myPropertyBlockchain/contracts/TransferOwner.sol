// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferOwner {
    // Structure to store land information
    struct Land {
        uint256 landNo;
        string location;
        uint256 area;
        string landType;
        address currentOwner;
        string ownerCitizenshipNo;
        string taxClearanceInvoice;
    }

    // Mapping from land number to Land struct
    mapping(uint256 => Land) public landRecords;

    // Event to emit when a property transfer happens
    event PropertyTransferred(
        uint256 indexed landNo,
        address indexed oldOwner,
        address indexed newOwner,
        string newOwnerCitizenshipNo,
        string newOwnerAddress
    );

    // Modifier to ensure only the owner can perform certain actions
    modifier onlyOwner(uint256 landNo) {
        require(msg.sender == landRecords[landNo].currentOwner, "You are not the owner");
        _;
    }

    // Function to add a new land record
    function addLandRecord(
        uint256 landNo,
        string memory location,
        uint256 area,
        string memory landType,
        // string memory ownerName,
        string memory ownerCitizenshipNo,
        string memory taxClearanceInvoice
    ) public {
        require(landRecords[landNo].currentOwner == address(0), "Land record already exists");
        
        // Create a new land record
        landRecords[landNo] = Land({
            landNo: landNo,
            location: location,
            area: area,
            landType: landType,
            currentOwner: msg.sender,
            ownerCitizenshipNo: ownerCitizenshipNo,
            taxClearanceInvoice: taxClearanceInvoice
        });
    }

    // Function to transfer the land to a new owner
    function transferProperty(
        uint256 landNo,
        string memory newOwnerName,
        string memory newOwnerCitizenshipNo,
        string memory newOwnerAddress,
        string memory taxClearanceInvoice
    ) public onlyOwner(landNo) {
        // Retrieve the current land record
        Land storage land = landRecords[landNo];

        // Ensure the new owner is not the same as the current owner
        require(msg.sender != land.currentOwner, "The new owner must be different from the current owner");

        // Transfer the land ownership
        address oldOwner = land.currentOwner;
        land.currentOwner = msg.sender;

        // Update other details (new owner details)
        land.ownerCitizenshipNo = newOwnerCitizenshipNo;
        land.taxClearanceInvoice = taxClearanceInvoice;

        // Emit the PropertyTransferred event
        emit PropertyTransferred(
            landNo,
            oldOwner,
            msg.sender,
            newOwnerCitizenshipNo,
            newOwnerAddress
        );
    }

    // Function to fetch land details by land number
    function getLandDetails(uint256 landNo) public view returns (Land memory) {
        return landRecords[landNo];
    }

    // Function to check if the caller is the owner of the land
    function isOwner(uint256 landNo) public view returns (bool) {
        return msg.sender == landRecords[landNo].currentOwner;
    }
}
