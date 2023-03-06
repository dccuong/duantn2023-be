import imgPrdSchema from "../models/imgPrd";
export const list = async (req, res) => {
  try {
    const slider = await imgPrdSchema.find();
    res.json(slider);
  } catch (error) {
    res.status(400).json({
      message: "không hiển thị được slider",
    });
  }
};
export const read = async (req, res) => {
  try {
    const slider = await imgPrdSchema.findOne({ _id: req.params.id });
    res.json(slider);
  } catch (error) {
    res.status(400).json({
      message: "không hiển thị được slider",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const slider = await imgPrdSchema.findOneAndDelete({ _id: req.params.id });
    res.json(slider);
  } catch (error) {
    res.status(400).json({
      message: "không xóa được slider",
    });
  }
};
export const create = async (req, res) => {
  try {
    const slider = await new Slider(req.body).save();
    res.json(slider);
  } catch (error) {
    res.status(400).json({
      message: "không thêm được slider",
    });
  }
};
export const update = async (req, res) => {
  try {
    const slider = await imgPrdSchema.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(slider);
  } catch (error) {
    res.status(400).json({
      message: "không cập nhật được slider",
    });
  }
};
