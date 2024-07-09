const config =  {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdatabase',
  PORT: process.env.PORT || 7000,
};

export default config;