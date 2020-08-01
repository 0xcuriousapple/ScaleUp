pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


/**
* @title cloud
* @author Abhishek Vispute
*/
contract scaleup {
 
    address owner;
    constructor()public{
        owner = msg.sender;
    }
    modifier onlyowner
    {
         require(msg.sender==owner,"You are not allowed");
         _;
    }
    
  
 
    string [] material;
  
    struct option {
      uint256 id;
      string name;
      string quality;
      uint256 quantity;
      uint256 unitcost;
    }
  
    mapping(string => option []) material_options;
  

   function addMaterial(string memory _material) onlyowner public 
   {
    material.push(_material);
   }
   
   function addOption(string memory _material, string memory _name, string memory  _quality, uint256 _quantity, uint256 _unitcost ) onlyowner public 
   {
    option [] memory prevOptions = material_options[_material];
    uint256 newid;
    if(prevOptions.length==0)
    {
        newid = 1;
    }
    else
    {
        newid = prevOptions[prevOptions.length-1].id +1;
    }
  
  
    
    material_options[_material].push(option({
        id : newid,
        name: _name,
        quality : _quality,
        quantity : _quantity,
        unitcost : _unitcost
    }));
   }
   
   function getAllMaterials() public view returns (string [] memory)
   {
       return material;
   }
   
   function getOptionsOfMaterial(string memory _material) public view returns (option[] memory)
   {
       return material_options[_material];
   }
   
  
}