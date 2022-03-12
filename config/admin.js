module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7f7638b949cb73ce3c5554493f2f089a'),
  },
  // url: "http://vuwunicodesjav1.vuw.ac.nz/backend/admin"
});
