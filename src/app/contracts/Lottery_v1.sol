pragma solidity ^0.4.24;

contract Lottery {
    
    mapping (uint8 => address[]) playersByNumber ;
    
    address owner;

    enum State { Accepting, Finished }
    
    State state; 

    constructor() public {
        owner = msg.sender;
        state = State.Accepting;
    }

    function enter(uint8 number) public payable {
        require(number<=100, "Number must be less then 100");
        require(number>0, "Number must be less then 0");
        require(state == State.Accepting, "State");
//        require(msg.value > .001 ether);
        playersByNumber[number].push(msg.sender);
    }
    
    function determineWinner() public {
        require(msg.sender == owner, "27");
        
        state = State.Finished;
        
        uint8 winningNumber = random();
        
        distributeFunds(winningNumber);

        selfdestruct(owner);
    }
    
    function distributeFunds(uint8 winningNumber) private returns(uint256) {
        uint256 winnerCount = playersByNumber[winningNumber].length;
                require(winnerCount == 1, "40");
        if (winnerCount > 0) {
            uint256 balanceToDistribute = address(this).balance/(2*winnerCount);

            for (uint i = 0; i<winnerCount; i++) {
                playersByNumber[winningNumber][i].transfer(balanceToDistribute);
            }
        }
        
        return address(this).balance;
    }
    
    function random() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%100 + 1);
    }
}