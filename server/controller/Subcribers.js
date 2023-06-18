import Subscribe from "../model/Subcribers.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import ModelActions from "./ModelActions.js";
import { sendMessage } from "../Utils/messenger.js"

class SubRepo {
    createSub = asyncHandler(async (req, res) => {
        try {
            if (!req.body)
                return res.status(400).json({ message: "please supply the email field" });
            const emailExits = await ModelActions.findOne(Subscribe, { email: req.body.email })
            if (emailExits) return res.status(StatusCodes.BAD_REQUEST).json({ message: "email registered already" })
            const data = await ModelActions.creator(Subscribe, req.body);
            data && res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    });

    deleteSubscribe = asyncHandler(async (req, res) => {
        const { id } = req.params;
        checkId(res, id);
        const match = await ModelActions.findOne(Subscribe, { _id: id });
        if (!match) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ 'message': 'bad request' });
        }
        const deleted = await ModelActions.deletor(Subscribe, id);
        deleted && res.status(StatusCodes.OK).json(deleted);
    });

    allSubscriptions = asyncHandler(async (_, res) => {
        const data = await Subscribe.find({ isDeleted: false }).sort({ createdAt: -1 });
        data && res.status(StatusCodes.OK).json(data);
    });

    // send news letter
    sendNewsLetter = asyncHandler(async (req, res) => {
        if (!req.body)
            return res.status(400).json({ message: "please supply the message and subject field" });
        const { note, subject } = req.body
        try {
            const subcribers = await ModelActions.findAll(Subscribe)
            if (subcribers.length === 0)
                return res.status(200).json({ message: "No subscribers found" });
            const recipients = subcribers.map((subscriber) => subscriber.email);
            const output = await sendMessage(recipients, note, subject)
            if (!output)
                return res.status(StatusCodes.OK).json({ message: "Oop something went wrong" })

            res.status(StatusCodes.OK).json({ message: "message sent" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    })
}
export default new SubRepo();