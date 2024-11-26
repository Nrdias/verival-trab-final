import { Path, Svg, Rect } from 'react-native-svg';
import colors from '../../constants/colors';

export default function RejectIcon() {
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
        stroke={colors.error}
        stroke-width="1.5" />
      <Path
        d="M22 8.51071L20.4893 7L14.5 12.9893L8.51071 7L7 8.51071L12.9893 14.5L7 20.4893L8.51071 22L14.5 16.0107L20.4893 22L22 20.4893L16.0107 14.5L22 8.51071Z"
        fill={colors.error}
      />
    </Svg>
  );
}
