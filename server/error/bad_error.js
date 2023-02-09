import StatusCodes from "http-status-codes";
import CustomError from "./custom.js";

class BadRequestError extends CustomError{
    constructor (message){
        super(message)
        this.statusCodes = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError;