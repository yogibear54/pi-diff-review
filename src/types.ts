export type ReviewScope = "git-diff" | "last-commit" | "all-files";

export type ReviewViewMode = "staged" | "unstaged" | "combined";

export type ChangeStatus = "modified" | "added" | "deleted" | "renamed";

export interface ReviewFileComparison {
  status: ChangeStatus;
  oldPath: string | null;
  newPath: string | null;
  displayPath: string;
  hasOriginal: boolean;
  hasModified: boolean;
}

export interface ReviewFile {
  id: string;
  path: string;
  worktreeStatus: ChangeStatus | null;
  isStaged: boolean;
  hasUnstagedChanges: boolean;
  hasWorkingTreeFile: boolean;
  inGitDiff: boolean;
  inLastCommit: boolean;
  gitDiff: ReviewFileComparison | null;
  lastCommit: ReviewFileComparison | null;
}

export interface ReviewFileContents {
  originalContent: string;
  modifiedContent: string;
}

export type CommentSide = "original" | "modified" | "file";

export interface DiffReviewComment {
  id: string;
  fileId: string;
  scope: ReviewScope;
  viewMode: ReviewViewMode;
  side: CommentSide;
  startLine: number | null;
  endLine: number | null;
  body: string;
}

export interface ReviewSubmitPayload {
  type: "submit";
  overallComment: string;
  comments: DiffReviewComment[];
}

export interface ReviewCancelPayload {
  type: "cancel";
}

export interface ReviewRequestFilePayload {
  type: "request-file";
  requestId: string;
  fileId: string;
  scope: ReviewScope;
  viewMode: ReviewViewMode;
}

export interface ReviewStagePayload {
  type: "stage";
  path: string;
  action: "add" | "reset";
}

export interface ReviewRefreshPayload {
  type: "refresh-files";
}

export type ReviewWindowMessage =
  | ReviewSubmitPayload
  | ReviewCancelPayload
  | ReviewRequestFilePayload
  | ReviewStagePayload
  | ReviewRefreshPayload;

export interface ReviewFileDataMessage {
  type: "file-data";
  requestId: string;
  fileId: string;
  scope: ReviewScope;
  viewMode: ReviewViewMode;
  originalContent: string;
  modifiedContent: string;
}

export interface ReviewFileErrorMessage {
  type: "file-error";
  requestId: string;
  fileId: string;
  scope: ReviewScope;
  message: string;
}

export interface ReviewFilesRefreshMessage {
  type: "files-refresh";
  files: ReviewFile[];
}

export type ReviewHostMessage = ReviewFileDataMessage | ReviewFileErrorMessage | ReviewFilesRefreshMessage;

export interface ReviewWindowData {
  repoRoot: string;
  files: ReviewFile[];
}
