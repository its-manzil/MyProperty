// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        uint256 landId;
        uint256 landNo;
        string landLocation;
        uint256 landArea;
        string landType;
        string ownerName;
        string citizenshipNo;
        address currentOwner;
        bool isVerified;
        bool isTransferred;
    }

    struct TransferRequest {
        uint256 landId;
        address newOwner;
        bool isPending;
        bool isApproved;
    }

    address public officer;
    uint256 public nextLandId = 1;
    mapping(uint256 => Land) public lands;
    mapping(uint256 => TransferRequest) public transferRequests;

    event LandRegistered(uint256 landId, address owner, string landLocation);
    event TransferRequested(uint256 landId, address requestedBy, address newOwner);
    event TransferApproved(uint256 landId, address newOwner);
    event LandVerified(uint256 landId, address verifiedBy);

    modifier onlyOfficer() {
        require(msg.sender == officer, "Only officer can perform this action");
        _;
    }

    modifier onlyOwner(uint256 landId) {
        require(lands[landId].currentOwner == msg.sender, "Only current owner can initiate transfer");
        _;
    }

    constructor() {
        officer = msg.sender;
    }

    function registerLand(
        uint256 _landNo,
        string memory _landLocation,
        uint256 _landArea,
        string memory _landType,
        string memory _ownerName,
        string memory _citizenshipNo
    ) public {
        lands[nextLandId] = Land({
            landId: nextLandId,
            landNo: _landNo,
            landLocation: _landLocation,
            landArea: _landArea,
            landType: _landType,
            ownerName: _ownerName,
            citizenshipNo: _citizenshipNo,
            currentOwner: msg.sender,
            isVerified: false,
            isTransferred: false
        });

        emit LandRegistered(nextLandId, msg.sender, _landLocation);
        nextLandId++;
    }

    function requestTransfer(uint256 landId, address newOwner) public onlyOwner(landId) {
        require(lands[landId].isVerified, "Land must be verified before transfer");
        require(!transferRequests[landId].isPending, "Transfer request already pending");

        transferRequests[landId] = TransferRequest({
            landId: landId,
            newOwner: newOwner,
            isPending: true,
            isApproved: false
        });

        emit TransferRequested(landId, msg.sender, newOwner);
    }

    function approveTransfer(uint256 landId) public onlyOfficer {
        TransferRequest storage request = transferRequests[landId];
        require(request.isPending, "No pending transfer request");
        require(!request.isApproved, "Transfer already approved");

        lands[landId].currentOwner = request.newOwner;
        lands[landId].isTransferred = true;
        request.isPending = false;
        request.isApproved = true;

        emit TransferApproved(landId, request.newOwner);
    }

    function verifyAndSaveLand(
        address buyer,
        uint256 landId,
        string memory location
    ) public onlyOfficer {
        Land storage land = lands[landId];
        require(!land.isVerified, "Land already verified");
        require(land.currentOwner == buyer, "Only the owner can verify");

        land.isVerified = true;

        emit LandVerified(landId, msg.sender);
    }

    function verifyLand(uint256 landId) public onlyOfficer {
        Land storage land = lands[landId];
        require(!land.isVerified, "Land is already verified");

        land.isVerified = true;
    }

    function getLandDetails(uint256 landId) public view returns (Land memory) {
        return lands[landId];
    }

    function getTransferRequestDetails(uint256 landId) public view returns (TransferRequest memory) {
        return transferRequests[landId];
    }
}
