import mongoose from 'mongoose';
import Content from '../models/Content';
import User from '../models/User';

const seedAdminData = async () => {
  try {
    console.log('🌱 بدء إنشاء بيانات الإدارة التجريبية...');

    // Find admin user
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('❌ لم يتم العثور على مستخدم إداري');
      return;
    }

    // Home page content
    const homeContent = {
      pageId: 'home',
      pageTitle: 'الصفحة الرئيسية',
      pageType: 'home',
      language: 'ar',
      sections: [
        {
          sectionId: 'hero_section',
          sectionType: 'hero',
          title: 'مرحباً بك في مبادرة هيمان للنجاح',
          content: 'منصة شاملة لتنمية المهارات والفرص التعليمية والمهنية',
          images: ['/images/hero-bg.jpg'],
          links: [
            {
              text: 'اكتشف البرامج',
              url: '/programs',
              type: 'internal'
            },
            {
              text: 'تصفح الفرص',
              url: '/opportunities',
              type: 'internal'
            }
          ],
          metadata: {
            backgroundColor: '#667eea',
            textColor: '#ffffff'
          },
          order: 0,
          isActive: true
        },
        {
          sectionId: 'features_section',
          sectionType: 'cards',
          title: 'مميزات المنصة',
          content: 'اكتشف المميزات التي تجعل منصتنا الأفضل',
          images: [],
          links: [],
          metadata: {
            cardType: 'feature',
            columns: 3
          },
          order: 1,
          isActive: true
        },
        {
          sectionId: 'stats_section',
          sectionType: 'list',
          title: 'إحصائيات المنصة',
          content: 'أرقام تتحدث عن نفسها',
          images: [],
          links: [],
          metadata: {
            listType: 'stats',
            items: [
              { label: 'المستخدمين النشطين', value: '10,000+' },
              { label: 'البرامج المتاحة', value: '50+' },
              { label: 'الفرص المفتوحة', value: '200+' }
            ]
          },
          order: 2,
          isActive: true
        }
      ],
      seo: {
        metaTitle: 'مبادرة هيمان للنجاح - منصة التعليم والفرص',
        metaDescription: 'منصة شاملة لتنمية المهارات والفرص التعليمية والمهنية في المملكة العربية السعودية',
        keywords: ['تعليم', 'تدريب', 'فرص', 'مهارات', 'نجاح'],
        slug: 'home'
      },
      isPublished: true,
      publishedAt: new Date(),
      lastModified: new Date(),
      modifiedBy: adminUser._id,
      version: 1
    };

    // About page content
    const aboutContent = {
      pageId: 'about',
      pageTitle: 'من نحن',
      pageType: 'about',
      language: 'ar',
      sections: [
        {
          sectionId: 'about_hero',
          sectionType: 'hero',
          title: 'من نحن',
          content: 'مبادرة هيمان للنجاح - رؤية مستقبلية للتعليم والتنمية',
          images: ['/images/about-hero.jpg'],
          links: [],
          metadata: {},
          order: 0,
          isActive: true
        },
        {
          sectionId: 'mission_section',
          sectionType: 'text',
          title: 'رسالتنا',
          content: 'نسعى لتوفير منصة شاملة تمكن الشباب السعودي من اكتساب المهارات اللازمة لسوق العمل المستقبلي، وتوفر لهم الفرص المناسبة للتطوير والنمو المهني.',
          images: [],
          links: [],
          metadata: {},
          order: 1,
          isActive: true
        },
        {
          sectionId: 'vision_section',
          sectionType: 'text',
          title: 'رؤيتنا',
          content: 'أن نكون المنصة الرائدة في المملكة العربية السعودية لتطوير المهارات وتوفير الفرص التعليمية والمهنية للشباب.',
          images: [],
          links: [],
          metadata: {},
          order: 2,
          isActive: true
        },
        {
          sectionId: 'values_section',
          sectionType: 'list',
          title: 'قيمنا',
          content: 'القيم التي نؤمن بها ونسعى لتحقيقها',
          images: [],
          links: [],
          metadata: {
            listType: 'values',
            items: [
              'التميز في التعليم',
              'الابتكار في التطوير',
              'الشراكة مع المجتمع',
              'الشفافية في العمل'
            ]
          },
          order: 3,
          isActive: true
        }
      ],
      seo: {
        metaTitle: 'من نحن - مبادرة هيمان للنجاح',
        metaDescription: 'تعرف على مبادرة هيمان للنجاح، رؤيتنا ورسالتنا وقيمنا في تطوير التعليم والفرص',
        keywords: ['من نحن', 'رؤية', 'رسالة', 'قيم', 'مبادرة هيمان'],
        slug: 'about'
      },
      isPublished: true,
      publishedAt: new Date(),
      lastModified: new Date(),
      modifiedBy: adminUser._id,
      version: 1
    };

    // Programs page content
    const programsContent = {
      pageId: 'programs',
      pageTitle: 'البرامج',
      pageType: 'programs',
      language: 'ar',
      sections: [
        {
          sectionId: 'programs_hero',
          sectionType: 'hero',
          title: 'برامجنا التدريبية',
          content: 'اكتشف مجموعة متنوعة من البرامج التدريبية المصممة خصيصاً لتطوير مهاراتك',
          images: ['/images/programs-hero.jpg'],
          links: [
            {
              text: 'تصفح البرامج',
              url: '/programs',
              type: 'internal'
            }
          ],
          metadata: {},
          order: 0,
          isActive: true
        },
        {
          sectionId: 'programs_categories',
          sectionType: 'cards',
          title: 'فئات البرامج',
          content: 'برامج متنوعة تغطي مختلف المجالات',
          images: [],
          links: [],
          metadata: {
            cardType: 'category',
            columns: 4
          },
          order: 1,
          isActive: true
        }
      ],
      seo: {
        metaTitle: 'البرامج التدريبية - مبادرة هيمان للنجاح',
        metaDescription: 'اكتشف مجموعة متنوعة من البرامج التدريبية لتطوير مهاراتك في مختلف المجالات',
        keywords: ['برامج', 'تدريب', 'مهارات', 'تطوير', 'تعليم'],
        slug: 'programs'
      },
      isPublished: true,
      publishedAt: new Date(),
      lastModified: new Date(),
      modifiedBy: adminUser._id,
      version: 1
    };

    // Contact page content
    const contactContent = {
      pageId: 'contact',
      pageTitle: 'اتصل بنا',
      pageType: 'contact',
      language: 'ar',
      sections: [
        {
          sectionId: 'contact_hero',
          sectionType: 'hero',
          title: 'تواصل معنا',
          content: 'نحن هنا لمساعدتك في رحلة التطوير والنمو',
          images: ['/images/contact-hero.jpg'],
          links: [],
          metadata: {},
          order: 0,
          isActive: true
        },
        {
          sectionId: 'contact_info',
          sectionType: 'text',
          title: 'معلومات التواصل',
          content: '📧 البريد الإلكتروني: mbadrt04@gmail.com\n📱 تليغرام: @Haymant2030\n⏰ متاح 24 ساعة طوال أيام الأسبوع',
          images: [],
          links: [
            {
              text: 'mbadrt04@gmail.com',
              url: 'mailto:mbadrt04@gmail.com',
              type: 'external'
            },
            {
              text: '@Haymant2030',
              url: 'https://t.me/Haymant2030',
              type: 'external'
            }
          ],
          metadata: {},
          order: 1,
          isActive: true
        },
        {
          sectionId: 'contact_form',
          sectionType: 'form',
          title: 'أرسل لنا رسالة',
          content: 'نرحب بأسئلتك واستفساراتك',
          images: [],
          links: [],
          metadata: {
            formFields: [
              { name: 'name', type: 'text', label: 'الاسم', required: true },
              { name: 'email', type: 'email', label: 'البريد الإلكتروني', required: true },
              { name: 'subject', type: 'text', label: 'الموضوع', required: true },
              { name: 'message', type: 'textarea', label: 'الرسالة', required: true }
            ]
          },
          order: 2,
          isActive: true
        }
      ],
      seo: {
        metaTitle: 'اتصل بنا - مبادرة هيمان للنجاح',
        metaDescription: 'تواصل معنا للحصول على المساعدة والدعم في رحلة التطوير والنمو',
        keywords: ['اتصل بنا', 'تواصل', 'مساعدة', 'دعم', 'استفسار'],
        slug: 'contact'
      },
      isPublished: true,
      publishedAt: new Date(),
      lastModified: new Date(),
      modifiedBy: adminUser._id,
      version: 1
    };

    // Clear existing content
    await Content.deleteMany({});

    // Create content pages
    await Content.create(homeContent);
    await Content.create(aboutContent);
    await Content.create(programsContent);
    await Content.create(contactContent);

    console.log('✅ تم إنشاء بيانات الإدارة التجريبية بنجاح');
    console.log('📄 الصفحات المنشأة:');
    console.log('   - الصفحة الرئيسية (home)');
    console.log('   - من نحن (about)');
    console.log('   - البرامج (programs)');
    console.log('   - اتصل بنا (contact)');

  } catch (error) {
    console.error('❌ خطأ في إنشاء بيانات الإدارة:', error);
  }
};

export default seedAdminData;
