# إعدادات الخادم البعيد (Render)

## المشكلة الحالية
الخادم البعيد على Render يواجه مشكلة في الاتصال بقاعدة البيانات:
- خطأ: `Operation opportunities.find() buffering timed out after 10000ms`
- السبب: قاعدة البيانات غير متصلة أو غير متاحة

## الحلول المطلوبة

### 1. إعداد قاعدة البيانات السحابية
يجب إنشاء قاعدة بيانات MongoDB Atlas أو استخدام خدمة قاعدة بيانات سحابية أخرى.

### 2. تحديث متغيرات البيئة على Render
في لوحة تحكم Render، يجب إضافة المتغيرات التالية:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/haymanh_db
NODE_ENV=production
PORT=5000
JWT_SECRET=haymanh_super_secret_key_2024_production
CORS_ORIGIN=https://haymanh-success.vercel.app
```

### 3. إضافة البيانات التجريبية
بعد إصلاح الاتصال بقاعدة البيانات، يجب تشغيل سكريبت إضافة البيانات التجريبية.

## الخطوات المطلوبة:
1. إنشاء قاعدة بيانات MongoDB Atlas
2. تحديث متغيرات البيئة على Render
3. إعادة تشغيل الخادم البعيد
4. إضافة البيانات التجريبية
5. اختبار API الفرص

## الرابط الحالي للخادم البعيد:
https://new-haymanh.onrender.com

## الرابط الحالي للواجهة الأمامية:
https://haymanh-success.vercel.app
