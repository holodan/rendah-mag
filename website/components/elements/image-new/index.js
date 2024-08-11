import React, { useState, useCallback, useMemo } from 'react';
import NextImage from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { imageBuilder } from '~/lib/sanity/requests';

const ImageNew = React.memo((props) => {
  const { imageObject, placeholder, height, width } = props;
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);

  // Early return if no imageObject is provided
  if (!imageObject) return null;

  const { url, caption, dimensions } = imageObject;

  // Memoize aspectRatio calculation
  const aspectRatio = useMemo(
    () =>
      dimensions?.width && dimensions?.height
        ? dimensions.width / dimensions.height
        : 1,
    [dimensions]
  );

  // Memoize image URL generation
  const imageUrl = useMemo(() => {
    if (!url) return '';
    return imageBuilder
      .image(url)
      .width(width ? width * 2 : 1920)
      .auto('format')
      .fit('clip')
      .url();
  }, [url, width]);

  // Memoize styles
  const skeletonStyle = useMemo(
    () => ({
      height: height || 'auto',
      paddingTop: height ? `${height}px` : `${100 / aspectRatio}%`,
      width: '100%',
    }),
    [height, aspectRatio]
  );

  const containerStyle = useMemo(
    () => ({
      height: height || 'auto',
      width: '100%',
      maxWidth: '100%',
      display: 'block',
      objectFit: 'cover',
    }),
    [height]
  );

  return (
    <div className="imageObject">
      {!loaded && <Skeleton className="skeletonNew" style={skeletonStyle} />}
      <NextImage
        src={imageUrl}
        alt={caption || 'Cover Image'}
        width={width || dimensions?.width || 200}
        height={height || dimensions?.height || 200}
        layout="responsive"
        onLoadingComplete={handleLoad}
        className={`image ${loaded ? 'image--loaded' : ''}`}
        placeholder={placeholder || 'empty'}
      />
    </div>
  );
});

export default ImageNew;
