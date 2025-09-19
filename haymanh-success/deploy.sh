#!/bin/bash

echo "🚀 بدء عملية رفع التطبيق..."

# بناء التطبيق
echo "📦 بناء التطبيق..."
npm run build

# التحقق من نجاح البناء
if [ $? -eq 0 ]; then
    echo "✅ تم بناء التطبيق بنجاح!"
    
    # عرض خيارات الرفع
    echo ""
    echo "🌐 خيارات الرفع المتاحة:"
    echo "1. Vercel (vercel --prod)"
    echo "2. Netlify (netlify deploy --prod --dir=build)"
    echo "3. GitHub Pages (git subtree push --prefix build origin gh-pages)"
    echo ""
    echo "📁 مجلد البناء جاهز في: ./build"
    echo "🔗 يمكنك رفع محتويات هذا المجلد على أي منصة استضافة"
    
else
    echo "❌ فشل في بناء التطبيق!"
    exit 1
fi
