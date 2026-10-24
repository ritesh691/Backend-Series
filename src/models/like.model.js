import mongoose, { Schema } from "mongoose";


const likeSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const Like = mongoose.model("Like", likeSchema);