import web3 from "./web3";
import Contract from "./build/BetFactory.json";

export default (address) => {
    return new web3.eth.Contract(JSON.parse(Contract.interface), address);
};
