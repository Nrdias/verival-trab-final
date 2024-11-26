import Svg, { Path, Circle, G } from 'react-native-svg';

export default function RightCarouselButtonIcon() {
  return (
    <Svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G opacity="0.9">
        <Circle
          cx="22"
          cy="22"
          r="22"
          transform="matrix(-1 0 0 1 44 0)"
          fill="#F7FAF8"
        />
        <Path
          d="M16 11.2348L18.2751 9L31 21.5L18.2751 34L16 31.7652L26.4499 21.5L16 11.2348Z"
          fill="#0D4186"
        />
      </G>
    </Svg>
  );
}
