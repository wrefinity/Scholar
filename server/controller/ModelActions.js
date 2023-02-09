class ModelActions {
  findAll = async (obj) => {
    const args = await obj.find({});
    return args;
  };
  findId = async (obj, id) => {
    const arg = await obj.findById(id);
    return arg;
  };
  findOne = async (obj, getter) => {
    const arg = await obj.findOne(getter);
    return arg;
  };

  creator = async (obj, payload) => {
    const created = await obj.create(payload);
    return created;
  };
  deletor = async (obj, id) => {
    const deleted = await obj.findByIdAndDelete(id);
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
