const axios = require('axios');

// بيانات الفرص التجريبية
const opportunities = [
  {
    title: "معسكر بيدر 2025",
    description: "في ظل وجود عدد كبير من المشاريع الناشئة والأفكار الريادية الواعدة، يوفر بـَـيدر فرص كبيرة لتسخير وتركيز جهدك في المكان الصحيح. هذا المعسكر مصمم خصيصاً لرواد الأعمال والمبتكرين الذين يسعون لتطوير أفكارهم وتحويلها إلى مشاريع ناجحة.",
    shortDescription: "معسكر ريادة الأعمال والابتكار",
    type: "competition",
    category: "business",
    company: {
      name: "بيدر",
      logo: "/images/bedar-camp-2025.jpeg",
      website: "https://bedar.com",
      description: "منصة ريادة الأعمال والابتكار"
    },
    location: {
      type: "onsite",
      address: "الرياض، المملكة العربية السعودية",
      country: "Saudi Arabia"
    },
    requirements: {
      education: ["أي مستوى تعليمي"],
      experience: ["لا توجد متطلبات مسبقة"],
      skills: ["ريادة الأعمال", "الابتكار", "العمل الجماعي"],
      languages: ["العربية", "الإنجليزية"]
    },
    benefits: ["شهادة مشاركة", "شبكة علاقات", "تطوير المهارات"],
    applicationDeadline: new Date("2025-12-31"),
    startDate: new Date("2025-03-01"),
    maxApplicants: 100,
    tags: ["ريادة الأعمال", "الابتكار", "المعسكر"],
    language: "ar",
    isFeatured: true,
    isUrgent: false,
    status: "active",
    seo: {
      slug: "bedar-camp-2025"
    }
  },
  {
    title: "جائزة مايدة محي الدين ناظر للابتكار 3",
    description: "تحدي يجمع طالبات الجامعات لاستكشاف وتوظيف الابتكارات الجامعية، توفر جائزة مايدة محي الدين ناظر للابتكار. هذه المسابقة تهدف إلى تشجيع الطالبات على الابتكار والإبداع في مجالات مختلفة.",
    shortDescription: "مسابقة ابتكار للطالبات",
    type: "competition",
    category: "technology",
    company: {
      name: "جائزة مايدة",
      logo: "/images/maida-award.jpeg",
      website: "https://maida-award.com",
      description: "جائزة الابتكار للطالبات"
    },
    location: {
      type: "onsite",
      address: "جامعة دار الحكمة - جدة",
      country: "Saudi Arabia"
    },
    requirements: {
      education: ["طالبة في مرحلة البكالوريوس والماجستير"],
      experience: ["لا توجد متطلبات مسبقة"],
      skills: ["الابتكار", "البحث العلمي", "العمل الجماعي"],
      languages: ["العربية"]
    },
    benefits: ["المركز الأول: 90,000 ريال", "المركز الثاني: 70,000 ريال", "المركز الثالث: 40,000 ريال"],
    applicationDeadline: new Date("2025-09-25"),
    startDate: new Date("2025-10-01"),
    maxApplicants: 50,
    tags: ["تحسين جودة الحياة لكبار السن والمكفوفين", "إحياء اللغة العربية بحلول رقمية مبتكرة"],
    language: "ar",
    isFeatured: true,
    isUrgent: true,
    status: "active",
    seo: {
      slug: "maida-award-2025"
    }
  },
  {
    title: "هاكاثون الطاقة (طاقتثون) 2025",
    description: "مسابقة تجمع رواد الأعمال والباحثين لتطوير حلول ابتكارية تعزز استدامة الطاقة من خلال ورش عمل ومسابقات تقنية. هذا الهاكاثون يهدف إلى دعم الابتكار في مجال الطاقة النظيفة والمستدامة.",
    shortDescription: "هاكاثون الطاقة المستدامة",
    type: "competition",
    category: "technology",
    company: {
      name: "جمعية الطاقة للتنمية المستدامة",
      logo: "/images/energy-hackathon.jpeg",
      website: "https://taqa.org.sa",
      description: "جمعية الطاقة للتنمية المستدامة"
    },
    location: {
      type: "onsite",
      address: "غير محدد",
      country: "Saudi Arabia"
    },
    requirements: {
      education: ["أي مستوى تعليمي"],
      experience: ["لا توجد متطلبات مسبقة"],
      skills: ["البرمجة", "ريادة الأعمال", "الطاقة المستدامة"],
      languages: ["العربية", "الإنجليزية"]
    },
    benefits: ["شهادة مشاركة", "جوائز مالية", "فرص استثمارية"],
    applicationDeadline: new Date("2025-12-31"),
    startDate: new Date("2025-06-01"),
    maxApplicants: 200,
    tags: ["الطاقة المستدامة", "الهاكاثون", "الابتكار"],
    language: "ar",
    isFeatured: true,
    isUrgent: false,
    status: "active",
    seo: {
      slug: "energy-hackathon-2025"
    }
  }
];

async function seedRemoteData() {
  const baseUrl = 'https://new-haymanh.onrender.com';
  
  try {
    console.log('🌱 بدء إضافة البيانات التجريبية للخادم البعيد...');
    
    // اختبار الاتصال
    console.log('🔍 اختبار الاتصال بالخادم...');
    const healthResponse = await axios.get(`${baseUrl}/health`);
    console.log('✅ الخادم متاح:', healthResponse.data.message);
    
    // إضافة الفرص
    console.log('📝 إضافة الفرص...');
    for (const opportunity of opportunities) {
      try {
        const response = await axios.post(`${baseUrl}/api/opportunities`, opportunity, {
          headers: {
            'Content-Type': 'application/json',
            // ملاحظة: ستحتاج token للمدير لإضافة الفرص
            // 'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
          }
        });
        console.log(`✅ تم إضافة: ${opportunity.title}`);
      } catch (error) {
        console.log(`❌ خطأ في إضافة ${opportunity.title}:`, error.response?.data?.message || error.message);
      }
    }
    
    // التحقق من النتائج
    console.log('🔍 التحقق من النتائج...');
    const opportunitiesResponse = await axios.get(`${baseUrl}/api/opportunities`);
    console.log(`📊 عدد الفرص المتاحة: ${opportunitiesResponse.data.data.opportunities.length}`);
    
    console.log('🎉 تم إكمال إضافة البيانات التجريبية!');
    
  } catch (error) {
    console.error('❌ خطأ في إضافة البيانات:', error.response?.data || error.message);
  }
}

// تشغيل السكريبت
seedRemoteData();
