import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

//performance concern as the array *currently 4 items* grows. everytime CollectionPreview needs to be re-rendered, the filter and map function calls will be called. HANDLE LATER

const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
                .filter((item, idx) => idx < 4)
                .map(item => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </div>
    </div>
);

export default CollectionPreview;