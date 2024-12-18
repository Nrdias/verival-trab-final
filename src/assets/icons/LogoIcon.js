import { Svg, G, Path, Circle } from "react-native-svg"
import colors from '../../constants/colors';

export default function LogoIcon({ width=80, height=80 }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        enableBackground: "new 0 0 1000 1000",
      }}
      viewBox="0 0 1000 1000"
      width={width}
      height={height}
    >
      <G
        style={{
          stroke: colors.backgroundStatusBar,
          strokeMiterlimit: 10,
          strokeWidth: "32.8947px",
          fill: "none",
        }}
      >
        <Path d="M105.7 408.6s393.3 238.2 786.6 0M739.6 876.6 500 520.2M260.2 876.6 500 520.2" />
      </G>
      <G
        style={{
          stroke: colors.backgroundStatusBar,
          strokeMiterlimit: 10,
          strokeWidth: "32.8947px",
          fill: colors.logoBlue,
        }}
      >
        <Circle cx={500} cy={284.3} r={114.9} />
        <Circle cx={932.2} cy={374.1} r={51.3} />
        <Circle cx={67.6} cy={374.1} r={51.3} />
        <Circle cx={739.6} cy={876.6} r={51.3} />
        <Circle cx={260.2} cy={876.6} r={51.3} />
      </G>
      <Path d="M807.6 802.4c8.2 7.5 15.1 16.3 20.5 26.1 87.3-87 136.2-205.3 135.9-328.6 0-10.1-.4-20.1-1-30.1-9.9 3.2-20.3 4.8-30.8 4.8h-1.9c.5 8.4.8 16.8.8 25.3.2 113.2-44.1 221.9-123.5 302.5zM498.6 932.4c-48.7.1-97-8.1-143-24.1-3.5 10.6-8.8 20.5-15.5 29.4 103.1 37 216 36.8 319-.7-6.7-8.9-11.8-18.9-15.2-29.5-46.7 16.5-95.8 24.9-145.3 24.9zM67 474.7c-11.1-.1-22.1-2-32.6-5.6-.7 10.2-1 20.5-1 30.9-.4 123.5 48.7 241.9 136.2 329l1.2 1.2c5.2-9.9 11.9-18.9 20-26.5C110.8 723 66 613.7 66.3 500c0-8.5.2-16.9.7-25.3zM827.6 171c-181.7-181.7-476.3-181.7-658 0-31.2 31.1-57.8 66.5-79.1 105.2 10.8 2.5 21.1 6.8 30.5 12.7 19.5-34.7 43.7-66.5 71.8-94.6 168.9-168.9 442.6-168.9 611.5 0 28.5 28.4 52.9 60.7 72.5 95.8 9.2-6.1 19.4-10.6 30.2-13.4-21.3-38.8-48-74.4-79.4-105.7z" />
    </Svg>
  );
}
