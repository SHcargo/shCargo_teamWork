// import { Request, Response } from "express";
// import { SalesProduct } from "../../model/sales.model";

// export const UpdateSalesController = async (req: Response, res: Response) => {
//   const { id } = req.params;
//   const { title, price, description, image } = req.body;
// };
import { Request, Response } from "express";
import { SalesProduct } from "../../model/sales.model";

export const updateSalesProductController = async (
  req: Request,
  res: Response
) => {
  const selectedId = req.params.selectedId;
  const { title, description, price, image } = req.body;

  if (!title || !price || !image) {
    res.status(400).json({
      success: false,
      message: "Title, price, and image are required.",
    });
    return;
  }

  try {
    const updatedProduct = await SalesProduct.findByIdAndUpdate(
      selectedId,
      { title, description, price, image },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
    return;
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
    return;
  }
};
