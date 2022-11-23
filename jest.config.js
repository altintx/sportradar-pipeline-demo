module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ["node_modules", "src"],
  "transformIgnorePatterns": ["/node_modules/(?!ky)"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};