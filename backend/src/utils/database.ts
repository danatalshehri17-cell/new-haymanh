import mongoose from 'mongoose';
import { PaginationQuery, SearchQuery } from '../types';

/**
 * Build MongoDB query from search parameters
 */
export const buildSearchQuery = (searchParams: SearchQuery): any => {
  const query: any = {};

  if (searchParams.q) {
    query.$text = { $search: searchParams.q };
  }

  if (searchParams.category) {
    query.category = searchParams.category;
  }

  if (searchParams.tags && searchParams.tags.length > 0) {
    query.tags = { $in: searchParams.tags };
  }

  if (searchParams.author) {
    query.author = new mongoose.Types.ObjectId(searchParams.author);
  }

  if (searchParams.dateFrom || searchParams.dateTo) {
    query.createdAt = {};
    if (searchParams.dateFrom) {
      query.createdAt.$gte = new Date(searchParams.dateFrom);
    }
    if (searchParams.dateTo) {
      query.createdAt.$lte = new Date(searchParams.dateTo);
    }
  }

  return query;
};

/**
 * Build MongoDB sort object
 */
export const buildSortQuery = (sort?: string, order?: string): any => {
  if (!sort) {
    return { createdAt: -1 };
  }
  const sortOrder = order === 'asc' ? 1 : -1;
  return { [sort]: sortOrder };
};

/**
 * Build pagination options
 */
export const buildPaginationOptions = (paginationParams: PaginationQuery): any => {
  const page = paginationParams.page || 1;
  const limit = paginationParams.limit || 10;
  const skip = (page - 1) * limit;

  return { skip, limit, page };
};

/**
 * Calculate pagination metadata
 */
export const calculatePagination = (total: number, page: number, limit: number) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null
  };
};

/**
 * Validate MongoDB ObjectId
 */
export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Convert string to MongoDB ObjectId
 */
export const toObjectId = (id: string): mongoose.Types.ObjectId | null => {
  if (!isValidObjectId(id)) {
    return null;
  }
  return new mongoose.Types.ObjectId(id);
};

/**
 * Create MongoDB update object with timestamps
 */
export const createUpdateObject = (updateData: any): any => {
  return {
    ...updateData,
    updatedAt: new Date()
  };
};

/**
 * Create MongoDB insert object with timestamps
 */
export const createInsertObject = (insertData: any): any => {
  const now = new Date();
  return {
    ...insertData,
    createdAt: now,
    updatedAt: now
  };
};
