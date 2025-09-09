import { Request, Response } from 'express';
import Event from '../models/Event';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.type as string;
    const category = req.query.category as string;
    const status = req.query.status as string || 'upcoming';
    const location = req.query.location as string;
    const search = req.query.search as string;
    const featured = req.query.featured === 'true';
    const free = req.query.free === 'true';
    const dateRange = req.query.dateRange as string;

    const query: any = { status };

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by location
    if (location) {
      query['location.type'] = location;
    }

    // Filter by featured
    if (featured) {
      query.isFeatured = true;
    }

    // Filter by free events
    if (free) {
      query['registration.isFree'] = true;
    }

    // Filter by date range
    if (dateRange) {
      const [start, end] = dateRange.split('-').map(date => new Date(date));
      if (start && end) {
        query['schedule.startDate'] = { $gte: start, $lte: end };
      }
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      Event.find(query)
        .populate('organizer', 'name logo website')
        .sort({ 'schedule.startDate': 1 })
        .skip(skip)
        .limit(limit),
      Event.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        events,
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
    console.error('Get events error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفعاليات',
      error: error.message
    });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name logo website description')
      .populate('attendees', 'firstName lastName avatar');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'الفعالية غير موجودة'
      });
    }

    // Increment view count
    event.views += 1;
    await event.save();

    return res.json({
      success: true,
      data: { event }
    });
  } catch (error: any) {
    console.error('Get event by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفعالية',
      error: error.message
    });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      shortDescription,
      type,
      category,
      organizer,
      location,
      schedule,
      registration,
      speakers,
      agenda,
      targetAudience,
      requirements,
      benefits,
      materials,
      images,
      featuredImage,
      tags,
      language,
      seo,
      socialMedia
    } = req.body;

    const event = new Event({
      title,
      description,
      shortDescription,
      type,
      category,
      organizer: organizer || {
        name: req.user.firstName + ' ' + req.user.lastName,
        email: req.user.email
      },
      location,
      schedule,
      registration,
      speakers,
      agenda,
      targetAudience,
      requirements,
      benefits,
      materials,
      images,
      featuredImage,
      tags,
      language,
      seo,
      socialMedia
    });

    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('organizer', 'name logo website');

    return res.status(201).json({
      success: true,
      message: 'تم إنشاء الفعالية بنجاح',
      data: { event: populatedEvent }
    });
  } catch (error: any) {
    console.error('Create event error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إنشاء الفعالية',
      error: error.message
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'الفعالية غير موجودة'
      });
    }

    const updateData = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('organizer', 'name logo website');

    return res.json({
      success: true,
      message: 'تم تحديث الفعالية بنجاح',
      data: { event: updatedEvent }
    });
  } catch (error: any) {
    console.error('Update event error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث الفعالية',
      error: error.message
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'الفعالية غير موجودة'
      });
    }

    // Delete event
    await Event.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'تم حذف الفعالية بنجاح'
    });
  } catch (error: any) {
    console.error('Delete event error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في حذف الفعالية',
      error: error.message
    });
  }
};

// @desc    Get event by slug
// @route   GET /api/events/slug/:slug
// @access  Public
export const getEventBySlug = async (req: Request, res: Response) => {
  try {
    const event = await Event.findOne({ 'seo.slug': req.params.slug })
      .populate('organizer', 'name logo website description')
      .populate('attendees', 'firstName lastName avatar');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'الفعالية غير موجودة'
      });
    }

    // Increment view count
    event.views += 1;
    await event.save();

    return res.json({
      success: true,
      data: { event }
    });
  } catch (error: any) {
    console.error('Get event by slug error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفعالية',
      error: error.message
    });
  }
};

// @desc    Get featured events
// @route   GET /api/events/featured
// @access  Public
export const getFeaturedEvents = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const events = await Event.find({
      isFeatured: true,
      status: { $in: ['upcoming', 'active'] }
    })
      .populate('organizer', 'name logo website')
      .sort({ 'schedule.startDate': 1 })
      .limit(limit);

    return res.json({
      success: true,
      data: { events }
    });
  } catch (error: any) {
    console.error('Get featured events error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفعاليات المميزة',
      error: error.message
    });
  }
};

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
// @access  Public
export const getUpcomingEvents = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const events = await Event.find({
      status: 'upcoming'
    })
      .populate('organizer', 'name logo website')
      .sort({ 'schedule.startDate': 1 })
      .limit(limit);

    return res.json({
      success: true,
      data: { events }
    });
  } catch (error: any) {
    console.error('Get upcoming events error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفعاليات القادمة',
      error: error.message
    });
  }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
export const registerForEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'الفعالية غير موجودة'
      });
    }

    // Check if event is available for registration
    if (event.status !== 'upcoming' && event.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'الفعالية غير متاحة للتسجيل'
      });
    }

    // Check if user is already registered
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'أنت مسجل بالفعل في هذه الفعالية'
      });
    }

    // Check if event is full
    if (event.registration.maxAttendees && event.registration.currentAttendees >= event.registration.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: 'الفعالية ممتلئة'
      });
    }

    // Register user
    event.attendees.push(req.user.id);
    event.registration.currentAttendees += 1;
    await event.save();

    return res.json({
      success: true,
      message: 'تم التسجيل في الفعالية بنجاح'
    });
  } catch (error: any) {
    console.error('Register for event error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في التسجيل في الفعالية',
      error: error.message
    });
  }
};

// @desc    Unregister from event
// @route   POST /api/events/:id/unregister
// @access  Private
export const unregisterFromEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'الفعالية غير موجودة'
      });
    }

    // Check if user is registered
    if (!event.attendees.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'أنت غير مسجل في هذه الفعالية'
      });
    }

    // Unregister user
    event.attendees = event.attendees.filter(
      id => id.toString() !== req.user.id
    );
    event.registration.currentAttendees = Math.max(0, event.registration.currentAttendees - 1);
    await event.save();

    return res.json({
      success: true,
      message: 'تم إلغاء التسجيل من الفعالية بنجاح'
    });
  } catch (error: any) {
    console.error('Unregister from event error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إلغاء التسجيل من الفعالية',
      error: error.message
    });
  }
};
