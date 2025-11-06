import { Request, Response } from 'express';
import Opportunity from '../models/Opportunity';
import Application from '../models/Application';

// Seed opportunities function
const seedOpportunities = async () => {
  try {
    // Clear existing opportunities first
    await Opportunity.deleteMany({});
    
    const demoOpportunities = [
      {
        title: 'معسكر بيدر 2025',
        description: 'في ظل وجود عدد كبير من المشاريع الناشئة والأفكار الريادية الواعدة، يوفر بـَـيدر فرص كبيرة لتسخير وتركيز جهدك في المكان الصحيح. هذا المعسكر مصمم خصيصاً لتطوير مهارات ريادة الأعمال والابتكار لدى المشاركين من خلال ورش عمل تفاعلية وجلسات تدريبية متخصصة مع نخبة من الخبراء في المجال.',
        shortDescription: 'معسكر ريادة الأعمال والابتكار',
        type: 'competition',
        category: 'business',
        company: {
          name: 'بيدر',
          logo: '/images/bedar-camp-2025.jpeg',
          website: 'https://bedar.com',
          description: 'منصة ريادة الأعمال الرائدة في المملكة'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['أي مستوى تعليمي'],
          experience: ['فكرة مشروع ريادي'],
          skills: ['ريادة الأعمال', 'الابتكار', 'العمل الجماعي'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['شهادة مشاركة', 'شبكة علاقات', 'تطوير المهارات'],
        applicationDeadline: new Date('2025-03-15'),
        startDate: new Date('2025-04-01'),
        endDate: new Date('2025-04-05'),
        maxApplicants: 50,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['ريادة الأعمال', 'الابتكار', 'التطوير'],
        language: 'en',
        seo: {
          slug: 'bedar-camp-2025',
          metaTitle: 'معسكر بيدر 2025 - ريادة الأعمال والابتكار',
          metaDescription: 'انضم إلى معسكر بيدر 2025 لتطوير مهاراتك في ريادة الأعمال والابتكار'
        },
        contactInfo: {
          email: 'info@bedar.com',
          website: 'https://bedar.com'
        },
        applicationProcess: {
          steps: ['التسجيل', 'تقديم الطلب', 'المقابلة', 'الاختيار'],
          requiredDocuments: ['السيرة الذاتية', 'رسالة الدافع', 'شهادة التخرج']
        },
        views: 0
      },
      {
        title: 'هاكاثون الطاقة (طاقتثون) 2025',
        description: 'هاكاثون الطاقة المستدامة هو مسابقة تقنية تهدف إلى تطوير حلول مبتكرة للطاقة النظيفة والمستدامة. يشارك في هذا الحدث المطورون والمصممون والمهندسون من جميع أنحاء المملكة لتقديم أفكار وحلول تقنية تساهم في تحقيق أهداف رؤية 2030 في مجال الطاقة المتجددة.',
        shortDescription: 'هاكاثون الطاقة المستدامة',
        type: 'competition',
        category: 'environment',
        company: {
          name: 'وزارة الطاقة',
          logo: '/images/energy-ministry.jpeg',
          website: 'https://energy.gov.sa',
          description: 'وزارة الطاقة والصناعة والثروة المعدنية'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['بكالوريوس في الهندسة أو علوم الحاسوب'],
          experience: ['خبرة في البرمجة والتطوير'],
          skills: ['البرمجة', 'التصميم', 'الابتكار'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['جوائز مالية', 'شهادة مشاركة', 'فرص عمل'],
        applicationDeadline: new Date('2025-02-28'),
        startDate: new Date('2025-03-15'),
        endDate: new Date('2025-03-17'),
        maxApplicants: 100,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['الطاقة', 'التقنية', 'الابتكار'],
        language: 'en',
        seo: {
          slug: 'energy-hackathon-2025',
          metaTitle: 'هاكاثون الطاقة 2025 - حلول الطاقة المستدامة',
          metaDescription: 'انضم إلى هاكاثون الطاقة لتطوير حلول مبتكرة للطاقة النظيفة'
        },
        contactInfo: {
          email: 'hackathon@energy.gov.sa',
          website: 'https://energy.gov.sa'
        },
        applicationProcess: {
          steps: ['التسجيل', 'تقديم الفكرة', 'التطوير', 'العرض'],
          requiredDocuments: ['السيرة الذاتية', 'مثال على العمل', 'خطة المشروع']
        },
        views: 0
      },
      {
        title: 'جائزة مايدة محي الدين ناظر للابتكار 3',
        description: 'جائزة مايدة محي الدين ناظر للابتكار هي مسابقة سنوية تهدف إلى تشجيع الابتكار والإبداع بين الطالبات في المملكة العربية السعودية. تقدم الجائزة دعماً مالياً ومعنوياً للمشاريع المبتكرة التي تساهم في تطوير المجتمع وحل المشاكل المحلية.',
        shortDescription: 'جائزة الابتكار للطالبات',
        type: 'competition',
        category: 'education',
        company: {
          name: 'مؤسسة مايدة',
          logo: '/images/maida-foundation.jpeg',
          website: 'https://maida.org',
          description: 'مؤسسة خيرية تدعم التعليم والابتكار'
        },
        location: {
          type: 'remote',
          address: 'جدة، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['طالبة في المرحلة الثانوية أو الجامعية'],
          experience: ['مشروع ابتكاري'],
          skills: ['الابتكار', 'التفكير الإبداعي', 'العرض'],
          languages: ['العربية']
        },
        benefits: ['جائزة مالية 90,000 ريال', 'شهادة تقدير', 'دعم المشروع'],
        applicationDeadline: new Date('2025-04-30'),
        startDate: new Date('2025-05-15'),
        endDate: new Date('2025-05-20'),
        maxApplicants: 200,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['الابتكار', 'الطالبات', 'الجوائز'],
        language: 'en',
        seo: {
          slug: 'maida-innovation-award-2025',
          metaTitle: 'جائزة مايدة للابتكار 2025',
          metaDescription: 'شارك في جائزة مايدة للابتكار واحصل على دعم لمشروعك المبتكر'
        },
        contactInfo: {
          email: 'award@maida.org',
          website: 'https://maida.org'
        },
        applicationProcess: {
          steps: ['التسجيل', 'تقديم المشروع', 'التقييم', 'الاختيار'],
          requiredDocuments: ['نموذج التقديم', 'وصف المشروع', 'فيديو العرض']
        },
        views: 0
      },
      {
        title: 'برنامج ريادة الأعمال لتطوير الألعاب – في اليابان',
        description: 'برنامج تدريبي متخصص في تطوير الألعاب في اليابان، يهدف إلى تطوير قدرات مطوري الألعاب السعوديين من خلال التعلم من الخبرة اليابانية في صناعة الألعاب. يتضمن البرنامج ورش عمل متخصصة وزيارات لشركات الألعاب اليابانية الرائدة.',
        shortDescription: 'برنامج تطوير الألعاب في اليابان',
        type: 'fellowship',
        category: 'technology',
        company: {
          name: 'معهد تطوير الألعاب الياباني',
          logo: '/images/japan-games-institute.jpeg',
          website: 'https://japan-games.org',
          description: 'معهد متخصص في تطوير الألعاب والتقنيات التفاعلية'
        },
        location: {
          type: 'onsite',
          address: 'طوكيو، اليابان',
          country: 'Japan'
        },
        requirements: {
          education: ['بكالوريوس في علوم الحاسوب أو الهندسة'],
          experience: ['خبرة في البرمجة وتطوير الألعاب'],
          skills: ['البرمجة', 'التصميم', 'الابتكار'],
          languages: ['الإنجليزية', 'اليابانية']
        },
        benefits: ['تدريب متخصص', 'شهادة دولية', 'فرص عمل'],
        applicationDeadline: new Date('2025-05-15'),
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-08-31'),
        maxApplicants: 20,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['الألعاب', 'اليابان', 'التدريب'],
        language: 'en',
        seo: {
          slug: 'japan-games-development-program-2025',
          metaTitle: 'برنامج تطوير الألعاب في اليابان 2025',
          metaDescription: 'انضم إلى برنامج تطوير الألعاب في اليابان وتعلم من الخبرة اليابانية'
        },
        contactInfo: {
          email: 'program@japan-games.org',
          website: 'https://japan-games.org'
        },
        applicationProcess: {
          steps: ['التسجيل', 'تقديم الطلب', 'المقابلة', 'الاختيار'],
          requiredDocuments: ['السيرة الذاتية', 'نماذج من العمل', 'رسالة الدافع']
        },
        views: 0
      },
      {
        title: 'Intersec Saudi Arabia 2025',
        description: 'معرض ومؤتمر الأمن والسلامة الأكبر في الشرق الأوسط، يجمع بين الشركات الرائدة في مجال الأمن السيبراني والسلامة الصناعية. يوفر فرصاً للتواصل مع الخبراء والشركات العالمية في مجال الأمن والسلامة. هذا الحدث يهدف إلى تعزيز الوعي بأهمية الأمن السيبراني والسلامة الصناعية في المنطقة، ويوفر منصة مثالية للشركات والمؤسسات لعرض أحدث التقنيات والحلول في هذا المجال. كما يوفر فرصاً للتواصل مع الخبراء والمتخصصين في مجال الأمن والسلامة، وتبادل الخبرات والمعرفة.',
        shortDescription: 'مؤتمر الأمن والسلامة',
        type: 'competition',
        category: 'technology',
        company: {
          name: 'Intersec',
          logo: '/images/intersec-2025.jpeg',
          website: 'https://intersec.com',
          description: 'منصة الأمن والسلامة الرائدة عالمياً'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['بكالوريوس في الأمن السيبراني أو الهندسة'],
          experience: ['خبرة في الأمن والسلامة'],
          skills: ['الأمن السيبراني', 'السلامة الصناعية', 'التواصل'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['شهادة مشاركة', 'شبكة علاقات', 'فرص عمل'],
        applicationDeadline: new Date('2025-01-31'),
        startDate: new Date('2025-02-15'),
        endDate: new Date('2025-02-17'),
        maxApplicants: 500,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['الأمن', 'السلامة', 'التقنية'],
        language: 'en',
        seo: {
          slug: 'intersec-saudi-arabia-2025',
          metaTitle: 'Intersec Saudi Arabia 2025 - الأمن والسلامة',
          metaDescription: 'انضم إلى أكبر معرض للأمن والسلامة في الشرق الأوسط'
        },
        contactInfo: {
          email: 'info@intersec.com',
          website: 'https://intersec.com'
        },
        applicationProcess: {
          steps: ['التسجيل', 'تقديم الطلب', 'الموافقة', 'المشاركة'],
          requiredDocuments: ['السيرة الذاتية', 'شهادة التخصص', 'رسالة الدافع']
        },
        views: 0
      },
      {
        title: 'حاضنة الذكاء الاصطناعي 2025',
        description: 'حاضنة متخصصة في دعم المشاريع الناشئة في مجال الذكاء الاصطناعي، تقدم التمويل والاستشارات التقنية للمشاريع المبتكرة. تهدف إلى تطوير منظومة الابتكار في المملكة في مجال الذكاء الاصطناعي. توفر الحاضنة بيئة عمل متكاملة للمشاريع الناشئة، مع إمكانية الوصول إلى الخبراء والمستثمرين، وفرص التدريب والتطوير المهني في أحدث تقنيات الذكاء الاصطناعي.',
        shortDescription: 'حاضنة الذكاء الاصطناعي',
        type: 'fellowship',
        category: 'technology',
        company: {
          name: 'حاضنة الذكاء الاصطناعي',
          logo: '/images/ai-incubator-2025.jpeg',
          website: 'https://ai-incubator.sa',
          description: 'حاضنة متخصصة في الذكاء الاصطناعي'
        },
        location: {
          type: 'hybrid',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['بكالوريوس في علوم الحاسوب أو الهندسة'],
          experience: ['مشروع في الذكاء الاصطناعي'],
          skills: ['الذكاء الاصطناعي', 'البرمجة', 'ريادة الأعمال'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['تمويل', 'استشارات', 'شبكة علاقات'],
        applicationDeadline: new Date('2025-12-31'),
        startDate: new Date('2025-08-01'),
        maxApplicants: 30,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['الذكاء الاصطناعي', 'الحاضنة', 'التمويل'],
        language: 'en',
        seo: {
          slug: 'ai-incubator-2025',
          metaTitle: 'حاضنة الذكاء الاصطناعي 2025',
          metaDescription: 'انضم إلى حاضنة الذكاء الاصطناعي واحصل على دعم لمشروعك'
        },
        contactInfo: {
          email: 'info@ai-incubator.sa',
          website: 'https://ai-incubator.sa'
        },
        applicationProcess: {
          steps: ['التسجيل', 'تقديم المشروع', 'التقييم', 'الاختيار'],
          requiredDocuments: ['نموذج التقديم', 'وصف المشروع', 'خطة العمل']
        },
        views: 0
      },
      {
        title: 'معرض التوظيف 2025',
        description: 'معرض التوظيف السنوي لجامعة الملك فهد للبترول والمعادن تحت رعاية سعادة رئيس الجامعة، يفتح الآفاق ويبني المستقبل للخريجين. يجمع بين الشركات الرائدة في المملكة لتقديم فرص عمل متنوعة للخريجين. هذا المعرض يوفر فرصة فريدة للخريجين للتواصل المباشر مع أصحاب العمل، والتعرف على أحدث الفرص الوظيفية في مختلف القطاعات. كما يتضمن ورش عمل حول كتابة السيرة الذاتية ومهارات المقابلات الشخصية، وفرص للتواصل مع الخبراء في مجال التوظيف.',
        shortDescription: 'معرض التوظيف الجامعي',
        type: 'job',
        category: 'education',
        company: {
          name: 'جامعة الملك فهد',
          logo: '/images/job-fair-2025.jpeg',
          website: 'https://kfupm.edu.sa',
          description: 'جامعة الملك فهد للبترول والمعادن'
        },
        location: {
          type: 'onsite',
          address: 'الظهران، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['خريج جامعي'],
          experience: ['لا توجد متطلبات مسبقة'],
          skills: ['التخصص المطلوب', 'المهارات الناعمة'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['فرص توظيف', 'شبكة علاقات', 'استشارات مهنية'],
        applicationDeadline: new Date('2025-12-31'),
        startDate: new Date('2025-03-15'),
        endDate: new Date('2025-03-17'),
        maxApplicants: 1000,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['التوظيف', 'الجامعة', 'الفرص'],
        language: 'en',
        seo: {
          slug: 'job-fair-2025',
          metaTitle: 'معرض التوظيف 2025 - جامعة الملك فهد',
          metaDescription: 'انضم إلى معرض التوظيف السنوي واحصل على فرص عمل متنوعة'
        },
        contactInfo: {
          email: 'careers@kfupm.edu.sa',
          website: 'https://kfupm.edu.sa'
        },
        applicationProcess: {
          steps: ['التسجيل', 'تقديم السيرة الذاتية', 'المقابلة', 'الاختيار'],
          requiredDocuments: ['السيرة الذاتية', 'شهادة التخرج', 'رسالة الدافع']
        },
        views: 0
      },
      {
        title: 'برنامج موهبة للالتحاق بالجامعات المرموقة (التميز) 2025',
        description: 'برنامج التميز للالتحاق بالجامعات الأمريكية المرموقة، يهدف إلى دعم الطلاب المتميزين للالتحاق بأفضل الجامعات العالمية. يتضمن البرنامج إعداد أكاديمي ولغوي مكثف بالإضافة إلى الدعم المالي. يوفر البرنامج فرصاً استثنائية للطلاب المتميزين للالتحاق بأفضل الجامعات الأمريكية مثل هارفارد وستانفورد ومعهد ماساتشوستس للتكنولوجيا. يتضمن البرنامج إعداداً شاملاً يشمل التحضير للاختبارات الدولية وكتابة المقالات الشخصية وتطوير المهارات القيادية.',
        shortDescription: 'برنامج التميز للجامعات الأمريكية',
        type: 'scholarship',
        category: 'education',
        company: {
          name: 'مؤسسة الملك عبدالعزيز ورجاله للموهبة والإبداع',
          logo: '/images/mawhiba-2025.jpeg',
          website: 'https://mawhiba.org.sa',
          description: 'مؤسسة دعم الموهوبين والمبدعين'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['طالب في المرحلة الثانوية'],
          experience: ['تميز أكاديمي'],
          skills: ['التميز الأكاديمي', 'اللغة الإنجليزية', 'القيادة'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['منحة دراسية', 'إعداد أكاديمي', 'دعم مالي'],
        applicationDeadline: new Date('2025-04-30'),
        startDate: new Date('2025-08-01'),
        endDate: new Date('2029-05-31'),
        maxApplicants: 100,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['التميز', 'الجامعات الأمريكية', 'المنح'],
        language: 'en',
        seo: {
          slug: 'mawhiba-excellence-program-2025',
          metaTitle: 'برنامج موهبة للتميز 2025',
          metaDescription: 'انضم إلى برنامج التميز للالتحاق بالجامعات الأمريكية المرموقة'
        },
        contactInfo: {
          email: 'excellence@mawhiba.org.sa',
          website: 'https://mawhiba.org.sa'
        },
        applicationProcess: {
          steps: ['التسجيل', 'الاختبارات', 'المقابلة', 'الاختيار'],
          requiredDocuments: ['السجل الأكاديمي', 'شهادات التميز', 'رسالة الدافع']
        },
        views: 0
      },
      {
        title: 'ماراثون الأفكار أيدياثون 2025',
        description: 'ماراثون الأفكار المجتمعية في جازان، يهدف إلى تطوير حلول مبتكرة للمشاكل المحلية في المنطقة. يجمع بين المبدعين والمطورين لتقديم أفكار وحلول تقنية تساهم في تطوير المجتمع المحلي. هذا الحدث يوفر منصة مثالية للشباب المبدعين لتقديم أفكارهم الإبداعية وحلولهم التقنية للمشاكل المجتمعية. يتضمن البرنامج ورش عمل حول الابتكار وتطوير الأفكار، وفرص للتواصل مع الخبراء والمستثمرين في مجال التكنولوجيا والابتكار.',
        shortDescription: 'ماراثون الأفكار المجتمعية',
        type: 'competition',
        category: 'social-impact',
        company: {
          name: 'أيدياثون جازان',
          logo: '/images/ideathon-2025.jpeg',
          website: 'https://jazan-ideathon.com',
          description: 'ماراثون الأفكار المجتمعية'
        },
        location: {
          type: 'onsite',
          address: 'جازان، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['أي مستوى تعليمي'],
          experience: ['اهتمام بالمشاريع المجتمعية'],
          skills: ['الابتكار', 'حل المشاكل', 'العمل الجماعي'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['جوائز مالية', 'شهادة مشاركة', 'فرص تطوير'],
        applicationDeadline: new Date('2025-12-31'),
        startDate: new Date('2025-11-01'),
        endDate: new Date('2025-11-03'),
        maxApplicants: 150,
        currentApplicants: 0,
        status: 'active',
        isFeatured: true,
        tags: ['ماراثون', 'الأفكار', 'المجتمع'],
        language: 'en',
        seo: {
          slug: 'jazan-ideathon-2025',
          metaTitle: 'ماراثون الأفكار جازان 2025',
          metaDescription: 'انضم إلى ماراثون الأفكار المجتمعية في جازان وطور حلول مبتكرة'
        },
        contactInfo: {
          email: 'info@jazan-ideathon.com',
          website: 'https://jazan-ideathon.com'
        },
        applicationProcess: {
          steps: ['التسجيل', 'تقديم الفكرة', 'التطوير', 'العرض'],
          requiredDocuments: ['نموذج التقديم', 'وصف الفكرة', 'خطة التنفيذ']
        },
        views: 0
      }
    ];

    // Insert opportunities into database
    await Opportunity.insertMany(demoOpportunities);
    console.log('✅ Opportunities seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding opportunities:', error);
  }
};

// @desc    Get all opportunities
// @route   GET /api/opportunities
// @access  Public
export const getOpportunities = async (req: Request, res: Response) => {
  try {
    // Get opportunities from database
    let opportunities = await Opportunity.find({})
      .sort({ createdAt: -1 })
      .limit(50);

    // If no opportunities in database, seed with demo data
    if (opportunities.length === 0) {
      console.log('No opportunities in database, seeding with demo data');
      await seedOpportunities();
      // Try again after seeding
      opportunities = await Opportunity.find({})
        .sort({ createdAt: -1 })
        .limit(50);
    }

    // Get pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Opportunity.countDocuments({});
    
    // Get paginated opportunities
    const paginatedOpportunities = await Opportunity.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: {
        opportunities: paginatedOpportunities,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error: any) {
    console.error('Get opportunities error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرص',
      error: error.message
    });
  }
};

// @desc    Get single opportunity
// @route   GET /api/opportunities/:id
// @access  Public
export const getOpportunity = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    res.json({
      success: true,
      data: {
        opportunity
      }
    });
  } catch (error: any) {
    console.error('Get opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرصة',
      error: error.message
    });
  }
};

// @desc    Create new opportunity
// @route   POST /api/opportunities
// @access  Private/Admin
export const createOpportunity = async (req: Request, res: Response) => {
  try {
    const opportunity = new Opportunity(req.body);
    await opportunity.save();

    res.status(201).json({
      success: true,
      data: {
        opportunity
      }
    });
  } catch (error: any) {
    console.error('Create opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إنشاء الفرصة',
      error: error.message
    });
  }
};

// @desc    Update opportunity
// @route   PUT /api/opportunities/:id
// @access  Private/Admin
export const updateOpportunity = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    res.json({
      success: true,
      data: {
        opportunity
      }
    });
  } catch (error: any) {
    console.error('Update opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحديث الفرصة',
      error: error.message
    });
  }
};

// @desc    Delete opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private/Admin
export const deleteOpportunity = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الفرصة بنجاح'
    });
  } catch (error: any) {
    console.error('Delete opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في حذف الفرصة',
      error: error.message
    });
  }
};

// @desc    Apply for opportunity
// @route   POST /api/opportunities/:id/apply
// @access  Private
export const applyForOpportunity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, coverLetter, resume } = req.body;

    // Check if opportunity exists
    const opportunity = await Opportunity.findById(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      opportunity: id,
      user: userId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'لقد تقدمت لهذه الفرصة من قبل'
      });
    }

    // Create application
    const application = new Application({
      opportunity: id,
      user: userId,
      coverLetter,
      resume,
      status: 'pending'
    });

    await application.save();

    // Update opportunity applicants count
    opportunity.currentApplicants += 1;
    opportunity.applicantsList.push(userId);
    await opportunity.save();

    res.status(201).json({
      success: true,
      data: {
        application
      }
    });
  } catch (error: any) {
    console.error('Apply for opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في التقديم للفرصة',
      error: error.message
    });
  }
};

