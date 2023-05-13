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
              $gte: firstDayOfTwoMonthsAgo, 
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m", 
                date: "$createdAt",
              },
            },
            totalPrice: {
              $sum: "$totalPrice", 
            },
          },
        },
        {
          $sort: {
            _id: 1, 
          },
        },
      ]);
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
  export const get7dOrder = async (req, res) => {
    try {
      // Get current date
      const currentDate = new Date();
      // Get 7 days ago date
      const sevenDaysAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 7
      );
      // Create an array of dates from 7 days ago to today
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(
          sevenDaysAgo.getFullYear(),
          sevenDaysAgo.getMonth(),
          sevenDaysAgo.getDate() + i
        );
        dates.push(date);
      }
      // Aggregate orders by createdAt and totalPrice fields
      const orders = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: sevenDaysAgo,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            totalPrice: {
              $sum: "$totalPrice",
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
      // Map the orders to an object with date as key and totalPrice as value
      const orderMap = {};
      for (let order of orders) {
        orderMap[order._id] = order.totalPrice;
      }
      // Create a new array of objects with date and totalPrice fields
      const result = [];
      for (let date of dates) {
        const dateString = date.toISOString().slice(0, 10); // Format the date as YYYY-MM-DD
        result.push({
          _id: dateString,
          totalPrice: orderMap[dateString] || 0, // Use the orderMap value or zero if not found
        });
      }
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      // Handle error
      res.status(500).json({
        status: "fail",
        message: error.message,
      });
    }
  };
  export const getCustomOrder = async (req, res) => {
    try {
      // Get the date from the query string
      const date = req.query.date;
      // Convert the date to a Date object
      const dateObj = new Date(date);
      // Get the next day of the date
      const nextDay = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate() + 1
      );
      // Aggregate orders by createdAt and totalPrice fields
      const orders = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: dateObj,
              $lt: nextDay,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            totalPrice: {
              $sum: "$totalPrice",
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
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
  };