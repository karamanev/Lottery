pragma solidity ^0.4.24;

contract Lottery {
    
    mapping (uint8 => address[]) playersByNumber ;
    
    address owner;

    enum State { Accepting, Finished }
    
    State state; 
    
    uint8 winningNumber; 

    constructor() public {
        owner = msg.sender;
        state = State.Accepting;
    }

    function enter (uint8 number) public payable {
        require(number<=10, "Number must be between 1 and 10");
        require(number>0, "Number must be between 1 and 10");
    //  require (msg.value > .001 ether, "You must enter at least 0.01 eth");
        require(state == State.Accepting, "State problem");
        playersByNumber[number].push(msg.sender);
    }
    
    function determineWinner() public returns (uint8 number) {
        require(msg.sender == owner, "Only owner can determine the winner.");
        require(state == State.Accepting, "State problem");
        state = State.Finished;
        winningNumber = random();
        distributeFunds(winningNumber);
    //  selfdestruct(owner);
        number = winningNumber;
        return number;
    }
    
    function distributeFunds(uint8 number) private returns(uint256) {
        uint256 winnersCount = playersByNumber[number].length;
        if (winnersCount > 0) {
            uint256 balanceToDistribute = address(this).balance/(2*winnersCount);

            for (uint i = 0; i < winnersCount; i++) {
                playersByNumber[number][i].transfer(balanceToDistribute);
            }
        }
        
        return address(this).balance;
    }
    
    function getAddressesByNumber(uint8 number) public view returns (address[] addresses) {
        return playersByNumber[number];
    }
    
    function checkStatusAndWinner() public view returns (State status, uint8 number) {
        status = state;
        number = winningNumber;
        return (status, number);
    }

    function getCountOfEntranses() public view returns (uint8 count) {
        count = 0;
        for (uint8 i = 1; i <= 10; i++) {
                uint8 countByNumber = uint8(playersByNumber[i].length);
                count +=countByNumber;
        }
        return count;
    }
 
    function random() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%10 + 1);
    }
}