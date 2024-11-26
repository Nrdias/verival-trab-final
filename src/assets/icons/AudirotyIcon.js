import Svg, { Path, Circle } from 'react-native-svg';

export default function AuditoryIcon({ width = 32, height = 32 }) {
  let viewBox = `0 0 ${width} ${height}`

  if (width < 32 && height < 32) viewBox = `0 0 ${(width + 4)} ${(height + 4)}`

  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M20.4444 23.1713C20.1867 23.1713 19.9467 23.1165 19.7689 23.0342C19.1378 22.6959 18.6933 22.2295 18.2489 20.858C17.7956 19.4317 16.9422 18.7642 16.1244 18.115C15.4222 17.5573 14.6933 16.9812 14.0622 15.8017C13.5911 14.924 13.3333 13.9639 13.3333 13.1136C13.3333 10.5534 15.2889 8.54187 17.7778 8.54187C20.2667 8.54187 22.2222 10.5534 22.2222 13.1136H24C24 9.52021 21.2711 6.71319 17.7778 6.71319C14.2844 6.71319 11.5556 9.52021 11.5556 13.1136C11.5556 14.2656 11.8933 15.5366 12.5067 16.6795C13.3156 18.1882 14.2667 18.9471 15.04 19.5597C15.76 20.1266 16.2756 20.538 16.56 21.4341C17.0933 23.0982 17.7778 24.0308 18.9867 24.68C19.44 24.8903 19.9378 25 20.4444 25C22.4089 25 24 23.3633 24 21.3426H22.2222C22.2222 22.3484 21.4222 23.1713 20.4444 23.1713ZM12.1244 7.29836L10.8622 6C9.09333 7.81954 8 10.334 8 13.1136C8 15.8932 9.09333 18.4076 10.8622 20.2271L12.1156 18.9379C10.6756 17.4475 9.77778 15.3903 9.77778 13.1136C9.77778 10.8369 10.6756 8.7796 12.1244 7.29836ZM15.5556 13.1136C15.5556 14.3754 16.5511 15.3994 17.7778 15.3994C19.0044 15.3994 20 14.3754 20 13.1136C20 11.8518 19.0044 10.8277 17.7778 10.8277C16.5511 10.8277 15.5556 11.8518 15.5556 13.1136Z"
        fill="#404040"
      />
      <Circle cx="16" cy="16" r="14.5" stroke="#404040" strokeWidth="3" />
    </Svg>
  );
}