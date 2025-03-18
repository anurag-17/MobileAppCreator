const mongoose = require('mongoose');

const MetafieldSchema = new mongoose.Schema({
  namespace: String,
  key: String,
  value: String
});

const ImageSchema = new mongoose.Schema({
  originalSrc: String
});

const VariantSchema = new mongoose.Schema({
  weight: Number,
  title: String,
  sku: String,
  requiresShipping: Boolean,
  price: {
    amount: Number,
    currencyCode: String
  },
  images: [ImageSchema],
  selectedOptions: [
    {
      name: String,
      value: String
    }
  ]
});

const ProductSchema = new mongoose.Schema({
  title: String,
    description: String,
    shopifyId: String,
    availableForSale: Boolean,
    handle: String,
    productType: String,
    publishedAt: Date,
    requiresSellingPlan: Boolean,
    tags: [String],
    totalInventory: Number,
    updatedAt: Date,
    vendor: String,
    metafields: [{
        id: String,
        namespace: String,
        key: String,
        value: String,
    }],
    collections: [{
        id: String,
        title: String,
    }],
    variants: [{
        id: String,
        weight: Number,
        title: String,
        sku: String,
        requiresShipping: Boolean,
        price: {
            amount: Number,
            currencyCode: String,
        },
        compareAtPrice: {
          amount: Number,
          currencyCode: String,
      },
        images: [String],
        selectedOptions: [{
            name: String,
            value: String,
        }],
    }],
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
