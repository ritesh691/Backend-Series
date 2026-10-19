import mongoose, { Schema } from "mongoose";
import "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type: String,
        required: true,
    },
    thumnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

},
{
    timestamps: true
}
)

videoSchema.plugin(require("mongooseAggregatePaginate"));
export const video = mongoose.model("Video", videoSchema);
