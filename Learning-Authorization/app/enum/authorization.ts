export enum Role {
  ADMINISTRATOR = "administrator",
  REGULAR_USER = "regular_user",
}

export enum Permission {
  BROWSE_BOOKS = "browse_books",
  READ_BOOK = "read_book",
  EDIT_BOOK = "edit_book",
  ADD_BOOK = "add_book",
  DELETE_BOOK = "delete_book",

  BROWSE_AUTHORS = "browse_authors",
  READ_AUTHOR = "read_author",
  EDIT_AUTHOR = "edit_author",
  ADD_AUTHOR = "add_author",
  DELETE_AUTHOR = "delete_author",

  BROWSE_PUBLISHERS = "browse_publishers",
  READ_PUBLISHER = "read_publisher",
  EDIT_PUBLISHER = "edit_publisher",
  ADD_PUBLISHER = "add_publisher",
  DELETE_PUBLISHER = "delete_publisher",

  BROWSE_CATEGORIES = "browse_categories",
  READ_CATEGORY = "read_category",
  EDIT_CATEGORY = "edit_category",
  ADD_CATEGORY = "add_category",
  DELETE_CATEGORY = "delete_category",
}

// Permission.BROWSE_BOOKS
export const PermissionAssignment = {
  [Role.ADMINISTRATOR]: [
    Permission.BROWSE_BOOKS,
    Permission.READ_BOOK,
    Permission.EDIT_BOOK,
    Permission.ADD_BOOK,
    Permission.DELETE_BOOK,

    Permission.BROWSE_AUTHORS,
    Permission.READ_AUTHOR,
    Permission.EDIT_AUTHOR,
    Permission.ADD_AUTHOR,
    Permission.DELETE_AUTHOR,

    Permission.BROWSE_PUBLISHERS,
    Permission.READ_PUBLISHER,
    Permission.EDIT_PUBLISHER,
    Permission.ADD_PUBLISHER,
    Permission.DELETE_PUBLISHER,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,
    Permission.EDIT_CATEGORY,
    Permission.ADD_CATEGORY,
    Permission.DELETE_CATEGORY,
  ],

  [Role.REGULAR_USER]: [
    Permission.BROWSE_BOOKS,
    Permission.READ_BOOK,

    Permission.BROWSE_AUTHORS,
    Permission.READ_AUTHOR,

    Permission.BROWSE_PUBLISHERS,
    Permission.READ_PUBLISHER,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,
  ],
} as const
