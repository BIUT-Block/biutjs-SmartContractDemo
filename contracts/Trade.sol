contract Trade {
    address public organizer;
    uint public price;
    mapping (address => uint) public balance;
    // Log event
    event Deposit(address _from, uint _amount);
    event Transfer(address _to, uint _amount);

    function Trade() public {
        organizer = msg.sender;
    }

    function buyObject(address seller) public payable{
        Deposit(msg.sender, msg.value);
        seller.transfer(msg.value);
        return;
    }

    function destroy() public {
        if (msg.sender == organizer ) {
            suicide(organizer);
        }
    }
}