// @desc    Get user applications
// @route   GET /api/opportunities/applications
// @access  Private
export const getUserApplications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    const applications = await Application.find({ user: userId })
      .populate('opportunity', 'title company location applicationDeadline')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        applications
      }
    });
  } catch (error: any) {
    console.error('Get user applications error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب طلبات التقديم',
      error: error.message
    });
  }
};

// @desc    Get opportunity applications
// @route   GET /api/opportunities/:id/applications
// @access  Private/Admin
export const getOpportunityApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find({ opportunity: req.params.id })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        applications
      }
    });
  } catch (error: any) {
    console.error('Get opportunity applications error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب طلبات التقديم',
      error: error.message
    });
  }
};

// @desc    Update application status
// @route   PUT /api/opportunities/applications/:id
// @access  Private/Admin
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'طلب التقديم غير موجود'
      });
    }

    res.json({
      success: true,
      data: {
        application
      }
    });
  } catch (error: any) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحديث حالة طلب التقديم',
      error: error.message
    });
  }
};

// @desc    Search opportunities
// @route   GET /api/opportunities/search
// @access  Public
export const searchOpportunities = async (req: Request, res: Response) => {
  try {
    const { q, type, category, location, page = 1, limit = 10 } = req.query;
    
    let query: any = {};
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q as string, 'i')] } }
      ];
    }
    
    if (type) {
      query.type = type;
    }
    
    if (category) {
      query.category = category;
    }
    
    if (location) {
      query['location.city'] = { $regex: location, $options: 'i' };
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const opportunities = await Opportunity.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Opportunity.countDocuments(query);

    res.json({
      success: true,
      data: {
        opportunities,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
          hasNext: Number(page) < Math.ceil(total / Number(limit)),
          hasPrev: Number(page) > 1
        }
      }
    });
  } catch (error: any) {
    console.error('Search opportunities error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في البحث عن الفرص',
      error: error.message
    });
  }
};

