// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MFAILPStaking is ReentrancyGuard, Ownable {
    IERC20 public lpToken; // PancakeSwap LP Token
    IERC20 public mfaiToken;
    
    struct StakeInfo {
        uint256 amount;
        uint256 timestamp;
    }
    
    mapping(address => StakeInfo) public stakes;
    uint256 public rewardRate = 20; // 20% APR
    uint256 public totalStaked;
    
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    constructor(address _lpToken, address _mfaiToken) {
        lpToken = IERC20(_lpToken);
        mfaiToken = IERC20(_mfaiToken);
    }
    
    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Cannot stake 0");
        require(lpToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        
        if (stakes[msg.sender].amount > 0) {
            claimRewards();
        }
        
        stakes[msg.sender].amount += _amount;
        stakes[msg.sender].timestamp = block.timestamp;
        totalStaked += _amount;
        
        emit Staked(msg.sender, _amount);
    }
    
    function withdraw(uint256 _amount) external nonReentrant {
        require(stakes[msg.sender].amount >= _amount, "Insufficient stake");
        
        claimRewards();
        stakes[msg.sender].amount -= _amount;
        totalStaked -= _amount;
        
        require(lpToken.transfer(msg.sender, _amount), "Transfer failed");
        emit Withdrawn(msg.sender, _amount);
    }
    
    function claimRewards() public {
        uint256 rewards = calculateRewards(msg.sender);
        if (rewards > 0) {
            stakes[msg.sender].timestamp = block.timestamp;
            require(mfaiToken.transfer(msg.sender, rewards), "Transfer failed");
            emit RewardsClaimed(msg.sender, rewards);
        }
    }
    
    function calculateRewards(address _user) public view returns (uint256) {
        if (stakes[_user].amount == 0) return 0;
        
        uint256 timeElapsed = block.timestamp - stakes[_user].timestamp;
        return (stakes[_user].amount * rewardRate * timeElapsed) / (365 days * 100);
    }
    
    function setRewardRate(uint256 _newRate) external onlyOwner {
        require(_newRate > 0, "Invalid rate");
        rewardRate = _newRate;
    }
} 