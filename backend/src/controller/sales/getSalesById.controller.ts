import { Request, Response } from "express";
import { SalesProduct } from "../../model/sales.model";
const getProductById = async (req: Request, res: Response) => {
  try {
    const selectedId = req.params.selectedId;
    const product = await SalesProduct.findById(selectedId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved product",
      data: product,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({
      success: false,
      message: "Server error while retrieving product",
    });
  }
};

export default getProductById;
