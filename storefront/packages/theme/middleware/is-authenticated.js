export default (data) => {
  if (!data.app.$cookies.get("vsf-token")) {
    return data.redirect("/");
  }
};
