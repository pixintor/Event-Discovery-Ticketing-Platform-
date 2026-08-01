import slugify from "slugify";
import { Category } from "../models/index.js";
import ConflictError from "../errors/ConflictError.js";
import NotFoundError from "../errors/NotFoundError.js";

export const createCategory = async (data) => {
  const existing = await Category.findOne({
    where: {
      name: data.name,
    },
  });

  if (existing) {
    throw new ConflictError(
      "Category already exists."
    );
  }

  const category = await Category.create({
    name: data.name,
    slug: slugify(data.name, {
      lower: true,
      strict: true,
    }),
    description: data.description,
  });

  return category;
};

export const getCategories = async () => {
  return await Category.findAll({
    where: {
      isActive: true,
    },
    order: [["name", "ASC"]],
  });
};

export const getCategory = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new NotFoundError(
      "Category not found."
    );
  }

  return category;
};

export const updateCategory = async (
  id,
  data
) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new NotFoundError(
      "Category not found."
    );
  }

  if (data.name) {
    category.slug = slugify(data.name, {
      lower: true,
      strict: true,
    });
  }

  await category.update(data);

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new NotFoundError(
      "Category not found."
    );
  }

  category.isActive = false;

  await category.save();

  return;
};