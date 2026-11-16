import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "scripts/**",
      // Temporary: unused component, decision on deleting it is due in Step 11.
      "src/components/cars/CarSliderSection.tsx",
    ],
  },
];

export default eslintConfig;
