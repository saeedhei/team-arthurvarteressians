"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm install semver --save-dev
// npm install --save-dev @types/semver
const semver_1 = __importDefault(require("semver"));
const requiredVersion = '20.18.0'; // This can be modified to a specific version if needed
const currentVersion = process.versions.node; // Directly access the global process variable
if (!semver_1.default.satisfies(currentVersion, requiredVersion)) {
    console.error(`Node.js version ${currentVersion} is outdated. Please update to the latest version.`);
    process.exit(1); // Exit with a failure code
}
