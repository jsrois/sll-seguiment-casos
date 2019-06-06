import { authorize } from "../config";
import * as express from "express"
import Minutes from "./minutes.model"


const router = express.Router();

router.route("/").get(authorize, async (_, response) => {
    const minutes = await Minutes.find();
    return response.status(200).json(minutes);
});

export default router;