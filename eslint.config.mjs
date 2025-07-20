import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["eslint.config.mjs", "node_modules/", "**/*.config.js"]),
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    plugins: {js, prettier: prettierPlugin },
    extends: ["js/recommended"],
  },
  {
    rules: {
      "prettier/prettier": "warn",
      // ESLint: Errores y Calidad de Código
      "no-undef": "error", // Previene el uso de variables no definidas
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Advierte sobre variables no usadas, ignorando aquellas que comienzan con '_'
      "no-console": "off", // Permite el uso de console.log
      "no-debugger": "error", // Deshabilita el uso de debugger

      // ESLint: Estructura y Lógica (Prettier no lo toca)
      eqeqeq: ["error", "always"], // Requiere el uso de === y !==
      curly: "error", // Requiere el uso de llaves para todos los bloques de control
      "consistent-return": "error", // Requiere que las funciones siempre devuelvan un valor si una ruta lo hace
      "prefer-const": "error", // Requiere el uso de const para variables que nunca se reasignan
      "no-var": "error", // Prohíbe el uso de var
      "arrow-body-style": ["error", "as-needed"], // Fuerza el cuerpo de las arrow functions a ser conciso cuando es posible
    },
  },
]);
