import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "todoist",
  "type": "http",
  "connection": {
    "provider": "todoist",
    "baseUrl": "https://api.todoist.com/rest/v2"
  },
  "schemas": {
    "Project": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "color": {
          "type": "string"
        },
        "parent_id": {
          "type": "object"
        },
        "order": {
          "type": "number"
        },
        "comment_count": {
          "type": "number"
        },
        "is_shared": {
          "type": "boolean"
        },
        "is_favorite": {
          "type": "boolean"
        },
        "is_inbox_project": {
          "type": "boolean"
        },
        "is_team_inbox": {
          "type": "boolean"
        },
        "view_style": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    },
    "Collaborator": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      }
    },
    "Section": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "project_id": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "Task": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "project_id": {
          "type": "string"
        },
        "section_id": {
          "type": "object"
        },
        "content": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "is_completed": {
          "type": "boolean"
        },
        "labels": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "parent_id": {
          "type": "object"
        },
        "order": {
          "type": "number"
        },
        "priority": {
          "type": "number"
        },
        "due": {
          "type": "object"
        },
        "url": {
          "type": "string"
        },
        "comment_count": {
          "type": "number"
        },
        "created_at": {
          "type": "string"
        },
        "creator_id": {
          "type": "string"
        },
        "assignee_id": {
          "type": "object"
        },
        "assigner_id": {
          "type": "object"
        },
        "duration": {
          "type": "object"
        }
      }
    },
    "Due": {
      "type": "object",
      "properties": {
        "string": {
          "type": "string"
        },
        "date": {
          "type": "string"
        },
        "is_recurring": {
          "type": "boolean"
        },
        "datetime": {
          "type": "string"
        },
        "timezone": {
          "type": "string"
        }
      },
      "required": [
        "string",
        "date",
        "is_recurring"
      ]
    },
    "Duration": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "object"
        },
        "unit": {
          "type": "object"
        }
      }
    },
    "Comment": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "task_id": {
          "type": "object"
        },
        "project_id": {
          "type": "object"
        },
        "posted_at": {
          "type": "string"
        },
        "content": {
          "type": "string"
        },
        "attachment": {
          "type": "object"
        }
      }
    },
    "Label": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "color": {
          "type": "string"
        },
        "order": {
          "type": "number"
        },
        "is_favorite": {
          "type": "boolean"
        }
      }
    },
    "ErrorModel": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "code": {
          "type": "number"
        }
      },
      "required": [
        "message",
        "code"
      ]
    }
  },
  "entities": {},
  "queries": {
    "getAllProjects": {
      "name": "Get all projects",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "Project"
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects"
        }
      }
    },
    "getProject": {
      "name": "Get a project",
      "schema": {
        "type": "ref",
        "ref": "Project"
      },
      "args": {
        "projectId": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/{projectId}",
          "params": {
            "projectId": {
              "$resolve": "args.projectId"
            }
          }
        }
      }
    },
    "getAllCollaborators": {
      "name": "Get all project collaborators",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "Collaborator"
        }
      },
      "args": {
        "projectId": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/{projectId}/collaborators",
          "params": {
            "projectId": {
              "$resolve": "args.projectId"
            }
          }
        }
      }
    },
    "getAllSections": {
      "name": "Get all sections",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "Section"
        }
      },
      "args": {
        "project_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/sections",
          "query": {
            "project_id": {
              "$resolve": "args.project_id"
            }
          }
        }
      }
    },
    "getSingleSection": {
      "name": "Get single section",
      "schema": {
        "type": "ref",
        "ref": "Section"
      },
      "args": {
        "sectionId": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/sections/{sectionId}",
          "params": {
            "sectionId": {
              "$resolve": "args.sectionId"
            }
          }
        }
      }
    },
    "getActiveTasks": {
      "name": "Get active tasks",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "Task"
        }
      },
      "args": {
        "project_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "section_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "label": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "filter": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "lang": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "ids": {
          "schema": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/tasks",
          "query": {
            "project_id": {
              "$resolve": "args.project_id"
            },
            "section_id": {
              "$resolve": "args.section_id"
            },
            "label": {
              "$resolve": "args.label"
            },
            "filter": {
              "$resolve": "args.filter"
            },
            "lang": {
              "$resolve": "args.lang"
            },
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "getActiveTask": {
      "name": "Get an active task",
      "schema": {
        "type": "ref",
        "ref": "Task"
      },
      "args": {
        "taskId": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/tasks/{taskId}",
          "params": {
            "taskId": {
              "$resolve": "args.taskId"
            }
          }
        }
      }
    },
    "getAllComments": {
      "name": "Get all comments",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "Comment"
        }
      },
      "args": {
        "project_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "task_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/comments",
          "query": {
            "project_id": {
              "$resolve": "args.project_id"
            },
            "task_id": {
              "$resolve": "args.task_id"
            }
          }
        }
      }
    },
    "getComment": {
      "name": "Get a comment",
      "schema": {
        "type": "ref",
        "ref": "Comment"
      },
      "args": {
        "comment_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/comments/{comment_id}",
          "params": {
            "comment_id": {
              "$resolve": "args.comment_id"
            }
          }
        }
      }
    },
    "getAllPersonalLabels": {
      "name": "Get all personal labels",
      "schema": {
        "type": "array",
        "items": {
          "type": "ref",
          "ref": "Label"
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/labels"
        }
      }
    },
    "getPersonalLabel": {
      "name": "Get a personal label",
      "schema": {
        "type": "ref",
        "ref": "Label"
      },
      "args": {
        "label_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/labels/{label_id}",
          "params": {
            "label_id": {
              "$resolve": "args.label_id"
            }
          }
        }
      }
    }
  },
  "actions": {
    "createProject": {
      "name": "Create a new project",
      "schema": {
        "type": "ref",
        "ref": "Project"
      },
      "args": {
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "parent_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "color": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "is_favorite": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "view_style": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects",
          "query": {
            "name": {
              "$resolve": "args.name"
            },
            "parent_id": {
              "$resolve": "args.parent_id"
            },
            "color": {
              "$resolve": "args.color"
            },
            "is_favorite": {
              "$resolve": "args.is_favorite"
            },
            "view_style": {
              "$resolve": "args.view_style"
            }
          }
        }
      }
    },
    "updateProject": {
      "name": "Update a project",
      "schema": {
        "type": "ref",
        "ref": "Project"
      },
      "args": {
        "projectId": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "color": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "is_favorite": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "view_style": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{projectId}",
          "params": {
            "projectId": {
              "$resolve": "args.projectId"
            }
          },
          "query": {
            "name": {
              "$resolve": "args.name"
            },
            "color": {
              "$resolve": "args.color"
            },
            "is_favorite": {
              "$resolve": "args.is_favorite"
            },
            "view_style": {
              "$resolve": "args.view_style"
            }
          }
        }
      }
    },
    "deleteProject": {
      "name": "Delete a project",
      "schema": {
        "type": "object"
      },
      "args": {
        "projectId": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/projects/{projectId}",
          "params": {
            "projectId": {
              "$resolve": "args.projectId"
            }
          }
        }
      }
    },
    "createSection": {
      "name": "Create a new section",
      "schema": {
        "type": "ref",
        "ref": "Section"
      },
      "args": {
        "project_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "order": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sections",
          "query": {
            "project_id": {
              "$resolve": "args.project_id"
            },
            "name": {
              "$resolve": "args.name"
            },
            "order": {
              "$resolve": "args.order"
            }
          }
        }
      }
    },
    "updateSection": {
      "name": "Update a section name",
      "schema": {
        "type": "ref",
        "ref": "Section"
      },
      "args": {
        "sectionId": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sections/{sectionId}",
          "params": {
            "sectionId": {
              "$resolve": "args.sectionId"
            }
          },
          "query": {
            "name": {
              "$resolve": "args.name"
            }
          }
        }
      }
    },
    "deleteSection": {
      "name": "Delete a section",
      "schema": {
        "type": "object"
      },
      "args": {
        "sectionId": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/sections/{sectionId}",
          "params": {
            "sectionId": {
              "$resolve": "args.sectionId"
            }
          }
        }
      }
    },
    "createTask": {
      "name": "Create a new task",
      "schema": {
        "type": "ref",
        "ref": "Task"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "content": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "project_id": {
                "type": "string"
              },
              "section_id": {
                "type": "string"
              },
              "parent_id": {
                "type": "string"
              },
              "order": {
                "type": "number"
              },
              "labels": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "priority": {
                "type": "number"
              },
              "due_string": {
                "type": "string"
              },
              "due_date": {
                "type": "string"
              },
              "due_datetime": {
                "type": "string"
              },
              "due_lang": {
                "type": "string"
              },
              "assignee_id": {
                "type": "string"
              },
              "duration": {
                "type": "number"
              },
              "duration_unit": {
                "type": "string"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateTask": {
      "name": "Update a task",
      "schema": {
        "type": "ref",
        "ref": "Task"
      },
      "args": {
        "taskId": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "content": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "labels": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "priority": {
                "type": "number"
              },
              "due_string": {
                "type": "string"
              },
              "due_date": {
                "type": "string"
              },
              "due_datetime": {
                "type": "string"
              },
              "due_lang": {
                "type": "string"
              },
              "assignee_id": {
                "type": "string"
              },
              "duration": {
                "type": "number"
              },
              "duration_unit": {
                "type": "string"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{taskId}",
          "params": {
            "taskId": {
              "$resolve": "args.taskId"
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
    "deleteTask": {
      "name": "Delete a task",
      "schema": {
        "type": "object"
      },
      "args": {
        "taskId": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/tasks/{taskId}",
          "params": {
            "taskId": {
              "$resolve": "args.taskId"
            }
          }
        }
      }
    },
    "closeTask": {
      "name": "Close a task",
      "schema": {
        "type": "object"
      },
      "args": {
        "taskId": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{taskId}/close",
          "params": {
            "taskId": {
              "$resolve": "args.taskId"
            }
          }
        }
      }
    },
    "reopenTask": {
      "name": "Reopen a task",
      "schema": {
        "type": "object"
      },
      "args": {
        "taskId": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{taskId}/reopen",
          "params": {
            "taskId": {
              "$resolve": "args.taskId"
            }
          }
        }
      }
    },
    "createComment": {
      "name": "Create a new comment",
      "schema": {
        "type": "ref",
        "ref": "Comment"
      },
      "args": {
        "task_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "project_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "content": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "attachment": {
          "schema": {
            "type": "object",
            "properties": {
              "resource_type": {
                "type": "string"
              },
              "file_url": {
                "type": "string"
              },
              "file_type": {
                "type": "string"
              },
              "file_name": {
                "type": "string"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/comments",
          "query": {
            "task_id": {
              "$resolve": "args.task_id"
            },
            "project_id": {
              "$resolve": "args.project_id"
            },
            "content": {
              "$resolve": "args.content"
            },
            "attachment": {
              "$resolve": "args.attachment"
            }
          }
        }
      }
    },
    "updateComment": {
      "name": "Update a comment",
      "schema": {
        "type": "ref",
        "ref": "Comment"
      },
      "args": {
        "comment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "content": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/comments/{comment_id}",
          "params": {
            "comment_id": {
              "$resolve": "args.comment_id"
            }
          },
          "query": {
            "content": {
              "$resolve": "args.content"
            }
          }
        }
      }
    },
    "deleteComment": {
      "name": "Delete a comment",
      "schema": {
        "type": "object"
      },
      "args": {
        "comment_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/comments/{comment_id}",
          "params": {
            "comment_id": {
              "$resolve": "args.comment_id"
            }
          }
        }
      }
    },
    "createPersonalLabel": {
      "name": "Create a new personal label",
      "schema": {
        "type": "ref",
        "ref": "Label"
      },
      "args": {
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "order": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "color": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "is_favorite": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/labels",
          "query": {
            "name": {
              "$resolve": "args.name"
            },
            "order": {
              "$resolve": "args.order"
            },
            "color": {
              "$resolve": "args.color"
            },
            "is_favorite": {
              "$resolve": "args.is_favorite"
            }
          }
        }
      }
    },
    "updatePersonalLabel": {
      "name": "Update a personal label",
      "schema": {
        "type": "ref",
        "ref": "Label"
      },
      "args": {
        "label_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "order": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "color": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "is_favorite": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/labels/{label_id}",
          "params": {
            "label_id": {
              "$resolve": "args.label_id"
            }
          },
          "query": {
            "name": {
              "$resolve": "args.name"
            },
            "order": {
              "$resolve": "args.order"
            },
            "color": {
              "$resolve": "args.color"
            },
            "is_favorite": {
              "$resolve": "args.is_favorite"
            }
          }
        }
      }
    },
    "deletePersonalLabel": {
      "name": "Delete a personal label",
      "schema": {
        "type": "object"
      },
      "args": {
        "label_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/labels/{label_id}",
          "params": {
            "label_id": {
              "$resolve": "args.label_id"
            }
          }
        }
      }
    }
  }
};

export default spec;
