import Svg, { Path, Circle } from 'react-native-svg';

export default function CognitiveIcon({ width = 36, height = 36}) {
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
        d="M15.5 28C14.5556 28 13.7407 27.6713 13.0556 27.0139C12.3704 26.3565 11.9815 25.5648 11.8889 24.6389C10.7778 24.4907 9.85185 24 9.11111 23.1667C8.37037 22.3333 8 21.3519 8 20.2222C8 19.8333 8.05093 19.4491 8.15278 19.0694C8.25463 18.6898 8.40741 18.3333 8.61111 18C8.40741 17.6667 8.25463 17.3148 8.15278 16.9444C8.05093 16.5741 8 16.1852 8 15.7778C8 14.6481 8.37037 13.6713 9.11111 12.8472C9.85185 12.0231 10.7685 11.537 11.8611 11.3889C11.9167 10.4444 12.2963 9.64352 13 8.98611C13.7037 8.3287 14.537 8 15.5 8C15.9815 8 16.4306 8.09259 16.8472 8.27778C17.2639 8.46296 17.6481 8.71296 18 9.02778C18.3333 8.71296 18.713 8.46296 19.1389 8.27778C19.5648 8.09259 20.0185 8 20.5 8C21.463 8 22.2917 8.32407 22.9861 8.97222C23.6806 9.62037 24.0556 10.4167 24.1111 11.3611C25.2037 11.5093 26.125 12 26.875 12.8333C27.625 13.6667 28 14.6481 28 15.7778C28 16.1852 27.9491 16.5741 27.8472 16.9444C27.7454 17.3148 27.5926 17.6667 27.3889 18C27.5926 18.3333 27.7454 18.6898 27.8472 19.0694C27.9491 19.4491 28 19.8333 28 20.2222C28 21.3704 27.625 22.3565 26.875 23.1806C26.125 24.0046 25.1944 24.4907 24.0833 24.6389C23.9907 25.5648 23.6065 26.3565 22.9306 27.0139C22.2546 27.6713 21.4444 28 20.5 28C20.037 28 19.588 27.912 19.1528 27.7361C18.7176 27.5602 18.3333 27.3148 18 27C17.6481 27.3148 17.2593 27.5602 16.8333 27.7361C16.4074 27.912 15.963 28 15.5 28ZM19.1111 11.6111V24.3889C19.1111 24.7778 19.2454 25.1065 19.5139 25.375C19.7824 25.6435 20.1111 25.7778 20.5 25.7778C20.8704 25.7778 21.1898 25.6296 21.4583 25.3333C21.7269 25.037 21.8704 24.7037 21.8889 24.3333C21.5 24.1852 21.1435 23.9861 20.8194 23.7361C20.4954 23.4861 20.2037 23.1852 19.9444 22.8333C19.7593 22.5741 19.6898 22.2963 19.7361 22C19.7824 21.7037 19.9352 21.463 20.1944 21.2778C20.4537 21.0926 20.7315 21.0231 21.0278 21.0694C21.3241 21.1157 21.5648 21.2685 21.75 21.5278C21.9537 21.8241 22.213 22.0509 22.5278 22.2083C22.8426 22.3657 23.1852 22.4444 23.5556 22.4444C24.1667 22.4444 24.6898 22.2269 25.125 21.7917C25.5602 21.3565 25.7778 20.8333 25.7778 20.2222C25.7778 20.1296 25.7731 20.037 25.7639 19.9444C25.7546 19.8519 25.7315 19.7593 25.6944 19.6667C25.3796 19.8519 25.0417 19.9907 24.6806 20.0833C24.3194 20.1759 23.9444 20.2222 23.5556 20.2222C23.2407 20.2222 22.9769 20.1157 22.7639 19.9028C22.5509 19.6898 22.4444 19.4259 22.4444 19.1111C22.4444 18.7963 22.5509 18.5324 22.7639 18.3194C22.9769 18.1065 23.2407 18 23.5556 18C24.1667 18 24.6898 17.7824 25.125 17.3472C25.5602 16.912 25.7778 16.3889 25.7778 15.7778C25.7778 15.1667 25.5602 14.6481 25.125 14.2222C24.6898 13.7963 24.1667 13.5741 23.5556 13.5556C23.3519 13.8889 23.088 14.1806 22.7639 14.4306C22.4398 14.6806 22.0833 14.8796 21.6944 15.0278C21.3981 15.1389 21.1111 15.1296 20.8333 15C20.5556 14.8704 20.3704 14.6574 20.2778 14.3611C20.1852 14.0648 20.1991 13.7778 20.3194 13.5C20.4398 13.2222 20.6481 13.037 20.9444 12.9444C21.2222 12.8519 21.4491 12.6852 21.625 12.4444C21.8009 12.2037 21.8889 11.9259 21.8889 11.6111C21.8889 11.2222 21.7546 10.8935 21.4861 10.625C21.2176 10.3565 20.8889 10.2222 20.5 10.2222C20.1111 10.2222 19.7824 10.3565 19.5139 10.625C19.2454 10.8935 19.1111 11.2222 19.1111 11.6111ZM16.8889 24.3889V11.6111C16.8889 11.2222 16.7546 10.8935 16.4861 10.625C16.2176 10.3565 15.8889 10.2222 15.5 10.2222C15.1111 10.2222 14.7824 10.3565 14.5139 10.625C14.2454 10.8935 14.1111 11.2222 14.1111 11.6111C14.1111 11.9074 14.1944 12.1806 14.3611 12.4306C14.5278 12.6806 14.75 12.8519 15.0278 12.9444C15.3241 13.037 15.537 13.2222 15.6667 13.5C15.7963 13.7778 15.8148 14.0648 15.7222 14.3611C15.6111 14.6574 15.4167 14.8704 15.1389 15C14.8611 15.1296 14.5741 15.1389 14.2778 15.0278C13.8889 14.8796 13.5324 14.6806 13.2083 14.4306C12.8843 14.1806 12.6204 13.8889 12.4167 13.5556C11.8241 13.5741 11.3102 13.8009 10.875 14.2361C10.4398 14.6713 10.2222 15.1852 10.2222 15.7778C10.2222 16.3889 10.4398 16.912 10.875 17.3472C11.3102 17.7824 11.8333 18 12.4444 18C12.7593 18 13.0231 18.1065 13.2361 18.3194C13.4491 18.5324 13.5556 18.7963 13.5556 19.1111C13.5556 19.4259 13.4491 19.6898 13.2361 19.9028C13.0231 20.1157 12.7593 20.2222 12.4444 20.2222C12.0556 20.2222 11.6806 20.1759 11.3194 20.0833C10.9583 19.9907 10.6204 19.8519 10.3056 19.6667C10.2685 19.7593 10.2454 19.8519 10.2361 19.9444C10.2269 20.037 10.2222 20.1296 10.2222 20.2222C10.2222 20.8333 10.4398 21.3565 10.875 21.7917C11.3102 22.2269 11.8333 22.4444 12.4444 22.4444C12.8148 22.4444 13.1574 22.3657 13.4722 22.2083C13.787 22.0509 14.0463 21.8241 14.25 21.5278C14.4352 21.2685 14.6759 21.1157 14.9722 21.0694C15.2685 21.0231 15.5463 21.0926 15.8056 21.2778C16.0648 21.463 16.2176 21.7037 16.2639 22C16.3102 22.2963 16.2407 22.5741 16.0556 22.8333C15.7963 23.1852 15.5 23.4907 15.1667 23.75C14.8333 24.0093 14.4722 24.213 14.0833 24.3611C14.1019 24.7315 14.25 25.0602 14.5278 25.3472C14.8056 25.6343 15.1296 25.7778 15.5 25.7778C15.8889 25.7778 16.2176 25.6435 16.4861 25.375C16.7546 25.1065 16.8889 24.7778 16.8889 24.3889Z"
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