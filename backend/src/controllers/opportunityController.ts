import { Request, Response } from 'express';
import Opportunity from '../models/Opportunity';
import Application from '../models/Application';

// @desc    Get all opportunities
// @route   GET /api/opportunities
// @access  Public
export const getOpportunities = async (req: Request, res: Response) => {
  try {
    // Get opportunities from database
    let opportunities = await Opportunity.find({})
      .sort({ createdAt: -1 })
      .limit(50);

    // If no opportunities in database, use demo data
    if (opportunities.length === 0) {
      console.log('No opportunities in database, using demo data');
      return getOpportunitiesDemo(req, res);
    }

    res.json({
      success: true,
      data: {
        opportunities,
        total: opportunities.length
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

// Keep demo opportunities as backup (commented out)
export const getOpportunitiesDemo = async (req: Request, res: Response) => {
  try {
    // Demo mode - return hardcoded opportunities
    const demoOpportunities = [
      {
        _id: 'opp1',
        title: 'معسكر بيدر 2025',
        description: 'في ظل وجود عدد كبير من المشاريع الناشئة والأفكار الريادية الواعدة، يوفر بـَـيدر فرص كبيرة لتسخير وتركيز جهدك في المكان الصحيح.',
        shortDescription: 'معسكر ريادة الأعمال والابتكار',
        type: 'camp',
        category: 'business',
        company: {
          name: 'بيدر',
          logo: '/images/bedar-camp-2025.jpeg',
          website: 'https://bedar.com',
          description: 'منصة ريادة الأعمال والابتكار'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['أي مستوى تعليمي'],
          experience: ['لا توجد متطلبات مسبقة'],
          skills: ['ريادة الأعمال', 'الابتكار', 'العمل الجماعي'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['شهادة مشاركة', 'شبكة علاقات', 'تطوير المهارات'],
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-03-01T00:00:00.000Z',
        maxApplicants: 100,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['ريادة الأعمال', 'الابتكار', 'المعسكر'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'opp2',
        title: 'هاكاثون الطاقة (طاقتثون) 2025',
        description: 'هاكاثون مخصص لتطوير حلول مبتكرة في مجال الطاقة المستدامة والتقنيات الخضراء.',
        shortDescription: 'هاكاثون الطاقة المستدامة',
        type: 'competition',
        category: 'environment',
        company: {
          name: 'طاقتثون',
          logo: '/images/energy-hackathon-2025.jpeg',
          website: 'https://energy-hackathon.com',
          description: 'منصة الابتكار في الطاقة المستدامة'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['أي مستوى تعليمي'],
          experience: ['لا توجد متطلبات مسبقة'],
          skills: ['البرمجة', 'الابتكار', 'الطاقة المستدامة'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['جوائز مالية', 'شهادة مشاركة', 'فرص توظيف'],
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-04-01T00:00:00.000Z',
        maxApplicants: 200,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['هاكاثون', 'الطاقة', 'الاستدامة'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'opp3',
        title: 'جائزة مايدة محي الدين ناظر للابتكار 3',
        description: 'تحدي يجمع طالبات الجامعات لاستكشاف وتوظيف الابتكارات الجامعية.',
        shortDescription: 'جائزة الابتكار للطالبات',
        type: 'competition',
        category: 'education',
        company: {
          name: 'جائزة مايدة',
          logo: '/images/maida-award-2025.jpeg',
          website: 'https://maida-award.com',
          description: 'جائزة الابتكار للطالبات'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['طالبة جامعية'],
          experience: ['لا توجد متطلبات مسبقة'],
          skills: ['الابتكار', 'البحث العلمي', 'العمل الجماعي'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['جوائز مالية', 'شهادة مشاركة', 'فرص تطوير'],
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-05-01T00:00:00.000Z',
        maxApplicants: 150,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['جائزة', 'الابتكار', 'الطالبات'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'opp4',
        title: 'برنامج ريادة الأعمال لتطوير الألعاب - اليابان',
        description: 'برنامج تدريبي مكثف لمطوري الألعاب السعوديين في اليابان، يشمل التدريب التقني وريادة الأعمال.',
        shortDescription: 'برنامج تطوير الألعاب في اليابان',
        type: 'internship',
        category: 'technology',
        company: {
          name: 'برنامج اليابان',
          logo: '/images/game-development-japan.jpeg',
          website: 'https://japan-program.com',
          description: 'برنامج التدريب في اليابان'
        },
        location: {
          type: 'onsite',
          address: 'اليابان',
          country: 'Japan'
        },
        requirements: {
          education: ['بكالوريوس في علوم الحاسب'],
          experience: ['خبرة في تطوير الألعاب'],
          skills: ['البرمجة', 'تطوير الألعاب', 'ريادة الأعمال'],
          languages: ['العربية', 'الإنجليزية', 'اليابانية']
        },
        benefits: ['تدريب مكثف', 'شهادة دولية', 'فرص توظيف'],
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-06-01T00:00:00.000Z',
        maxApplicants: 50,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['تطوير الألعاب', 'اليابان', 'ريادة الأعمال'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'opp5',
        title: 'Intersec Saudi Arabia 2025',
        description: 'مؤتمر ومعرض رائد في مجال الأمن والسلامة يجمع أكثر من 370 عارضًا من 35 دولة لاستكشاف أحدث الحلول الأمنية.',
        shortDescription: 'مؤتمر الأمن والسلامة',
        type: 'conference',
        category: 'technology',
        company: {
          name: 'Intersec',
          logo: '/images/intersec-saudi-2025.jpeg',
          website: 'https://intersec.com',
          description: 'مؤتمر الأمن والسلامة الدولي'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['أي مستوى تعليمي'],
          experience: ['اهتمام بمجال الأمن'],
          skills: ['الأمن السيبراني', 'التقنية', 'الشبكات'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['شهادة حضور', 'شبكة علاقات', 'معرفة حديثة'],
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-07-01T00:00:00.000Z',
        maxApplicants: 500,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['مؤتمر', 'الأمن', 'السلامة'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'opp6',
        title: 'حاضنة الذكاء الاصطناعي 2025',
        description: 'حاضنة متخصصة في دعم مشاريع الذكاء الاصطناعي للمبدعين من عمر 15 وفوق، توفر الدعم التقني والاستشارات والتمويل.',
        shortDescription: 'حاضنة الذكاء الاصطناعي',
        type: 'startup',
        category: 'technology',
        company: {
          name: 'حاضنة الذكاء الاصطناعي',
          logo: '/images/ai-incubator-2025.jpeg',
          website: 'https://ai-incubator.com',
          description: 'حاضنة متخصصة في الذكاء الاصطناعي'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['أي مستوى تعليمي'],
          experience: ['فكرة مشروع في الذكاء الاصطناعي'],
          skills: ['الذكاء الاصطناعي', 'البرمجة', 'ريادة الأعمال'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['تمويل', 'استشارات', 'شبكة علاقات'],
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-08-01T00:00:00.000Z',
        maxApplicants: 30,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['الذكاء الاصطناعي', 'الحاضنة', 'التمويل'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'opp7',
        title: 'معرض التوظيف 2025 - جامعة الملك فهد للبترول والمعادن',
        description: 'معرض التوظيف السنوي لجامعة الملك فهد للبترول والمعادن تحت رعاية سعادة رئيس الجامعة، يفتح الآفاق ويبني المستقبل للخريجين.',
        shortDescription: 'معرض التوظيف الجامعي',
        type: 'job_fair',
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
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-09-01T00:00:00.000Z',
        maxApplicants: 6000,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['معرض التوظيف', 'الجامعة', 'الخريجين'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'opp8',
        title: 'برنامج موهبة للالتحاق بالجامعات المرموقة (التميز) 2025',
        description: 'برنامج تدريبي متكامل لتأهيل وإعداد أفضل الطلبة الراغبين في الدراسة في الجامعات الأمريكية المرموقة المصنفة من ضمن أفضل 50 جامعة على مستوى العالم.',
        shortDescription: 'برنامج التميز للجامعات الأمريكية',
        type: 'scholarship',
        category: 'education',
        company: {
          name: 'موهبة',
          logo: '/images/mawhiba-excellence.jpeg',
          website: 'https://mawhiba.org.sa',
          description: 'مؤسسة الملك عبدالعزيز ورجاله للموهبة والإبداع'
        },
        location: {
          type: 'onsite',
          address: 'الرياض، المملكة العربية السعودية',
          country: 'Saudi Arabia'
        },
        requirements: {
          education: ['طالب ثانوي'],
          experience: ['تميز أكاديمي'],
          skills: ['اللغة الإنجليزية', 'القيادة', 'الابتكار'],
          languages: ['العربية', 'الإنجليزية']
        },
        benefits: ['منحة دراسية', 'تدريب مكثف', 'فرص دولية'],
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-10-01T00:00:00.000Z',
        maxApplicants: 100,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['موهبة', 'التميز', 'الجامعات الأمريكية'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'opp9',
        title: 'ماراثون الأفكار أيدياثون 2025',
        description: 'ماراثون للأفكار والمشاريع المجتمعية في منطقة جازان، يهدف إلى تحفيز الابتكار وتطوير حلول مبتكرة للتحديات المحلية.',
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
        applicationDeadline: '2025-12-31T00:00:00.000Z',
        startDate: '2025-11-01T00:00:00.000Z',
        maxApplicants: 150,
        currentApplicants: 0,
        status: 'active',
        isActive: true,
        isFeatured: true,
        isUrgent: false,
        tags: ['ماراثون', 'الأفكار', 'المجتمع'],
        language: 'ar',
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.type as string;
    const category = req.query.category as string;
    const status = req.query.status as string || 'active';
    const location = req.query.location as string;
    const search = req.query.search as string;
    const featured = req.query.featured === 'true';
    const urgent = req.query.urgent === 'true';
    const salaryRange = req.query.salaryRange as string;

    // Skip database query in demo mode
    // Apply filters to demo opportunities
    let filteredOpportunities = demoOpportunities;

    if (type) {
      filteredOpportunities = filteredOpportunities.filter(opp => opp.type === type);
    }

    if (category) {
      filteredOpportunities = filteredOpportunities.filter(opp => opp.category === category);
    }

    if (location) {
      filteredOpportunities = filteredOpportunities.filter(opp => opp.location.type === location);
    }

    if (featured) {
      filteredOpportunities = filteredOpportunities.filter(opp => opp.isFeatured === true);
    }

    if (urgent) {
      filteredOpportunities = filteredOpportunities.filter(opp => opp.isUrgent === true);
    }

    if (search) {
      filteredOpportunities = filteredOpportunities.filter(opp => 
        opp.title.toLowerCase().includes(search.toLowerCase()) ||
        opp.description.toLowerCase().includes(search.toLowerCase()) ||
        opp.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Return demo opportunities
    const total = filteredOpportunities.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const opportunities = filteredOpportunities.slice(skip, skip + limit);

    return res.json({
      success: true,
      data: {
        opportunities,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error: any) {
    console.error('Get opportunities error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرص',
      error: error.message
    });
  }
};

// @desc    Get opportunity by ID
// @route   GET /api/opportunities/:id
// @access  Public
export const getOpportunityById = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('company', 'name logo website description');

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Increment view count
    opportunity.views += 1;
    await opportunity.save();

    return res.json({
      success: true,
      data: { opportunity }
    });
  } catch (error: any) {
    console.error('Get opportunity by ID error:', error);
    return res.status(500).json({
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
    const {
      title,
      description,
      shortDescription,
      type,
      category,
      company,
      location,
      requirements,
      benefits,
      salary,
      duration,
      applicationDeadline,
      startDate,
      endDate,
      maxApplicants,
      tags,
      language,
      seo,
      contactInfo,
      applicationProcess
    } = req.body;

    const opportunity = new Opportunity({
      title,
      description,
      shortDescription,
      type,
      category,
      company,
      location,
      requirements,
      benefits,
      salary,
      duration,
      applicationDeadline,
      startDate,
      endDate,
      maxApplicants,
      tags,
      language,
      seo,
      contactInfo,
      applicationProcess
    });

    await opportunity.save();

    const populatedOpportunity = await Opportunity.findById(opportunity._id)
      .populate('company', 'name logo website');

    return res.status(201).json({
      success: true,
      message: 'تم إنشاء الفرصة بنجاح',
      data: { opportunity: populatedOpportunity }
    });
  } catch (error: any) {
    console.error('Create opportunity error:', error);
    return res.status(500).json({
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
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    const updateData = req.body;

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('company', 'name logo website');

    return res.json({
      success: true,
      message: 'تم تحديث الفرصة بنجاح',
      data: { opportunity: updatedOpportunity }
    });
  } catch (error: any) {
    console.error('Update opportunity error:', error);
    return res.status(500).json({
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
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Delete associated applications
    await Application.deleteMany({ opportunity: req.params.id });

    // Delete opportunity
    await Opportunity.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'تم حذف الفرصة بنجاح'
    });
  } catch (error: any) {
    console.error('Delete opportunity error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في حذف الفرصة',
      error: error.message
    });
  }
};

// @desc    Get opportunity by slug
// @route   GET /api/opportunities/slug/:slug
// @access  Public
export const getOpportunityBySlug = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findOne({ 'seo.slug': req.params.slug })
      .populate('company', 'name logo website description');

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Increment view count
    opportunity.views += 1;
    await opportunity.save();

    return res.json({
      success: true,
      data: { opportunity }
    });
  } catch (error: any) {
    console.error('Get opportunity by slug error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرصة',
      error: error.message
    });
  }
};

// @desc    Get featured opportunities
// @route   GET /api/opportunities/featured
// @access  Public
export const getFeaturedOpportunities = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const opportunities = await Opportunity.find({
      isFeatured: true,
      status: 'active'
    })
      .populate('company', 'name logo website')
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.json({
      success: true,
      data: { opportunities }
    });
  } catch (error: any) {
    console.error('Get featured opportunities error:', error);
    return res.status(500).json({
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
    const limit = parseInt(req.query.limit as string) || 5;

    const opportunities = await Opportunity.find({
      isUrgent: true,
      status: 'active'
    })
      .populate('company', 'name logo website')
      .sort({ applicationDeadline: 1 })
      .limit(limit);

    return res.json({
      success: true,
      data: { opportunities }
    });
  } catch (error: any) {
    console.error('Get urgent opportunities error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرص العاجلة',
      error: error.message
    });
  }
};

// @desc    Apply for opportunity
// @route   POST /api/opportunities/:id/apply
// @access  Private
export const applyForOpportunity = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Check if opportunity is available
    if (!opportunity.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'الفرصة غير متاحة للتقديم'
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      applicant: req.user.id,
      opportunity: req.params.id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'لقد تقدمت بالفعل لهذه الفرصة'
      });
    }

    // Check if opportunity is full
    if (opportunity.isFull) {
      return res.status(400).json({
        success: false,
        message: 'الفرصة ممتلئة'
      });
    }

    const {
      coverLetter,
      resume,
      additionalDocuments,
      experience,
      education,
      skills,
      languages,
      references,
      availability,
      salary,
      questions,
      notes
    } = req.body;

    const application = new Application({
      applicant: req.user.id,
      opportunity: req.params.id,
      coverLetter,
      resume,
      additionalDocuments,
      experience,
      education,
      skills,
      languages,
      references,
      availability,
      salary,
      questions,
      notes
    });

    await application.save();

    // Increment current applicants count
    opportunity.currentApplicants += 1;
    opportunity.applications.push(application._id as any);
    await opportunity.save();

    return res.status(201).json({
      success: true,
      message: 'تم تقديم طلبك بنجاح'
    });
  } catch (error: any) {
    console.error('Apply for opportunity error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تقديم الطلب',
      error: error.message
    });
  }
};
