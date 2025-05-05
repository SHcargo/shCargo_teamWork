import { Request, Response } from "express";
import { SalesProduct } from "../../model/sales.model";

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const selectedId = req.params.selectedId;
    const deletedProduct = await SalesProduct.findByIdAndDelete(selectedId);

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product successfully deleted",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};
export default deleteProduct;
