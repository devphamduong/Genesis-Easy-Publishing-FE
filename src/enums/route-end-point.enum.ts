export enum ERouteEndPointForUser {
  DASHBOARD = "/user/dashboard",
  DEPOSIT = "/user/deposit",
  OWNED_STORIES = "/user/owned-stories",
  FOLLOWING = "/user/following",
  READ_HISTORY = "/user/read-history",
  CHANGE_PASSWORD = "/user/change-password",
  RANK_STORIES = "/rank-stories",
  MOST_READ = "/rank-stories/most-read",
  MOST_VIP_STORIES_READ = "/rank-stories/most-vip-read-in-week",
  TOP_FULL_STORIES = "/rank-stories/top-full-stories",
  STORIES_WITH_MOST_FAN = "/rank-stories/stories-with-most-fan",
  STORIES_LATEST_BY_CHAPTER = "/rank-stories/stories-latest-by-chapter",
}

export enum ERouteEndPointForAuthor {
  DASHBOARD = "/author/dashboard",
  POSTED_STORIES = "/author/posted-stories",
  UNREVIEW_CHAPTERS = "/author/unreview-chapters",
  WRITE_STORY = "/author/write-story",
  WRITE_CHAPTER = "/author/write-chapter",
  REVIEW = "/author/review",
  CHAPTERS_NEED_TO_REVIEW = "/author/review/chapters-need-to-review",
  REVIEW_CHAPTER = "/author/review-a-chapter",
  EXPORT_PREVIEW = "/author/export-preview",
}
