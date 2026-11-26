import { useScrollReveal } from '@/presentation/hooks/useScrollReveal.js';

export default function ScrollReveal({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 650,
  direction = 'up',
  distance = 24,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  style = {},
  ...rest
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, rootMargin });

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'scale':
        return 'scale(0.96)';
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const animatedStyle = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <Component ref={ref} className={className} style={animatedStyle} {...rest}>
      {children}
    </Component>
  );
}
