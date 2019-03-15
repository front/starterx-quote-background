import React from 'react';
import { editor } from 'wp';

import quoteClose from './quote-close.svg';
import quoteOpen from './quote-open.svg';

const { RichText } = editor;


export default [
  // V1
  {
    attributes: {
      title: {
        type: 'array',
        source: 'children',
        selector: '.quote__title',
        default: 'You can design and create, and build the most beautiful place in the world. But it takes people to make the dream a reality.',
      },
      author: {
        type: 'array',
        source: 'children',
        selector: '.quote__author',
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
    },
    save ({ attributes }) {
      const { title, author, image, imageData } = attributes;
      const containerStyle = {
        backgroundImage: `url('${image}')`,
      };

      return (
        <div style={ containerStyle } { ...imageData }>
          <div className="quote">
            <p className="quote__icon quote__icon__before"><img src={ quoteOpen } /></p>
            <RichText.Content tagName="q" className="quote__title" value={ title } />
            <p className="quote__icon quote__icon__after"><img src={ quoteClose } /></p>
            <RichText.Content tagName="p" className="quote__author" value={ author } />
          </div>
        </div>
      );
    },
  },
];
