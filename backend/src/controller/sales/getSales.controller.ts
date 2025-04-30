import { Request, Response } from "express";
import { SalesProduct } from "../../model/sales.model";

export const GetAllSalesProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const getSalesProduct = await SalesProduct.find();
    res.status(200).json(getSalesProduct);
  } catch (err) {
    console.error(err, "error while getting all products");
    res.status(500).json({ success: false });
  }
};
