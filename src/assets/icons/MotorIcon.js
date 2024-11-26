import Svg, { Path, Circle } from 'react-native-svg';

export default function VisualIcon({ width = 36, height = 36}) {
  let viewBox = `0 0 ${width} ${height}`

  if (width < 36 && height < 36) viewBox = `0 0 ${(width + 4)} ${(height + 4)}`

  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.664 11.1563C18.7936 11.1563 19.7093 10.2406 19.7093 9.11099C19.7093 7.98139 18.7936 7.06567 17.664 7.06567C16.5344 7.06567 15.6187 7.98139 15.6187 9.11099C15.6187 10.2406 16.5344 11.1563 17.664 11.1563Z"
        fill="#404040"
      />
      <Path
        d="M25.2874 18.6609V16.5272C23.6102 16.5485 21.9222 15.727 20.8549 14.5748L19.45 13.0493C19.2649 12.8466 19.0362 12.6865 18.7857 12.5692C18.7748 12.5692 18.7748 12.5585 18.7639 12.5585H18.753C18.3719 12.3451 17.9362 12.2384 17.457 12.2811C16.3135 12.3771 15.4858 13.3693 15.4858 14.4895V20.7946C15.4858 21.9681 16.466 22.9282 17.664 22.9282H23.1093V28.2625H25.2874V22.3948C25.2874 21.2213 24.3072 20.2611 23.1093 20.2611H19.8421V16.5805C21.247 17.722 23.3815 18.6502 25.2874 18.6609ZM18.5679 23.9951C18.1214 25.2326 16.9125 26.1288 15.4858 26.1288C13.678 26.1288 12.2187 24.6992 12.2187 22.9282C12.2187 21.5307 13.1335 20.3571 14.3968 19.9091V17.7007C11.9137 18.1915 10.0405 20.3465 10.0405 22.9282C10.0405 25.8727 12.48 28.2625 15.4858 28.2625C18.1214 28.2625 20.3213 26.4275 20.8222 23.9951H18.5679Z"
        fill="#404040"
      />
      <Circle
        cx="17.85"
        cy="17.85"
        r="14.4906"
        stroke="#404040"
        strokeWidth="3"
      />
    </Svg>
  );
}
