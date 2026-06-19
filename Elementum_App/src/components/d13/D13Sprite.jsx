// ===================================================================
// ELEMENTUM · D13 SVG symbol sprite
// ===================================================================
// The Set-E3 element marks (#el-*) + product chrome icons, ported
// verbatim from the wireframe's <defs>. Mount once at the top of the
// D13 surface; components reference them with <use href="#el-metal"> etc.
// ===================================================================

import React from 'react';

export default function D13Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true"><defs>
      <symbol id="el-metal" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 2.35L18.15 8.05L14.35 17.15H16.45V20.85H7.55V17.15H9.65L5.85 8.05L12 2.35ZM8.25 8.75L11.1 17.15H12.9L15.75 8.75L12 5.4L8.25 8.75ZM10.3 9.15L12 14.65L13.7 9.15L12 7.55L10.3 9.15Z"></path></symbol>
      <symbol id="el-wood" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M10.95 21.15V13.75C7.55 14.15 5.15 12.05 4.35 7.05C8.15 6.75 10.55 8.35 11.85 11.35C13.2 7.25 15.9 5.15 20.05 5.75C19.85 11.3 16.55 13.95 13.05 13.55V21.15H10.95ZM7.15 8.7C7.85 11.05 9.2 12.05 11 11.65C10.15 9.85 8.95 8.85 7.15 8.7ZM17.2 7.85C15.2 8.05 13.9 9.25 13.15 11.45C15.25 11.6 16.65 10.35 17.2 7.85Z"></path></symbol>
      <symbol id="el-fire" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12.35 2.75C15.85 6.8 18.55 10.35 18.55 14.65C18.55 18.75 15.65 21.25 12 21.25C8.3 21.25 5.45 18.7 5.45 15.05C5.45 12.25 6.9 10 9.55 7.35C9.45 10.05 10.25 12 11.65 13C11.15 9.55 11.4 6.05 12.35 2.75ZM14.95 10.65C16.25 12.45 16.8 13.95 16.8 15.45C16.8 17.85 14.95 19.35 12.1 19.35C9.65 19.35 7.45 17.75 7.45 15.15C7.45 13.75 7.95 12.65 9 11.35C9.3 13.05 10.2 14.25 11.85 15.15L13 15.8L12.75 14.5C12.35 12.45 12.55 10.45 13.2 8.05C13.85 8.95 14.45 9.85 14.95 10.65Z"></path></symbol>
      <symbol id="el-earth" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M3.55 18.2L8.45 9.35L11.45 13.15L15.25 5.6L20.45 18.2H3.55ZM8.8 13L7 16.25H17.45L15.1 10.55L12 16.7L8.8 13Z"></path><path fill="currentColor" d="M3.1 19.5H20.9V21.15H3.1V19.5Z"></path></symbol>
      <symbol id="el-water" viewBox="0 0 24 24"><path fill="currentColor" d="M3.65 9.2C5.65 6.95 8.45 6.65 11.05 8.4C13.15 9.8 14.65 9.85 16.25 8.3C17.25 7.35 18.75 7.15 20.35 7.9C18.95 10.65 16.35 12 13.5 11.15C12.45 10.85 11.5 10.35 10.55 9.7C8.7 8.5 6.95 8.65 5.55 10.05C4.9 10.7 4.25 10.35 3.65 9.2Z"></path><path fill="currentColor" d="M3.65 15.15C5.65 12.9 8.45 12.6 11.05 14.35C13.15 15.75 14.65 15.8 16.25 14.25C17.25 13.3 18.75 13.1 20.35 13.85C18.95 16.6 16.35 17.95 13.5 17.1C12.45 16.8 11.5 16.3 10.55 15.65C8.7 14.45 6.95 14.6 5.55 16C4.9 16.65 4.25 16.3 3.65 15.15Z"></path></symbol>
      <symbol id="tab-today" viewBox="0 0 24 24"><g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18"></path><path d="M8 3v4"></path><path d="M16 3v4"></path></g></symbol>
      <symbol id="tab-guidance" viewBox="0 0 24 24"><g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 4.8 L14.5 12 L12 19.2 L9.5 12 Z"></path><circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none"></circle></g></symbol>
      <symbol id="tab-reading" viewBox="0 0 24 24"><g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5 C 6 4, 9 4, 12 6 C 15 4, 18 4, 21 5 V19 C 18 18, 15 18, 12 20 C 9 18, 6 18, 3 19 Z"></path><path d="M12 6 V20"></path></g></symbol>
      <symbol id="tab-compat" viewBox="0 0 24 24"><g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="8.5" cy="12" r="6.5"></circle><circle cx="15.5" cy="12" r="6.5"></circle><circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none"></circle></g></symbol>
      <symbol id="tab-profile" viewBox="0 0 24 24"><g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"></path></g></symbol>
      <symbol id="ico-chev-l" viewBox="0 0 24 24"><path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"></path></symbol>
      <symbol id="ico-chev-r" viewBox="0 0 24 24"><path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"></path></symbol>
      <symbol id="ico-arrow-r" viewBox="0 0 24 24"><g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 H19"></path><path d="M14 7 L19 12 L14 17"></path></g></symbol>
      <symbol id="ar-up" viewBox="0 0 24 24"><g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6"></path><path d="M6 11l6-6 6 6"></path></g></symbol>
      <symbol id="ar-down" viewBox="0 0 24 24"><g stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v13"></path><path d="M6 13l6 6 6-6"></path></g></symbol>
    </defs></svg>
  );
}
