# دليل اختبارات قاعدة البيانات - مشروع Haymanh

## نظرة عامة

هذا الدليل يوضح كيفية تشغيل اختبارات قاعدة البيانات للمشروع. تم إنشاء اختبارات شاملة للتحقق من صحة جميع النماذج والإعدادات.

## المتطلبات

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn
- TypeScript

## التثبيت

```bash
# تثبيت التبعيات
npm install

# أو باستخدام yarn
yarn install
```

## تشغيل الاختبارات

### تشغيل جميع الاختبارات
```bash
npm test
```

### تشغيل اختبارات محددة

#### اختبارات النماذج
```bash
npm test -- --testPathPattern="models.test.ts"
```

#### اختبارات إعدادات قاعدة البيانات
```bash
npm test -- --testPathPattern="database.test.ts"
```

#### اختبارات بيانات البذور
```bash
npm test -- --testPathPattern="seedData.test.ts"
```

### تشغيل الاختبارات مع مراقبة التغييرات
```bash
npm test -- --watch
```

### تشغيل الاختبارات مع تقرير التغطية
```bash
npm test -- --coverage
```

## أنواع الاختبارات

### 1. اختبارات النماذج (Models)
**الملف**: `src/test/models.test.ts`

تختبر هذه الاختبارات:
- صحة إنشاء النماذج
- التحقق من الحقول المطلوبة
- صحة قواعد التحقق من البيانات
- صحة الأنواع (Types)

**النماذج المختبرة:**
- User (المستخدم)
- Program (البرنامج)
- Opportunity (الفرصة)
- Event (الفعالية)
- Post (المنشور)

### 2. اختبارات إعدادات قاعدة البيانات
**الملف**: `src/test/database.test.ts`

تختبر هذه الاختبارات:
- صحة إعدادات MongoDB
- صحة إعدادات JWT
- صحة متغيرات البيئة
- صحة إعدادات Mongoose

### 3. اختبارات بيانات البذور
**الملف**: `src/test/seedData.test.ts`

تختبر هذه الاختبارات:
- صحة بيانات البذور
- توافق البيانات مع النماذج
- صحة العلاقات بين الكيانات

## هيكل الاختبارات

```
src/test/
├── models.test.ts          # اختبارات النماذج
├── database.test.ts        # اختبارات إعدادات قاعدة البيانات
├── seedData.test.ts        # اختبارات بيانات البذور
├── auth.test.ts            # اختبارات المصادقة (تحتاج إصلاح)
└── setup.ts                # إعداد الاختبارات
```

## إعدادات Jest

**الملف**: `jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testTimeout: 10000
};
```

## إعدادات الاختبارات

**الملف**: `src/test/setup.ts`

```typescript
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// تحميل متغيرات البيئة للاختبار
dotenv.config({ path: '.env.test' });

// إعداد قاعدة بيانات الاختبار
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/haymanh_test';

// إعداد عام للاختبارات
beforeAll(async () => {
  try {
    await mongoose.connect(TEST_MONGODB_URI);
    console.log('✅ Test database connected');
  } catch (error) {
    console.error('❌ Test database connection failed:', error);
    process.exit(1);
  }
});

// تنظيف قاعدة البيانات بين الاختبارات
afterEach(async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    console.log('🧹 Test database cleaned');
  } catch (error) {
    console.error('❌ Test database cleanup failed:', error);
  }
});

// إغلاق الاتصال بعد الانتهاء
afterAll(async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ Test database disconnected');
  } catch (error) {
    console.error('❌ Test database disconnection failed:', error);
  }
});
```

## إضافة اختبارات جديدة

### 1. إنشاء ملف اختبار جديد
```typescript
// src/test/newFeature.test.ts
import { describe, it, expect } from '@jest/globals';

describe('New Feature', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });
});
```

### 2. إضافة اختبارات للنماذج
```typescript
import mongoose from 'mongoose';
import NewModel from '../models/NewModel';

describe('NewModel', () => {
  it('should create a valid instance', () => {
    const data = {
      // بيانات الاختبار
    };
    
    const instance = new NewModel(data);
    const validationError = instance.validateSync();
    
    expect(validationError).toBeUndefined();
  });
});
```

## استكشاف الأخطاء

### مشاكل شائعة

#### 1. خطأ في الاتصال بقاعدة البيانات
```bash
# تأكد من تشغيل MongoDB
mongod

# أو استخدام Docker
docker run -d -p 27017:27017 mongo:latest
```

#### 2. خطأ في التبعيات
```bash
# إعادة تثبيت التبعيات
rm -rf node_modules package-lock.json
npm install
```

#### 3. خطأ في TypeScript
```bash
# التحقق من صحة TypeScript
npx tsc --noEmit
```

### أوامر مفيدة

```bash
# تشغيل الاختبارات مع تفاصيل أكثر
npm test -- --verbose

# تشغيل اختبار واحد فقط
npm test -- --testNamePattern="should create a valid user"

# تشغيل الاختبارات مع إعادة المحاولة
npm test -- --retryTimes=3

# تشغيل الاختبارات مع تقرير مفصل
npm test -- --detectOpenHandles --forceExit
```

## أفضل الممارسات

### 1. كتابة الاختبارات
- استخدم أسماء وصفية للاختبارات
- اكتب اختبارات منفصلة لكل سيناريو
- تأكد من تنظيف البيانات بعد كل اختبار

### 2. تنظيم الاختبارات
- اجمع الاختبارات المتعلقة في مجموعات
- استخدم `describe` لتنظيم الاختبارات
- استخدم `beforeEach` و `afterEach` للتنظيف

### 3. إدارة البيانات
- استخدم بيانات اختبار منفصلة
- لا تعتمد على بيانات الاختبارات الأخرى
- نظف قاعدة البيانات بعد كل اختبار

## الخلاصة

اختبارات قاعدة البيانات تعمل بشكل ممتاز وتغطي جميع الجوانب المهمة. يمكنك استخدام هذا الدليل لتشغيل الاختبارات وإضافة اختبارات جديدة حسب الحاجة.

للمزيد من المعلومات، راجع ملف `DATABASE_TEST_REPORT.md` للحصول على تقرير مفصل عن نتائج الاختبارات.
