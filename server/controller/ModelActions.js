class ModelActions {
  findAll = async (obj) => {
    const args = await obj.find({ isDeleted: false });
    return args;
  };
  findId = async (obj, id) => {
    const arg = await obj.findOne({ id: id, isDeleted: false });
    return arg;
  };
  findOne = async (obj, getter) => {
    const arg = await obj.findOne({ ...getter, isDeleted: false });
    return arg;
  };

  creator = async (obj, payload) => {
    const created = await obj.create(payload);
    return created;
  };
  deletor = async (obj, id) => {
    // const deleted = await obj.findByIdAndDelete(id);
    // return deleted;
    const deleted = await obj.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true } },
      payload,
      {
        new: true,
      }
    );
    return deleted;
  };
  updator = async (obj, id, payload) => {
    const updated = await obj.findByIdAndUpdate(
      id,
      { $set: payload },
      payload,
      {
        new: true,
      }
    );
    return updated;
  };
}
export default new ModelActions();
