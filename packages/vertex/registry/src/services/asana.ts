import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "asana",
  "type": "http",
  "connection": {
    "provider": "asana",
    "baseUrl": "https://app.asana.com/api/1.0"
  },
  "schemas": {
    "AllocationBase": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        },
        "effort": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string"
            },
            "value": {
              "type": "number"
            }
          }
        }
      }
    },
    "AllocationResponse": {
      "type": "ref",
      "ref": "AllocationBase"
    },
    "AllocationRequest": {
      "type": "ref",
      "ref": "AllocationBase"
    },
    "AddCustomFieldSettingRequest": {
      "type": "object",
      "properties": {
        "custom_field": {
          "type": "string"
        },
        "is_important": {
          "type": "boolean"
        },
        "insert_before": {
          "type": "string"
        },
        "insert_after": {
          "type": "string"
        }
      },
      "required": [
        "custom_field"
      ]
    },
    "AddFollowersRequest": {
      "type": "object",
      "properties": {
        "followers": {
          "type": "string"
        }
      },
      "required": [
        "followers"
      ]
    },
    "AddMembersRequest": {
      "type": "object",
      "properties": {
        "members": {
          "type": "string"
        }
      },
      "required": [
        "members"
      ]
    },
    "AsanaNamedResource": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "AsanaResource": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        }
      }
    },
    "AttachmentBase": {
      "type": "ref",
      "ref": "AttachmentCompact"
    },
    "AttachmentCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        }
      }
    },
    "AttachmentRequest": {
      "type": "object",
      "properties": {
        "resource_subtype": {
          "type": "string"
        },
        "file": {
          "type": "string"
        },
        "parent": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "connect_to_app": {
          "type": "boolean"
        }
      },
      "required": [
        "parent"
      ]
    },
    "AttachmentResponse": {
      "type": "ref",
      "ref": "AttachmentBase"
    },
    "AuditLogEvent": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "event_type": {
          "type": "string"
        },
        "event_category": {
          "type": "string"
        },
        "actor": {
          "type": "ref",
          "ref": "AuditLogEventActor"
        },
        "resource": {
          "type": "ref",
          "ref": "AuditLogEventResource"
        },
        "details": {
          "type": "ref",
          "ref": "AuditLogEventDetails"
        },
        "context": {
          "type": "ref",
          "ref": "AuditLogEventContext"
        }
      }
    },
    "AuditLogEventActor": {
      "type": "object",
      "properties": {
        "actor_type": {
          "type": "string"
        },
        "gid": {
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
    "AuditLogEventContext": {
      "type": "object",
      "properties": {
        "context_type": {
          "type": "string"
        },
        "api_authentication_method": {
          "type": "string"
        },
        "client_ip_address": {
          "type": "string"
        },
        "user_agent": {
          "type": "string"
        },
        "oauth_app_name": {
          "type": "string"
        },
        "rule_name": {
          "type": "string"
        },
        "on_behalf_of_user_id": {
          "type": "number"
        }
      }
    },
    "AuditLogEventDetails": {
      "type": "object",
      "properties": {
        "old_value": {
          "type": "string"
        },
        "new_value": {
          "type": "string"
        },
        "group": {
          "type": "object",
          "properties": {}
        },
        "saml_response": {
          "type": "string"
        }
      }
    },
    "AuditLogEventResource": {
      "type": "object",
      "properties": {
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "gid": {
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
    "BatchRequest": {
      "type": "object",
      "properties": {
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BatchRequestAction"
          }
        }
      }
    },
    "BatchRequestAction": {
      "type": "object",
      "properties": {
        "relative_path": {
          "type": "string"
        },
        "method": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "properties": {}
        },
        "options": {
          "type": "object",
          "properties": {
            "limit": {
              "type": "number"
            },
            "offset": {
              "type": "number"
            },
            "fields": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        }
      },
      "required": [
        "relative_path",
        "method"
      ]
    },
    "BatchResponse": {
      "type": "object",
      "properties": {
        "status_code": {
          "type": "number"
        },
        "headers": {
          "type": "object",
          "properties": {}
        },
        "body": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "BudgetCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "budget_type": {
          "type": "string"
        }
      }
    },
    "BudgetResponse": {
      "type": "ref",
      "ref": "BudgetCompact"
    },
    "BudgetRequest": {
      "type": "ref",
      "ref": "BudgetCompact"
    },
    "BudgetEstimateRequest": {
      "type": "object",
      "properties": {
        "billable_status_filter": {
          "type": "string"
        },
        "source": {
          "type": "string"
        },
        "enabled": {
          "type": "boolean"
        }
      }
    },
    "BudgetEstimateResponse": {
      "type": "ref",
      "ref": "BudgetEstimateRequest"
    },
    "BudgetActualRequest": {
      "type": "object",
      "properties": {
        "billable_status_filter": {
          "type": "string"
        }
      }
    },
    "BudgetActualResponse": {
      "type": "ref",
      "ref": "BudgetActualRequest"
    },
    "BudgetTotalRequest": {
      "type": "object",
      "properties": {
        "enabled": {
          "type": "boolean"
        },
        "value": {
          "type": "number"
        }
      }
    },
    "BudgetTotalResponse": {
      "type": "ref",
      "ref": "BudgetTotalRequest"
    },
    "CustomFieldBase": {
      "type": "ref",
      "ref": "CustomFieldCompact"
    },
    "CustomFieldCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "enum_options": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EnumOption"
          }
        },
        "enabled": {
          "type": "boolean"
        },
        "representation_type": {
          "type": "string"
        },
        "id_prefix": {
          "type": "string"
        },
        "input_restrictions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "is_formula_field": {
          "type": "boolean"
        },
        "date_value": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string"
            },
            "date_time": {
              "type": "string"
            }
          }
        },
        "enum_value": {
          "type": "ref",
          "ref": "EnumOption"
        },
        "multi_enum_values": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EnumOption"
          }
        },
        "number_value": {
          "type": "number"
        },
        "text_value": {
          "type": "string"
        },
        "display_value": {
          "type": "string"
        }
      }
    },
    "CustomFieldRequest": {
      "type": "ref",
      "ref": "CustomFieldBase"
    },
    "CustomFieldCreateRequest": {
      "type": "ref",
      "ref": "CustomFieldRequest"
    },
    "CustomFieldResponse": {
      "type": "ref",
      "ref": "CustomFieldBase"
    },
    "CustomFieldSettingBase": {
      "type": "ref",
      "ref": "CustomFieldSettingCompact"
    },
    "CustomFieldSettingCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        }
      }
    },
    "CustomFieldSettingResponse": {
      "type": "ref",
      "ref": "CustomFieldSettingBase"
    },
    "CustomTypeBase": {
      "type": "ref",
      "ref": "CustomTypeCompact"
    },
    "CustomTypeCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "CustomTypeResponse": {
      "type": "ref",
      "ref": "CustomTypeBase"
    },
    "CustomTypeStatusOptionBase": {
      "type": "ref",
      "ref": "CustomTypeStatusOptionCompact"
    },
    "CustomTypeStatusOptionCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "CustomTypeStatusOptionResponse": {
      "type": "ref",
      "ref": "CustomTypeStatusOptionBase"
    },
    "EmptyResponse": {
      "type": "object",
      "properties": {}
    },
    "EnumOption": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "enabled": {
          "type": "boolean"
        },
        "color": {
          "type": "string"
        }
      }
    },
    "EnumOptionBase": {
      "type": "ref",
      "ref": "EnumOption"
    },
    "EnumOptionInsertRequest": {
      "type": "object",
      "properties": {
        "enum_option": {
          "type": "string"
        },
        "before_enum_option": {
          "type": "string"
        },
        "after_enum_option": {
          "type": "string"
        }
      },
      "required": [
        "enum_option"
      ]
    },
    "EnumOptionRequest": {
      "type": "ref",
      "ref": "EnumOptionBase"
    },
    "Error": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "help": {
          "type": "string"
        },
        "phrase": {
          "type": "string"
        }
      }
    },
    "ErrorResponse": {
      "type": "object",
      "properties": {
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Error"
          }
        }
      }
    },
    "EventResponse": {
      "type": "object",
      "properties": {
        "user": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "resource": {
          "type": "ref",
          "ref": "AsanaNamedResource"
        },
        "type": {
          "type": "string"
        },
        "action": {
          "type": "string"
        },
        "parent": {
          "type": "ref",
          "ref": "AsanaNamedResource"
        },
        "created_at": {
          "type": "string"
        },
        "change": {
          "type": "object",
          "properties": {
            "field": {
              "type": "string"
            },
            "action": {
              "type": "string"
            },
            "new_value": {
              "type": "object",
              "properties": {}
            },
            "added_value": {
              "type": "object",
              "properties": {}
            },
            "removed_value": {
              "type": "object",
              "properties": {}
            }
          }
        }
      }
    },
    "GoalAddSubgoalRequest": {
      "type": "object",
      "properties": {
        "subgoal": {
          "type": "string"
        },
        "insert_before": {
          "type": "string"
        },
        "insert_after": {
          "type": "string"
        }
      },
      "required": [
        "subgoal"
      ]
    },
    "GoalAddSupportingWorkRequest": {
      "type": "object",
      "properties": {
        "supporting_work": {
          "type": "string"
        }
      },
      "required": [
        "supporting_work"
      ]
    },
    "GoalBase": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "html_notes": {
          "type": "string"
        },
        "notes": {
          "type": "string"
        },
        "due_on": {
          "type": "string"
        },
        "start_on": {
          "type": "string"
        },
        "is_workspace_level": {
          "type": "boolean"
        },
        "liked": {
          "type": "boolean"
        }
      }
    },
    "GoalCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "owner": {
          "type": "ref",
          "ref": "UserCompact"
        }
      }
    },
    "GoalMetricBase": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "precision": {
          "type": "number"
        },
        "unit": {
          "type": "string"
        },
        "currency_code": {
          "type": "string"
        },
        "initial_number_value": {
          "type": "number"
        },
        "target_number_value": {
          "type": "number"
        },
        "current_number_value": {
          "type": "number"
        },
        "current_display_value": {
          "type": "string"
        },
        "progress_source": {
          "type": "string"
        },
        "is_custom_weight": {
          "type": "boolean"
        }
      }
    },
    "GoalRemoveSupportingRelationshipRequest": {
      "type": "object",
      "properties": {
        "supporting_resource": {
          "type": "string"
        }
      },
      "required": [
        "supporting_resource"
      ]
    },
    "GoalAddSupportingRelationshipRequest": {
      "type": "object",
      "properties": {
        "supporting_resource": {
          "type": "string"
        },
        "insert_before": {
          "type": "string"
        },
        "insert_after": {
          "type": "string"
        },
        "contribution_weight": {
          "type": "number"
        }
      },
      "required": [
        "supporting_resource"
      ]
    },
    "GoalMetricCurrentValueRequest": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "current_number_value": {
          "type": "number"
        }
      }
    },
    "GoalMetricRequest": {
      "type": "ref",
      "ref": "GoalMetricBase"
    },
    "GoalRemoveSubgoalRequest": {
      "type": "object",
      "properties": {
        "subgoal": {
          "type": "string"
        }
      },
      "required": [
        "subgoal"
      ]
    },
    "GoalRequestBase": {
      "type": "ref",
      "ref": "GoalBase"
    },
    "GoalRequest": {
      "type": "ref",
      "ref": "GoalRequestBase"
    },
    "GoalUpdateRequest": {
      "type": "ref",
      "ref": "GoalRequestBase"
    },
    "GoalResponse": {
      "type": "ref",
      "ref": "GoalBase"
    },
    "GoalRelationshipBase": {
      "type": "ref",
      "ref": "GoalRelationshipCompact"
    },
    "GoalRelationshipCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "supporting_resource": {
          "type": "ref",
          "ref": "ProjectCompact"
        },
        "contribution_weight": {
          "type": "number"
        }
      }
    },
    "GoalRelationshipRequest": {
      "type": "ref",
      "ref": "GoalRelationshipBase"
    },
    "GoalRelationshipResponse": {
      "type": "ref",
      "ref": "GoalRelationshipBase"
    },
    "JobBase": {
      "type": "ref",
      "ref": "JobCompact"
    },
    "JobCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "new_portfolio": {
          "type": "ref",
          "ref": "PortfolioCompact"
        },
        "new_project": {
          "type": "ref",
          "ref": "ProjectCompact"
        },
        "new_task": {
          "type": "ref",
          "ref": "TaskCompact"
        },
        "new_project_template": {
          "type": "ref",
          "ref": "ProjectTemplateCompact"
        },
        "new_graph_export": {
          "type": "ref",
          "ref": "GraphExportCompact"
        },
        "new_resource_export": {
          "type": "ref",
          "ref": "ResourceExportCompact"
        }
      }
    },
    "JobResponse": {
      "type": "ref",
      "ref": "JobBase"
    },
    "Like": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "UserCompact"
        }
      }
    },
    "MemberCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "MembershipCompact": {
      "type": "ref",
      "ref": "GoalMembershipCompact"
    },
    "ModifyDependenciesRequest": {
      "type": "object",
      "properties": {
        "dependencies": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "ModifyDependentsRequest": {
      "type": "object",
      "properties": {
        "dependents": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "NextPage": {
      "type": "object",
      "properties": {
        "offset": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "OooEntryBase": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        }
      }
    },
    "OooEntryResponse": {
      "type": "ref",
      "ref": "OooEntryBase"
    },
    "OooEntryCreateRequest": {
      "type": "ref",
      "ref": "OooEntryBase"
    },
    "OooEntryUpdateRequest": {
      "type": "ref",
      "ref": "OooEntryBase"
    },
    "OrganizationExportBase": {
      "type": "ref",
      "ref": "OrganizationExportCompact"
    },
    "OrganizationExportCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "download_url": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "organization": {
          "type": "ref",
          "ref": "WorkspaceCompact"
        }
      }
    },
    "OrganizationExportRequest": {
      "type": "object",
      "properties": {
        "organization": {
          "type": "string"
        }
      }
    },
    "OrganizationExportResponse": {
      "type": "ref",
      "ref": "OrganizationExportBase"
    },
    "PortfolioAddItemRequest": {
      "type": "object",
      "properties": {
        "item": {
          "type": "string"
        },
        "insert_before": {
          "type": "string"
        },
        "insert_after": {
          "type": "string"
        }
      },
      "required": [
        "item"
      ]
    },
    "PortfolioBase": {
      "type": "ref",
      "ref": "PortfolioCompact"
    },
    "PortfolioCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "PortfolioMembershipBase": {
      "type": "ref",
      "ref": "PortfolioMembershipCompact"
    },
    "DeprecatedPortfolioMembershipBase": {
      "type": "ref",
      "ref": "DeprecatedPortfolioMembershipCompact"
    },
    "DeprecatedPortfolioMembershipResponse": {
      "type": "ref",
      "ref": "DeprecatedPortfolioMembershipBase"
    },
    "DeprecatedPortfolioMembershipCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "portfolio": {
          "type": "ref",
          "ref": "PortfolioCompact"
        },
        "user": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "access_level": {
          "type": "string"
        }
      }
    },
    "PortfolioMembershipCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "parent": {
          "type": "ref",
          "ref": "PortfolioCompact"
        },
        "member": {
          "type": "ref",
          "ref": "MemberCompact"
        },
        "access_level": {
          "type": "string"
        }
      }
    },
    "PortfolioMembershipCompactResponse": {
      "type": "ref",
      "ref": "PortfolioMembershipCompact"
    },
    "PortfolioMembershipResponse": {
      "type": "ref",
      "ref": "PortfolioMembershipBase"
    },
    "PortfolioRemoveItemRequest": {
      "type": "object",
      "properties": {
        "item": {
          "type": "string"
        }
      },
      "required": [
        "item"
      ]
    },
    "PortfolioRequest": {
      "type": "ref",
      "ref": "PortfolioBase"
    },
    "PortfolioUpdateRequest": {
      "type": "ref",
      "ref": "PortfolioBase"
    },
    "PortfolioResponse": {
      "type": "ref",
      "ref": "PortfolioBase"
    },
    "Preview": {
      "type": "object",
      "properties": {
        "fallback": {
          "type": "string"
        },
        "footer": {
          "type": "string"
        },
        "header": {
          "type": "string"
        },
        "header_link": {
          "type": "string"
        },
        "html_text": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "title_link": {
          "type": "string"
        }
      }
    },
    "ProjectBase": {
      "type": "ref",
      "ref": "ProjectCompact"
    },
    "ProjectBriefBase": {
      "type": "ref",
      "ref": "ProjectBriefCompact"
    },
    "ProjectBriefCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        }
      }
    },
    "ProjectBriefRequest": {
      "type": "ref",
      "ref": "ProjectBriefBase"
    },
    "ProjectBriefResponse": {
      "type": "ref",
      "ref": "ProjectBriefBase"
    },
    "ProjectCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "ProjectDuplicateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "team": {
          "type": "string"
        },
        "include": {
          "type": "string"
        },
        "schedule_dates": {
          "type": "object",
          "properties": {
            "should_skip_weekends": {
              "type": "boolean"
            },
            "due_on": {
              "type": "string"
            },
            "start_on": {
              "type": "string"
            }
          }
        }
      },
      "required": [
        "name"
      ]
    },
    "PortfolioDuplicateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "include": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "CustomFieldMembershipBase": {
      "type": "ref",
      "ref": "CustomFieldMembershipCompact"
    },
    "CustomFieldMembershipCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "parent": {
          "type": "ref",
          "ref": "CustomFieldCompact"
        },
        "member": {
          "type": "ref",
          "ref": "MemberCompact"
        },
        "access_level": {
          "type": "string"
        }
      }
    },
    "CustomFieldMembershipResponse": {
      "type": "ref",
      "ref": "CustomFieldMembershipBase"
    },
    "CustomTypeMembershipBase": {
      "type": "ref",
      "ref": "CustomTypeMembershipCompact"
    },
    "CustomTypeMembershipCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "parent": {
          "type": "ref",
          "ref": "CustomTypeCompact"
        },
        "member": {
          "type": "ref",
          "ref": "MemberCompact"
        },
        "access_level": {
          "type": "string"
        }
      }
    },
    "CustomTypeMembershipResponse": {
      "type": "ref",
      "ref": "CustomTypeMembershipBase"
    },
    "ProjectMembershipBase": {
      "type": "ref",
      "ref": "ProjectMembershipCompact"
    },
    "ProjectMembershipCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "parent": {
          "type": "ref",
          "ref": "ProjectCompact"
        },
        "member": {
          "type": "ref",
          "ref": "MemberCompact"
        },
        "access_level": {
          "type": "string"
        }
      }
    },
    "ProjectMembershipCompactResponse": {
      "type": "ref",
      "ref": "ProjectMembershipCompact"
    },
    "ProjectMembershipNormalResponse": {
      "type": "ref",
      "ref": "ProjectMembershipBase"
    },
    "ProjectPortfolioSettingCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "project": {
          "type": "ref",
          "ref": "ProjectCompact"
        },
        "portfolio": {
          "type": "ref",
          "ref": "PortfolioCompact"
        },
        "is_access_control_inherited": {
          "type": "boolean"
        }
      }
    },
    "ProjectPortfolioSettingResponse": {
      "type": "ref",
      "ref": "ProjectPortfolioSettingCompact"
    },
    "ProjectPortfolioSettingUpdateRequest": {
      "type": "object",
      "properties": {
        "is_access_control_inherited": {
          "type": "boolean"
        }
      }
    },
    "ProjectRequest": {
      "type": "ref",
      "ref": "ProjectBase"
    },
    "ProjectUpdateRequest": {
      "type": "ref",
      "ref": "ProjectBase"
    },
    "ProjectResponse": {
      "type": "ref",
      "ref": "ProjectBase"
    },
    "ProjectSectionInsertRequest": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "before_section": {
          "type": "string"
        },
        "after_section": {
          "type": "string"
        }
      },
      "required": [
        "section"
      ]
    },
    "ProjectStatusBase": {
      "type": "ref",
      "ref": "ProjectStatusCompact"
    },
    "ProjectStatusCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "title": {
          "type": "string"
        }
      }
    },
    "ProjectStatusRequest": {
      "type": "ref",
      "ref": "ProjectStatusBase"
    },
    "ProjectStatusResponse": {
      "type": "ref",
      "ref": "ProjectStatusBase"
    },
    "ProjectTemplateCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "ProjectTemplateBase": {
      "type": "ref",
      "ref": "ProjectTemplateCompact"
    },
    "ProjectTemplateResponse": {
      "type": "ref",
      "ref": "ProjectTemplateBase"
    },
    "ProjectTemplateInstantiateProjectRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "team": {
          "type": "string"
        },
        "public": {
          "type": "boolean"
        },
        "privacy_setting": {
          "type": "string"
        },
        "is_strict": {
          "type": "boolean"
        },
        "requested_dates": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DateVariableRequest"
          }
        },
        "requested_roles": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RequestedRoleRequest"
          }
        }
      },
      "required": [
        "name"
      ]
    },
    "DateVariableCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      }
    },
    "DateVariableRequest": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "RequestedRoleRequest": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "ProjectSaveAsTemplateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "team": {
          "type": "string"
        },
        "workspace": {
          "type": "string"
        },
        "public": {
          "type": "boolean"
        }
      },
      "required": [
        "name",
        "public"
      ]
    },
    "RuleTriggerRequest": {
      "type": "object",
      "properties": {
        "resource": {
          "type": "string"
        },
        "action_data": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "resource",
        "action_data"
      ]
    },
    "RuleTriggerResponse": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      }
    },
    "RemoveCustomFieldSettingRequest": {
      "type": "object",
      "properties": {
        "custom_field": {
          "type": "string"
        }
      },
      "required": [
        "custom_field"
      ]
    },
    "RemoveFollowersRequest": {
      "type": "object",
      "properties": {
        "followers": {
          "type": "string"
        }
      },
      "required": [
        "followers"
      ]
    },
    "RemoveMembersRequest": {
      "type": "object",
      "properties": {
        "members": {
          "type": "string"
        }
      },
      "required": [
        "members"
      ]
    },
    "ResourceExportFilters": {
      "type": "object",
      "properties": {
        "assigned_by.any": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "assignee.any": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "commented_on_by.any": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "created_at.after": {
          "type": "string"
        },
        "created_at.before": {
          "type": "string"
        },
        "created_by.any": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "followers.any": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "liked_by.any": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "modified_at.after": {
          "type": "string"
        },
        "modified_at.before": {
          "type": "string"
        }
      }
    },
    "ResourceExportRequestParameter": {
      "type": "object",
      "properties": {
        "resource_type": {
          "type": "string"
        },
        "filters": {
          "type": "ref",
          "ref": "ResourceExportFilters"
        },
        "fields": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "ResourceExportRequest": {
      "type": "object",
      "properties": {
        "workspace": {
          "type": "string"
        },
        "export_request_parameters": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ResourceExportRequestParameter"
          }
        }
      }
    },
    "ResourceExportCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "download_url": {
          "type": "string"
        },
        "completed_at": {
          "type": "string"
        }
      }
    },
    "ResourceExportResponse": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "new_resource_export": {
          "type": "ref",
          "ref": "ResourceExportCompact"
        }
      }
    },
    "GraphExportRequest": {
      "type": "object",
      "properties": {
        "parent": {
          "type": "string"
        }
      }
    },
    "GraphExportCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "download_url": {
          "type": "string"
        },
        "completed_at": {
          "type": "string"
        }
      }
    },
    "GraphExportResponse": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "new_graph_export": {
          "type": "ref",
          "ref": "GraphExportCompact"
        }
      }
    },
    "RateBase": {
      "type": "ref",
      "ref": "RateCompact"
    },
    "RateCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "parent": {
          "type": "ref",
          "ref": "ProjectCompact"
        },
        "resource": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "rate": {
          "type": "number"
        },
        "currency_code": {
          "type": "string"
        },
        "created_by": {
          "type": "ref",
          "ref": "UserCompact"
        }
      }
    },
    "RateRequest": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "parent": {
          "type": "string"
        },
        "resource": {
          "type": "string"
        },
        "rate": {
          "type": "number"
        }
      },
      "required": [
        "parent",
        "resource",
        "rate"
      ]
    },
    "RateUpdateRequest": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "rate": {
          "type": "number"
        }
      }
    },
    "RateResponse": {
      "type": "ref",
      "ref": "RateCompact"
    },
    "RateOrPlaceholderCompact": {
      "type": "ref",
      "ref": "RateCompact"
    },
    "PlaceholderCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "PlaceholderRateCompact": {
      "type": "ref",
      "ref": "RateCompact"
    },
    "SectionBase": {
      "type": "ref",
      "ref": "SectionCompact"
    },
    "SectionCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "SectionRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "insert_before": {
          "type": "string"
        },
        "insert_after": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "SectionResponse": {
      "type": "ref",
      "ref": "SectionBase"
    },
    "SectionTaskInsertRequest": {
      "type": "object",
      "properties": {
        "task": {
          "type": "string"
        },
        "insert_before": {
          "type": "string"
        },
        "insert_after": {
          "type": "string"
        }
      },
      "required": [
        "task"
      ]
    },
    "StatusUpdateBase": {
      "type": "ref",
      "ref": "StatusUpdateCompact"
    },
    "StatusUpdateCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        }
      }
    },
    "StatusUpdateRequest": {
      "type": "ref",
      "ref": "StatusUpdateBase"
    },
    "StatusUpdateResponse": {
      "type": "ref",
      "ref": "StatusUpdateBase"
    },
    "StoryBase": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "html_text": {
          "type": "string"
        },
        "is_pinned": {
          "type": "boolean"
        },
        "sticker_name": {
          "type": "string"
        }
      }
    },
    "StoryCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "created_by": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "resource_subtype": {
          "type": "string"
        },
        "text": {
          "type": "string"
        }
      }
    },
    "StoryRequest": {
      "type": "ref",
      "ref": "StoryBase"
    },
    "StoryResponse": {
      "type": "ref",
      "ref": "StoryBase"
    },
    "StoryResponseDates": {
      "type": "object",
      "properties": {
        "start_on": {
          "type": "string"
        },
        "due_at": {
          "type": "string"
        },
        "due_on": {
          "type": "string"
        }
      }
    },
    "TagBase": {
      "type": "ref",
      "ref": "TagCompact"
    },
    "TagCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "TagCreateTagForWorkspaceRequest": {
      "type": "ref",
      "ref": "TagBase"
    },
    "TagBaseRequest": {
      "type": "ref",
      "ref": "TagBase"
    },
    "TagCreateRequest": {
      "type": "ref",
      "ref": "TagBaseRequest"
    },
    "TagUpdateRequest": {
      "type": "ref",
      "ref": "TagBaseRequest"
    },
    "TagResponse": {
      "type": "ref",
      "ref": "TagBase"
    },
    "TaskAddFollowersRequest": {
      "type": "object",
      "properties": {
        "followers": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "followers"
      ]
    },
    "TaskAddProjectRequest": {
      "type": "object",
      "properties": {
        "project": {
          "type": "string"
        },
        "insert_after": {
          "type": "string"
        },
        "insert_before": {
          "type": "string"
        },
        "section": {
          "type": "string"
        }
      },
      "required": [
        "project"
      ]
    },
    "TaskAddTagRequest": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string"
        }
      },
      "required": [
        "tag"
      ]
    },
    "TaskBase": {
      "type": "ref",
      "ref": "TaskCompact"
    },
    "TaskCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "created_by": {
          "type": "object",
          "properties": {
            "gid": {
              "type": "string"
            },
            "resource_type": {
              "type": "string"
            }
          }
        }
      }
    },
    "TaskTemplateCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "TaskTemplateBase": {
      "type": "ref",
      "ref": "TaskTemplateCompact"
    },
    "TaskTemplateRecipeCompact": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "task_resource_subtype": {
          "type": "string"
        }
      }
    },
    "TaskTemplateRecipe": {
      "type": "ref",
      "ref": "TaskTemplateRecipeCompact"
    },
    "TaskTemplateResponse": {
      "type": "ref",
      "ref": "TaskTemplateBase"
    },
    "TaskCountResponse": {
      "type": "object",
      "properties": {
        "num_tasks": {
          "type": "number"
        },
        "num_incomplete_tasks": {
          "type": "number"
        },
        "num_completed_tasks": {
          "type": "number"
        },
        "num_milestones": {
          "type": "number"
        },
        "num_incomplete_milestones": {
          "type": "number"
        },
        "num_completed_milestones": {
          "type": "number"
        }
      }
    },
    "TaskDuplicateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "include": {
          "type": "string"
        }
      }
    },
    "TaskRemoveFollowersRequest": {
      "type": "object",
      "properties": {
        "followers": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "followers"
      ]
    },
    "TaskRemoveProjectRequest": {
      "type": "object",
      "properties": {
        "project": {
          "type": "string"
        }
      },
      "required": [
        "project"
      ]
    },
    "TaskRemoveTagRequest": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string"
        }
      },
      "required": [
        "tag"
      ]
    },
    "TaskTemplateInstantiateTaskRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "TaskRequestBase": {
      "type": "ref",
      "ref": "TaskBase"
    },
    "TaskCreateRequest": {
      "type": "ref",
      "ref": "TaskRequestBase"
    },
    "TaskUpdateRequest": {
      "type": "ref",
      "ref": "TaskRequestBase"
    },
    "TaskResponse": {
      "type": "ref",
      "ref": "TaskBase"
    },
    "TaskSetParentRequest": {
      "type": "object",
      "properties": {
        "parent": {
          "type": "string"
        },
        "insert_after": {
          "type": "string"
        },
        "insert_before": {
          "type": "string"
        }
      },
      "required": [
        "parent"
      ]
    },
    "TeamAddUserRequest": {
      "type": "object",
      "properties": {
        "user": {
          "type": "string"
        }
      }
    },
    "TeamBase": {
      "type": "ref",
      "ref": "TeamCompact"
    },
    "TeamCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "TeamMembershipBase": {
      "type": "ref",
      "ref": "TeamMembershipCompact"
    },
    "TeamMembershipCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "team": {
          "type": "ref",
          "ref": "TeamCompact"
        },
        "is_guest": {
          "type": "boolean"
        },
        "is_limited_access": {
          "type": "boolean"
        },
        "is_admin": {
          "type": "boolean"
        }
      }
    },
    "TeamMembershipResponse": {
      "type": "ref",
      "ref": "TeamMembershipBase"
    },
    "TeamRemoveUserRequest": {
      "type": "object",
      "properties": {
        "user": {
          "type": "string"
        }
      }
    },
    "TeamRequest": {
      "type": "ref",
      "ref": "TeamBase"
    },
    "TeamResponse": {
      "type": "ref",
      "ref": "TeamBase"
    },
    "TemplateRole": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "TimePeriodBase": {
      "type": "ref",
      "ref": "TimePeriodCompact"
    },
    "TimePeriodCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "end_on": {
          "type": "string"
        },
        "start_on": {
          "type": "string"
        },
        "period": {
          "type": "string"
        },
        "display_name": {
          "type": "string"
        }
      }
    },
    "TimePeriodResponse": {
      "type": "ref",
      "ref": "TimePeriodBase"
    },
    "UserBase": {
      "type": "ref",
      "ref": "UserCompact"
    },
    "UserCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "UserRequest": {
      "type": "ref",
      "ref": "UserBase"
    },
    "UserUpdateRequest": {
      "type": "ref",
      "ref": "UserRequest"
    },
    "UserBaseResponse": {
      "type": "ref",
      "ref": "UserBase"
    },
    "UserResponse": {
      "type": "ref",
      "ref": "UserBaseResponse"
    },
    "UserTaskListBase": {
      "type": "ref",
      "ref": "UserTaskListCompact"
    },
    "UserTaskListCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "owner": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "workspace": {
          "type": "ref",
          "ref": "WorkspaceCompact"
        }
      }
    },
    "UserTaskListRequest": {
      "type": "ref",
      "ref": "UserTaskListBase"
    },
    "UserTaskListResponse": {
      "type": "ref",
      "ref": "UserTaskListBase"
    },
    "WebhookCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "active": {
          "type": "boolean"
        },
        "resource": {
          "type": "ref",
          "ref": "AsanaNamedResource"
        },
        "target": {
          "type": "string"
        }
      }
    },
    "WebhookFilter": {
      "type": "object",
      "properties": {
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "action": {
          "type": "string"
        },
        "fields": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "WebhookRequest": {
      "type": "object",
      "properties": {
        "resource": {
          "type": "string"
        },
        "target": {
          "type": "string"
        },
        "filters": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WebhookFilter"
          }
        }
      },
      "required": [
        "resource",
        "target"
      ]
    },
    "WebhookResponse": {
      "type": "ref",
      "ref": "WebhookCompact"
    },
    "WebhookUpdateRequest": {
      "type": "object",
      "properties": {
        "filters": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WebhookFilter"
          }
        }
      }
    },
    "WorkspaceAddUserRequest": {
      "type": "object",
      "properties": {
        "user": {
          "type": "string"
        }
      }
    },
    "WorkspaceBase": {
      "type": "ref",
      "ref": "WorkspaceCompact"
    },
    "WorkspaceCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "WorkspaceMembershipBase": {
      "type": "ref",
      "ref": "WorkspaceMembershipCompact"
    },
    "WorkspaceMembershipCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "workspace": {
          "type": "ref",
          "ref": "WorkspaceCompact"
        }
      }
    },
    "WorkspaceMembershipRequest": {
      "type": "ref",
      "ref": "WorkspaceMembershipBase"
    },
    "WorkspaceMembershipResponse": {
      "type": "ref",
      "ref": "WorkspaceMembershipBase"
    },
    "WorkspaceRemoveUserRequest": {
      "type": "object",
      "properties": {
        "user": {
          "type": "string"
        }
      }
    },
    "WorkspaceRequest": {
      "type": "ref",
      "ref": "WorkspaceBase"
    },
    "WorkspaceResponse": {
      "type": "ref",
      "ref": "WorkspaceBase"
    },
    "GoalMembershipBase": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "resource_subtype": {
          "type": "string"
        },
        "member": {
          "type": "ref",
          "ref": "MemberCompact"
        },
        "parent": {
          "type": "ref",
          "ref": "GoalCompact"
        },
        "role": {
          "type": "string"
        },
        "access_level": {
          "type": "string"
        },
        "goal": {
          "type": "ref",
          "ref": "GoalCompact"
        }
      }
    },
    "GoalMembershipCompact": {
      "type": "ref",
      "ref": "GoalMembershipBase"
    },
    "GoalMembershipResponse": {
      "type": "ref",
      "ref": "GoalMembershipBase"
    },
    "MembershipUpdateRequest": {
      "type": "object",
      "properties": {
        "access_level": {
          "type": "string"
        }
      }
    },
    "MembershipRequest": {
      "type": "object",
      "properties": {
        "access_level": {
          "type": "string"
        }
      }
    },
    "CreateMembershipRequest": {
      "type": "ref",
      "ref": "MembershipRequest"
    },
    "MembershipResponse": {
      "type": "ref",
      "ref": "GoalMembershipResponse"
    },
    "UpdateTimeTrackingEntryRequest": {
      "type": "object",
      "properties": {
        "duration_minutes": {
          "type": "number"
        },
        "entered_on": {
          "type": "string"
        },
        "attributable_to": {
          "type": "string"
        },
        "billable_status": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "CreateTimeTrackingEntryRequest": {
      "type": "object",
      "properties": {
        "duration_minutes": {
          "type": "number"
        },
        "entered_on": {
          "type": "string"
        },
        "attributable_to": {
          "type": "string"
        },
        "billable_status": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "TimeTrackingEntryCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "duration_minutes": {
          "type": "number"
        },
        "entered_on": {
          "type": "string"
        },
        "attributable_to": {
          "type": "ref",
          "ref": "ProjectCompact"
        },
        "created_by": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "categories": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TimeTrackingCategoryCompact"
          }
        }
      }
    },
    "TimeTrackingEntryBase": {
      "type": "ref",
      "ref": "TimeTrackingEntryCompact"
    },
    "TimeTrackingCategoryCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "color": {
          "type": "string"
        }
      }
    },
    "TimeTrackingCategoryResponse": {
      "type": "ref",
      "ref": "TimeTrackingCategoryCompact"
    },
    "TimeTrackingCategoryBaseRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "color": {
          "type": "string"
        }
      }
    },
    "TimeTrackingCategoryCreateRequest": {
      "type": "ref",
      "ref": "TimeTrackingCategoryBaseRequest"
    },
    "TimeTrackingCategoryUpdateRequest": {
      "type": "ref",
      "ref": "TimeTrackingCategoryBaseRequest"
    },
    "CreateTimesheetApprovalStatusRequest": {
      "type": "object",
      "properties": {
        "user": {
          "type": "string"
        },
        "workspace": {
          "type": "string"
        },
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        }
      },
      "required": [
        "user",
        "workspace",
        "start_date",
        "end_date"
      ]
    },
    "UpdateTimesheetApprovalStatusRequest": {
      "type": "object",
      "properties": {
        "approval_status": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "approval_status"
      ]
    },
    "TimesheetApprovalStatusCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "workspace": {
          "type": "ref",
          "ref": "WorkspaceCompact"
        },
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        },
        "approval_status": {
          "type": "string"
        }
      }
    },
    "TimesheetApprovalStatusResponse": {
      "type": "ref",
      "ref": "TimesheetApprovalStatusCompact"
    },
    "AccessRequestResponse": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "approval_status": {
          "type": "string"
        },
        "requester": {
          "type": "ref",
          "ref": "UserCompact"
        },
        "target": {
          "type": "ref",
          "ref": "AccessRequestTargetIdCompact"
        }
      }
    },
    "AccessRequestTargetIdCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        }
      }
    },
    "AccessRequestCreateRequest": {
      "type": "object",
      "properties": {
        "target": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "target"
      ]
    },
    "AccessRequestApproveRequest": {
      "type": "object",
      "properties": {
        "access_request_gid": {
          "type": "string"
        }
      }
    },
    "AccessRequestRejectRequest": {
      "type": "object",
      "properties": {
        "access_request_gid": {
          "type": "string"
        }
      }
    },
    "ReactionCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "emoji": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "UserCompact"
        }
      }
    },
    "ReactionSummaryItemCompact": {
      "type": "object",
      "properties": {
        "emoji_base": {
          "type": "string"
        },
        "variant": {
          "type": "string"
        },
        "count": {
          "type": "number"
        },
        "reacted": {
          "type": "boolean"
        }
      }
    },
    "RbacRoleCompact": {
      "type": "object",
      "properties": {
        "gid": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "is_standard_role": {
          "type": "boolean"
        }
      }
    },
    "RbacRoleBase": {
      "type": "ref",
      "ref": "RbacRoleCompact"
    },
    "RbacRoleResponse": {
      "type": "ref",
      "ref": "RbacRoleBase"
    },
    "RbacRoleRequest": {
      "type": "ref",
      "ref": "RbacRoleBase"
    },
    "RbacRoleUpdateRequest": {
      "type": "ref",
      "ref": "RbacRoleBase"
    }
  },
  "entities": {},
  "queries": {
    "getAccessRequests": {
      "name": "Get access requests",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "AccessRequestResponse"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/access_requests",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getAllocation": {
      "name": "Get an allocation",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "AllocationResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/allocations/{allocation_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getAllocations": {
      "name": "Get multiple allocations",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "AllocationResponse"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "assignee": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/allocations",
          "query": {
            "parent": {
              "$resolve": "args.parent"
            },
            "assignee": {
              "$resolve": "args.assignee"
            },
            "workspace": {
              "$resolve": "args.workspace"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getAttachment": {
      "name": "Get an attachment",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "AttachmentResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/attachments/{attachment_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getAttachmentsForObject": {
      "name": "Get attachments from an object",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "AttachmentCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "opt_fields": {
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
          "path": "/attachments",
          "query": {
            "parent": {
              "$resolve": "args.parent"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getAuditLogEvents": {
      "name": "Get audit log events",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "AuditLogEvent"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
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
          "path": "/workspaces/{workspace_gid}/audit_log_events"
        }
      }
    },
    "getBudgets": {
      "name": "Get all budgets",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "BudgetResponse"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/budgets",
          "query": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "getBudget": {
      "name": "Get a budget",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "BudgetResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/budgets/{budget_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getCustomFieldSettingsForProject": {
      "name": "Get a project's custom fields",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "CustomFieldSettingResponse"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects/{project_gid}/custom_field_settings",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getCustomFieldSettingsForPortfolio": {
      "name": "Get a portfolio's custom fields",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "CustomFieldSettingResponse"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/portfolios/{portfolio_gid}/custom_field_settings",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getCustomFieldSettingsForGoal": {
      "name": "Get a goal's custom fields",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "CustomFieldSettingResponse"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/goals/{goal_gid}/custom_field_settings",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getCustomFieldSettingsForTeam": {
      "name": "Get a team's custom fields",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "CustomFieldSettingResponse"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/teams/{team_gid}/custom_field_settings",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getCustomField": {
      "name": "Get a custom field",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "CustomFieldResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/custom_fields/{custom_field_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getCustomFieldsForWorkspace": {
      "name": "Get a workspace's custom fields",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "CustomFieldResponse"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/custom_fields",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getCustomTypes": {
      "name": "Get all custom types associated with an object",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "CustomTypeResponse"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/custom_types",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getCustomType": {
      "name": "Get a custom type",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "CustomTypeResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/custom_types/{custom_type_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getEvents": {
      "name": "Get events on a resource",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "EventResponse"
            }
          },
          "sync": {
            "type": "string"
          },
          "has_more": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "resource": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "sync": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/events",
          "query": {
            "resource": {
              "$resolve": "args.resource"
            },
            "sync": {
              "$resolve": "args.sync"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getGoalRelationship": {
      "name": "Get a goal relationship",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalRelationshipResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/goal_relationships/{goal_relationship_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getGoalRelationships": {
      "name": "Get goal relationships",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "GoalRelationshipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "supported_goal": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "resource_subtype": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/goal_relationships",
          "query": {
            "supported_goal": {
              "$resolve": "args.supported_goal"
            },
            "resource_subtype": {
              "$resolve": "args.resource_subtype"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getGoal": {
      "name": "Get a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/goals/{goal_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getGoals": {
      "name": "Get goals",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "GoalCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "portfolio": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "project": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "task": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "is_workspace_level": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "team": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "time_periods": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/goals",
          "query": {
            "portfolio": {
              "$resolve": "args.portfolio"
            },
            "project": {
              "$resolve": "args.project"
            },
            "task": {
              "$resolve": "args.task"
            },
            "is_workspace_level": {
              "$resolve": "args.is_workspace_level"
            },
            "team": {
              "$resolve": "args.team"
            },
            "workspace": {
              "$resolve": "args.workspace"
            },
            "time_periods": {
              "$resolve": "args.time_periods"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getParentGoalsForGoal": {
      "name": "Get parent goals from a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "GoalCompact"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/goals/{goal_gid}/parentGoals",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getJob": {
      "name": "Get a job by id",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "JobResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/jobs/{job_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getMemberships": {
      "name": "Get multiple memberships",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "MembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "member": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "resource_subtype": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/memberships",
          "query": {
            "parent": {
              "$resolve": "args.parent"
            },
            "member": {
              "$resolve": "args.member"
            },
            "resource_subtype": {
              "$resolve": "args.resource_subtype"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getMembership": {
      "name": "Get a membership",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "MembershipResponse"
          }
        }
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
          "path": "/memberships/{membership_gid}"
        }
      }
    },
    "getOooEntry": {
      "name": "Get an OOO entry",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "OooEntryResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/ooo_entries/{ooo_entry_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getOooEntries": {
      "name": "Get OOO entries for a user",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "OooEntryResponse"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "user": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/ooo_entries",
          "query": {
            "user": {
              "$resolve": "args.user"
            },
            "workspace": {
              "$resolve": "args.workspace"
            },
            "start_date": {
              "$resolve": "args.start_date"
            },
            "end_date": {
              "$resolve": "args.end_date"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getOrganizationExport": {
      "name": "Get details on an org export request",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "OrganizationExportResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/organization_exports/{organization_export_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getPortfolioMemberships": {
      "name": "Get multiple portfolio memberships",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "DeprecatedPortfolioMembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/portfolio_memberships",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getPortfolioMembership": {
      "name": "Get a portfolio membership",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "DeprecatedPortfolioMembershipResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/portfolio_memberships/{portfolio_membership_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getPortfolioMembershipsForPortfolio": {
      "name": "Get memberships from a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "DeprecatedPortfolioMembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/portfolios/{portfolio_gid}/portfolio_memberships",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getPortfolios": {
      "name": "Get multiple portfolios",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "PortfolioCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "owner": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/portfolios",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "owner": {
              "$resolve": "args.owner"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getPortfolio": {
      "name": "Get a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "PortfolioResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/portfolios/{portfolio_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getItemsForPortfolio": {
      "name": "Get portfolio items",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/portfolios/{portfolio_gid}/items",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectBrief": {
      "name": "Get a project brief",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectBriefResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/project_briefs/{project_brief_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectMembership": {
      "name": "Get a project membership",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectMembershipNormalResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/project_memberships/{project_membership_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectMembershipsForProject": {
      "name": "Get memberships from a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectMembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects/{project_gid}/project_memberships",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectPortfolioSetting": {
      "name": "Get a project portfolio setting",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectPortfolioSettingResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/project_portfolio_settings/{project_portfolio_setting_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectPortfolioSettingsForProject": {
      "name": "Get project portfolio settings for a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectPortfolioSettingCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects/{project_gid}/project_portfolio_settings",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectPortfolioSettingsForPortfolio": {
      "name": "Get project portfolio settings for a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectPortfolioSettingCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/portfolios/{portfolio_gid}/project_portfolio_settings",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectStatus": {
      "name": "Get a project status",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectStatusResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/project_statuses/{project_status_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectStatusesForProject": {
      "name": "Get statuses from a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectStatusCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects/{project_gid}/project_statuses",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectTemplate": {
      "name": "Get a project template",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectTemplateResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/project_templates/{project_template_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectTemplates": {
      "name": "Get multiple project templates",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectTemplateCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/project_templates",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectTemplatesForTeam": {
      "name": "Get a team's project templates",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectTemplateCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/teams/{team_gid}/project_templates",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjects": {
      "name": "Get multiple projects",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "team": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "team": {
              "$resolve": "args.team"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProject": {
      "name": "Get a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects/{project_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectsForTask": {
      "name": "Get projects a task is in",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks/{task_gid}/projects",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectsForTeam": {
      "name": "Get a team's projects",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/teams/{team_gid}/projects",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getProjectsForWorkspace": {
      "name": "Get all projects in a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/projects",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "searchProjectsForWorkspace": {
      "name": "Search projects in a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ProjectCompact"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "text": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "sort_by": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "sort_ascending": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "completed": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "teams.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "owner.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "members.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "members.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "portfolios.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_at.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_at.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_at.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_at.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_at.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_at.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/projects/search",
          "query": {
            "text": {
              "$resolve": "args.text"
            },
            "sort_by": {
              "$resolve": "args.sort_by"
            },
            "sort_ascending": {
              "$resolve": "args.sort_ascending"
            },
            "completed": {
              "$resolve": "args.completed"
            },
            "teams.any": {
              "$resolve": "args.teams.any"
            },
            "owner.any": {
              "$resolve": "args.owner.any"
            },
            "members.any": {
              "$resolve": "args.members.any"
            },
            "members.not": {
              "$resolve": "args.members.not"
            },
            "portfolios.any": {
              "$resolve": "args.portfolios.any"
            },
            "completed_on": {
              "$resolve": "args.completed_on"
            },
            "completed_on.before": {
              "$resolve": "args.completed_on.before"
            },
            "completed_on.after": {
              "$resolve": "args.completed_on.after"
            },
            "completed_at.before": {
              "$resolve": "args.completed_at.before"
            },
            "completed_at.after": {
              "$resolve": "args.completed_at.after"
            },
            "created_on": {
              "$resolve": "args.created_on"
            },
            "created_on.before": {
              "$resolve": "args.created_on.before"
            },
            "created_on.after": {
              "$resolve": "args.created_on.after"
            },
            "created_at.before": {
              "$resolve": "args.created_at.before"
            },
            "created_at.after": {
              "$resolve": "args.created_at.after"
            },
            "due_on": {
              "$resolve": "args.due_on"
            },
            "due_on.before": {
              "$resolve": "args.due_on.before"
            },
            "due_on.after": {
              "$resolve": "args.due_on.after"
            },
            "due_at.before": {
              "$resolve": "args.due_at.before"
            },
            "due_at.after": {
              "$resolve": "args.due_at.after"
            },
            "start_on": {
              "$resolve": "args.start_on"
            },
            "start_on.before": {
              "$resolve": "args.start_on.before"
            },
            "start_on.after": {
              "$resolve": "args.start_on.after"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTaskCountsForProject": {
      "name": "Get task count of a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TaskCountResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects/{project_gid}/task_counts",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getRates": {
      "name": "Get multiple rates",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "RateOrPlaceholderCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "resource": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/rates",
          "query": {
            "parent": {
              "$resolve": "args.parent"
            },
            "resource": {
              "$resolve": "args.resource"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getRate": {
      "name": "Get a rate",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "RateResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/rates/{rate_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getReactionsOnObject": {
      "name": "Get reactions with an emoji base on an object.",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "ReactionCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "target": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "emoji_base": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/reactions",
          "query": {
            "target": {
              "$resolve": "args.target"
            },
            "emoji_base": {
              "$resolve": "args.emoji_base"
            }
          }
        }
      }
    },
    "getRoles": {
      "name": "Get multiple roles",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "RbacRoleCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/roles",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getRole": {
      "name": "Get a role",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "RbacRoleResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/roles/{role_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getSection": {
      "name": "Get a section",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "SectionResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/sections/{section_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getSectionsForProject": {
      "name": "Get sections in a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SectionCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects/{project_gid}/sections",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getStatus": {
      "name": "Get a status update",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "StatusUpdateResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/status_updates/{status_update_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getStatusesForObject": {
      "name": "Get status updates from an object",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "StatusUpdateCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "created_since": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/status_updates",
          "query": {
            "parent": {
              "$resolve": "args.parent"
            },
            "created_since": {
              "$resolve": "args.created_since"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getStory": {
      "name": "Get a story",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "StoryResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/stories/{story_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getStoriesForTask": {
      "name": "Get stories from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "StoryCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks/{task_gid}/stories",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getStoriesForGoal": {
      "name": "Get stories from a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "StoryCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/goals/{goal_gid}/stories",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTags": {
      "name": "Get multiple tags",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TagCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tags",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTag": {
      "name": "Get a tag",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TagResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tags/{tag_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTagsForTask": {
      "name": "Get a task's tags",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TagCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks/{task_gid}/tags",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTagsForWorkspace": {
      "name": "Get tags in a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TagCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/tags",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTaskTemplates": {
      "name": "Get multiple task templates",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskTemplateCompact"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "project": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/task_templates",
          "query": {
            "project": {
              "$resolve": "args.project"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTaskTemplate": {
      "name": "Get a task template",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TaskTemplateResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/task_templates/{task_template_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTasks": {
      "name": "Get multiple tasks",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "assignee": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "project": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "section": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_since": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "modified_since": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks",
          "query": {
            "assignee": {
              "$resolve": "args.assignee"
            },
            "project": {
              "$resolve": "args.project"
            },
            "section": {
              "$resolve": "args.section"
            },
            "workspace": {
              "$resolve": "args.workspace"
            },
            "completed_since": {
              "$resolve": "args.completed_since"
            },
            "modified_since": {
              "$resolve": "args.modified_since"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTask": {
      "name": "Get a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TaskResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks/{task_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTasksForProject": {
      "name": "Get tasks from a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/projects/{project_gid}/tasks",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTasksForSection": {
      "name": "Get tasks from a section",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/sections/{section_gid}/tasks",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTasksForTag": {
      "name": "Get tasks from a tag",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tags/{tag_gid}/tasks",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTasksForUserTaskList": {
      "name": "Get tasks from a user task list",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/user_task_lists/{user_task_list_gid}/tasks",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getSubtasksForTask": {
      "name": "Get subtasks from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks/{task_gid}/subtasks",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getDependenciesForTask": {
      "name": "Get dependencies from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks/{task_gid}/dependencies",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getDependentsForTask": {
      "name": "Get dependents from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks/{task_gid}/dependents",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTaskForCustomID": {
      "name": "Get a task for a given custom ID",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TaskResponse"
          }
        }
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
          "path": "/workspaces/{workspace_gid}/tasks/custom_id/{custom_id}"
        }
      }
    },
    "searchTasksForWorkspace": {
      "name": "Search tasks in a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TaskCompact"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "text": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "resource_subtype": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "assignee.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "assignee.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "portfolios.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "projects.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "projects.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "projects.all": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "sections.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "sections.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "sections.all": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "tags.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "tags.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "tags.all": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "teams.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "followers.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "followers.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_by.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_by.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "assigned_by.any": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "assigned_by.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "liked_by.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "commented_on_by.not": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_at.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "due_at.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_at.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "created_at.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_at.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "completed_at.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "modified_on.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "modified_on.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "modified_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "modified_at.before": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "modified_at.after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "is_blocking": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "is_blocked": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "has_attachment": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "completed": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "is_subtask": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "sort_by": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "sort_ascending": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/tasks/search",
          "query": {
            "text": {
              "$resolve": "args.text"
            },
            "resource_subtype": {
              "$resolve": "args.resource_subtype"
            },
            "assignee.any": {
              "$resolve": "args.assignee.any"
            },
            "assignee.not": {
              "$resolve": "args.assignee.not"
            },
            "portfolios.any": {
              "$resolve": "args.portfolios.any"
            },
            "projects.any": {
              "$resolve": "args.projects.any"
            },
            "projects.not": {
              "$resolve": "args.projects.not"
            },
            "projects.all": {
              "$resolve": "args.projects.all"
            },
            "sections.any": {
              "$resolve": "args.sections.any"
            },
            "sections.not": {
              "$resolve": "args.sections.not"
            },
            "sections.all": {
              "$resolve": "args.sections.all"
            },
            "tags.any": {
              "$resolve": "args.tags.any"
            },
            "tags.not": {
              "$resolve": "args.tags.not"
            },
            "tags.all": {
              "$resolve": "args.tags.all"
            },
            "teams.any": {
              "$resolve": "args.teams.any"
            },
            "followers.any": {
              "$resolve": "args.followers.any"
            },
            "followers.not": {
              "$resolve": "args.followers.not"
            },
            "created_by.any": {
              "$resolve": "args.created_by.any"
            },
            "created_by.not": {
              "$resolve": "args.created_by.not"
            },
            "assigned_by.any": {
              "$resolve": "args.assigned_by.any"
            },
            "assigned_by.not": {
              "$resolve": "args.assigned_by.not"
            },
            "liked_by.not": {
              "$resolve": "args.liked_by.not"
            },
            "commented_on_by.not": {
              "$resolve": "args.commented_on_by.not"
            },
            "due_on.before": {
              "$resolve": "args.due_on.before"
            },
            "due_on.after": {
              "$resolve": "args.due_on.after"
            },
            "due_on": {
              "$resolve": "args.due_on"
            },
            "due_at.before": {
              "$resolve": "args.due_at.before"
            },
            "due_at.after": {
              "$resolve": "args.due_at.after"
            },
            "start_on.before": {
              "$resolve": "args.start_on.before"
            },
            "start_on.after": {
              "$resolve": "args.start_on.after"
            },
            "start_on": {
              "$resolve": "args.start_on"
            },
            "created_on.before": {
              "$resolve": "args.created_on.before"
            },
            "created_on.after": {
              "$resolve": "args.created_on.after"
            },
            "created_on": {
              "$resolve": "args.created_on"
            },
            "created_at.before": {
              "$resolve": "args.created_at.before"
            },
            "created_at.after": {
              "$resolve": "args.created_at.after"
            },
            "completed_on.before": {
              "$resolve": "args.completed_on.before"
            },
            "completed_on.after": {
              "$resolve": "args.completed_on.after"
            },
            "completed_on": {
              "$resolve": "args.completed_on"
            },
            "completed_at.before": {
              "$resolve": "args.completed_at.before"
            },
            "completed_at.after": {
              "$resolve": "args.completed_at.after"
            },
            "modified_on.before": {
              "$resolve": "args.modified_on.before"
            },
            "modified_on.after": {
              "$resolve": "args.modified_on.after"
            },
            "modified_on": {
              "$resolve": "args.modified_on"
            },
            "modified_at.before": {
              "$resolve": "args.modified_at.before"
            },
            "modified_at.after": {
              "$resolve": "args.modified_at.after"
            },
            "is_blocking": {
              "$resolve": "args.is_blocking"
            },
            "is_blocked": {
              "$resolve": "args.is_blocked"
            },
            "has_attachment": {
              "$resolve": "args.has_attachment"
            },
            "completed": {
              "$resolve": "args.completed"
            },
            "is_subtask": {
              "$resolve": "args.is_subtask"
            },
            "sort_by": {
              "$resolve": "args.sort_by"
            },
            "sort_ascending": {
              "$resolve": "args.sort_ascending"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTeamMembership": {
      "name": "Get a team membership",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TeamMembershipResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/team_memberships/{team_membership_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTeamMemberships": {
      "name": "Get team memberships",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TeamMembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "team": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "user": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/team_memberships",
          "query": {
            "team": {
              "$resolve": "args.team"
            },
            "user": {
              "$resolve": "args.user"
            },
            "workspace": {
              "$resolve": "args.workspace"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTeamMembershipsForTeam": {
      "name": "Get memberships from a team",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TeamMembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/teams/{team_gid}/team_memberships",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTeamMembershipsForUser": {
      "name": "Get memberships from a user",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TeamMembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "opt_fields": {
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
          "path": "/users/{user_gid}/team_memberships",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTeam": {
      "name": "Get a team",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TeamResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/teams/{team_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTeamsForWorkspace": {
      "name": "Get teams in a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TeamCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/teams",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTeamsForUser": {
      "name": "Get teams for a user",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TeamCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "organization": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "opt_fields": {
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
          "path": "/users/{user_gid}/teams",
          "query": {
            "organization": {
              "$resolve": "args.organization"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimePeriod": {
      "name": "Get a time period",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TimePeriodResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/time_periods/{time_period_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimePeriods": {
      "name": "Get time periods",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TimePeriodCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "start_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_on": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "opt_fields": {
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
          "path": "/time_periods",
          "query": {
            "start_on": {
              "$resolve": "args.start_on"
            },
            "end_on": {
              "$resolve": "args.end_on"
            },
            "workspace": {
              "$resolve": "args.workspace"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimeTrackingCategory": {
      "name": "Get a time tracking category",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TimeTrackingCategoryResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/time_tracking_categories/{time_tracking_category_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimeTrackingEntriesForTimeTrackingCategory": {
      "name": "Get time tracking entries for a time tracking category",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TimeTrackingEntryCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "start_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/time_tracking_categories/{time_tracking_category_gid}/time_tracking_entries",
          "query": {
            "start_date": {
              "$resolve": "args.start_date"
            },
            "end_date": {
              "$resolve": "args.end_date"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimeTrackingCategories": {
      "name": "Get time tracking categories for a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TimeTrackingCategoryCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "is_archived": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/time_tracking_categories",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "is_archived": {
              "$resolve": "args.is_archived"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimeTrackingEntriesForTask": {
      "name": "Get time tracking entries for a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TimeTrackingEntryCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/tasks/{task_gid}/time_tracking_entries",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimeTrackingEntry": {
      "name": "Get a time tracking entry",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TimeTrackingEntryBase"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/time_tracking_entries/{time_tracking_entry_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimeTrackingEntries": {
      "name": "Get multiple time tracking entries",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TimeTrackingEntryCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "task": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "attributable_to": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "portfolio": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "user": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "entered_on_start_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "entered_on_end_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "timesheet_approval_status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/time_tracking_entries",
          "query": {
            "task": {
              "$resolve": "args.task"
            },
            "attributable_to": {
              "$resolve": "args.attributable_to"
            },
            "portfolio": {
              "$resolve": "args.portfolio"
            },
            "user": {
              "$resolve": "args.user"
            },
            "workspace": {
              "$resolve": "args.workspace"
            },
            "entered_on_start_date": {
              "$resolve": "args.entered_on_start_date"
            },
            "entered_on_end_date": {
              "$resolve": "args.entered_on_end_date"
            },
            "timesheet_approval_status": {
              "$resolve": "args.timesheet_approval_status"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimesheetApprovalStatus": {
      "name": "Get a timesheet approval status",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TimesheetApprovalStatusResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/timesheet_approval_statuses/{timesheet_approval_status_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getTimesheetApprovalStatuses": {
      "name": "Get multiple timesheet approval statuses",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "TimesheetApprovalStatusCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "user": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "from_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "to_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "approval_statuses": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/timesheet_approval_statuses",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "user": {
              "$resolve": "args.user"
            },
            "from_date": {
              "$resolve": "args.from_date"
            },
            "to_date": {
              "$resolve": "args.to_date"
            },
            "approval_statuses": {
              "$resolve": "args.approval_statuses"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "typeaheadForWorkspace": {
      "name": "Get objects via typeahead",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "AsanaNamedResource"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "resource_type": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "type": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "query": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "count": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/typeahead",
          "query": {
            "resource_type": {
              "$resolve": "args.resource_type"
            },
            "type": {
              "$resolve": "args.type"
            },
            "query": {
              "$resolve": "args.query"
            },
            "count": {
              "$resolve": "args.count"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getUserTaskList": {
      "name": "Get a user task list",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "UserTaskListResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/user_task_lists/{user_task_list_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getUserTaskListForUser": {
      "name": "Get a user's task list",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "UserTaskListResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "opt_fields": {
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
          "path": "/users/{user_gid}/user_task_list",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getUsers": {
      "name": "Get multiple users",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "UserCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "team": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/users",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "team": {
              "$resolve": "args.team"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getUser": {
      "name": "Get a user",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "UserResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/users/{user_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getFavoritesForUser": {
      "name": "Get a user's favorites",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "AsanaNamedResource"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "resource_type": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "opt_fields": {
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
          "path": "/users/{user_gid}/favorites",
          "query": {
            "resource_type": {
              "$resolve": "args.resource_type"
            },
            "workspace": {
              "$resolve": "args.workspace"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getUsersForTeam": {
      "name": "Get users in a team",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "UserCompact"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/teams/{team_gid}/users",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getUsersForWorkspace": {
      "name": "Get users in a workspace or organization",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "UserCompact"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/users",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getUserForWorkspace": {
      "name": "Get a user in a workspace or organization",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "UserResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/users/{user_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getWebhooks": {
      "name": "Get multiple webhooks",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "WebhookResponse"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "workspace": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "resource": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/webhooks",
          "query": {
            "workspace": {
              "$resolve": "args.workspace"
            },
            "resource": {
              "$resolve": "args.resource"
            },
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getWebhook": {
      "name": "Get a webhook",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "WebhookResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/webhooks/{webhook_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getWorkspaceMembership": {
      "name": "Get a workspace membership",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "WorkspaceMembershipResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspace_memberships/{workspace_membership_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getWorkspaceMembershipsForUser": {
      "name": "Get workspace memberships for a user",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "WorkspaceMembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/users/{user_gid}/workspace_memberships",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getWorkspaceMembershipsForWorkspace": {
      "name": "Get the workspace memberships for a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "WorkspaceMembershipCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}/workspace_memberships",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getWorkspaces": {
      "name": "Get multiple workspaces",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "WorkspaceCompact"
            }
          },
          "next_page": {
            "type": "ref",
            "ref": "NextPage"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getWorkspace": {
      "name": "Get a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "WorkspaceResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "path": "/workspaces/{workspace_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "getWorkspaceEvents": {
      "name": "Get workspace events",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "EventResponse"
            }
          },
          "sync": {
            "type": "string"
          },
          "has_more": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "sync": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/workspaces/{workspace_gid}/events",
          "query": {
            "sync": {
              "$resolve": "args.sync"
            }
          }
        }
      }
    }
  },
  "actions": {
    "createAccessRequest": {
      "name": "Create an access request",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "data": {
                "type": "ref",
                "ref": "AccessRequestCreateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/access_requests",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "approveAccessRequest": {
      "name": "Approve an access request",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "POST",
          "path": "/access_requests/{access_request_gid}/approve"
        }
      }
    },
    "rejectAccessRequest": {
      "name": "Reject an access request",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "POST",
          "path": "/access_requests/{access_request_gid}/reject"
        }
      }
    },
    "updateAllocation": {
      "name": "Update an allocation",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "AllocationResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "AllocationRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/allocations/{allocation_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteAllocation": {
      "name": "Delete an allocation",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/allocations/{allocation_gid}"
        }
      }
    },
    "createAllocation": {
      "name": "Create an allocation",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "AllocationRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/allocations",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteAttachment": {
      "name": "Delete an attachment",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/attachments/{attachment_gid}"
        }
      }
    },
    "createAttachmentForObject": {
      "name": "Upload an attachment",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "AttachmentResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
          "method": "POST",
          "path": "/attachments",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
            }
          }
        }
      }
    },
    "createBatchRequest": {
      "name": "Submit parallel requests",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "BatchResponse"
            }
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "BatchRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/batch",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createBudget": {
      "name": "Create a budget",
      "schema": {
        "type": "object"
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
              "data": {
                "type": "ref",
                "ref": "BudgetRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/budgets",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateBudget": {
      "name": "Update a budget",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "BudgetResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "BudgetRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/budgets/{budget_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteBudget": {
      "name": "Delete a budget",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/budgets/{budget_gid}"
        }
      }
    },
    "createCustomField": {
      "name": "Create a custom field",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "CustomFieldCreateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/custom_fields",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateCustomField": {
      "name": "Update a custom field",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "CustomFieldResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "CustomFieldRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/custom_fields/{custom_field_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteCustomField": {
      "name": "Delete a custom field",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/custom_fields/{custom_field_gid}"
        }
      }
    },
    "createEnumOptionForCustomField": {
      "name": "Create an enum option",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "EnumOptionRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/custom_fields/{custom_field_gid}/enum_options",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "insertEnumOptionForCustomField": {
      "name": "Reorder a custom field's enum",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EnumOption"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "EnumOptionInsertRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/custom_fields/{custom_field_gid}/enum_options/insert",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateEnumOption": {
      "name": "Update an enum option",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EnumOption"
          }
        }
      },
      "args": {
        "enum_option_gid": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "EnumOptionBase"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/enum_options/{enum_option_gid}",
          "params": {
            "enum_option_gid": {
              "$resolve": "args.enum_option_gid"
            }
          },
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createGraphExport": {
      "name": "Initiate a graph export",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "data": {
                "type": "ref",
                "ref": "GraphExportRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/exports/graph",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createResourceExport": {
      "name": "Initiate a resource export",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "data": {
                "type": "ref",
                "ref": "ResourceExportRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/exports/resource",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateGoalRelationship": {
      "name": "Update a goal relationship",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalRelationshipResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "GoalRelationshipRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/goal_relationships/{goal_relationship_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addSupportingRelationship": {
      "name": "Add a supporting goal relationship",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalRelationshipResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "GoalAddSupportingRelationshipRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/addSupportingRelationship",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeSupportingRelationship": {
      "name": "Removes a supporting goal relationship",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "GoalRemoveSupportingRelationshipRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/removeSupportingRelationship",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateGoal": {
      "name": "Update a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "GoalUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/goals/{goal_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteGoal": {
      "name": "Delete a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/goals/{goal_gid}"
        }
      }
    },
    "createGoal": {
      "name": "Create a goal",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "GoalRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createGoalMetric": {
      "name": "Create a goal metric",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "GoalMetricRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/setMetric",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateGoalMetric": {
      "name": "Update a goal metric",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "GoalMetricCurrentValueRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/setMetricCurrentValue",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addFollowers": {
      "name": "Add a collaborator to a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskAddFollowersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/addFollowers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeFollowers": {
      "name": "Remove a collaborator from a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "GoalResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskAddFollowersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/removeFollowers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addCustomFieldSettingForGoal": {
      "name": "Add a custom field to a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "CustomFieldSettingResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "AddCustomFieldSettingRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/addCustomFieldSetting",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "removeCustomFieldSettingForGoal": {
      "name": "Remove a custom field from a goal",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "RemoveCustomFieldSettingRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/removeCustomFieldSetting",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createMembership": {
      "name": "Create a membership",
      "schema": {
        "type": "object"
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
              "data": {
                "type": "ref",
                "ref": "CreateMembershipRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/memberships",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateMembership": {
      "name": "Update a membership",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "MembershipResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "MembershipRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/memberships/{membership_gid}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteMembership": {
      "name": "Delete a membership",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/memberships/{membership_gid}"
        }
      }
    },
    "updateOooEntry": {
      "name": "Update an OOO entry",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "OooEntryResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "OooEntryUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/ooo_entries/{ooo_entry_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteOooEntry": {
      "name": "Delete an OOO entry",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/ooo_entries/{ooo_entry_gid}"
        }
      }
    },
    "createOooEntry": {
      "name": "Create an OOO entry",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "OooEntryCreateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ooo_entries",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createOrganizationExport": {
      "name": "Create an organization export request",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "OrganizationExportRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/organization_exports",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createPortfolio": {
      "name": "Create a portfolio",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "PortfolioRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/portfolios",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updatePortfolio": {
      "name": "Update a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "PortfolioResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "PortfolioUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/portfolios/{portfolio_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deletePortfolio": {
      "name": "Delete a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/portfolios/{portfolio_gid}"
        }
      }
    },
    "addItemForPortfolio": {
      "name": "Add a portfolio item",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "PortfolioAddItemRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/portfolios/{portfolio_gid}/addItem",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "removeItemForPortfolio": {
      "name": "Remove a portfolio item",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "PortfolioRemoveItemRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/portfolios/{portfolio_gid}/removeItem",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "addCustomFieldSettingForPortfolio": {
      "name": "Add a custom field to a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "CustomFieldSettingResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "AddCustomFieldSettingRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/portfolios/{portfolio_gid}/addCustomFieldSetting",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "removeCustomFieldSettingForPortfolio": {
      "name": "Remove a custom field from a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "RemoveCustomFieldSettingRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/portfolios/{portfolio_gid}/removeCustomFieldSetting",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "addMembersForPortfolio": {
      "name": "Add users to a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "PortfolioResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "AddMembersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/portfolios/{portfolio_gid}/addMembers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeMembersForPortfolio": {
      "name": "Remove users from a portfolio",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "PortfolioResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "RemoveMembersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/portfolios/{portfolio_gid}/removeMembers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "duplicatePortfolio": {
      "name": "Duplicate a portfolio",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "PortfolioDuplicateRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/portfolios/{portfolio_gid}/duplicate",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateProjectBrief": {
      "name": "Update a project brief",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectBriefResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectBriefRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/project_briefs/{project_brief_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteProjectBrief": {
      "name": "Delete a project brief",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/project_briefs/{project_brief_gid}"
        }
      }
    },
    "createProjectBrief": {
      "name": "Create a project brief",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectBriefRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/project_briefs",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateProjectPortfolioSetting": {
      "name": "Update a project portfolio setting",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectPortfolioSettingResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectPortfolioSettingUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/project_portfolio_settings/{project_portfolio_setting_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteProjectStatus": {
      "name": "Delete a project status",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/project_statuses/{project_status_gid}"
        }
      }
    },
    "createProjectStatusForProject": {
      "name": "Create a project status",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectStatusRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/project_statuses",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteProjectTemplate": {
      "name": "Delete a project template",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/project_templates/{project_template_gid}"
        }
      }
    },
    "instantiateProject": {
      "name": "Instantiate a project from a project template",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectTemplateInstantiateProjectRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/project_templates/{project_template_gid}/instantiateProject",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createProject": {
      "name": "Create a project",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateProject": {
      "name": "Update a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/projects/{project_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteProject": {
      "name": "Delete a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/projects/{project_gid}"
        }
      }
    },
    "duplicateProject": {
      "name": "Duplicate a project",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectDuplicateRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/duplicate",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createProjectForTeam": {
      "name": "Create a project in a team",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/teams/{team_gid}/projects",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createProjectForWorkspace": {
      "name": "Create a project in a workspace",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/workspaces/{workspace_gid}/projects",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addCustomFieldSettingForProject": {
      "name": "Add a custom field to a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "CustomFieldSettingResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "AddCustomFieldSettingRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/addCustomFieldSetting",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeCustomFieldSettingForProject": {
      "name": "Remove a custom field from a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "RemoveCustomFieldSettingRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/removeCustomFieldSetting",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "addMembersForProject": {
      "name": "Add users to a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "AddMembersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/addMembers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeMembersForProject": {
      "name": "Remove users from a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "RemoveMembersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/removeMembers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addFollowersForProject": {
      "name": "Add followers to a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "AddFollowersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/addFollowers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeFollowersForProject": {
      "name": "Remove followers from a project",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "ProjectResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "RemoveFollowersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/removeFollowers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "projectSaveAsTemplate": {
      "name": "Create a project template from a project",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "ProjectSaveAsTemplateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/saveAsTemplate",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createRate": {
      "name": "Create a rate",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "RateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/rates",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateRate": {
      "name": "Update a rate",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "RateResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "RateUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/rates/{rate_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteRate": {
      "name": "Delete a rate",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/rates/{rate_gid}"
        }
      }
    },
    "createRole": {
      "name": "Create a role",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "RbacRoleRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/roles",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateRole": {
      "name": "Update a role",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "RbacRoleResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "RbacRoleUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/roles/{role_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteRole": {
      "name": "Delete a role",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/roles/{role_gid}"
        }
      }
    },
    "triggerRule": {
      "name": "Trigger a rule",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "RuleTriggerResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "RuleTriggerRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/rule_triggers/{rule_trigger_gid}/run",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateSection": {
      "name": "Update a section",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "SectionResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "SectionRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/sections/{section_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteSection": {
      "name": "Delete a section",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/sections/{section_gid}"
        }
      }
    },
    "createSectionForProject": {
      "name": "Create a section in a project",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "SectionRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/sections",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addTaskForSection": {
      "name": "Add task to section",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "SectionTaskInsertRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sections/{section_gid}/addTask",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "insertSectionForProject": {
      "name": "Move or Insert sections",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "ProjectSectionInsertRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{project_gid}/sections/insert",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteStatus": {
      "name": "Delete a status update",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/status_updates/{status_update_gid}"
        }
      }
    },
    "createStatusForObject": {
      "name": "Create a status update",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "StatusUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/status_updates",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateStory": {
      "name": "Update a story",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "StoryResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "StoryRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/stories/{story_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteStory": {
      "name": "Delete a story",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/stories/{story_gid}"
        }
      }
    },
    "createStoryForTask": {
      "name": "Create a story on a task",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "StoryRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/stories",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createStoryForGoal": {
      "name": "Create a story on a goal",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "StoryRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals/{goal_gid}/stories",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createTag": {
      "name": "Create a tag",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TagCreateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tags",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateTag": {
      "name": "Update a tag",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TagResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TagUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/tags/{tag_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteTag": {
      "name": "Delete a tag",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/tags/{tag_gid}"
        }
      }
    },
    "createTagForWorkspace": {
      "name": "Create a tag in a workspace",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TagCreateTagForWorkspaceRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/workspaces/{workspace_gid}/tags",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteTaskTemplate": {
      "name": "Delete a task template",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/task_templates/{task_template_gid}"
        }
      }
    },
    "instantiateTask": {
      "name": "Instantiate a task from a task template",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskTemplateInstantiateTaskRequest"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/task_templates/{task_template_gid}/instantiateTask",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createTask": {
      "name": "Create a task",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskCreateRequest"
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
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateTask": {
      "name": "Update a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TaskResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/tasks/{task_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/tasks/{task_gid}"
        }
      }
    },
    "duplicateTask": {
      "name": "Duplicate a task",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskDuplicateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/duplicate",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createSubtaskForTask": {
      "name": "Create a subtask",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskCreateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/subtasks",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "setParentForTask": {
      "name": "Set the parent of a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TaskResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskSetParentRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/setParent",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addDependenciesForTask": {
      "name": "Set dependencies for a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "ModifyDependenciesRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/addDependencies",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "removeDependenciesForTask": {
      "name": "Unlink dependencies from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "ModifyDependenciesRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/removeDependencies",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "addDependentsForTask": {
      "name": "Set dependents for a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "ModifyDependentsRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/addDependents",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "removeDependentsForTask": {
      "name": "Unlink dependents from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "ModifyDependentsRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/removeDependents",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "addProjectForTask": {
      "name": "Add a project to a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "TaskAddProjectRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/addProject",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "removeProjectForTask": {
      "name": "Remove a project from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "TaskRemoveProjectRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/removeProject",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "addTagForTask": {
      "name": "Add a tag to a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "TaskAddTagRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/addTag",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "removeTagForTask": {
      "name": "Remove a tag from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "TaskRemoveTagRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/removeTag",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "addFollowersForTask": {
      "name": "Add followers to a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TaskResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskAddFollowersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/addFollowers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeFollowerForTask": {
      "name": "Remove followers from a task",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TaskResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TaskRemoveFollowersRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/removeFollowers",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createTeam": {
      "name": "Create a team",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TeamRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/teams",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateTeam": {
      "name": "Update a team",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TeamResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TeamRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/teams/{team_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addUserForTeam": {
      "name": "Add a user to a team",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TeamMembershipResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TeamAddUserRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/teams/{team_gid}/addUser",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeUserForTeam": {
      "name": "Remove a user from a team",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "TeamRemoveUserRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/teams/{team_gid}/removeUser",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateTimeTrackingCategory": {
      "name": "Update a time tracking category",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TimeTrackingCategoryResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TimeTrackingCategoryUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/time_tracking_categories/{time_tracking_category_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteTimeTrackingCategory": {
      "name": "Delete a time tracking category",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/time_tracking_categories/{time_tracking_category_gid}"
        }
      }
    },
    "createTimeTrackingCategory": {
      "name": "Create a time tracking category",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "TimeTrackingCategoryCreateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/time_tracking_categories",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createTimeTrackingEntry": {
      "name": "Create a time tracking entry",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "CreateTimeTrackingEntryRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks/{task_gid}/time_tracking_entries",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateTimeTrackingEntry": {
      "name": "Update a time tracking entry",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TimeTrackingEntryBase"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "UpdateTimeTrackingEntryRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/time_tracking_entries/{time_tracking_entry_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteTimeTrackingEntry": {
      "name": "Delete a time tracking entry",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/time_tracking_entries/{time_tracking_entry_gid}"
        }
      }
    },
    "updateTimesheetApprovalStatus": {
      "name": "Update a timesheet approval status",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "TimesheetApprovalStatusResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "UpdateTimesheetApprovalStatusRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/timesheet_approval_statuses/{timesheet_approval_status_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createTimesheetApprovalStatus": {
      "name": "Create a timesheet approval status",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "CreateTimesheetApprovalStatusRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/timesheet_approval_statuses",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateUser": {
      "name": "Update a user",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "UserResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "UserUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/users/{user_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateUserForWorkspace": {
      "name": "Update a user in a workspace or organization",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "UserResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "UserUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/workspaces/{workspace_gid}/users/{user_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "createWebhook": {
      "name": "Establish a webhook",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "WebhookRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "updateWebhook": {
      "name": "Update a webhook",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "WebhookResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "WebhookUpdateRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/webhooks/{webhook_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "deleteWebhook": {
      "name": "Delete a webhook",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
          "method": "DELETE",
          "path": "/webhooks/{webhook_gid}"
        }
      }
    },
    "updateWorkspace": {
      "name": "Update a workspace",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "WorkspaceResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "WorkspaceRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/workspaces/{workspace_gid}",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "addUserForWorkspace": {
      "name": "Add a user to a workspace or organization",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "UserBaseResponse"
          }
        }
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "opt_fields": {
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
              "data": {
                "type": "ref",
                "ref": "WorkspaceAddUserRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/workspaces/{workspace_gid}/addUser",
          "query": {
            "opt_fields": {
              "$resolve": "args.opt_fields"
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
    "removeUserForWorkspace": {
      "name": "Remove a user from a workspace or organization",
      "schema": {
        "type": "object",
        "properties": {
          "data": {
            "type": "ref",
            "ref": "EmptyResponse"
          }
        }
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
              "data": {
                "type": "ref",
                "ref": "WorkspaceRemoveUserRequest"
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/workspaces/{workspace_gid}/removeUser",
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
