export const createFormData = (data) => {
  let formData = new FormData();
  if (data) {
    for (let item in data) {
      formData.append(item, data[item]);
    }
    return formData;
  }
  return null;
};
