const slugify = require("slugify");

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.ProjectTitle) {
      data.Slug = slugify(data.ProjectTitle, { lower: true });
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.ProjectTitle) {
      data.Slug = slugify(data.ProjectTitle, { lower: true });
    }
  },
};
