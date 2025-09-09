import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️ MONGODB_URI is not defined, running in demo mode');
      return;
    }

    if (isConnected) {
      console.log('✅ Already connected to MongoDB');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.warn('⚠️ MongoDB connection failed, running in demo mode:', error.message);
    // Don't exit, just run in demo mode
  }
};

const disconnectDB = async () => {
  try {
    if (!isConnected) {
      console.log('✅ Already disconnected from MongoDB');
      return;
    }

    await mongoose.disconnect();
    isConnected = false;
    console.log('✅ MongoDB Disconnected');
  } catch (error: any) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};

const getDBStatus = () => {
  const status = {
    connected: isConnected,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || 'Not connected',
    port: mongoose.connection.port || 'Not connected',
    name: mongoose.connection.name || 'Not connected'
  };

  const readyStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return {
    ...status,
    readyStateText: readyStateMap[status.readyState as keyof typeof readyStateMap] || 'unknown'
  };
};

export { connectDB, disconnectDB, getDBStatus };
export default connectDB;
