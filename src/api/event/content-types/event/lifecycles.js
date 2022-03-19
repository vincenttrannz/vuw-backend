const slugify = require("slugify");

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.EventName) {
      data.Slug = slugify(data.EventName, { lower: true });
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.EventName) {
      data.Slug = slugify(data.EventName, { lower: true });
    }
  },
};
