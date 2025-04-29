import { Request, Response } from 'express';
import { ItemsOrder } from "../../model/truckOrders.model";  // Adjust the path to your model

const STATUS = ["Бүртгэсэн", "Замдаа", "УБ-д ирсэн", "Хаагдсан"];

// Update order status to the next status in the array
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { trackingNumber } = req.params;  // Access trackingNumber from URL parameters

  try {
    // Find the order by trackingNumber
    const order = await ItemsOrder.findOne({ trackingNumber });

    // If the order does not exist, return 404
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Get the current status index
    const currentStatusIndex = STATUS.indexOf(order.status);

    // If the order's status is already at the last status, return a message
    if (currentStatusIndex === -1 || currentStatusIndex === STATUS.length - 1) {
      res.status(400).json({ message: 'No next status available or invalid current status' });
      return;
    }

    // Get the next status in the array
    const nextStatus = STATUS[currentStatusIndex + 1];

    // Update the status to the next status
    order.status = nextStatus;

    // Add the new status to the status history
    order.statusHistory.push({
      status: nextStatus,
      changedAt: new Date(),
    });

    // Save the updated order
    await order.save();

    // Send the updated order data as the response
    res.status(200).json({
      message: `Order status updated to ${nextStatus}`,
      order,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};
