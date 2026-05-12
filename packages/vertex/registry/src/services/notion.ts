import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "notion",
  "type": "http",
  "connection": {
    "provider": "notion",
    "baseUrl": "https://api.notion.com/v1"
  },
  "schemas": {
    "Page": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "created_time": {
          "type": "string"
        },
        "last_edited_time": {
          "type": "string"
        },
        "created_by": {
          "type": "ref",
          "ref": "PartialUser"
        },
        "last_edited_by": {
          "type": "ref",
          "ref": "PartialUser"
        },
        "archived": {
          "type": "boolean"
        },
        "in_trash": {
          "type": "boolean"
        },
        "icon": {
          "type": "ref",
          "ref": "Emoji"
        },
        "cover": {
          "type": "ref",
          "ref": "File"
        },
        "properties": {
          "type": "object",
          "properties": {}
        },
        "parent": {
          "type": "ref",
          "ref": "Parent"
        },
        "url": {
          "type": "string"
        },
        "public_url": {
          "type": "object"
        }
      },
      "required": [
        "object",
        "id",
        "created_time",
        "last_edited_time",
        "created_by",
        "last_edited_by",
        "archived",
        "properties",
        "parent",
        "url"
      ]
    },
    "Database": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "created_time": {
          "type": "string"
        },
        "last_edited_time": {
          "type": "string"
        },
        "created_by": {
          "type": "ref",
          "ref": "PartialUser"
        },
        "last_edited_by": {
          "type": "ref",
          "ref": "PartialUser"
        },
        "title": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RichText"
          }
        },
        "description": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RichText"
          }
        },
        "icon": {
          "type": "ref",
          "ref": "Emoji"
        },
        "cover": {
          "type": "ref",
          "ref": "File"
        },
        "properties": {
          "type": "object",
          "properties": {}
        },
        "parent": {
          "type": "ref",
          "ref": "Parent"
        },
        "url": {
          "type": "string"
        },
        "public_url": {
          "type": "object"
        },
        "archived": {
          "type": "boolean"
        },
        "in_trash": {
          "type": "boolean"
        },
        "is_inline": {
          "type": "boolean"
        }
      },
      "required": [
        "object",
        "id",
        "created_time",
        "last_edited_time",
        "created_by",
        "last_edited_by",
        "title",
        "description",
        "properties",
        "parent",
        "url",
        "archived"
      ]
    },
    "Block": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "parent": {
          "type": "ref",
          "ref": "Parent"
        },
        "type": {
          "type": "string"
        },
        "created_time": {
          "type": "string"
        },
        "last_edited_time": {
          "type": "string"
        },
        "created_by": {
          "type": "ref",
          "ref": "PartialUser"
        },
        "last_edited_by": {
          "type": "ref",
          "ref": "PartialUser"
        },
        "archived": {
          "type": "boolean"
        },
        "in_trash": {
          "type": "boolean"
        },
        "has_children": {
          "type": "boolean"
        }
      },
      "required": [
        "object",
        "id",
        "type",
        "created_time",
        "last_edited_time",
        "has_children"
      ]
    },
    "User": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "name": {
          "type": "object"
        },
        "avatar_url": {
          "type": "object"
        },
        "person": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            }
          }
        },
        "bot": {
          "type": "object",
          "properties": {
            "owner": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string"
                },
                "workspace": {
                  "type": "boolean"
                }
              }
            },
            "workspace_name": {
              "type": "object"
            }
          }
        }
      },
      "required": [
        "object",
        "id"
      ]
    },
    "PartialUser": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      },
      "required": [
        "object",
        "id"
      ]
    },
    "Comment": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "parent": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string"
            },
            "page_id": {
              "type": "string"
            },
            "block_id": {
              "type": "string"
            }
          }
        },
        "discussion_id": {
          "type": "string"
        },
        "created_time": {
          "type": "string"
        },
        "last_edited_time": {
          "type": "string"
        },
        "created_by": {
          "type": "ref",
          "ref": "PartialUser"
        },
        "rich_text": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RichText"
          }
        }
      },
      "required": [
        "object",
        "id",
        "parent",
        "discussion_id",
        "created_time",
        "last_edited_time",
        "created_by",
        "rich_text"
      ]
    },
    "RichText": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "text": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string"
            },
            "link": {
              "type": "object"
            }
          }
        },
        "mention": {
          "type": "object",
          "properties": {}
        },
        "equation": {
          "type": "object",
          "properties": {
            "expression": {
              "type": "string"
            }
          }
        },
        "annotations": {
          "type": "object",
          "properties": {
            "bold": {
              "type": "boolean"
            },
            "italic": {
              "type": "boolean"
            },
            "strikethrough": {
              "type": "boolean"
            },
            "underline": {
              "type": "boolean"
            },
            "code": {
              "type": "boolean"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "plain_text": {
          "type": "string"
        },
        "href": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "plain_text"
      ]
    },
    "Parent": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "database_id": {
          "type": "string"
        },
        "page_id": {
          "type": "string"
        },
        "block_id": {
          "type": "string"
        },
        "workspace": {
          "type": "boolean"
        }
      },
      "required": [
        "type"
      ]
    },
    "PropertySchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "Emoji": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "emoji": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "emoji"
      ]
    },
    "File": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "file": {
          "type": "object",
          "properties": {
            "url": {
              "type": "string"
            },
            "expiry_time": {
              "type": "string"
            }
          }
        },
        "external": {
          "type": "object",
          "properties": {
            "url": {
              "type": "string"
            }
          }
        },
        "name": {
          "type": "string"
        },
        "caption": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RichText"
          }
        }
      },
      "required": [
        "type"
      ]
    },
    "ExternalFile": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "external": {
          "type": "object",
          "properties": {
            "url": {
              "type": "string"
            }
          },
          "required": [
            "url"
          ]
        }
      },
      "required": [
        "type",
        "external"
      ]
    },
    "PaginatedList": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "results": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {}
          }
        },
        "next_cursor": {
          "type": "object"
        },
        "has_more": {
          "type": "boolean"
        },
        "type": {
          "type": "string"
        },
        "request_id": {
          "type": "string"
        }
      },
      "required": [
        "object",
        "results",
        "next_cursor",
        "has_more"
      ]
    },
    "Error": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "status": {
          "type": "number"
        },
        "code": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "request_id": {
          "type": "string"
        }
      },
      "required": [
        "object",
        "status",
        "code",
        "message"
      ]
    }
  },
  "entities": {},
  "queries": {
    "retrievePage": {
      "name": "Notion Retrieve a page",
      "schema": {
        "type": "ref",
        "ref": "Page"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "page_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "filter_properties": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/pages/{page_id}",
          "params": {
            "page_id": {
              "$resolve": "args.page_id"
            }
          },
          "query": {
            "filter_properties": {
              "$resolve": "args.filter_properties"
            }
          }
        }
      }
    },
    "retrievePageProperty": {
      "name": "Notion Retrieve a page property item",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "page_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "property_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "page_size": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/pages/{page_id}/properties/{property_id}",
          "params": {
            "page_id": {
              "$resolve": "args.page_id"
            },
            "property_id": {
              "$resolve": "args.property_id"
            }
          },
          "query": {
            "start_cursor": {
              "$resolve": "args.start_cursor"
            },
            "page_size": {
              "$resolve": "args.page_size"
            }
          }
        }
      }
    },
    "retrieveDatabase": {
      "name": "Notion Retrieve a database",
      "schema": {
        "type": "ref",
        "ref": "Database"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "database_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/databases/{database_id}",
          "params": {
            "database_id": {
              "$resolve": "args.database_id"
            }
          }
        }
      }
    },
    "retrieveBlock": {
      "name": "Notion Retrieve a block",
      "schema": {
        "type": "ref",
        "ref": "Block"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "block_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/blocks/{block_id}",
          "params": {
            "block_id": {
              "$resolve": "args.block_id"
            }
          }
        }
      }
    },
    "retrieveBlockChildren": {
      "name": "Notion Retrieve block children",
      "schema": {
        "type": "ref",
        "ref": "PaginatedList"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "block_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "page_size": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/blocks/{block_id}/children",
          "params": {
            "block_id": {
              "$resolve": "args.block_id"
            }
          },
          "query": {
            "start_cursor": {
              "$resolve": "args.start_cursor"
            },
            "page_size": {
              "$resolve": "args.page_size"
            }
          }
        }
      }
    },
    "listUsers": {
      "name": "Notion List all users",
      "schema": {
        "type": "ref",
        "ref": "PaginatedList"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "start_cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "page_size": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users",
          "query": {
            "start_cursor": {
              "$resolve": "args.start_cursor"
            },
            "page_size": {
              "$resolve": "args.page_size"
            }
          }
        }
      }
    },
    "retrieveUser": {
      "name": "Notion Retrieve a user",
      "schema": {
        "type": "ref",
        "ref": "User"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "user_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/{user_id}",
          "params": {
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "retrieveBotUser": {
      "name": "Notion Retrieve the bot user",
      "schema": {
        "type": "ref",
        "ref": "User"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/me"
        }
      }
    },
    "listComments": {
      "name": "Notion Retrieve comments",
      "schema": {
        "type": "ref",
        "ref": "PaginatedList"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "block_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "page_size": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/comments",
          "query": {
            "block_id": {
              "$resolve": "args.block_id"
            },
            "start_cursor": {
              "$resolve": "args.start_cursor"
            },
            "page_size": {
              "$resolve": "args.page_size"
            }
          }
        }
      }
    }
  },
  "actions": {
    "createPage": {
      "name": "Notion Create a page",
      "schema": {
        "type": "ref",
        "ref": "Page"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "parent": {
                "type": "ref",
                "ref": "Parent"
              },
              "properties": {
                "type": "object",
                "properties": {}
              },
              "children": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "Block"
                }
              },
              "icon": {
                "type": "ref",
                "ref": "Emoji"
              },
              "cover": {
                "type": "ref",
                "ref": "ExternalFile"
              }
            },
            "required": [
              "parent",
              "properties"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/pages",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updatePage": {
      "name": "Notion Update page properties",
      "schema": {
        "type": "ref",
        "ref": "Page"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "page_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "properties": {
                "type": "object",
                "properties": {}
              },
              "archived": {
                "type": "boolean"
              },
              "icon": {
                "type": "ref",
                "ref": "Emoji"
              },
              "cover": {
                "type": "ref",
                "ref": "ExternalFile"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/pages/{page_id}",
          "params": {
            "page_id": {
              "$resolve": "args.page_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createDatabase": {
      "name": "Notion Create a database",
      "schema": {
        "type": "ref",
        "ref": "Database"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "parent": {
                "type": "ref",
                "ref": "Parent"
              },
              "title": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "RichText"
                }
              },
              "description": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "RichText"
                }
              },
              "properties": {
                "type": "object",
                "properties": {}
              },
              "is_inline": {
                "type": "boolean"
              },
              "icon": {
                "type": "ref",
                "ref": "Emoji"
              },
              "cover": {
                "type": "ref",
                "ref": "ExternalFile"
              }
            },
            "required": [
              "parent",
              "properties"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/databases",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateDatabase": {
      "name": "Notion Update a database",
      "schema": {
        "type": "ref",
        "ref": "Database"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "database_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "title": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "RichText"
                }
              },
              "description": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "RichText"
                }
              },
              "properties": {
                "type": "object",
                "properties": {}
              },
              "icon": {
                "type": "ref",
                "ref": "Emoji"
              },
              "cover": {
                "type": "ref",
                "ref": "ExternalFile"
              },
              "is_inline": {
                "type": "boolean"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/databases/{database_id}",
          "params": {
            "database_id": {
              "$resolve": "args.database_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "queryDatabase": {
      "name": "Notion Query a database",
      "schema": {
        "type": "ref",
        "ref": "PaginatedList"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "database_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "filter_properties": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "filter": {
                "type": "object",
                "properties": {}
              },
              "sorts": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "property": {
                      "type": "string"
                    },
                    "timestamp": {
                      "type": "string"
                    },
                    "direction": {
                      "type": "string"
                    }
                  }
                }
              },
              "start_cursor": {
                "type": "string"
              },
              "page_size": {
                "type": "number"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/databases/{database_id}/query",
          "params": {
            "database_id": {
              "$resolve": "args.database_id"
            }
          },
          "query": {
            "filter_properties": {
              "$resolve": "args.filter_properties"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateBlock": {
      "name": "Notion Update a block",
      "schema": {
        "type": "ref",
        "ref": "Block"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "block_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "archived": {
                "type": "boolean"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/blocks/{block_id}",
          "params": {
            "block_id": {
              "$resolve": "args.block_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteBlock": {
      "name": "Notion Delete a block",
      "schema": {
        "type": "ref",
        "ref": "Block"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "block_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/blocks/{block_id}",
          "params": {
            "block_id": {
              "$resolve": "args.block_id"
            }
          }
        }
      }
    },
    "appendBlockChildren": {
      "name": "Notion Append block children",
      "schema": {
        "type": "ref",
        "ref": "PaginatedList"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "block_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "children": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "Block"
                }
              },
              "after": {
                "type": "string"
              }
            },
            "required": [
              "children"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/blocks/{block_id}/children",
          "params": {
            "block_id": {
              "$resolve": "args.block_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "search": {
      "name": "Notion Search by title",
      "schema": {
        "type": "ref",
        "ref": "PaginatedList"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "query": {
                "type": "string"
              },
              "filter": {
                "type": "object",
                "properties": {
                  "value": {
                    "type": "string"
                  },
                  "property": {
                    "type": "string"
                  }
                }
              },
              "sort": {
                "type": "object",
                "properties": {
                  "direction": {
                    "type": "string"
                  },
                  "timestamp": {
                    "type": "string"
                  }
                }
              },
              "start_cursor": {
                "type": "string"
              },
              "page_size": {
                "type": "number"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/search",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createComment": {
      "name": "Notion Create a comment",
      "schema": {
        "type": "ref",
        "ref": "Comment"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "parent": {
                "type": "object",
                "properties": {
                  "page_id": {
                    "type": "string"
                  }
                }
              },
              "discussion_id": {
                "type": "string"
              },
              "rich_text": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "RichText"
                }
              }
            },
            "required": [
              "rich_text"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/comments",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    }
  }
};

export default spec;
