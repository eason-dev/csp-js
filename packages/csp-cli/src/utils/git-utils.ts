import { execSync } from 'node:child_process';
import chalk from 'chalk';
import type { GitOperationResult } from '../types.js';

/**
 * Execute git command and return output
 */
function execGit(command: string): string {
  try {
    return execSync(`git ${command}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
      .toString()
      .trim();
  } catch (error) {
    throw new Error(
      `Git command failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Check if we're in a git repository
 */
export function isGitRepository(): boolean {
  try {
    execGit('rev-parse --git-dir');
    return true;
  } catch {
    return false;
  }
}

/**
 * Get current branch name
 */
export function getCurrentBranch(): string {
  return execGit('branch --show-current');
}

/**
 * Check if working directory is clean
 */
export function isWorkingDirectoryClean(): boolean {
  try {
    const status = execGit('status --porcelain');
    return status.length === 0;
  } catch {
    return false;
  }
}

/**
 * Create and switch to a new branch
 */
export function createBranch(branchName: string): GitOperationResult {
  try {
    execGit(`checkout -b ${branchName}`);
    return {
      success: true,
      message: `Created and switched to branch '${branchName}'`,
      branchName,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create branch: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Add files to git staging
 */
export function addFiles(files: string[]): GitOperationResult {
  try {
    execGit(`add ${files.join(' ')}`);
    return {
      success: true,
      message: `Added ${files.length} file(s) to staging`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to add files: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Commit changes
 */
export function commit(): GitOperationResult {
  try {
    const hash = execGit('rev-parse HEAD');

    return {
      success: true,
      message: 'Changes committed successfully',
      commitHash: hash,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to commit: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Push branch to remote
 */
export function pushBranch(branchName: string): GitOperationResult {
  try {
    execGit(`push -u origin ${branchName}`);
    return {
      success: true,
      message: `Pushed branch '${branchName}' to remote`,
      branchName,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to push branch: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Create a pull request using GitHub CLI
 */
export function createPullRequest(
  title: string,
  body: string,
  baseBranch = 'main'
): GitOperationResult {
  try {
    // Check if gh CLI is available
    try {
      execSync('gh --version', { stdio: 'ignore' });
    } catch {
      return {
        success: false,
        message:
          'GitHub CLI (gh) is not installed. Please install it to create pull requests automatically.',
      };
    }

    // Create PR
    const output = execSync(
      `gh pr create --title "${title.replace(/"/g, '\\\\"')}" --body "${body.replace(/"/g, '\\\\"')}" --base ${baseBranch}`,
      {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    )
      .toString()
      .trim();

    // Extract PR URL from output
    const urlMatch = output.match(/(https:\/\/github\.com\/[^\s]+)/);
    const pullRequestUrl = urlMatch ? urlMatch[1] : undefined;

    return {
      success: true,
      message: 'Pull request created successfully',
      pullRequestUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create pull request: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Generate branch name for service updates
 */
export function generateBranchName(
  serviceId: string,
  action: 'add' | 'update',
  version?: string
): string {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const versionSuffix = version ? `-${version.replace(/\\./g, '-')}` : '';
  return `${action}-service/${serviceId}${versionSuffix}-${timestamp}`;
}

/**
 * Full workflow: create branch, commit, push, and create PR
 */
export async function createServiceUpdatePR(
  serviceId: string,
  action: 'add' | 'update',
  files: string[],
  commitMessage: string,
  prTitle: string,
  prBody: string,
  version?: string
): Promise<GitOperationResult> {
  console.log(chalk.blue('Starting Git workflow...'));

  if (!isGitRepository()) {
    return {
      success: false,
      message: 'Not in a Git repository',
    };
  }

  if (!isWorkingDirectoryClean()) {
    return {
      success: false,
      message: 'Working directory is not clean. Please commit or stash your changes first.',
    };
  }

  const branchName = generateBranchName(serviceId, action, version);

  // Create branch
  console.log(chalk.blue(`Creating branch: ${branchName}`));
  const branchResult = createBranch(branchName);
  if (!branchResult.success) {
    return branchResult;
  }

  // Add files
  console.log(chalk.blue('Adding files to staging...'));
  const addResult = addFiles(files);
  if (!addResult.success) {
    return addResult;
  }

  // Commit
  console.log(chalk.blue('Committing changes...'));
  const commitResult = commit();
  if (!commitResult.success) {
    return commitResult;
  }

  // Push
  console.log(chalk.blue('Pushing to remote...'));
  const pushResult = pushBranch(branchName);
  if (!pushResult.success) {
    return pushResult;
  }

  // Create PR
  console.log(chalk.blue('Creating pull request...'));
  const prResult = createPullRequest(prTitle, prBody);

  return {
    success: prResult.success,
    message: prResult.success ? 'Service update workflow completed successfully' : prResult.message,
    branchName,
    commitHash: commitResult.commitHash,
    pullRequestUrl: prResult.pullRequestUrl,
  };
}
