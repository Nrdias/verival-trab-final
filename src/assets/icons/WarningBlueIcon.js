import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

export default function WarningBlueIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 21 21"
      fill="none"
    >
      <G clip-path="url(#clip0_368_7140)">
        <Path
          d="M10.5 5.24125L17.0888 16.625H3.91125L10.5 5.24125ZM10.5 1.75L0.875 18.375H20.125L10.5 1.75Z"
          fill="#0D4186"
        />
        <Path d="M11.375 14H9.625V15.75H11.375V14Z" fill="#0D4186" />
        <Path d="M11.375 8.75H9.625V13.125H11.375V8.75Z" fill="#0D4186" />
      </G>
      <Defs>
        <ClipPath id="clip0_368_7140">
          <Rect width="21" height="21" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
