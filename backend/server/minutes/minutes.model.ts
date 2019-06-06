import { SchemaDef } from "../../types";
import { Document, model, Schema } from "mongoose";

interface MinutesDoc extends App.Minutes, Document {}

const minutesSchemaDef: SchemaDef<App.Minutes> = {
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
};

const minutesSchema = new Schema(minutesSchemaDef)

export default model<MinutesDoc>("Minutes", minutesSchema)
