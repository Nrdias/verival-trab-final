import { Path, Svg, Rect } from 'react-native-svg';
import colors from '../../constants/colors';

export default function AcceptIcon() {
  return (
    <Svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        x="1"
        y="1"
        width="27"
        height="27"
        rx="5"
        stroke={colors.blue}
        stroke-width="1.5" />
      <Path
        d="M11.5487 18.046L7.70818 14.2297L6.40039 15.5201L11.5487 20.636L22.6004 9.6537L21.3018 8.36328L11.5487 18.046Z"
        fill={colors.blue}
      />
    </Svg>
  );
}