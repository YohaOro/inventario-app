import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.css';

const TooltipPortal = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const containerRef = useRef(null);

  const showTooltip = () => {
    console.log('Tooltip show:', content); // Debug
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      
      let style = {};
      
      switch (position) {
        case 'top':
          style = {
            left: rect.left + rect.width / 2,
            top: rect.top - 8,
            transform: 'translateX(-50%)'
          };
          break;
        case 'bottom':
          style = {
            left: rect.left + rect.width / 2,
            top: rect.bottom + 8,
            transform: 'translateX(-50%)'
          };
          break;
        case 'left':
          style = {
            left: rect.left - 8,
            top: rect.top + rect.height / 2,
            transform: 'translateY(-50%)'
          };
          break;
        case 'right':
          style = {
            left: rect.right + 8,
            top: rect.top + rect.height / 2,
            transform: 'translateY(-50%)'
          };
          break;
        default:
          style = {
            left: rect.left + rect.width / 2,
            top: rect.top - 8,
            transform: 'translateX(-50%)'
          };
      }
      
      setTooltipStyle(style);
    }
    
    setIsVisible(true);
  };
  
  const hideTooltip = () => {
    console.log('Tooltip hide:', content); // Debug
    setIsVisible(false);
  };

  // Renderizar el tooltip usando Portal
  const renderTooltip = () => {
    if (!isVisible) return null;

    const tooltipElement = (
      <div className={`tooltip tooltip-${position}`} style={tooltipStyle}>
        {content}
        <div className="tooltip-arrow"></div>
      </div>
    );

    // Usar Portal para renderizar en el body
    return createPortal(tooltipElement, document.body);
  };

  return (
    <div 
      ref={containerRef}
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {renderTooltip()}
    </div>
  );
};

export default TooltipPortal;
