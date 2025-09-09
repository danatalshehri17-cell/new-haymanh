import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: errors.array().map(error => ({
        field: (error as any).path || 'unknown',
        message: error.msg
      }))
    });
    return;
  }
  next();
};

// User registration validation
export const validateRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('الاسم الأول يجب أن يكون بين 2 و 50 حرف')
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/)
    .withMessage('الاسم الأول يجب أن يحتوي على أحرف عربية أو إنجليزية فقط'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('الاسم الأخير يجب أن يكون بين 2 و 50 حرف')
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/)
    .withMessage('الاسم الأخير يجب أن يحتوي على أحرف عربية أو إنجليزية فقط'),
  
  body('email')
    .isEmail()
    .withMessage('يرجى إدخال بريد إلكتروني صحيح')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز خاص'),
  
  body('phone')
    .optional()
    .matches(/^(\+966|966|0)?5[0-9]{8}$/)
    .withMessage('يرجى إدخال رقم هاتف صحيح'),
  
  handleValidationErrors
];

// User login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('يرجى إدخال بريد إلكتروني صحيح')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('كلمة المرور مطلوبة'),
  
  handleValidationErrors
];

// Profile update validation
export const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('الاسم الأول يجب أن يكون بين 2 و 50 حرف')
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/)
    .withMessage('الاسم الأول يجب أن يحتوي على أحرف عربية أو إنجليزية فقط'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('الاسم الأخير يجب أن يكون بين 2 و 50 حرف')
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/)
    .withMessage('الاسم الأخير يجب أن يحتوي على أحرف عربية أو إنجليزية فقط'),
  
  body('phone')
    .optional()
    .matches(/^(\+966|966|0)?5[0-9]{8}$/)
    .withMessage('يرجى إدخال رقم هاتف صحيح'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('السيرة الذاتية لا يمكن أن تتجاوز 500 حرف'),
  
  handleValidationErrors
];

// Post creation/update validation
export const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('العنوان يجب أن يكون بين 5 و 200 حرف'),
  
  body('content')
    .trim()
    .isLength({ min: 100 })
    .withMessage('المحتوى يجب أن يكون 100 حرف على الأقل'),
  
  body('category')
    .isIn(['news', 'blog', 'announcement', 'success-story', 'educational'])
    .withMessage('فئة غير صحيحة'),
  
  body('tags')
    .optional()
    .isArray({ min: 0, max: 10 })
    .withMessage('الوسوم يجب أن تكون مصفوفة تحتوي على 10 عناصر كحد أقصى'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('كل وسم يجب أن يكون بين 2 و 30 حرف'),
  
  handleValidationErrors
];

// Comment creation/update validation
export const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage('التعليق يجب أن يكون بين 2 و 1000 حرف'),
  
  handleValidationErrors
];

// Program creation/update validation
export const validateProgram = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('العنوان يجب أن يكون بين 5 و 200 حرف'),
  
  body('description')
    .trim()
    .isLength({ min: 100 })
    .withMessage('الوصف يجب أن يكون 100 حرف على الأقل'),
  
  body('category')
    .isIn(['training', 'mentorship', 'workshop', 'course', 'certification', 'internship'])
    .withMessage('فئة غير صحيحة'),
  
  body('level')
    .isIn(['beginner', 'intermediate', 'advanced', 'all-levels'])
    .withMessage('مستوى غير صحيح'),
  
  body('price.amount')
    .isFloat({ min: 0 })
    .withMessage('السعر يجب أن يكون رقم موجب'),
  
  body('startDate')
    .isISO8601()
    .withMessage('تاريخ البداية يجب أن يكون صحيح'),
  
  body('endDate')
    .isISO8601()
    .withMessage('تاريخ النهاية يجب أن يكون صحيح')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('تاريخ النهاية يجب أن يكون بعد تاريخ البداية');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Opportunity creation/update validation
export const validateOpportunity = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('العنوان يجب أن يكون بين 5 و 200 حرف'),
  
  body('description')
    .trim()
    .isLength({ min: 200 })
    .withMessage('الوصف يجب أن يكون 200 حرف على الأقل'),
  
  body('type')
    .isIn(['job', 'internship', 'volunteer', 'scholarship', 'fellowship', 'competition', 'grant'])
    .withMessage('نوع غير صحيح'),
  
  body('category')
    .isIn(['technology', 'education', 'healthcare', 'business', 'arts', 'sports', 'environment', 'social-impact'])
    .withMessage('فئة غير صحيحة'),
  
  body('company.name')
    .trim()
    .notEmpty()
    .withMessage('اسم الشركة مطلوب'),
  
  body('applicationDeadline')
    .isISO8601()
    .withMessage('موعد انتهاء التقديم يجب أن يكون صحيح')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('موعد انتهاء التقديم يجب أن يكون في المستقبل');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Event creation/update validation
export const validateEvent = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('العنوان يجب أن يكون بين 5 و 200 حرف'),
  
  body('description')
    .trim()
    .isLength({ min: 200 })
    .withMessage('الوصف يجب أن يكون 200 حرف على الأقل'),
  
  body('type')
    .isIn(['conference', 'workshop', 'seminar', 'webinar', 'meetup', 'competition', 'exhibition', 'ceremony'])
    .withMessage('نوع غير صحيح'),
  
  body('category')
    .isIn(['technology', 'education', 'business', 'healthcare', 'arts', 'sports', 'environment', 'social-impact'])
    .withMessage('فئة غير صحيحة'),
  
  body('schedule.startDate')
    .isISO8601()
    .withMessage('تاريخ البداية يجب أن يكون صحيح'),
  
  body('schedule.endDate')
    .isISO8601()
    .withMessage('تاريخ النهاية يجب أن يكون صحيح')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.schedule.startDate)) {
        throw new Error('تاريخ النهاية يجب أن يكون بعد تاريخ البداية');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Review creation/update validation
export const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('التقييم يجب أن يكون بين 1 و 5'),
  
  body('content')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('المحتوى يجب أن يكون بين 10 و 1000 حرف'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('العنوان لا يمكن أن يتجاوز 100 حرف'),
  
  handleValidationErrors
];

// Application creation/update validation
export const validateApplication = [
  body('coverLetter')
    .trim()
    .isLength({ min: 100, max: 2000 })
    .withMessage('خطاب التقديم يجب أن يكون بين 100 و 2000 حرف'),
  
  body('resume')
    .notEmpty()
    .withMessage('السيرة الذاتية مطلوبة'),
  
  body('experience.years')
    .isInt({ min: 0 })
    .withMessage('سنوات الخبرة يجب أن تكون رقم موجب'),
  
  body('experience.description')
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('وصف الخبرة يجب أن يكون بين 50 و 1000 حرف'),
  
  body('education.degree')
    .trim()
    .notEmpty()
    .withMessage('الدرجة العلمية مطلوبة'),
  
  body('education.institution')
    .trim()
    .notEmpty()
    .withMessage('اسم المؤسسة التعليمية مطلوب'),
  
  body('education.graduationYear')
    .isInt({ min: 1950, max: new Date().getFullYear() + 5 })
    .withMessage('سنة التخرج يجب أن تكون بين 1950 و 5 سنوات من الآن'),
  
  body('availability.startDate')
    .isISO8601()
    .withMessage('تاريخ البدء المتوقع يجب أن يكون صحيح'),
  
  body('salary.expected')
    .isFloat({ min: 0 })
    .withMessage('الراتب المتوقع يجب أن يكون رقم موجب'),
  
  handleValidationErrors
];
