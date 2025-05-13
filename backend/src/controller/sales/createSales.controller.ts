import { Request, Response } from "express";
import { SalesProduct } from "../../model/sales.model";

export const CreateSalesController = async (req: Request, res: Response) => {
  const { title, price, image, description } = req.body;

  if (!title || !price || !image || !description) {
    res.status(400).json({
      success: false,
      message: "Title, Price and Images are required",
    });
    return;
  }
  try {
    const CreateSales = await SalesProduct.create({
      title,
      price,
      image,
      description,
    });
    res.status(201).json({
      success: true,
      sales: CreateSales,
    });
    return;
  } catch (err) {
    console.error(err, "error while creating product");
    res.status(500).json({
      success: false,
    });
  }
};
