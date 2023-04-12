import { getDimensionsText } from "../get-dimensions-text";

export const createImgBase64 = (
  imgs: {
    src: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
  }[],
  { width, height }: { width: number; height: number },
  callback: (data: { result: string; isSuccess: boolean }) => void,
  elements?: {
    x: number | "center";
    y: number;
    text: string | number;
    fontSize: number;
    fontWeight: number;
    color: string;
    fontFamily: string;
  }[]
) => {
  try {
    const loadedImages: {
      img: HTMLImageElement;
      x: number;
      y: number;
      width: number;
      height: number;
      index: number;
    }[] = [];
    imgs.forEach((i, iId) => {
      const image = new Image();
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.imageSmoothingEnabled = false;
      image.onload = () => {
        loadedImages.push({
          img: image,
          x: i.x,
          y: i.y,
          width: i.width ?? 0,
          height: i.height ?? 0,
          index: iId,
        });
        if (loadedImages.length === imgs.length) {
          loadedImages.sort((a, b) => (a.index > b.index ? 1 : -1));
          loadedImages.forEach((img) => {
            if (img.width && img.height) {
              ctx.drawImage(img.img, img.x, img.y, img.width, img.height);
            } else {
              ctx.drawImage(img.img, img.x, img.y);
            }
          });
          if (elements) {
            elements.forEach((e) => {
              ctx.fillStyle = e.color;
              ctx.font = `${e.fontWeight} ${e.fontSize}px ${e.fontFamily}`;
              if (e.x === "center") {
                ctx.fillText(
                  String(e.text),
                  (width -
                    getDimensionsText(
                      String(e.text),
                      e.fontFamily,
                      `${e.fontSize}px`
                    ).width) /
                    2,
                  e.y
                );
              } else {
                ctx.fillText(String(e.text), e.x, e.y);
              }
            });
          }
          callback({
            result: canvas.toDataURL("image/webp", 1),
            isSuccess: true,
          });
        }
      };
      image.src = i.src;
    });
  } catch (e) {
    //@ts-ignore
    callback({ result: e.message as string, isSuccess: false });
  }
};
