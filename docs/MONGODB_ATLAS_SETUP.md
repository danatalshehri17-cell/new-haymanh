# 🗄️ إعداد MongoDB Atlas

## **خطوات إنشاء قاعدة بيانات MongoDB Atlas:**

### **1. إنشاء حساب MongoDB Atlas:**
1. اذهب إلى [cloud.mongodb.com](https://cloud.mongodb.com)
2. اضغط "Try Free"
3. سجل دخول بحساب Google أو أنشئ حساب جديد
4. اختر "M0 Sandbox" (مجاني)

### **2. إنشاء Cluster:**
1. اختر "Build a Database"
2. اختر "M0 Sandbox" (مجاني)
3. اختر المنطقة الأقرب (مثل Frankfurt)
4. اضغط "Create"

### **3. إعداد المستخدم:**
1. اذهب إلى "Database Access"
2. اضغط "Add New Database User"
3. اختر "Password" واكتب كلمة مرور قوية
4. اختر "Atlas Admin" للصلاحيات
5. اضغط "Add User"

### **4. إعداد الشبكة:**
1. اذهب إلى "Network Access"
2. اضغط "Add IP Address"
3. اختر "Allow Access from Anywhere" (0.0.0.0/0)
4. اضغط "Confirm"

### **5. الحصول على رابط الاتصال:**
1. اذهب إلى "Database"
2. اضغط "Connect"
3. اختر "Connect your application"
4. اختر "Node.js" و "3.6 or later"
5. انسخ رابط الاتصال

### **6. تحديث ملف .env:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/haymanh_db?retryWrites=true&w=majority
```

## **مثال على رابط الاتصال:**
```
mongodb+srv://haymanh_user:SecurePassword123@cluster0.abc123.mongodb.net/haymanh_db?retryWrites=true&w=majority
```

## **الفوائد:**
- ✅ **مجاني** للاستخدام الشخصي
- ✅ **آمن** ومحمي
- ✅ **سريع** وموثوق
- ✅ **قابل للتوسع** حسب الحاجة
- ✅ **نسخ احتياطية** تلقائية

## **البدائل:**
- **Firebase Firestore** - من Google
- **PlanetScale** - قاعدة بيانات MySQL
- **Supabase** - بديل Firebase مفتوح المصدر
