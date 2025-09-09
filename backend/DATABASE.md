# قاعدة البيانات - Haymanh Success Initiative

## 📊 نظرة عامة

هذا المشروع يستخدم **MongoDB** كقاعدة بيانات رئيسية مع **Mongoose** كـ ODM (Object Document Mapper).

## 🚀 الإعداد الأولي

### 1. تثبيت MongoDB

#### على Windows:
```bash
# تحميل MongoDB Community Server من الموقع الرسمي
# https://www.mongodb.com/try/download/community

# أو استخدام Chocolatey
choco install mongodb
```

#### على macOS:
```bash
# استخدام Homebrew
brew tap mongodb/brew
brew install mongodb-community

# تشغيل MongoDB
brew services start mongodb-community
```

#### على Linux (Ubuntu):
```bash
# إضافة MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# تثبيت MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# تشغيل MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. إنشاء ملف .env

```bash
# نسخ ملف .env.example
cp .env.example .env

# تعديل المتغيرات حسب إعداداتك
```

### 3. تشغيل قاعدة البيانات

```bash
# تشغيل MongoDB
mongod

# أو في الخلفية
mongod --fork --logpath /var/log/mongodb.log
```

## 🔌 الاتصال بقاعدة البيانات

### 1. الاتصال التلقائي

```typescript
import { connectDB } from './config/database';

// في ملف index.ts
connectDB()
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });
```

### 2. فحص حالة الاتصال

```typescript
import { getDBStatus, isDBConnected } from './config/database';

// فحص الحالة
const status = getDBStatus();
console.log('Database status:', status);

// فحص الاتصال
if (isDBConnected()) {
  console.log('✅ Database is connected');
} else {
  console.log('❌ Database is not connected');
}
```

## 🌱 إضافة بيانات تجريبية

### 1. إضافة البيانات الأساسية

```bash
# إضافة بيانات تجريبية
npm run db:seed

# إعادة تعيين قاعدة البيانات
npm run db:reset

# فحص حالة قاعدة البيانات
npm run db:status
```

### 2. البيانات التي يتم إنشاؤها

- **👥 المستخدمين:**
  - مدير النظام (admin@haymanh.com)
  - مدرب (instructor@haymanh.com)
  - مستخدم عادي (user@haymanh.com)

- **📚 البرامج:**
  - دورة تطوير الويب المتقدمة
  - ورشة عمل الذكاء الاصطناعي

- **💼 الفرص:**
  - مطور ويب مبتدئ

- **🎉 الفعاليات:**
  - مؤتمر التقنية والابتكار 2024

- **📝 المنشورات:**
  - كيف تبدأ رحلتك في مجال التطوير
  - أحدث تقنيات الذكاء الاصطناعي في 2024

## 🛠️ إدارة قاعدة البيانات

### 1. الأوامر المتاحة

```bash
# الاتصال بقاعدة البيانات
npm run db connect

# فحص الحالة
npm run db status

# إضافة بيانات تجريبية
npm run db seed

# إعادة تعيين
npm run db reset

# قطع الاتصال
npm run db disconnect
```

### 2. إدارة MongoDB مباشرة

```bash
# الدخول إلى MongoDB shell
mongosh

# عرض قواعد البيانات
show dbs

# استخدام قاعدة البيانات
use haymanh_db

# عرض المجموعات
show collections

# عرض المستخدمين
db.users.find()

# عرض البرامج
db.programs.find()

# عرض الفرص
db.opportunities.find()

# عرض الفعاليات
db.events.find()

# عرض المنشورات
db.posts.find()
```

## 📊 هيكل قاعدة البيانات

### 1. المستخدمين (Users)
```typescript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (user, instructor, admin),
  isVerified: Boolean,
  isActive: Boolean,
  phone: String,
  bio: String,
  interests: [String],
  experience: Object,
  education: Object,
  skills: [String],
  socialLinks: Object,
  preferences: Object,
  lastLogin: Date,
  loginCount: Number
}
```

### 2. البرامج (Programs)
```typescript
{
  title: String,
  description: String,
  category: String,
  level: String,
  duration: String,
  price: Object,
  instructor: ObjectId (ref: User),
  maxParticipants: Number,
  currentParticipants: [ObjectId],
  startDate: Date,
  endDate: Date,
  location: Object,
  curriculum: [String],
  requirements: [String],
  outcomes: [String],
  tags: [String],
  language: String,
  isFeatured: Boolean,
  ratings: Object
}
```

### 3. الفرص (Opportunities)
```typescript
{
  title: String,
  description: String,
  type: String,
  category: String,
  company: Object,
  location: Object,
  requirements: [String],
  benefits: [String],
  salary: Object,
  duration: String,
  applicationDeadline: Date,
  maxApplicants: Number,
  currentApplicants: Number,
  tags: [String],
  language: String,
  isFeatured: Boolean,
  isUrgent: Boolean
}
```

### 4. الفعاليات (Events)
```typescript
{
  title: String,
  description: String,
  type: String,
  category: String,
  organizer: Object,
  location: Object,
  schedule: Object,
  registration: Object,
  speakers: [Object],
  agenda: [Object],
  targetAudience: [String],
  tags: [String],
  language: String,
  isFeatured: Boolean
}
```

## 🔒 الأمان والنسخ الاحتياطي

### 1. الأمان

```typescript
// تشفير كلمات المرور
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash(password, 12);

// التحقق من كلمات المرور
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 2. النسخ الاحتياطي

```bash
# إنشاء نسخة احتياطية
mongodump --db haymanh_db --out ./backup

# استعادة النسخة الاحتياطية
mongorestore --db haymanh_db ./backup/haymanh_db
```

## 🚨 استكشاف الأخطاء

### 1. مشاكل الاتصال

```bash
# فحص حالة MongoDB
sudo systemctl status mongod

# إعادة تشغيل MongoDB
sudo systemctl restart mongod

# فحص السجلات
sudo tail -f /var/log/mongodb/mongod.log
```

### 2. مشاكل الأداء

```typescript
// فحص الاستعلامات البطيئة
db.setProfilingLevel(1, { slowms: 100 });

// عرض الاستعلامات البطيئة
db.system.profile.find({ millis: { $gt: 100 } }).sort({ millis: -1 });
```

## 📚 موارد إضافية

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) (قاعدة بيانات سحابية)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (واجهة رسومية)

## 🎯 الخطوات التالية

1. ✅ تثبيت MongoDB
2. ✅ إنشاء ملف .env
3. ✅ تشغيل قاعدة البيانات
4. ✅ إضافة بيانات تجريبية
5. ✅ اختبار الاتصال
6. 🚀 البدء في التطوير!

---

**ملاحظة:** تأكد من تحديث ملف `.env` بالمتغيرات الصحيحة قبل تشغيل التطبيق.
