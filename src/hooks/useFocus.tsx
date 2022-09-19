import { useRef } from 'react';

export const useFocus = () => {
  const snapContainer = useRef(null);
  const scrollContainer = useRef(null);
  const tags = snapContainer.current?.childNodes;
  const setFocus = (item: any) => {
    snapContainer.current.scrollLeft = tags?.[item]?.offsetLeft;
  };

  return [snapContainer, scrollContainer, setFocus];
};
