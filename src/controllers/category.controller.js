import * as categoryService from "../services/category.service.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator.js";

export const createCategory = async (
  req,
  res,
  next
) => {
  try {
    const { error } =
      createCategorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const category =
      await categoryService.createCategory(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Category created successfully.",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req,
  res,
  next
) => {
  try {
    const categories =
      await categoryService.getCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req,
  res,
  next
) => {
  try {
    const category =
      await categoryService.getCategory(
        req.params.id
      );

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req,
  res,
  next
) => {
  try {
    const { error } =
      updateCategorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const category =
      await categoryService.updateCategory(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      message:
        "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req,
  res,
  next
) => {
  try {
    await categoryService.deleteCategory(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Category deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};