const mongoose = require('mongoose');
require('dotenv').config();

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/haymanh-success', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// نموذج الفرصة (مبسط للاختبار)
const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: String,
  type: { 
    type: String, 
    enum: ['job', 'internship', 'volunteer', 'scholarship', 'fellowship', 'competition', 'grant'],
    required: true 
  },
  category: { 
    type: String, 
    enum: ['technology', 'education', 'healthcare', 'business', 'arts', 'sports', 'environment', 'social-impact'],
    required: true 
  },
  company: {
    name: { type: String, required: true },
    logo: String,
    website: String,
    description: String
  },
  location: {
    type: { 
      type: String, 
      enum: ['remote', 'onsite', 'hybrid'],
      required: true 
    },
    address: String,
    city: String,
    country: { type: String, default: 'Saudi Arabia' }
  },
  requirements: {
    education: [String],
    experience: [String],
    skills: [String],
    languages: [String]
  },
  benefits: [String],
  applicationDeadline: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['active', 'closed', 'expired', 'draft'],
    default: 'active'
  },
  seo: {
    slug: { type: String, required: true, unique: true }
  },
  currentApplicants: { type: Number, default: 0 },
  applicantsList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isFeatured: { type: Boolean, default: false },
  isUrgent: { type: Boolean, default: false },
  tags: [String],
  language: { type: String, enum: ['ar', 'en', 'both'], default: 'ar' }
}, { timestamps: true });

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

