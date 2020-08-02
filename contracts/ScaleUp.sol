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
        orderCounter =0;
    }
    modifier onlyowner
    {
         require(msg.sender==owner,"You are not allowed");
         _;
    }
    
  
 
     string [] material;
  
     struct buyer {
        address add;
        uint256 requirement;
        string material;
        uint256 id;         
     }
     struct option {
      uint256 id;
      string name;
      string quality;
      uint256 quantity;
      uint256 unitcost;
      uint256 currentReq;
     
    }
   buyer[] init;
    mapping(string => option []) material_options;
    
    mapping(string => mapping(uint => buyer[] ))  currentBuyers;
    
  
    mapping(uint256 => buyer[]) completedorders;
  
    uint256 orderCounter;
    
  
   function addMaterial(string memory _material) onlyowner public 
   {
    material.push(_material);
   }
   
   function addOption(string memory _material, string memory _name, string memory  _quality, uint256 _quantity, uint256 _unitcost) onlyowner public 
   {
    option [] memory prevOptions = material_options[_material];
    uint256 newid;
    if(prevOptions.length==0)
    {
        newid = 0;
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
        unitcost : _unitcost,
        currentReq : 0
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
   
   function placeOrder(string memory _material, uint256 _id, uint256 _req) public
   {
     
       option [] memory t = material_options[_material];
       option memory requiredopt = t[_id];
       require(requiredopt.currentReq + _req<= requiredopt.quantity);
       
       
       buyer memory temp = buyer({add : msg.sender, requirement : _req, material :_material, id :_id});
       currentBuyers[_material][_id].push(temp); 
       
       if(requiredopt.currentReq + _req == requiredopt.quantity)
       {
            completedorders[orderCounter] = currentBuyers[_material][_id];
            orderCounter = orderCounter +1;
            material_options[_material][_id].currentReq =0;
            currentBuyers[_material][_id] = init;
       }
       else
       {
        material_options[_material][_id].currentReq = requiredopt.currentReq + _req;
       }
       
   }
   
   function getOrderCount() public view returns(uint256)
   {
       return orderCounter;
   }
   function getAllCompletedOrder(uint256 _id) public view returns (buyer[] memory)
   {
       return completedorders[_id];
   }
   function getCurrentbuyers(string memory _material, uint256 _id) public view returns(buyer [] memory)
   {
      return currentBuyers[_material][_id];
   }
  
}