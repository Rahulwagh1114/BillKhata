import Product from "../models/productModel.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { productName, category, unit, rate, stock, gst, description } = req.body;

    if (!productName?.trim() || !rate) {
      return res.status(400).json({ error: "Product name and rate are required" });
    }

    const isAlreadyExist = await Product.findOne({
      owner: req.businessLoginId,
      productName: productName.trim(),
      isActive: true,
    }).collation({ locale: "en", strength: 2 });

    if (isAlreadyExist) {
      return res.status(400).json({ error: "This product already exists" });
    }

    const product = await Product.create({
      owner: req.businessLoginId,
      productName,
      category,
      unit,
      rate,
      stock,
      gst,
      description,
    });

    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This product already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};



// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
      owner: req.businessLoginId,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const { rate, stock, gst } = req.body;

   if (rate !== undefined) product.rate = rate;
   if (stock !== undefined) product.stock = stock;
   if (gst !== undefined) product.gst = gst;

    await product.save();

    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid product id" });
    }
    if (error.code === 11000) {
      return res.status(400).json({ error: "This product already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};




// Delete product (soft delete)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndUpdate(
      { _id: id, owner: req.businessLoginId, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid product id" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};