// @desc    Get featured opportunities
// @route   GET /api/opportunities/featured
// @access  Public
export const getFeaturedOpportunities = async (req: Request, res: Response) => {
  try {
    const opportunities = await Opportunity.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      data: {
        opportunities
      }
    });
  } catch (error: any) {
    console.error('Get featured opportunities error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرص المميزة',
      error: error.message
    });
  }
};

// @desc    Get urgent opportunities
// @route   GET /api/opportunities/urgent
// @access  Public
export const getUrgentOpportunities = async (req: Request, res: Response) => {
  try {
    const opportunities = await Opportunity.find({ isUrgent: true })
      .sort({ applicationDeadline: 1 })
      .limit(4);

    res.json({
      success: true,
      data: {
        opportunities
      }
    });
  } catch (error: any) {
    console.error('Get urgent opportunities error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرص العاجلة',
      error: error.message
    });
  }
};

// @desc    Get opportunities by type
// @route   GET /api/opportunities/type/:type
// @access  Public
export const getOpportunitiesByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const opportunities = await Opportunity.find({ type })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Opportunity.countDocuments({ type });

    res.json({
      success: true,
      data: {
        opportunities,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
          hasNext: Number(page) < Math.ceil(total / Number(limit)),
          hasPrev: Number(page) > 1
        }
      }
    });
  } catch (error: any) {
    console.error('Get opportunities by type error:', error);
    res.status(500).json({
        success: false,
      message: 'خطأ في جلب الفرص حسب النوع',
      error: error.message
    });
  }
};

