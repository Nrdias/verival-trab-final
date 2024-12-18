import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function NotificationIcon({ props }) {
  return (
    <Svg
      fill="#9E0000"
      height="25px"
      width="25px"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 256 196.7"
      xmlSpace="preserve"
      {...props}
    >
      <G id="SVGRepo_bgCarrier" strokeWidth={0} />
      <G
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G id="SVGRepo_iconCarrier">
        <Path d="M127.5,194.9c12,0,21.9-8.6,24-20h-48C105.6,186.3,115.5,194.9,127.5,194.9z M207.5,134.7c-8.5-8.5-19-12.6-19-53.8 c0-30.3-22.1-55.4-51-60.2H136c1.8-2,3-4.7,3-7.7c0-6.3-5.1-11.4-11.4-11.4c-6.3,0-11.4,5.1-11.4,11.4c0,3,1.1,5.7,3,7.7h-1.6 c-28.9,4.8-51,29.9-51,60.2c0,41.2-10.5,45.3-19,53.8C35.9,146.2,44.1,166,60.4,166h134.2C210.9,166,219.1,146.2,207.5,134.7z M10.8,69.2c0,14.5,5.3,28.5,15.1,39.8l-6.8,6.8c-11.5-12.4-18-29.1-18-46.3c0-17.3,6.6-34,18.2-46.2l6.8,6.8 C16.1,41.1,10.8,54.6,10.8,69.2z M28,69.5c0-10.3,3.6-19.8,10.4-27.8l6.8,6.8c-4.9,6-7.4,13.1-7.4,20.8c0,7.7,2.6,15,7.4,20.8 l-6.8,6.8C31.6,89.3,28,79.7,28,69.5z M230,30.1l6.8-6.8C248.4,35.5,255,52.1,255,69.5c0,17.2-6.5,33.9-18,46.3l-6.8-6.8 c9.7-11.2,15.1-25.2,15.1-39.8C245.3,54.6,240,41.1,230,30.1z M217.8,96.8L211,90c4.8-5.8,7.4-13.1,7.4-20.8 c0-7.6-2.6-14.8-7.4-20.8l6.8-6.8c6.8,8,10.4,17.5,10.4,27.8C228.2,79.7,224.5,89.3,217.8,96.8z" />
      </G>
    </Svg>
  );
}
