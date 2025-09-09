import '../config/config'; // Load environment variables
import { connectDB, disconnectDB, getDBStatus } from '../config/database';
import seedData from '../config/seedData';

// Database management script
const main = async () => {
  const command = process.argv[2];

  try {
    switch (command) {
      case 'connect':
        console.log('🔌 Connecting to database...');
        await connectDB();
        console.log('✅ Connected successfully!');
        break;

      case 'status':
        console.log('📊 Database status:');
        console.log(getDBStatus());
        break;

      case 'seed':
        console.log('🌱 Seeding database...');
        await connectDB();
        await seedData();
        console.log('✅ Seeding completed!');
        break;

      case 'reset':
        console.log('🔄 Resetting database...');
        await connectDB();
        await seedData();
        console.log('✅ Database reset completed!');
        break;

      case 'disconnect':
        console.log('🔌 Disconnecting from database...');
        await disconnectDB();
        console.log('✅ Disconnected successfully!');
        break;

      default:
        console.log(`
🚀 Database Management Script

Usage: npm run db <command>

Commands:
  connect     - Connect to database
  status      - Show database status
  seed        - Seed database with sample data
  reset       - Reset and seed database
  disconnect  - Disconnect from database

Examples:
  npm run db connect
  npm run db status
  npm run db seed
  npm run db reset
  npm run db disconnect
        `);
        break;
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    if (command !== 'status' && command !== 'connect') {
      await disconnectDB();
    }
    process.exit(0);
  }
};

// Run script
main();
