import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

export default function ReusableCarousel({
  data = [],
  renderCard,
  cardWidth = 280,
  cardGap = 24,
  autoScroll = true,
  scrollInterval = 4000,
  showArrows = true,
  showDots = true,
  showBlur = true,
  containerClass = '',
}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(data.length);
  const [containerPadding, setContainerPadding] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const loopedData = [...data, ...data, ...data];

  // ResizeObserver to update padding
  useEffect(() => {
    const updateSize = () => setWindowWidth(window.innerWidth);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const visibleWidth = container.clientWidth;
      const padding = visibleWidth / 2 - cardWidth / 2;
      setContainerPadding(padding < 0 ? 0 : padding);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [cardWidth]);

  const scrollToActiveCard = useCallback(
    (index, behavior = 'smooth') => {
      const container = scrollRef.current;
      if (!container || !container.children[index]) return;

      const child = container.children[index];
      const scrollLeft = child.offsetLeft - containerPadding;

      if (Math.abs(container.scrollLeft - scrollLeft) > 1) {
        container.scrollTo({ left: scrollLeft, behavior });
      }
    },
    [containerPadding]
  );

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && containerPadding > 0 && scrollRef.current) {
      hasInitialized.current = true;

      // wait for next paint frame so layout is ready
      requestAnimationFrame(() => {
        scrollToActiveCard(activeIndex, 'auto');
      });
    }
  }, [containerPadding, scrollToActiveCard, activeIndex]);


  // Auto-scroll
  useEffect(() => {
    if (!autoScroll) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, scrollInterval);
    return () => clearInterval(interval);
  }, [autoScroll, scrollInterval]);

  // Loop reset
  useEffect(() => {
    scrollToActiveCard(activeIndex);
    if (activeIndex >= loopedData.length - data.length) {
      const resetIndex = data.length;
      const timeout = setTimeout(() => {
        scrollToActiveCard(resetIndex, 'auto');
        setActiveIndex(resetIndex);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [activeIndex, scrollToActiveCard, data.length, loopedData.length]);

  const handlePrev = () => setActiveIndex((prev) => prev - 1);
  const handleNext = () => setActiveIndex((prev) => prev + 1);
  const handleDotClick = (i) => setActiveIndex(data.length + i);

  return (
    <div className={`relative w-full ${containerClass}`}>
      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/80"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/80"
          >
            ›
          </button>
        </>
      )}

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        className={`flex overflow-x-hidden py-4 transition-all duration-500 scroll-smooth ${
          hasInitialized.current ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          paddingLeft: `${containerPadding}px`,
          paddingRight: `${containerPadding}px`,
        }}
      >
        {loopedData.map((item, index) => {
          const realIndex = index % data.length;
          const isActive = realIndex === activeIndex % data.length;

          let cardClasses = 'flex-shrink-0 transition-all duration-500';

          if (showBlur) {
            if (isActive) {
              cardClasses += ' scale-100 opacity-100 blur-0';
            } else {
              cardClasses +=
                windowWidth >= 768
                  ? ' scale-95 opacity-60 blur-sm'
                  : ' scale-90 opacity-80 blur-0';
            }
          }

          return (
            <div
              key={index}
              style={{
                width: `${cardWidth}px`,
                marginRight:
                  index !== loopedData.length - 1 ? `${cardGap}px` : '0px',
              }}
              className={cardClasses}
            >
              {renderCard(item, isActive)}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center mt-4 gap-2">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex % data.length === i
                  ? 'bg-[#621ec1] scale-110'
                  : 'bg-black/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

ReusableCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
  cardWidth: PropTypes.number,
  cardGap: PropTypes.number,
  autoScroll: PropTypes.bool,
  scrollInterval: PropTypes.number,
  showArrows: PropTypes.bool,
  showDots: PropTypes.bool,
  showBlur: PropTypes.bool,
  containerClass: PropTypes.string,
};
