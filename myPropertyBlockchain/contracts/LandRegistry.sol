
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

    function getLandRecord(uint256 _landId) public view returns (LandRecord memory) {
        return landRecords[_landId];
    }
}
