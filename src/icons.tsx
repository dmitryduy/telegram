import React from 'react';

export const icons = {
  back: <svg className='back-icon' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175"  xmlSpace="preserve"><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></svg>,
  times: <svg className='times-icon' xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>,
  more: <svg className='more-icon' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">

	<path d="M60.952,195.048C27.343,195.048,0,222.391,0,256s27.343,60.952,60.952,60.952   s60.952-27.343,60.952-60.952S94.562,195.048,60.952,195.048z"/>
  <path d="M256,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952   s60.952-27.343,60.952-60.952S289.609,195.048,256,195.048z"/>
  <path d="M451.048,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952   S512,289.609,512,256S484.657,195.048,451.048,195.048z"/>
</svg>,

}

export type Icons = keyof typeof icons;