// البيانات التجريبية
const sampleOpportunities = [
  {
    title: "برنامج تدريبي في التكنولوجيا",
    description: "برنامج تدريبي شامل في مجال التكنولوجيا والبرمجة يهدف إلى تطوير مهارات الشباب السعودي في القطاع التقني. يشمل البرنامج تدريب على أحدث التقنيات في مجال البرمجة وتطوير التطبيقات والذكاء الاصطناعي.",
    shortDescription: "برنامج تدريبي شامل في التكنولوجيا والبرمجة",
    type: "internship",
    category: "technology",
    company: {
      name: "شركة التقنية المتقدمة",
      website: "https://techcompany.com"
    },
    location: {
      type: "onsite",
      city: "الرياض",
      address: "مركز الملك عبدالله المالي"
    },
    requirements: {
      education: ["بكالوريوس في علوم الحاسب أو ما يعادله"],
      experience: ["خبرة سنة واحدة على الأقل"],
      skills: ["JavaScript", "React", "Node.js"],
      languages: ["العربية", "الإنجليزية"]
    },
    benefits: ["راتب شهري 5000 ريال", "شهادة معتمدة", "فرص توظيف"],
    applicationDeadline: new Date('2024-12-31'),
    status: "active",
    seo: { slug: "tech-training-program-riyadh" },
    tags: ["تدريب", "تكنولوجيا", "برمجة"],
    isFeatured: true
  },
  {
    title: "منحة دراسية في الهندسة",
    description: "منحة دراسية كاملة لدراسة الهندسة في إحدى الجامعات المرموقة. تشمل المنحة الرسوم الدراسية كاملة وراتب شهري ومصاريف الإقامة والكتب الدراسية.",
    shortDescription: "منحة دراسية كاملة لدراسة الهندسة",
    type: "scholarship",
    category: "education",
    company: {
      name: "جامعة الملك سعود",
      website: "https://ksu.edu.sa"
    },
    location: {
      type: "onsite",
      city: "الرياض",
      address: "جامعة الملك سعود"
    },
    requirements: {
      education: ["شهادة الثانوية العامة بمعدل لا يقل عن 90%"],
      experience: [],
      skills: ["الرياضيات", "الفيزياء"],
      languages: ["العربية", "الإنجليزية"]
    },
    benefits: ["منحة كاملة", "راتب شهري", "سكن جامعي", "كتب مجانية"],
    applicationDeadline: new Date('2024-11-30'),
    status: "active",
    seo: { slug: "engineering-scholarship-ksu" },
    tags: ["منحة", "هندسة", "تعليم"],
    isFeatured: true
  },
  {
    title: "فرصة تطوع في التعليم",
    description: "فرصة تطوع رائعة للمساهمة في تعليم الأطفال في المناطق النائية. ستقوم بتدريس المواد الأساسية ومساعدة الطلاب على تطوير مهاراتهم الأكاديمية والحياتية.",
    shortDescription: "فرصة تطوع في تعليم الأطفال",
    type: "volunteer",
    category: "education",
    company: {
      name: "جمعية التعليم الخيرية",
      website: "https://education-charity.org"
    },
    location: {
      type: "onsite",
      city: "جدة",
      address: "مراكز التعليم المجتمعي"
    },
    requirements: {
      education: ["شهادة جامعية في أي تخصص"],
      experience: ["خبرة في التدريس مفضلة"],
      skills: ["التواصل", "الصبر", "حب الأطفال"],
      languages: ["العربية"]
    },
    benefits: ["شهادة تطوع", "خبرة تعليمية", "تطوير المهارات الشخصية"],
    applicationDeadline: new Date('2024-12-15'),
    status: "active",
    seo: { slug: "education-volunteer-jeddah" },
    tags: ["تطوع", "تعليم", "أطفال"]
  },
  {
    title: "وظيفة مطور ويب",
    description: "نبحث عن مطور ويب محترف للانضمام إلى فريقنا. ستكون مسؤولاً عن تطوير وصيانة المواقع الإلكترونية وتطبيقات الويب باستخدام أحدث التقنيات.",
    shortDescription: "وظيفة مطور ويب محترف",
    type: "job",
    category: "technology",
    company: {
      name: "شركة الحلول الرقمية",
      website: "https://digital-solutions.com"
    },
    location: {
      type: "hybrid",
      city: "الدمام",
      address: "مجمع الأعمال التقني"
    },
    requirements: {
      education: ["بكالوريوس في علوم الحاسب أو ما يعادله"],
      experience: ["3 سنوات خبرة في تطوير الويب"],
      skills: ["HTML", "CSS", "JavaScript", "React", "PHP"],
      languages: ["العربية", "الإنجليزية"]
    },
    benefits: ["راتب تنافسي", "تأمين صحي", "إجازات مدفوعة", "بيئة عمل مرنة"],
    applicationDeadline: new Date('2024-11-20'),
    status: "active",
    seo: { slug: "web-developer-job-dammam" },
    tags: ["وظيفة", "تطوير", "ويب"]
  },
  {
    title: "مسابقة الابتكار التقني",
    description: "مسابقة سنوية للابتكار التقني تهدف إلى تشجيع الشباب على تطوير حلول تقنية مبتكرة للتحديات المجتمعية. جوائز قيمة للفائزين.",
    shortDescription: "مسابقة للابتكار التقني مع جوائز قيمة",
    type: "competition",
    category: "technology",
    company: {
      name: "مؤسسة الابتكار السعودية",
      website: "https://innovation-foundation.sa"
    },
    location: {
      type: "remote",
      city: "المملكة العربية السعودية"
    },
    requirements: {
      education: ["طلاب جامعيين أو خريجين حديثين"],
      experience: [],
      skills: ["البرمجة", "التفكير الإبداعي", "حل المشكلات"],
      languages: ["العربية", "الإنجليزية"]
    },
    benefits: ["جائزة أولى 100,000 ريال", "جائزة ثانية 50,000 ريال", "شهادات تقدير", "فرص استثمار"],
    applicationDeadline: new Date('2024-10-31'),
    status: "active",
    seo: { slug: "tech-innovation-competition" },
    tags: ["مسابقة", "ابتكار", "تقنية"],
    isUrgent: true
  }
];

async function addSampleData() {
  try {
    console.log('🔄 جاري إضافة البيانات التجريبية...');
    
    // حذف البيانات الموجودة
    await Opportunity.deleteMany({});
    console.log('✅ تم حذف البيانات القديمة');
    
    // إضافة البيانات الجديدة
    const result = await Opportunity.insertMany(sampleOpportunities);
    console.log(`✅ تم إضافة ${result.length} فرصة بنجاح!`);
    
    console.log('📊 الفرص المضافة:');
    result.forEach((opp, index) => {
      console.log(`${index + 1}. ${opp.title} (${opp.type})`);
    });
    
  } catch (error) {
    console.error('❌ خطأ في إضافة البيانات:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔐 تم إغلاق الاتصال بقاعدة البيانات');
  }
}

addSampleData();
