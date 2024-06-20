import { SVGProps } from 'react';

export const Close = ({ width, height, ...rest }: SVGProps<SVGSVGElement>) => (
    <svg
        width={width}
        height={height}
        {...rest}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.71143e-08 16.1422L16.1421 1.3374e-05L17.5564 1.41423L1.41421 17.5564L1.71143e-08 16.1422Z"
            fill="currentColor"
        />
        <path
            d="M1.41406 6.10523e-05L17.5562 16.1422L16.142 17.5564L-0.000151038 1.41427L1.41406 6.10523e-05Z"
            fill="currentColor"
        />
    </svg>
);
