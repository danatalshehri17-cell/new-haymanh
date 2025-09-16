#!/bin/bash

# 🏗️ سكريبت إعادة تنظيم ذكي لمشروع Haymanh Success Initiative
# هذا السكريبت ينظم المشروع بدون نسخ node_modules

echo "🚀 بدء إعادة تنظيم المشروع الذكي..."

# إنشاء المجلدات الرئيسية
mkdir -p haymanh-success-project/{frontend,backend,admin,shared,docs,scripts,docker,.github/workflows}

echo "✅ تم إنشاء المجلدات الرئيسية"

# نقل ملفات Frontend (بدون node_modules)
echo "📱 نقل ملفات Frontend..."
if [ -d "haymanh-success/src" ]; then
    cp -r haymanh-success/src haymanh-success-project/frontend/
    echo "✅ تم نسخ src/"
fi

if [ -d "haymanh-success/public" ]; then
    cp -r haymanh-success/public haymanh-success-project/frontend/
    echo "✅ تم نسخ public/"
fi

if [ -f "haymanh-success/package.json" ]; then
    cp haymanh-success/package.json haymanh-success-project/frontend/
    echo "✅ تم نسخ package.json"
fi

if [ -f "haymanh-success/tsconfig.json" ]; then
    cp haymanh-success/tsconfig.json haymanh-success-project/frontend/
    echo "✅ تم نسخ tsconfig.json"
fi

if [ -f "haymanh-success/README.md" ]; then
    cp haymanh-success/README.md haymanh-success-project/frontend/
    echo "✅ تم نسخ README.md"
fi

# نقل ملفات Backend (بدون node_modules)
echo "🖥️ نقل ملفات Backend..."
if [ -d "backend/src" ]; then
    cp -r backend/src haymanh-success-project/backend/
    echo "✅ تم نسخ src/"
fi

if [ -f "backend/package.json" ]; then
    cp backend/package.json haymanh-success-project/backend/
    echo "✅ تم نسخ package.json"
fi

if [ -f "backend/tsconfig.json" ]; then
    cp backend/tsconfig.json haymanh-success-project/backend/
    echo "✅ تم نسخ tsconfig.json"
fi

if [ -f "backend/README.md" ]; then
    cp backend/README.md haymanh-success-project/backend/
    echo "✅ تم نسخ README.md"
fi

if [ -f "backend/Dockerfile" ]; then
    cp backend/Dockerfile haymanh-success-project/backend/
    echo "✅ تم نسخ Dockerfile"
fi

if [ -f "backend/docker-compose.yml" ]; then
    cp backend/docker-compose.yml haymanh-success-project/backend/
    echo "✅ تم نسخ docker-compose.yml"
fi

# إنشاء مجلد uploads في Backend
mkdir -p haymanh-success-project/backend/uploads/{avatars,events,general,posts,programs}
echo "✅ تم إنشاء مجلد uploads"

# إنشاء الملفات المشتركة
echo "🔗 إنشاء الملفات المشتركة..."

# إنشاء مجلد shared/types
mkdir -p haymanh-success-project/shared/types
cat > haymanh-success-project/shared/types/index.ts << 'EOF'
// أنواع TypeScript مشتركة بين Frontend و Backend

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin' | 'instructor';
  isVerified: boolean;
  isActive: boolean;
  phone?: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Opportunity {
  _id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  duration: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: Date;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  price: number;
  isActive: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
EOF

# إنشاء مجلد shared/constants
mkdir -p haymanh-success-project/shared/constants
cat > haymanh-success-project/shared/constants/index.ts << 'EOF'
// ثوابت مشتركة بين Frontend و Backend

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
    LOGOUT: '/api/auth/logout',
  },
  DASHBOARD: {
    GET: '/api/dashboard',
    SELECT_OPPORTUNITY: '/api/dashboard/select-opportunity',
    REMOVE_OPPORTUNITY: '/api/dashboard/selected-opportunities',
  },
  OPPORTUNITIES: {
    GET: '/api/opportunities',
    CREATE: '/api/opportunities',
    UPDATE: '/api/opportunities',
    DELETE: '/api/opportunities',
  },
  PROGRAMS: {
    GET: '/api/programs',
    CREATE: '/api/programs',
    UPDATE: '/api/programs',
    DELETE: '/api/programs',
  },
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
} as const;

export const PROGRAM_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;
EOF

