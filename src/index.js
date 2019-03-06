
import { blocks, data, i18n } from 'wp';
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { __ } = i18n;

// Import each block here
import * as block1 from './quote';


// Category name and slug
const category = {
  slug: 'starterx',
  title: __('StarterX'),
};

// Register the new category and blocks
export function registerBlocks () {
  // Add the new category to the list
  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
  dispatch('core/blocks').setCategories([ category, ...currentCategories ]);

  // Register block
  registerBlockType(`${category.slug}/${block1.name}`, { category: category.slug, ...block1.settings });
}

registerBlocks();
