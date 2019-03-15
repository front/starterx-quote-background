/**
 * External dependencies
 */
import React from 'react';
import { i18n, editor, components } from 'wp';

import quoteClose from './quote-close.svg';
import quoteOpen from './quote-open.svg';

import deprecated from './deprecated';
import './style.scss';

const { __ } = i18n;
const { Toolbar, IconButton } = components;
const { BlockControls, RichText, MediaUpload } = editor;

export function getMediaAttrs (media) {
  if(media && media.data) {
    return Object.keys(media.data).reduce((d, key) => {
      d[`data-${key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`] = media.data[key];
      return d;
    }, {});
  }
  return {};
}

// Editable block attributes
const BLOCK_ATTRIBUTES = {
  title: {
    type: 'array',
    source: 'children',
    selector: 'blockquote p',
    default: 'You can design and create, and build the most beautiful place in the world. But it takes people to make the dream a reality.',
  },
  author: {
    type: 'array',
    source: 'children',
    selector: 'blockquote cite',
    default: 'Walt Disney',
  },
  image: {
    type: 'string',
    default: 'https://www.fillmurray.com/g/1600/600',
  },
  imageData: {
    type: 'object',
    default: {},
  },
  align: {
    type: 'string',
    default: 'full',
  },
};

export const name = 'quote-background';

export const settings = {
  title: __('Quote with background'),
  description: __('Quote with background image and partial overlay'),
  icon: 'editor-quote',
  attributes: BLOCK_ATTRIBUTES,

  supports: {
    align: ['wide', 'full'],
  },

  edit ({ attributes, className, setAttributes }) {
    const { title, author, image, imageData } = attributes;
    const containerStyle = {
      backgroundImage: `url('${image}')`,
    };

    const onSelectImage = (media, field) => {
      setAttributes({
        [field]: media.url,
        [`${field}Data`]: getMediaAttrs(media),
      });
    };

    return (
      <div className={ className } style={ containerStyle } { ...imageData }>
        <BlockControls>
          <Toolbar>
            <MediaUpload
              allowedTypes={ ['image'] }
              onSelect={ media => onSelectImage(media, 'image') } render={ ({ open }) => (
                <IconButton className="components-toolbar__control" label={ __('Edit image') }
                  icon="edit" onClick={ open } />
              ) }
            />
          </Toolbar>
        </BlockControls>
        <blockquote>
          <span className="quote__icon quote__icon__before"><img src={ quoteOpen } /></span>
          <RichText
            tagName="p" value={ title } placeholder={ __('Quote text') }
            onChange={ value => setAttributes({ title: value }) } formattingControls={ [] }
          />
          <span className="quote__icon quote__icon__after"><img src={ quoteClose } /></span>
          <RichText
            tagName="cite" value={ author } placeholder={ __('The author') }
            onChange={ value => setAttributes({ author: value }) } formattingControls={ [] }
          />
        </blockquote>
      </div>
    );
  },

  save ({ attributes }) {
    const { title, author, image, imageData } = attributes;
    const containerStyle = {
      backgroundImage: `url('${image}')`,
    };

    return (
      <div style={ containerStyle } { ...imageData }>
        <blockquote>
          <span className="quote__icon quote__icon__before"><img src={ quoteOpen } /></span>
          <RichText.Content tagName="p" value={ title } />
          <span className="quote__icon quote__icon__after"><img src={ quoteClose } /></span>
          <RichText.Content tagName="cite" value={ author } />
        </blockquote>
      </div>
    );
  },

  deprecated,
};