// @desc    Get opportunities by category
// @route   GET /api/opportunities/category/:category
// @access  Public
export const getOpportunitiesByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const opportunities = await Opportunity.find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Opportunity.countDocuments({ category });

    res.json({
      success: true,
      data: {
        opportunities,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
          hasNext: Number(page) < Math.ceil(total / Number(limit)),
          hasPrev: Number(page) > 1
        }
      }
    });
  } catch (error: any) {
    console.error('Get opportunities by category error:', error);
    res.status(500).json({
        success: false,
      message: 'خطأ في جلب الفرص حسب الفئة',
      error: error.message
    });
  }
};

// @desc    Get opportunities statistics
// @route   GET /api/opportunities/stats
// @access  Private/Admin
export const getOpportunitiesStats = async (req: Request, res: Response) => {
  try {
    const total = await Opportunity.countDocuments();
    const active = await Opportunity.countDocuments({ status: 'active' });
    const closed = await Opportunity.countDocuments({ status: 'closed' });
    const expired = await Opportunity.countDocuments({ status: 'expired' });
    const draft = await Opportunity.countDocuments({ status: 'draft' });
    
    const typeStats = await Opportunity.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    const categoryStats = await Opportunity.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        status: {
          active,
          closed,
          expired,
          draft
        },
        typeStats,
        categoryStats
      }
    });
  } catch (error: any) {
    console.error('Get opportunities stats error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب إحصائيات الفرص',
      error: error.message
    });
  }
};