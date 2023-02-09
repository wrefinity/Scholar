import StatusCodes from "http-status-codes";
import CustomError from "./custom.js";


class NotFoundRequestError extends CustomError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFoundRequestError;