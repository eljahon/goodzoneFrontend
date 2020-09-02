export const createFormData = (data) => {
  let formData = new FormData();
  if (data) {
    for (let item in data) {
      formData.append(item, JSON.stringify(data[item]));
    }
    return formData;
  }
  return null;
};