echo "✅ تم إنشاء الملفات المشتركة"

# إنشاء ملفات Docker
echo "🐳 إنشاء ملفات Docker..."

# Dockerfile للـ Frontend
cat > haymanh-success-project/docker/Dockerfile.frontend << 'EOF'
# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# نسخ package files
COPY frontend/package*.json ./

# تثبيت dependencies
RUN npm ci --only=production

# نسخ الكود
COPY frontend/ .

# بناء التطبيق
RUN npm run build

# استخدام nginx لتقديم الملفات الثابتة
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY frontend/public/_redirects /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Dockerfile للـ Backend
cat > haymanh-success-project/docker/Dockerfile.backend << 'EOF'
# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# نسخ package files
COPY backend/package*.json ./

# تثبيت dependencies
RUN npm ci --only=production

# نسخ الكود
COPY backend/ .

# بناء التطبيق
RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]
EOF

# docker-compose.yml
cat > haymanh-success-project/docker-compose.yml << 'EOF'
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: haymanh-mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    volumes:
      - mongodb_data:/data/db

  backend:
    build:
      context: .
      dockerfile: docker/Dockerfile.backend
    container_name: haymanh-backend
    restart: unless-stopped
    ports:
      - "5001:5001"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://admin:password123@mongodb:27017/haymanh?authSource=admin
      JWT_SECRET: your-super-secret-jwt-key
    depends_on:
      - mongodb
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build:
      context: .
      dockerfile: docker/Dockerfile.frontend
    container_name: haymanh-frontend
    restart: unless-stopped
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
EOF

echo "✅ تم إنشاء ملفات Docker"

# إنشاء سكريبتات النشر
echo "🚀 إنشاء سكريبتات النشر..."

# سكريبت الإعداد الأولي
cat > haymanh-success-project/scripts/setup.sh << 'EOF'
#!/bin/bash

# سكريبت الإعداد الأولي لمشروع Haymanh Success Initiative

echo "⚙️ بدء الإعداد الأولي..."

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً."
    exit 1
fi

# التحقق من وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت. يرجى تثبيت npm أولاً."
    exit 1
fi

# تثبيت dependencies للـ Frontend
echo "📱 تثبيت dependencies للـ Frontend..."
cd frontend
if [ -f "package.json" ]; then
    npm install
    echo "✅ تم تثبيت dependencies للـ Frontend"
else
    echo "⚠️ لم يتم العثور على package.json في frontend/"
fi
cd ..

# تثبيت dependencies للـ Backend
echo "🖥️ تثبيت dependencies للـ Backend..."
cd backend
if [ -f "package.json" ]; then
    npm install
    echo "✅ تم تثبيت dependencies للـ Backend"
else
    echo "⚠️ لم يتم العثور على package.json في backend/"
fi
cd ..

# إنشاء ملفات البيئة
echo "🔧 إنشاء ملفات البيئة..."

# ملف البيئة للـ Backend
cat > backend/.env << 'EOF'
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/haymanh
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# إعدادات البريد الإلكتروني
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# إعدادات رفع الملفات
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads
EOF

# ملف البيئة للـ Frontend
cat > frontend/.env << 'EOF'
REACT_APP_API_URL=http://localhost:5001
REACT_APP_ENVIRONMENT=development
EOF

echo "✅ تم الإعداد الأولي بنجاح!"
echo "📝 يرجى تحديث ملفات .env بالمعلومات الصحيحة"
echo "🚀 يمكنك الآن تشغيل المشروع باستخدام: npm run dev"
EOF

chmod +x haymanh-success-project/scripts/setup.sh

# سكريبت النشر
cat > haymanh-success-project/scripts/deploy.sh << 'EOF'
#!/bin/bash

# سكريبت النشر لمشروع Haymanh Success Initiative

echo "🚀 بدء عملية النشر..."

# التحقق من وجود Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker غير مثبت. يرجى تثبيت Docker أولاً."
    exit 1
fi

# التحقق من وجود Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose غير مثبت. يرجى تثبيت Docker Compose أولاً."
    exit 1
fi

# بناء الصور
echo "🔨 بناء صور Docker..."
docker-compose build

# إيقاف الخدمات السابقة
echo "⏹️ إيقاف الخدمات السابقة..."
docker-compose down

# تشغيل الخدمات
echo "▶️ تشغيل الخدمات..."
docker-compose up -d

