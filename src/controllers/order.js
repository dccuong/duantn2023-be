import Order from "../models/order";

export const list = async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 })
    console.log(orders,"s")
    try {
      
      res.json(orders);
    } catch (error) {
      res.status(400).json({
        message: "không hiển thị được dữ liệu",
      });
    }
  };
export const read = async (req, res) => {
    try {
        const orders = await Order.findOne({ _id: req.params.id });
        res.json(orders);
    } catch (error) {
        res.status(400).json({
            message: "không hiển thị được dữ liệu",
        });
    }
};
export const remove = async (req, res) => {
    try {
        const orders = await Order.findOneAndDelete({ _id: req.params.id });
        res.json(orders);
    } catch (error) {
        res.status(400).json({
            message: "Không xóa được dữ liệu",
        });
    }
};
export const create = async (req, res) => {
    try {
        const orders = await new Order(req.body).save();
        res.json(orders);
    } catch (error) {
        res.status(400).json({
            message: "Không thêm mơi được dữ liệu",
        });
    }
};
export const update = async (req, res) => {
    try {
        const orders = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(orders);
    } catch (error) {
        res.status(400).json({
            message: "Không cập nhật được dữ liệu",
        });
    }
};

export const getByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort("-createdAt").exec();

        res.json(orders);
    } catch (error) {
        res.status(404).json({
            message: error,
        });
    }
};
export const get3mOrder =async (req, res) => {
    try {
      // Get current date
      const currentDate = new Date();
  
      // Get first day of current month
      const firstDayOfCurrentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
  
      // Get first day of previous month
      const firstDayOfPreviousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
  
      // Get first day of two months ago
      const firstDayOfTwoMonthsAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 2,
        1
      );
  
      // Aggregate orders by createdAt and totalPrice fields
      const orders = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: firstDayOfTwoMonthsAgo, // Filter orders created in the last three months
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m", // Group orders by year and month
                date: "$createdAt",
              },
            },
            totalPrice: {
              $sum: "$totalPrice", // Sum up the totalPrice of each group
            },
          },
        },
        {
          $sort: {
            _id: 1, // Sort by ascending order of year and month
          },
        },
      ]);
  
      // Send response with orders data
      res.status(200).json({
        status: "success",
        data: orders,
      });
    } catch (error) {
      // Handle error
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  }