const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
module.exports = {
  publicPath: isProd ? process.env.VUE_APP_PUBLIC_PATH : './',
};
