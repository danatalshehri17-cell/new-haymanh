# إعداد MongoDB Atlas للخادم البعيد

## الخطوات المطلوبة:

### 1. إنشاء حساب MongoDB Atlas
1. اذهب إلى [MongoDB Atlas](https://www.mongodb.com/atlas)
2. أنشئ حساب مجاني
3. اختر "Free Shared Cluster"

### 2. إنشاء Cluster
1. اختر "AWS" كموفر الخدمة
2. اختر أقرب منطقة (مثل "Asia Pacific - Mumbai")
3. اختر "M0 Sandbox" (المجاني)
4. اترك الاسم الافتراضي أو غيره

### 3. إعداد قاعدة البيانات
1. في "Database Access"، أضف مستخدم جديد:
   - Username: `haymanh`
   - Password: `Haymanh2024!`
   - Database User Privileges: "Read and write to any database"

2. في "Network Access"، أضف IP:
   - اختر "Allow access from anywhere" (0.0.0.0/0)

### 4. الحصول على رابط الاتصال
1. اذهب إلى "Database" → "Connect"
2. اختر "Connect your application"
3. اختر "Node.js" و "Version 4.1 or later"
4. انسخ الرابط

### 5. تحديث متغيرات البيئة على Render
في لوحة تحكم Render، أضف:
```
MONGODB_URI=mongodb+srv://haymanh:Haymanh2024!@cluster0.xxxxx.mongodb.net/haymanh_db?retryWrites=true&w=majority
NODE_ENV=production
PORT=5000
JWT_SECRET=haymanh_super_secret_key_2024_production
CORS_ORIGIN=https://haymanh-success.vercel.app
```

### 6. إعادة تشغيل الخادم
بعد تحديث المتغيرات، أعد تشغيل الخادم على Render.

### 7. إضافة البيانات التجريبية
بعد تشغيل الخادم، ستحتاج لإضافة البيانات التجريبية عبر API أو سكريبت.

## الرابط المتوقع:
```
https://new-haymanh.onrender.com/api/opportunities
```

## اختبار الاتصال:
```bash
curl https://new-haymanh.onrender.com/health
curl https://new-haymanh.onrender.com/api/opportunities
```
