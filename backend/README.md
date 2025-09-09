# Haymanh Success Initiative - Backend API

## 🚀 نظرة عامة

هذا هو الخادم الخلفي لمبادرة هيمنة النجاح، يوفر API قوي وآمن لإدارة المحتوى والمستخدمين والبرامج والفعاليات.

## ✨ الميزات

- 🔐 **نظام مصادقة آمن** مع JWT
- 👥 **إدارة المستخدمين** مع أدوار مختلفة
- 📝 **نظام المقالات** مع التعليقات
- 🎓 **إدارة البرامج** التعليمية
- 💼 **الفرص الوظيفية** والتدريبية
- 📅 **إدارة الفعاليات** والمؤتمرات
- 📁 **رفع الملفات** مع التحقق من الأمان
- 🛡️ **حماية شاملة** ضد الهجمات
- 📊 **تسجيل شامل** للأحداث
- 🔍 **بحث متقدم** مع فلاتر متعددة

## 🛠️ التقنيات المستخدمة

- **Node.js** - بيئة التشغيل
- **Express.js** - إطار العمل
- **TypeScript** - لغة البرمجة
- **MongoDB** - قاعدة البيانات
- **Mongoose** - ODM
- **JWT** - المصادقة
- **Multer** - رفع الملفات
- **Helmet** - أمان HTTP
- **CORS** - مشاركة الموارد
- **Morgan** - تسجيل الطلبات

## 📋 المتطلبات

- Node.js (v16 أو أحدث)
- MongoDB (v4.4 أو أحدث)
- npm أو yarn

## 🚀 التثبيت والتشغيل

### 1. استنساخ المشروع
```bash
git clone <repository-url>
cd haymanh-backend
```

### 2. تثبيت التبعيات
```bash
npm install
```

### 3. إعداد المتغيرات البيئية
```bash
cp env.example .env
# قم بتعديل ملف .env حسب إعداداتك
```

### 4. تشغيل قاعدة البيانات
```bash
# تأكد من تشغيل MongoDB
mongod
```

### 5. تشغيل الخادم
```bash
# وضع التطوير
npm run dev

# أو بناء وتشغيل الإنتاج
npm run build
npm start
```

## ⚙️ الإعدادات

### المتغيرات البيئية المطلوبة

```env
# إعدادات الخادم
PORT=5000
NODE_ENV=development

# قاعدة البيانات
MONGODB_URI=mongodb://localhost:27017/haymanh_db

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# رفع الملفات
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 📚 API Endpoints

### المصادقة
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/logout` - تسجيل الخروج
- `GET /api/auth/me` - معلومات المستخدم الحالي

### المستخدمين
- `GET /api/users` - قائمة المستخدمين
- `GET /api/users/:id` - معلومات مستخدم محدد
- `PUT /api/users/:id` - تحديث معلومات المستخدم
- `DELETE /api/users/:id` - حذف مستخدم

### المقالات
- `GET /api/posts` - قائمة المقالات
- `POST /api/posts` - إنشاء مقال جديد
- `GET /api/posts/:id` - مقال محدد
- `PUT /api/posts/:id` - تحديث مقال
- `DELETE /api/posts/:id` - حذف مقال

### التعليقات
- `GET /api/comments` - قائمة التعليقات
- `POST /api/comments` - إضافة تعليق
- `PUT /api/comments/:id` - تحديث تعليق
- `DELETE /api/comments/:id` - حذف تعليق

### البرامج
- `GET /api/programs` - قائمة البرامج
- `POST /api/programs` - إنشاء برنامج جديد
- `GET /api/programs/:id` - برنامج محدد
- `PUT /api/programs/:id` - تحديث برنامج
- `DELETE /api/programs/:id` - حذف برنامج

### الفرص
- `GET /api/opportunities` - قائمة الفرص
- `POST /api/opportunities` - إضافة فرصة جديدة
- `GET /api/opportunities/:id` - فرصة محددة
- `PUT /api/opportunities/:id` - تحديث فرصة
- `DELETE /api/opportunities/:id` - حذف فرصة

### الفعاليات
- `GET /api/events` - قائمة الفعاليات
- `POST /api/events` - إضافة فعالية جديدة
- `GET /api/events/:id` - فعالية محددة
- `PUT /api/events/:id` - تحديث فعالية
- `DELETE /api/events/:id` - حذف فعالية

## 🗂️ هيكل المشروع

```
src/
├── config/          # إعدادات التطبيق
├── controllers/     # منطق الأعمال
├── middleware/      # الوسائط البرمجية
├── models/          # نماذج قاعدة البيانات
├── routes/          # مسارات API
├── services/        # الخدمات
├── types/           # أنواع TypeScript
├── utils/           # أدوات مساعدة
└── index.ts         # نقطة البداية
```

## 🔒 الأمان

- **Rate Limiting** - تحديد عدد الطلبات
- **Helmet** - رؤوس HTTP آمنة
- **CORS** - حماية من الطلبات غير المصرح بها
- **JWT** - مصادقة آمنة
- **Input Validation** - التحقق من المدخلات
- **File Upload Security** - أمان رفع الملفات

## 📝 السجلات

يستخدم التطبيق نظام تسجيل شامل لتتبع:
- الطلبات الواردة
- الأخطاء والاستثناءات
- محاولات الأمان المشبوهة
- أداء قاعدة البيانات

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
npm test

# تشغيل الاختبارات مع المراقبة
npm run test:watch

# تغطية الاختبارات
npm run test:coverage
```

## 🚀 النشر

### Docker
```bash
# بناء الصورة
docker build -t haymanh-backend .

# تشغيل الحاوية
docker run -p 5000:5000 haymanh-backend
```

### PM2
```bash
# تشغيل مع PM2
pm2 start ecosystem.config.js
```

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push إلى الفرع
5. إنشاء Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## 📞 الدعم

لأي استفسارات أو دعم:
- 📧 البريد الإلكتروني: support@haymanh.com
- 🌐 الموقع: https://haymanh.com
- 📱 الهاتف: +966-XX-XXX-XXXX

---

**مبادرة هيمنة النجاح** - نساعدك في تحقيق أحلامك! 🎯✨