# التحقق من حالة الخدمات
echo "🔍 التحقق من حالة الخدمات..."
docker-compose ps

echo "✅ تم النشر بنجاح!"
echo "🌐 Frontend: http://localhost:3000"
echo "🖥️ Backend: http://localhost:5001"
echo "📊 MongoDB: mongodb://localhost:27017"
EOF

chmod +x haymanh-success-project/scripts/deploy.sh

# إنشاء ملف package.json رئيسي
cat > haymanh-success-project/package.json << 'EOF'
{
  "name": "haymanh-success-initiative",
  "version": "1.0.0",
  "description": "مبادرة حي المنح للنجاح - منصة شاملة للفرص التعليمية والتدريبية",
  "scripts": {
    "setup": "./scripts/setup.sh",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm start",
    "build": "npm run build:backend && npm run build:frontend",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    "deploy": "./scripts/deploy.sh",
    "test": "npm run test:backend && npm run test:frontend",
    "test:backend": "cd backend && npm test",
    "test:frontend": "cd frontend && npm test"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  },
  "keywords": [
    "education",
    "training",
    "opportunities",
    "saudi-arabia",
    "haymanh",
    "react",
    "nodejs",
    "mongodb"
  ],
  "author": "Haymanh Success Initiative Team",
  "license": "MIT"
}
EOF

# إنشاء README رئيسي
cat > haymanh-success-project/README.md << 'EOF'
# 🎯 مبادرة حي المنح للنجاح - Haymanh Success Initiative

منصة شاملة للفرص التعليمية والتدريبية في المملكة العربية السعودية.

## 🏗️ هيكل المشروع

```
haymanh-success-project/
├── 📱 frontend/          # واجهة المستخدم (React)
├── 🖥️ backend/           # API الخادم (Node.js + Express)
├── 👨‍💼 admin/            # لوحة تحكم الإدارة (React)
├── 🔗 shared/            # الملفات المشتركة
├── 📚 docs/              # الوثائق
├── 🚀 scripts/           # سكريبتات النشر والإعداد
└── 🐳 docker/            # ملفات Docker
```

## 🚀 البدء السريع

### 1. الإعداد الأولي
```bash
npm run setup
```

### 2. تشغيل المشروع في وضع التطوير
```bash
npm run dev
```

### 3. النشر باستخدام Docker
```bash
npm run deploy
```

## 📱 الواجهات

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Admin Panel**: http://localhost:3001 (قريباً)

## 🛠️ التقنيات المستخدمة

### Frontend
- React 18
- TypeScript
- Styled Components
- Framer Motion
- React Router

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication

### DevOps
- Docker
- Docker Compose
- GitHub Actions (قريباً)

## 📚 الوثائق

- [دليل التطوير](docs/development/)
- [دليل النشر](docs/deployment/)
- [وثائق API](docs/api/)

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- الموقع: [haymanh.com](https://haymanh.com)
- البريد الإلكتروني: info@haymanh.com
- تويتر: [@haymanh_success](https://twitter.com/haymanh_success)
EOF

# إنشاء ملف .gitignore
cat > haymanh-success-project/.gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
build/
dist/
*.tsbuildinfo

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Uploads
uploads/
test-uploads/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Docker
.dockerignore
EOF

echo ""
echo "✅ تم إنشاء التنظيم الجديد بنجاح!"
echo ""
echo "📁 المجلدات المنشأة:"
echo "   📱 frontend/     - واجهة المستخدم"
echo "   🖥️ backend/      - API الخادم"
echo "   👨‍💼 admin/       - لوحة تحكم الإدارة"
echo "   🔗 shared/       - الملفات المشتركة"
echo "   📚 docs/         - الوثائق"
echo "   🚀 scripts/      - سكريبتات النشر"
echo "   🐳 docker/       - ملفات Docker"
echo ""
echo "🚀 الخطوات التالية:"
echo "   1. cd haymanh-success-project"
echo "   2. npm run setup"
echo "   3. npm run dev"
echo ""
echo "💡 ملاحظة: لم يتم نسخ node_modules لتوفير المساحة والوقت"
echo "📦 سيتم تثبيت dependencies تلقائياً عند تشغيل npm run setup"
echo ""
echo "📖 راجع ملف PROJECT_STRUCTURE.md للتفاصيل الكاملة"

