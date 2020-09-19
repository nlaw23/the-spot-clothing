const INITIAL_STATE = {
    sections: [
        {
            title: 'hats',
            imageUrl: 'https://i.ibb.co/jrJbkjf/rsz-hector-j-rivas-v0oshpih4to-unsplash.png',
            id: 1, 
            linkUrl: 'shop/hats'
          },
          {
            title: 'jackets',
            imageUrl: 'https://i.ibb.co/8BfyRSP/rsz-amanda-vick-ohwf6yuzoqk-unsplash.jpg',
            id: 2,
            linkUrl: 'shop/jackets'
          },
          {
            title: 'sneakers',
            imageUrl: 'https://i.ibb.co/bWqnFC1/rsz-1joseph-barrientos-4qsb-fwhhks-unsplash-2.jpg',
            id: 3,
            linkUrl: 'shop/sneakers'
          },
          {
            title: 'womens',
            imageUrl: 'https://i.ibb.co/xsd3pHp/rsz-averie-woodard-4nulm-juyfo-unsplash.jpg',
            size: 'large',
            id: 4,
            linkUrl: 'shop/womens'
          },
          {
            title: 'mens',
            imageUrl: 'https://i.ibb.co/DkBXWFf/rsz-ivana-cajina-7lbc5j-jw4-unsplash.jpg',
            size: 'large',
            id: 5,
            linkUrl: 'shop/mens'
          }
    ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default directoryReducer;