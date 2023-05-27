<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=14_MxI0TSoz8wK9e-f8BHzworUfehaZz3"/>
</div>

# Описание

Библиотека содержит утилиты. Сделано для быстрой разработки vk-mini-apps. Рекомендуется использовать с [@blumjs/cli](https://www.npmjs.com/package/@blumjs/utils).

## Использование

```
import { useCallback, useEffect, memo } from 'react';
import {
  clickLink,
  createDeclinationWord,
  createImgBase64,
  getSearchParams,
} from '@blumjs/utils';

const UserAvatarComponent = memo(({id, name, photo, countLikes}) => {
  const handleClick = useCallback(() => {
    // симуляция клика, иногда полезнее использовать чем <a></a> (могут быть пробелмы со стилем)
    // первый аргумент url, второй target(как prop в элементе <a target=''></a>, по умолчанию: '_blank')
    clickLink(`https://vk.com/id${id}`);
  }, [id]);

  // Создает функцию для склонения слова
  const declOfLikes = createDeclinationWord(['лайк', 'лайка', 'лайков']);

  console.log(declOfLikes(1));
  // -> 'лайк'

  console.log(declOfLikes(2));
  // -> 'лайка'

  console.log(declOfLikes(5));
  // -> 'лайков'

  const createStory = useCallback(() => {
    createImgBase64(
      // картинка и путь к ней
      [{src: 'img src or url', x: 0, y: 0, width: 1080, height: 1920}],

      // размерности канваса
      {width: 1080, height: 1920},

      // что произойдет, когда канвас полностью отрисуется
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
    // получение query params
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
});
```
