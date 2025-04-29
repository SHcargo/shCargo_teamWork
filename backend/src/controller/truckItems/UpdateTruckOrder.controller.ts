import { Request, Response } from 'express';
import { ItemsOrder } from "../../model/truckOrders.model";  // Adjust the path to your model

// Update order status to "Замдаа"
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { trackingNumber } = req.params;  // Access trackingNumber from URL parameters

  try {
    // Find the order by trackingNumber
    const order = await ItemsOrder.findOne({ trackingNumber });

    // If the order does not exist, return 404
    if (!order) {
       res.status(404).json({ message: 'Order not found' });
       return
    }

    // Update the status to 'Замдаа'
    order.status = 'Замдаа';

    // Add the new status to the status history
    order.statusHistory.push({
      status: 'Замдаа',
      changedAt: new Date(),
    });

    // Save the updated order
    await order.save();

    // Send the updated order data as the response
    res.status(200).json({
      message: 'Order status updated to Замдаа',
      order,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
}
