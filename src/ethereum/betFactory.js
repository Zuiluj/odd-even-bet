import web3 from './web3';
import Contract from './build/BetFactory.json';

const CONTRACT_ADDR = process.env.REACT_APP_CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(
    JSON.parse(Contract.interface),
    CONTRACT_ADDR
);

export default instance;
