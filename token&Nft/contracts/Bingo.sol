// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return payable(msg.sender);
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this;
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

/**
 * Uniswap Interface
 */
interface IUniswapV2Router01 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        );

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETH(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountETH);

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETHWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountToken, uint256 amountETH);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);

    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);
}

interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountETH);

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}

interface IUniswapV2Factory {
    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint256
    );

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);

    function allPairs(uint256) external view returns (address pair);

    function allPairsLength() external view returns (uint256);

    function createPair(address tokenA, address tokenB)
        external
        returns (address pair);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;
}

interface IUniswapV2Pair {
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external pure returns (string memory);

    function symbol() external pure returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(
        address indexed sender,
        uint256 amount0,
        uint256 amount1,
        address indexed to
    );
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32 blockTimestampLast
        );

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function kLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to)
        external
        returns (uint256 amount0, uint256 amount1);

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;

    function skim(address to) external;

    function sync() external;

    function initialize(address, address) external;
}

interface IWETH {
    function deposit() external payable;

    function transfer(address to, uint256 value) external returns (bool);

    function withdraw(uint256) external;
}

library SafeMath {
    function tryAdd(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    function trySub(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    function tryMul(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    function tryDiv(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    function tryMod(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

contract BingoV1 is Ownable {

    // CONTRACT ADDRESS 0xcAe7Ab715c4D290B4665172426Fe440753ccD534

    receive() external payable {}

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event MaxTxAmountUpdated(
        uint256 indexed _maxTxAmount,
        uint256 indexed _maxTxWallet
    );

    bool private tradingOpen;
    bool private inSwap = false;
    bool private swapEnabled = false;
    bool public started;

    uint256 private _totalSupply;
    uint256 public MAX_SUPPLY = 10000 * 10**18;
    uint256 public maxTxAmount;
    uint256 public maxWalletSize;
    uint256 public marketingFee;
    uint256 public timeDeployed;
    address marketingAddress =
        payable(0xaE084dE1BEe8934ed246a391c942Bf67ED0E98E9);
    uint256 public constant TOKEN_PRICE = 0.001 ether;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) private _isExcludedFromFee;
    mapping(address => bool) private _isExcluded;

    IUniswapV2Router02 private uniswapV2Router;
    address private uniswapV2Pair;

    constructor() {
        maxTxAmount = 500 * 10**18;
        maxWalletSize = 1000 * 10**18;

        timeDeployed = block.timestamp;

        started = true;

        _isExcludedFromFee[address(this)] = true;
        _isExcludedFromFee[owner()] = true;
        _isExcludedFromFee[address(uniswapV2Router)] = true;
        _isExcludedFromFee[marketingAddress] = true;
    }


    function name() public pure returns (string memory) {
        return "BingoV1";
    }

    function symbol() public pure returns (string memory) {
        return "Bingo";
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account)
        public
        view
        returns (uint256)
    {
        return _balances[account];
    }

    function allowance(address owner, address spender)
        public
        view
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount)
        public
        returns (bool)
    {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue)
        public
        returns (bool)
    {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        returns (bool)
    {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(
            currentAllowance >= subtractedValue,
            "ERC20: decreased allowance below zero"
        );
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");


        _totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");


        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(
                currentAllowance >= amount,
                "ERC20: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function pause() public onlyOwner {
        started = !started;
    }

    function mint(uint256 amount) public payable {
        require(started, "NOT STARTED");
        require(msg.sender != address(0), "Bingo: mint to the zero address");

        uint256 truePrice = TOKEN_PRICE * amount;
        require(msg.value >= truePrice, "Bingo: UNDER PRICE");

        uint realTokenAmount = amount * 10**18;
        require(
            realTokenAmount + totalSupply() <= MAX_SUPPLY,
            "Bingo: MAX SUPPLY REACHED"
        );
        require(
            realTokenAmount <= maxTxAmount,
            "Bingo: MAX TRANSACTION AMOUNT"
        );
        require(
            balanceOf(msg.sender) + realTokenAmount <= maxWalletSize,
            "Bingo: MAX WALLET SIZE"
        );

        marketingFee = (realTokenAmount * 100) / 1000;
        _balances[marketingAddress] += marketingFee;
        realTokenAmount -= marketingFee;

        _mint(msg.sender, realTokenAmount);

    }

    function excludeBlackList(address _blacklist) external onlyOwner {
        _isExcluded[_blacklist] = true;
    }

    function includeBlackList(address _blacklist) external onlyOwner {
        _isExcluded[_blacklist] = false;
    }

    function removeMarketingFee() public onlyOwner {
        marketingFee = 0;
    }

    function updateMarketingFee(uint8 _newFee) public onlyOwner {
        marketingFee = _newFee;
    }

    function includeFee(address sender) public onlyOwner {
        _isExcludedFromFee[sender] = false;
    }

    function excludedFromFee(address sender) public onlyOwner {
        _isExcludedFromFee[sender] = true;
    }

    function renounceOwnership() public virtual override onlyOwner {
        _transferOwnership(msg.sender);
    }

    function updateLimitsAfterLaunch(uint256 maxAmount, uint256 maxWallet)
        external
        onlyOwner
    {
        uint256 addedValue = maxAmount * 10**18;
        require(addedValue <= totalSupply(), "Bingo: TOO HIGH");

        maxTxAmount = maxAmount * 10**18;
        maxWalletSize = maxWallet * 10**18;
        emit MaxTxAmountUpdated(maxAmount, maxWalletSize);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function transfer(address to, uint256 amount)
        public
        returns (bool)
    {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal {
        require(started, "NOT STARTED");
        require(from != address(0), "Bingo: transfer from the zero address");
        require(to != address(0), "Bingo: transfer to the zero address");
        require(!_isExcluded[from], "Bingo: BlackListed Address");
        require(balanceOf(from) >= amount, "Bingo: insufficient funds");
        require(
            balanceOf(to) + amount <= maxWalletSize,
            "Bingo: MAX WALLET SIZE REACHED"
        );

        uint256 tokenAmount = amount;
        unchecked {
            uint256 fromBalance = _balances[from];
            _balances[from] = 0;

            if (!_isExcludedFromFee[from]) {
                _balances[from] = fromBalance - tokenAmount;

                // TAX 5%
                marketingFee = (tokenAmount * 50) / 1000;
                tokenAmount -= marketingFee;
                _balances[marketingAddress] += marketingFee;

                // BURN 1%
                uint256 amountToBurn = (tokenAmount * 10) / 1000;
                tokenAmount -= amountToBurn;
                _burn(from, amountToBurn);
                _balances[to] += tokenAmount;
            } else {
                _balances[from] -= tokenAmount;
                uint256 amountToBurn = (tokenAmount * 10) / 1000;
                tokenAmount -= amountToBurn;
                _burn(from, amountToBurn);
                _balances[to] += tokenAmount;
            }

        }
        emit Transfer(from, to, tokenAmount);
    }
}

/**
.index_container__Fem_c {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
}
.index_container__Fem_c .index_top__LAcSd {
  top: 44px;
}
.index_container__Fem_c .index_header__3zB2k {
  transition: 0.7s;
}
.index_container__Fem_c .index_contentWrap__00GcD {
  height: -moz-fit-content;
  height: fit-content;
}
.index_container__Fem_c .index_contentWrap__00GcD .index_content__v9GCO {
  max-width: 1085px;
  min-width: 1085px;
  margin-top: -10%;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_logo__OVkCT {
  width: 100%;
  margin-bottom: 60px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_logo__OVkCT
  img {
  width: 347px;
  height: 84px;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_slogan__n0yma {
  font-size: 30px;
  line-height: 36px;
  overflow: hidden;
  white-space: nowrap;
  animation: index_typing__tnjRk 1s steps(57) forwards;
  width: 0;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_slogan__n0yma
  span {
  color: #0076ff;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_slogan__n0yma
  i {
  width: 12px;
  display: inline-block;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  animation: index_van-cursor-flicker__Y_ytx 0.6s infinite;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g {
  width: 100%;
  height: 78px;
  display: flex;
  border-radius: 8px;
  margin: 50px 0;
  position: relative;
  background: #f0f3f7;
  border: 2px solid transparent;
  transition: all 0.3s;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g.index_focus__M17ML {
  border: 2px solid #0076ff;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  input {
  flex: 1 1;
  font-size: 16px;
  background: transparent;
  line-height: 19px;
  border-radius: 8px 0 0 8px;
  outline: 0;
  transition: all 0.3s;
  border: none;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  input::placeholder {
  color: #929292;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_iconWrap__15fCC {
  padding: 0 20px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0s;
  border-radius: 0 8px 8px 0;
  align-items: center;
  justify-content: center;
  display: flex;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_iconWrap__15fCC:hover {
  background: rgba(3, 76, 255, 0.8);
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_searchResultContainer__R3T5e {
  height: 0;
  background: #fff;
  position: absolute;
  top: 100%;
  transform: translateY(6px);
  left: 0;
  right: 0;
  box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 0.05),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  padding: 0 20px;
  transition: all 0.3s;
  overflow: hidden;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_searchResultContainer__R3T5e.index_show__x7GXA {
  padding: 20px;
  height: auto;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_searchResultContainer__R3T5e
  .index_resultItem__QJBn8 {
  display: flex;
  cursor: pointer;
  transition: opacity 0.3s;
  margin-bottom: 20px;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_searchResultContainer__R3T5e
  .index_resultItem__QJBn8:hover {
  opacity: 0.3;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_searchResultContainer__R3T5e
  .index_resultItem__QJBn8
  .index_content__v9GCO {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_searchResultContainer__R3T5e
  .index_resultItem__QJBn8
  .index_content__v9GCO
  .index_network__1JFZk {
  font-size: 18px;
  font-family: RegioMono-SemiBold, RegioMono, sans-serif;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 2px;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_searchResultContainer__R3T5e
  .index_resultItem__QJBn8
  .index_content__v9GCO
  .index_hex__hiCsF {
  font-size: 14px;
  color: #3e475b;
  line-height: 17px;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_searchContainer__3Qc9g
  .index_searchResultContainer__R3T5e
  .index_clearHistory__mLCpN {
  padding-left: 56px;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  font-size: 14px;
  color: #0076ff;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_introduceList__BYZCW {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: stretch;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_introduceList__BYZCW
  .index_listItem__Q5USt
  .index_title__2lWWJ {
  font-size: 20px;
  font-family: RegioMono-SemiBold, RegioMono, sans-serif;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 10px;
  align-items: center;
  display: flex;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_introduceList__BYZCW
  .index_listItem__Q5USt
  .index_title__2lWWJ
  .index_comingSoon__xYTaA {
  width: 35px;
  height: 18px;
  margin-left: 10px;
}
.index_container__Fem_c
  .index_contentWrap__00GcD
  .index_content__v9GCO
  .index_introduceList__BYZCW
  .index_listItem__Q5USt
  .index_desc__BIqNU {
  font-size: 16px;
  line-height: 23px;
}
@keyframes index_van-cursor-flicker__Y_ytx {
  0% {
    opacity: 0;
    border-bottom-color: #c2d3ff;
  }
  50% {
    opacity: 1;
    border-bottom-color: #0076ff;
  }
  to {
    opacity: 0;
    border-bottom-color: #c2d3ff;
  }
}






@keyframes index_typing__tnjRk {
  0% {
    width: 0;
  }
  to {
    width: 100%;
  }
}





@media (max-width: 575px) {
  .index_container__Fem_c {
    justify-content: flex-start;
  }
  .index_container__Fem_c .index_contentWrap__00GcD {
    width: 100%;
    height: 100vh;
  }
  .index_container__Fem_c .index_contentWrap__00GcD .index_content__v9GCO {
    min-width: 100%;
    max-width: 100%;
    padding: 0 12px;
    margin-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .index_container__Fem_c
    .index_contentWrap__00GcD
    .index_content__v9GCO
    .index_logo__OVkCT {
    width: 100%;
    margin-bottom: 20px;
    margin-top: 50px;
    display: flex;
    justify-content: flex-start;
  }
  .index_container__Fem_c
    .index_contentWrap__00GcD
    .index_content__v9GCO
    .index_logo__OVkCT
    img {
    width: 70%;
    height: auto;
  }
  .index_container__Fem_c
    .index_contentWrap__00GcD
    .index_content__v9GCO
    .index_slogan__n0yma {
    font-size: 20px;
    line-height: 26px;
  }
  .index_container__Fem_c
    .index_contentWrap__00GcD
    .index_content__v9GCO
    .index_introduceList__BYZCW {
    display: flex;
    flex-direction: column;
  }
  .index_container__Fem_c
    .index_contentWrap__00GcD
    .index_content__v9GCO
    .index_introduceList__BYZCW
    .index_listItem__Q5USt
    .index_title__2lWWJ {
    font-size: 18px;
  }
  .index_container__Fem_c
    .index_contentWrap__00GcD
    .index_content__v9GCO
    .index_introduceList__BYZCW
    .index_listItem__Q5USt
    .index_desc__BIqNU {
    font-size: 14px;
  }
  .index_container__Fem_c .index_contentWrap__00GcD footer {
    position: static;
    margin-top: 48px;
  }
}
@media (max-width: 992px) {
  .index_container__Fem_c .index_contentWrap__00GcD {
    width: 100%;
  }
  .index_container__Fem_c .index_contentWrap__00GcD .index_content__v9GCO {
    min-width: 100%;
    max-width: 100%;
    padding: 0 24px;
  }
  .index_container__Fem_c
    .index_contentWrap__00GcD
    .index_content__v9GCO
    .index_slogan__n0yma {
    width: 100%;
    word-break: break-word;
    white-space: break-spaces;
    animation: none;
  }
}
.index_text-ellipsis__iuXjF {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.index_flex__ee6jS {
  display: flex;
}
.index_center__0ihKy {
  justify-content: center;
}
.index_align-center__g_f8y,
.index_center__0ihKy {
  align-items: center;
  display: flex;
}
.index_column-center__19rK8,
.index_flex-column__0kXLR {
  display: flex;
  flex-direction: column;
}
.index_column-center__19rK8 {
  align-items: center;
  justify-content: center;
}
.index_pointer__tJj99 {
  cursor: pointer;
}
.index_icon-hover__eXUIa {
  color: hsla(0, 0%, 100%, 0.5);
  cursor: pointer;
}
.index_icon-hover__eXUIa:hover {
  color: #fff;
}
.index_wh100__SVLDO {
  width: 100%;
  height: 100%;
}
.index_flex1__1WGgq {
  flex: 1 1;
}
 */