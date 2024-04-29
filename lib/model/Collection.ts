import mongoose from 'mongoose';
import { Schema, Model } from 'mongoose';
import { CollectionType } from '../types';
export const collectionSchema = new Schema<CollectionType, Model<CollectionType>> ({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    image: String,
    path: String,
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        }
      ]
},{
    timestamps:true
})

const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;