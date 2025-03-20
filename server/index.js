const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const http = require("http");
const path = require("path");
const connectDB = require("./config/db"); // Import DB connection
const axios = require('axios');
const Product = require("./model/ProductsModels");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8800;

const server = http.createServer(app);

app.use(express.static('public'));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// Updated CORS settings to allow frontend
app.use(cors({
  origin: "http://147.93.108.140:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

// Connect to MongoDB
connectDB();


// Shopify API credentials
const shopifyApiUrl = process.env.SHOPIFYAPIURL;
const shopifyAccessToken = process.env.SHOPIFYACCESSTOKEN;
// GraphQL query
const query = `
{
  products(first: 250) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        title
        description
        id
        availableForSale
        handle
        productType
        publishedAt
        requiresSellingPlan
        tags
        totalInventory
        updatedAt
        vendor
        metafields(identifiers: [
          {namespace: "custom", key: "leeftijd_onder_titel"}, 
          {namespace: "custom", key: "productbeschrijving"}, 
          {namespace: "custom", key: "specificaties_2_0"}, 
          {namespace: "custom", key: "verzorging"}
        ]) {
          id
          namespace
          key
          value
        }
        collections(first: 3) {
          edges {
            node {
              id
              title
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              weight
              title
              sku
              requiresShipping
              price {
                amount
                currencyCode
              }
              compareAtPrice{
                  amount
              }
              product {
                images(first: 50) {
                  edges {
                    node {
                      originalSrc
                    }
                  }
                }
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
}
`;


app.use('/api', require('./Route/mainRoute'));

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Fetch product data from Shopify API
async function fetchShopifyData() {
  try {
    const response = await axios.post(
      shopifyApiUrl,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': shopifyAccessToken,
        },
      }
    );
    const products = response.data.data.products.edges;
    // Save each product to the database
    for (const productEdge of products) {
      const product = productEdge.node;

      // Transform data if needed
      const productData = {
        title: product.title,
        description: product.description,
        shopifyId: product.id,
        availableForSale: product.availableForSale,
        handle: product.handle,
        productType: product.productType,
        publishedAt: new Date(product.publishedAt),
        requiresSellingPlan: product.requiresSellingPlan,
        tags: product.tags,
        totalInventory: product.totalInventory,
        updatedAt: new Date(product.updatedAt),
        vendor: product.vendor,
        metafields: product.metafields ? product.metafields
          .filter(mf => mf) // Filter out null metafields
          .map(mf => ({
            id: mf.id,
            namespace: mf.namespace,
            key: mf.key,
            value: mf.value,
          })) : [],
        collections: product.collections.edges
          .filter(edge => edge.node) // Filter out null collections
          .map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
          })),
        variants: product.variants.edges
          .filter(variantEdge => variantEdge.node) // Filter out null variants
          .map(variantEdge => {
            const variant = variantEdge.node;
            return {
              id: variant.id,
              weight: variant.weight,
              title: variant.title,
              sku: variant.sku,
              requiresShipping: variant.requiresShipping,
              price: {
                amount: parseFloat(variant.price.amount),
                currencyCode: variant.price.currencyCode,
              },
              compareAtPrice: {
                // amount: parseFloat(variant.compareAtPrice.amount) || 0,
                amount: parseFloat(variant.compareAtPrice?.amount) || null,
                currencyCode: variant.price.currencyCode,
              },
              images: variant.product.images.edges
                .filter(imgEdge => imgEdge.node) // Filter out null images
                .map(imgEdge => imgEdge.node.originalSrc),
              selectedOptions: variant.selectedOptions
                .filter(option => option) // Filter out null options
                .map(option => ({
                  name: option.name,
                  value: option.value,
                })),
            };
          }),
      };

      // Save to MongoDB
      await Product.findOneAndUpdate({ shopifyId: product.id }, productData, { upsert: true });
    }
    console.log('Products saved successfully!');
  } catch (error) {
    console.error('Error fetching data from Shopify:', error);
  }
}


// async function fetchDailyData() {
//   await fetchShopifyData();
//   setTimeout(fetchDailyData, 30000); // 86400000 Schedule for next day
// }

// fetchDailyData();

app.get("/", (req, res) => {
  res.send("api is running..");
});

// const PORT = 8800;
const HOST = "0.0.0.0"; // Allows external access

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
// server.listen(PORT, () => {
//   console.log(`Server Running on Port ${PORT}`);
// });
