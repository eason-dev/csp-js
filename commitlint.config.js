module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        // Packages
        'generator',
        'data',
        'cli',
        'ui',
        // Apps
        'web',
        'docs',
        // Other
        'deps',
        'release',
        'config',
        'ci',
        'root',
      ]
    ],
    'type-enum': [
      2,
      'always',
      [
        'feat',       // New feature
        'fix',        // Bug fix
        'docs',       // Documentation only changes
        'style',      // Changes that do not affect the meaning of the code
        'refactor',   // Code change that neither fixes a bug nor adds a feature
        'perf',       // Performance improvement
        'test',       // Adding missing tests or correcting existing tests
        'build',      // Changes that affect the build system or external dependencies
        'ci',         // Changes to CI configuration files and scripts
        'chore',      // Other changes that don't modify src or test files
        'revert'      // Reverts a previous commit
      ]
    ]
  }
};