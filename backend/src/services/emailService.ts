import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'noreply@haymanh.com',
      pass: process.env.SMTP_PASS || 'password',
    },
  });
};

// Send welcome email
export const sendWelcomeEmail = async (email: string, firstName: string): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Haymanh Success" <${process.env.SMTP_USER || 'noreply@haymanh.com'}>`,
      to: email,
      subject: 'مرحباً بك في منصة حيمانة للنجاح',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #2c3e50; margin: 0;">مرحباً ${firstName}!</h1>
          </div>
          <div style="padding: 20px; background-color: white;">
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              نرحب بك في منصة حيمانة للنجاح! نحن متحمسون لانضمامك إلى مجتمعنا التعليمي.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              يمكنك الآن:
            </p>
            <ul style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              <li>استكشاف البرامج التدريبية المتاحة</li>
              <li>التقديم على الفرص الوظيفية</li>
              <li>المشاركة في الفعاليات</li>
              <li>التواصل مع المجتمع</li>
            </ul>
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              إذا كان لديك أي أسئلة، لا تتردد في التواصل معنا.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.CORS_ORIGIN || 'http://localhost:3000'}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                ابدأ رحلتك
              </a>
            </div>
          </div>
          <div style="background-color: #ecf0f1; padding: 20px; text-align: center; font-size: 14px; color: #7f8c8d;">
            <p>© 2024 Haymanh Success. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string, firstName: string, resetToken: string): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.CORS_ORIGIN || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: `"Haymanh Success" <${process.env.SMTP_USER || 'noreply@haymanh.com'}>`,
      to: email,
      subject: 'إعادة تعيين كلمة المرور',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #e74c3c; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">إعادة تعيين كلمة المرور</h1>
          </div>
          <div style="padding: 20px; background-color: white;">
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              مرحباً ${firstName}،
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بك.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                إعادة تعيين كلمة المرور
              </a>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #7f8c8d;">
              هذا الرابط صالح لمدة ساعة واحدة فقط.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #7f8c8d;">
              إذا لم يعمل الرابط، انسخ والصق الرابط التالي في متصفحك:
            </p>
            <p style="font-size: 12px; color: #7f8c8d; word-break: break-all;">
              ${resetUrl}
            </p>
          </div>
          <div style="background-color: #ecf0f1; padding: 20px; text-align: center; font-size: 14px; color: #7f8c8d;">
            <p>© 2024 Haymanh Success. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Send notification email
export const sendNotificationEmail = async (
  email: string, 
  firstName: string, 
  subject: string, 
  message: string
): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Haymanh Success" <${process.env.SMTP_USER || 'noreply@haymanh.com'}>`,
      to: email,
      subject: subject,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #3498db; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">إشعار جديد</h1>
          </div>
          <div style="padding: 20px; background-color: white;">
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              مرحباً ${firstName}،
            </p>
            <div style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              ${message}
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.CORS_ORIGIN || 'http://localhost:3000'}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                زيارة الموقع
              </a>
            </div>
          </div>
          <div style="background-color: #ecf0f1; padding: 20px; text-align: center; font-size: 14px; color: #7f8c8d;">
            <p>© 2024 Haymanh Success. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
};

// Send application status update email
export const sendApplicationStatusEmail = async (
  email: string,
  firstName: string,
  opportunityTitle: string,
  status: string,
  message?: string
): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const statusColors: { [key: string]: string } = {
      'pending': '#f39c12',
      'reviewing': '#3498db',
      'shortlisted': '#9b59b6',
      'accepted': '#27ae60',
      'rejected': '#e74c3c',
      'withdrawn': '#95a5a6'
    };
    
    const statusText: { [key: string]: string } = {
      'pending': 'قيد المراجعة',
      'reviewing': 'قيد المراجعة',
      'shortlisted': 'تم اختيارك للمقابلة',
      'accepted': 'تم قبول طلبك',
      'rejected': 'تم رفض طلبك',
      'withdrawn': 'تم سحب طلبك'
    };
    
    const mailOptions = {
      from: `"Haymanh Success" <${process.env.SMTP_USER || 'noreply@haymanh.com'}>`,
      to: email,
      subject: `تحديث حالة طلبك - ${opportunityTitle}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: ${statusColors[status] || '#3498db'}; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">تحديث حالة طلبك</h1>
          </div>
          <div style="padding: 20px; background-color: white;">
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              مرحباً ${firstName}،
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">
              تم تحديث حالة طلبك للفرصة: <strong>${opportunityTitle}</strong>
            </p>
            <div style="background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: ${statusColors[status] || '#3498db'}; margin: 0;">
                الحالة الجديدة: ${statusText[status] || status}
              </h3>
            </div>
            ${message ? `<p style="font-size: 16px; line-height: 1.6; color: #2c3e50;">${message}</p>` : ''}
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.CORS_ORIGIN || 'http://localhost:3000'}/applications" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                عرض طلباتي
              </a>
            </div>
          </div>
          <div style="background-color: #ecf0f1; padding: 20px; text-align: center; font-size: 14px; color: #7f8c8d;">
            <p>© 2024 Haymanh Success. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Application status email sent to ${email}`);
  } catch (error) {
    console.error('Error sending application status email:', error);
    throw error;
  }
};
