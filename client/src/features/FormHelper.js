export const  HandleInput = (e, setHook)=>{
    const {name, value} = e.target;
    setHook(prev => ({
        ...prev, [name]:value
    }));
}

export const validateEmpty = (values) => {
    const errors = {};
    for (let x in values) {
      if (values[x] === "") {
        errors.all = "All fields required";
        break;
      }
    }
    return errors;
  };