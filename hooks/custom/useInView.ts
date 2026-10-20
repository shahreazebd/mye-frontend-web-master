import { useEffect, useRef, useState } from "react";

function useInView() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Check if the target element is in view
      if (entries[0].isIntersecting) {
        setInView(true);
      } else {
        setInView(false);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, inView };
}

export default useInView;
