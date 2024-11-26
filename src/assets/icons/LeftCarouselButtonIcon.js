import Svg, { Path, Circle, G } from 'react-native-svg';

export default function LeftCarouselButtonIcon() {
  return (
    <Svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G opacity="0.9">
        <Circle cx="22" cy="22" r="22" fill="#F7FAF8" />
        <Path
          d="M28 11.2348L25.7249 9L13 21.5L25.7249 34L28 31.7652L17.5501 21.5L28 11.2348Z"
          fill="#0D4186"
        />
      </G>
    </Svg>
  );
}
