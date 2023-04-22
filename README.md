<div align="center">
    <img width="134" src="https://webstockreview.net/images/comet-clipart-meteorite-4.png">
</div>

# Description

This library contain base utils. Created for fast developing vk-mini-apps. I recomend use it with [@blumjs/cli](https://www.npmjs.com/package/@blumjs/utils).

## Usage

```
import { useCallback, useEffect } from 'react';
import {
  clickLink,
  createDeclinationWord,
  createImgBase64,
  getSearchParams,
} from '@blumjs/utils';

const UserAvatarComponent = ({id, name, photo, countLikes}) => {
  const handleClick = useCallback(() => {
    // simulate browser click, very usefull instead of just wrap <a></a> (there's will problems with style)
    // first arg is url, second one is target(like prop in component <a target=''></a>, default value is '_blank')
    clickLink(`https://vk.com/id${id}`);
  }, [id]);

  // create function for declination word
  const declOfLikes = createDeclinationWord(['лайк', 'лайка', 'лайков']);

  console.log(declOfLikes(1));
  // -> 'лайк'

  console.log(declOfLikes(2));
  // -> 'лайка'

  console.log(declOfLikes(5));
  // -> 'лайков'

  const createStory = useCallback(() => {
    createImgBase64(
      // load images
      [{src: 'img src or url', x: 0, y: 0, width: 1080, height: 1920}],

      // set dimenstions of canvas
      {width: 1080, height: 1920},

      // what will happen, when img load successfull
      (data) => {
        if (data.isSuccess) {
          console.log('your base64 is ready!', data.result);
        } else {
          console.log('smth went failed...', data.result);
        }
      },
    );
  }, []);

  useEffect(() => {
    // get query params
    const searchParams = getSearchParams();
    console.log('is page of user', searchParams.get('vk_id') === id);
  }, [id]);

  return<>
    <div onClick={handleClick}>
      go to website
    </div>
    <div>
      user's likes: {declOfLikes(countLikes)}
    </div>
  </>
};
```
