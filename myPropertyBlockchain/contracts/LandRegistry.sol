// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct LandRecord {
        uint256 landId;
        string landNumber;
        string landmark;
        uint256 area;
        string landType;
        string ownerName;
        string citizenshipNo;
    }

    mapping(uint256 => LandRecord) public landRecords;
    uint256 public recordCount;

    event LandRecordCreated(uint256 landId, string landNumber, string ownerName, string citizenshipNo);

    // Create a new land record
    function createLandRecord(
        string memory _landNumber,
        string memory _landmark,
        uint256 _area,
        string memory _landType,
        string memory _ownerName,
        string memory _citizenshipNo
    ) public {
        recordCount++;
        landRecords[recordCount] = LandRecord(recordCount, _landNumber, _landmark, _area, _landType, _ownerName, _citizenshipNo);
        emit LandRecordCreated(recordCount, _landNumber, _ownerName, _citizenshipNo);
    }

    // Retrieve a single land record by landId
    function getLandRecord(uint256 _landId) public view returns (LandRecord memory) {
        require(_landId > 0 && _landId <= recordCount, "Invalid land ID");
        return landRecords[_landId];
    }

    // Retrieve all land records for a specific owner
    function getLandRecordsByOwner(string memory _ownerName, string memory _citizenshipNo) public view returns (LandRecord[] memory) {
        uint256 count = 0;

        // First, count how many records match the owner
        for (uint256 i = 1; i <= recordCount; i++) {
            if (
                keccak256(abi.encodePacked(landRecords[i].ownerName)) == keccak256(abi.encodePacked(_ownerName)) &&
                keccak256(abi.encodePacked(landRecords[i].citizenshipNo)) == keccak256(abi.encodePacked(_citizenshipNo))
            ) {
                count++;
            }
        }

        // Create an array with the exact count of matching records
        LandRecord[] memory records = new LandRecord[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= recordCount; i++) {
            if (
                keccak256(abi.encodePacked(landRecords[i].ownerName)) == keccak256(abi.encodePacked(_ownerName)) &&
                keccak256(abi.encodePacked(landRecords[i].citizenshipNo)) == keccak256(abi.encodePacked(_citizenshipNo))
            ) {
                records[index] = landRecords[i];
                index++;
            }
        }

        return records;
    }
}
