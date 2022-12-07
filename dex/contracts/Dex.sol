// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract BingoDex is ERC20, ReentrancyGuard {
    
    address public bingoTokenAddress;
    address payable owner;
    bool public started;

    constructor(address _bingoTokenAddress)
        ERC20("Bingo LP Token", "BLPT")
    {
        require(_bingoTokenAddress != address(0), "TOKEN ADDRESS IS NULL");
        bingoTokenAddress = _bingoTokenAddress;
        owner = payable(msg.sender);
        started = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT OWNER");
        _;
    }

    /**
     * @dev Returns the amount of `Bingo Tokens` held by this contract
     */
    function getReserve() public view returns (uint256) {
        return ERC20(bingoTokenAddress).balanceOf(address(this));
    }

    /**
     * @dev Returns the amount Eth/Bingo Tokens that would be returned to the user in the swap
     */
    function getAmountOfTokens(
        uint256 _amountIn,
        uint256 _reserveIn,
        uint256 _reserveOut
    ) public pure returns (uint256) {
        require(_reserveIn > 0 && _reserveOut > 0, "invalid reserves");

        uint256 amountInWithFee = _amountIn * 99;

        uint256 numerator = amountInWithFee * _reserveOut;
        uint256 denominator = (_reserveIn * 100) + amountInWithFee;
        return numerator / denominator;
    }

    /**
     * @dev Returns the amount of `Bingo Tokens and Eth` user will get back after burning shares. 
     */
    function getBalance(uint256 _shares)
        external
        view
        returns (uint256 amountEth, uint256 amountBingo)
    {
        require(_shares > 0, "NO SHARES");

        uint256 bingoBal = getReserve();
        uint256 ethBal = address(this).balance;
        uint256 _totalSupply = totalSupply();

        amountEth = (_shares * ethBal) / _totalSupply;
        amountBingo = (_shares * bingoBal) / _totalSupply;
        return (amountEth, amountBingo);
    }

    /**
    * @dev Returns the amount Bingo LP tokens that would be minted to the user
    * after adding liquidity
    */
    function addLiquidity(uint256 _amount) external payable nonReentrant returns (uint256) {
        require(started, "NOT STARTED");

        uint256 shares;
        uint256 ethBalance = address(this).balance;
        uint256 bingoBal = getReserve();
        ERC20 bingoToken = ERC20(bingoTokenAddress);

        if (bingoBal == 0) {
            bingoToken.transferFrom(msg.sender, address(this), _amount);
            shares = ethBalance;

            _mint(msg.sender, shares);
        } else {
            uint256 ethReserve = ethBalance - msg.value;

            uint256 bingoTokenAmount = (msg.value * bingoBal) / (ethReserve);
            require(
                _amount >= bingoTokenAmount,
                "Your Amount is less than required"
            );

            bingoToken.transferFrom(
                msg.sender,
                address(this),
                bingoTokenAmount
            );
            shares = (totalSupply() * msg.value) / ethReserve;
            _mint(msg.sender, shares);
        }
        return shares;
    }

    /**
    * @dev Returns the amount Eth/Bingo tokens/shares that would be returned to the user
    * after removing liquidity
    */
    function removeLiquidity(uint256 _shares)
        external
        nonReentrant
        returns (uint256 amountEth, uint256 amountBingo)
    {
        require(started, "NOT STARTED");
        require(_shares > 0, "_shares should be greater than zero");

        uint256 ethBal = address(this).balance;
        uint256 _totalSupply = totalSupply();

        amountEth = (_shares * ethBal) / _totalSupply;
        amountBingo = (_shares * getReserve()) / _totalSupply;

        _burn(msg.sender, _shares);

        payable(msg.sender).transfer(amountEth);
        ERC20(bingoTokenAddress).transfer(msg.sender, amountBingo);

        return (amountEth, amountBingo);
    }

    /**
     * @dev Swaps Bingo Tokens for Eth
     */
    function bingoTokenToEth(uint256 _tokensSold, uint256 _minEth) external {
        require(started, "NOT STARTED");

        uint256 tokenReserve = getReserve();

        uint256 ethBought = getAmountOfTokens(
            _tokensSold,
            tokenReserve,
            address(this).balance
        );

        require(ethBought >= _minEth, "insufficient output amount");

        ERC20(bingoTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );
        payable(msg.sender).transfer(ethBought);
    }

    /**
    * @dev Pause contract as measure of security
    */
    function pause() external onlyOwner {
        started = !started;
    }

    /**
     * @dev Swaps Eth for BingoToken
     */
    function ethToBingoToken(uint256 _minTokens) external payable {
        require(started, "NOT STARTED");

        uint256 tokenReserve = getReserve();

        uint256 tokensBought = getAmountOfTokens(
            msg.value,
            address(this).balance - msg.value,
            tokenReserve
        );

        require(tokensBought >= _minTokens, "insufficient output amount");
        ERC20(bingoTokenAddress).transfer(msg.sender, tokensBought);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
