module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7e3e19f85aef98109024fa11d18575df'),
  },
});
